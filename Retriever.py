from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_openai import ChatOpenAI
from langchain_classic.prompts import ChatPromptTemplate
import pickle
from langchain_classic.retrievers import EnsembleRetriever
from langchain_community.cross_encoders import HuggingFaceCrossEncoder

from typing import TypedDict, Optional
from collections import defaultdict
from dotenv import load_dotenv
load_dotenv()




embedding_model = HuggingFaceEmbeddings(
    model_name="Models/bge-large-en",
    model_kwargs={"device": "cpu"},
    encode_kwargs={"normalize_embeddings": True}
)
cross_encoder = HuggingFaceCrossEncoder(model_name="Models/bge-reranker-base")


Vectordb = Chroma(persist_directory="Database", embedding_function=embedding_model)
existing_metadatas = Vectordb.get()["metadatas"]

relationship_map = defaultdict(lambda: defaultdict(set))
for m in existing_metadatas:
    if m:
        relationship_map[m["status"]][m["act_type"]].add(m["short_name"])


class available_filters_structure(TypedDict):
    short_name: Optional[str] = None
    status: Optional[str] = None
    act_type: Optional[str] = None


llm = ChatOpenAI(model="gpt-4.1-2025-04-14", temperature=0.1, model_kwargs={
        "response_format": {"type": "json_object"}
    })
llm_model = llm.with_structured_output(available_filters_structure)


# print("relationship_map: ", relationship_map)





prompt = ChatPromptTemplate([
    ("system", """
        You are an expert in Indian Law and from a query you understand what filters to use.
        You always give answer in proper JSON format and nothing else, and only use the filters provided to you.
        Here is the exact structure of available documents: {relationship_map},
        Rules:
        - Return a JSON with only the filters that are relevant.
        - If a field is not relevant to the query, omit it entirely.
        - Use this map to pick filters. Never combine values that don't appear together in this map.
        - Only include short_name if the user explicitly names a specific act.
        - For general queries, use only status and act_type.
        - Only set status=active if the query is clearly about current law.
        - Only set status=repealed if the query explicitly asks about old law.
        - Omit status entirely if the query involves comparison or mapping between old and new law.
    """),
    ("human", "Given this query: {user_query}")
])


def retrieve_docs(user_query: str):

    # user_query = "what is the current procedure for bail"

    chain = prompt | llm_model 

    result = chain.invoke({
        "relationship_map" : relationship_map,
        "user_query": user_query
    })

    # print("result: ", result)


    query_filter = {}
    if len(result) > 1:
        query_filter = {
            "$and": [
                {key: {"$eq": value}}
                for key, value in result.items()
            ]
        }
    else:
        key, value = next(iter(result.items()))
        query_filter = {
            key: {"$eq": value}
        }

    # print("query_filter: ", query_filter)


    semantic_retriever = Vectordb.as_retriever(search_type="mmr", search_kwargs = {
        "k" : 20,
        "fetch_k": 150,
        "lambda_mult": 0.8,
        "filter" : query_filter
    })


    with open("Database/bm25_index.pkl", "rb") as f:
        bm25_retriever = pickle.load(f)

    bm25_retriever.k = 15


    retriever = EnsembleRetriever(
        retrievers=[semantic_retriever, bm25_retriever],
        weights=[0.5, 0.5]
    )
    raw_results = retriever.invoke(user_query)


    if "status" in result:
        filtered_results = [
            r for r in raw_results
            if r.metadata.get("status") == result["status"]
        ]
    else:
        filtered_results = raw_results

    pairs = [[user_query, r.page_content] for r in filtered_results]

    # Cross Encoder Reranking
    scores = cross_encoder.score(pairs)

    ranked = sorted(
        zip(scores, filtered_results),
        key = lambda x: x[0],
        reverse=True
    )

    top_results = [doc for _, doc in ranked[:10]]
    # print("retrieved_data: \n", top_results)
    # print("retrieved_data: \n", type(top_results[0]))
    
    return top_results
