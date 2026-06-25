from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy, context_precision, context_recall
from datasets import Dataset
import json
from Generation import generate_answer_ragas
from tqdm import tqdm
from ragas.embeddings import LangchainEmbeddingsWrapper
from ragas.run_config import RunConfig
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_openai import ChatOpenAI

from dotenv import load_dotenv
load_dotenv()


golden_dataset = None
processed_indices = []


with open("EvalData/eval_dataset.json", "r", encoding='utf-8') as file:
    golden_dataset = json.load(file)

#print(golden_dataset)

try:
    with open("EvalData/eval_results.json", "r", encoding='utf-8') as file:
        partial_results = json.load(file)
except Exception as e:
    print("Exception occured: ", e) 
    partial_results = {
        "processed_indices": [],
        "results": []
    }


if "processed_indices" in partial_results:
    processed_indices = set(partial_results["processed_indices"])


for i, data in enumerate(tqdm(golden_dataset, desc="Evaluating questions")):
    if i in processed_indices:
        print(f"Skipping! Index already processed: {i}")
    else:
        result_entry = {}
        result_entry["index"] = i
        result_entry["question"] = data["question"]
        result_entry["ground_truth"] = data["ground_truth"]
        try:
            print(f"Processing Qyestion {i}")
            #answer, contexts
            question = data["question"]
            rag_result = generate_answer_ragas(question)
            result_entry["answer"] = rag_result["answer"]
            result_entry["contexts"] = rag_result["contexts"]
            result_entry["status"] = "success"

            partial_results["processed_indices"].append(i)
            partial_results["results"].append(result_entry)

        except Exception as e:
            print(f"Failed Processing Qyestion {i}")
            result_entry["answer"] = None
            result_entry["contexts"] = []
            result_entry["status"] = "failed"
            result_entry["error"] = str(e)

            partial_results["processed_indices"].append(i)
            partial_results["results"].append(result_entry)

        with open("EvalData/eval_results.json", "w") as f:
            json.dump(partial_results, f, indent=2)



with open("EvalData/eval_results.json", "r", encoding='utf-8') as file:
        complete_results = json.load(file)

successful_results = []
for block in complete_results["results"]:
    if block["status"] == "success":
        successful_results.append({
            "question": block["question"],
            "answer": block["answer"],
            "contexts": block["contexts"],
            "ground_truth": block["ground_truth"]
        })


print(f"Running RAGAS on {len(successful_results)} successful results out of {len(golden_dataset)} total")

ragas_data = Dataset.from_list(successful_results)


ragas_embeddings = LangchainEmbeddingsWrapper(
    HuggingFaceEmbeddings(
    model_name="Models/bge-large-en",
    model_kwargs={"device": "cpu"},
    encode_kwargs={"normalize_embeddings": True} 
)
)

ragas_llm = ChatOpenAI(
    model="gpt-4o-mini",
    max_tokens=4096
)

ragas_result = evaluate(
    dataset=ragas_data,
    metrics=[faithfulness, answer_relevancy, context_precision, context_recall],
    embeddings=ragas_embeddings,
    llm=ragas_llm,
    run_config=RunConfig(max_workers=4, timeout=120)
)
print(ragas_result)

df = ragas_result.to_pandas()
df.to_json("EvalData/ragas_output.json", orient="records", indent=2)


# Also save summary scores separately
summary = {
    "faithfulness":        df["faithfulness"].tolist(),
    "answer_relevancy":    df["answer_relevancy"].tolist(),
    "context_precision":   df["context_precision"].tolist(),
    "context_recall":      df["context_recall"].tolist()
}

with open("EvalData/ragas_summary.json", "w") as f:
    json.dump(summary, f, indent=2)


print("RAGAS evaluation completed!")