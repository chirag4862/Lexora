from typing import TypedDict, List
from Retriever import retrieve_docs
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
import json
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
load_dotenv()


class Citation(TypedDict):
    act: str
    status: str
    act_type: str
    section: str

class LegalAnswer(TypedDict):
    answer: str
    citations: List[Citation]
    answer_found: bool



def legislation_label(metadata):
    return f"[ {metadata.get('short_name')} | {metadata.get('status')} | {metadata.get('act_type')} | Section {metadata.get('section_number')} ]"

def judgment_label(metadata):
    return f"[ {metadata.get('short_name')} | {metadata.get('status')} | {metadata.get('act_type')} | {metadata.get('year')} ]"


def call_llm(labelled_context, user_query, invalid_citations, attempt, chat_history):

    if attempt > 0:
        with open("Prompts/retry_prompt.json") as f:
            retry_template = json.load(f)["template"]
        system_prompt = retry_template.format(invalid_citations=invalid_citations)
    else:
        with open("Prompts/system_prompt.json") as f:
            system_prompt = json.load(f)["template"]


    human_message = """
    Context for understanding: \n {labelled_context}
    User Query: \n {user_query}
    """

    prompt = ChatPromptTemplate([
        ("system", system_prompt),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", human_message)
    ])

    llm = ChatOpenAI(model="gpt-4.1-2025-04-14")
    llm_model = llm.with_structured_output(LegalAnswer)
    chain =  prompt | llm_model
    result = chain.invoke({
            "labelled_context": labelled_context,
            "user_query": user_query,
            "chat_history": chat_history,
        })

    # print("\n\nllm Result: \n",result)
    return result




# Citation Check to know if any chunk was hallucinated
def validate_citations(result, docs):
    recieved_citations = result["citations"]
    docs_metadata = [i.metadata for i in docs]
    valid_citations = []
    invalid_citations = []
    for rc in recieved_citations:
        is_valid = False
        for drc in docs_metadata:
            if rc["act"] == drc.get("short_name") and rc["status"] == drc.get("status") and rc["act_type"] == drc.get("act_type") and rc["section"] == drc.get("section_number"):
                is_valid = True
        if is_valid:
            valid_citations.append(rc)
        else:
            invalid_citations.append(rc)

    validation_result = {
        "is_valid": len(invalid_citations) == 0,
        "invalid_citations": invalid_citations
    }
    return validation_result





def get_labelled_context(user_query):
    docs = retrieve_docs(user_query)
    docs = [
        doc for doc in docs 
        if doc.metadata.get('doc_type') == 'judgment' 
        or doc.metadata.get('section_number')
    ]
    # further ahead, there could be more types:
    # gazette — government notifications, amendments published in Gazette of India
    # circular — ministry circulars and guidelines
    # rulebook — subordinate legislation like bail rules, court fees rules
    # constitution — Constitution of India is neither judgment nor legislation in the traditional sense
    label_formatters = {
        "legislation": legislation_label,
        "judgment": judgment_label
    }


    final_doc = []
    for doc in docs:
        metadata = doc.metadata
        page_content = doc.page_content

        formatter = label_formatters.get(doc.metadata.get('doc_type'), legislation_label)
        metadata_string = formatter(metadata)

        final_doc.append(f"{metadata_string} \n {page_content}")

    labelled_context = "\n\n---\n\n".join(final_doc)
    # print("labelled_context: \n", labelled_context)
    return labelled_context, docs




def generate_answer_ragas(user_query: str) -> dict:
    labelled_context, docs = get_labelled_context(user_query)

    attempt = 0
    max_attempts = 2
    invalid_citations = []
    chat_history = []
    final_result = None
    validation_result = None


    if not docs:
        final_result = "Sorry, no relevant documents found for your query."
    else:
        while attempt < max_attempts:
            print("Going for attempt: ", attempt + 1)
            result = call_llm(labelled_context, user_query, invalid_citations, attempt, chat_history)
            validation_result = validate_citations(result, docs)
            # print("\nvalidation_result: ", validation_result)
            if validation_result.get("is_valid"):
                break
            chat_history.append(AIMessage(content=str(result)))
            invalid_citations = validation_result.get("invalid_citations")
            attempt = attempt + 1

        if not validation_result.get("is_valid"):
            final_result = "Sorry the System couldn't provide a valid result"
        else:
            final_result = result.get("answer")

    # print(final_result)
    return {
        "answer": final_result,
        "contexts": [doc.page_content for doc in docs]
    }


def generate_answer(user_query: str) -> dict:
    labelled_context, docs = get_labelled_context(user_query)

    attempt = 0
    max_attempts = 2
    invalid_citations = []
    chat_history = []
    final_result = None
    validation_result = None


    if not docs:
        final_result = "Sorry, no relevant documents found for your query."
        citations = []
        answer_found = False
    else:
        while attempt < max_attempts:
            print("Going for attempt: ", attempt + 1)
            result = call_llm(labelled_context, user_query, invalid_citations, attempt, chat_history)
            validation_result = validate_citations(result, docs)
            # print("\nvalidation_result: ", validation_result)
            if validation_result.get("is_valid"):
                break
            chat_history.append(AIMessage(content=str(result)))
            invalid_citations = validation_result.get("invalid_citations")
            attempt = attempt + 1

        if not validation_result.get("is_valid"):
            final_result = "Sorry the System couldn't provide a valid result"
            citations = result.get("citations")
            answer_found = False
        else:
            final_result = result.get("answer")
            citations = result.get("citations")
            answer_found = result.get("answer_found")

    print(final_result)
    return {
        "answer": final_result,
        "citations": citations,
        "answer_found": answer_found
    }


if __name__ == "__main__":
    user_query = "what is the current procedure for bail"
    generate_answer(user_query)