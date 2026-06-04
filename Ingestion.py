from langchain_classic.document_loaders import PyPDFLoader
from langchain_classic.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface.embeddings import HuggingFaceEmbeddings
from langchain_chroma import Chroma
import os
from tqdm import tqdm
import re

import pickle
from langchain_community.retrievers import BM25Retriever

"""
For Future if we add an upload data part we auto rename the file based on what content it has or ask user for it.
doc type now we only have legislation, judgment
When you add judgments — we will add "caselaws" as an act_type(metadata[2]) value in filename convention, the router will pick it up automatically from the relationship_map
"""

# All the pdf's are in here
files = os.listdir("Data")

Embedding_model = HuggingFaceEmbeddings(model_name="Models/all-MiniLM-L6-V2")
VectorStorage = Chroma(persist_directory="Database", embedding_function=Embedding_model)


existing = VectorStorage.get()["metadatas"]
ingested_files = set(m["source"] for m in existing if m)
print("Already Ingested Files: ", ingested_files)

# We load the pdf's and split them
docs = []
for file in tqdm(files, desc="Loading PDFs"):
    if not file.endswith(".pdf"):
        continue
    if file in ingested_files:
        print(f"Skipping {file}, already in DB")
        continue
    else:
        doc_loader = PyPDFLoader(file_path=f"Data/{file}")
        pages = doc_loader.load()

        metadata = file.replace(".pdf", "").split("_")
        #print(metadata)

        for page in pages:
            page.metadata["short_name"] = metadata[0]
            page.metadata["status"] = metadata[1]
            page.metadata["act_type"] = metadata[2]
            page.metadata["year"] = metadata[3]
            page.metadata["doc_type"] = metadata[4]
            page.metadata["page_number"] = page.metadata.get("page", 0) + 1
            page.metadata["source"] = file
        
        docs.extend(pages)

batch_size = 500
separators = [
    r"\n\d+\.",
    r"\n\([a-z]\)",
    r"\n\([0-9]\)",
    "\n",
    " "
]



def legislation_chunking(pages):
    legislation_splitter = RecursiveCharacterTextSplitter(
        chunk_size=2000,
        chunk_overlap=200,
        separators=separators,
        is_separator_regex=True
    )
    legislation_chunks = legislation_splitter.split_documents(pages)
    
    for chunk in legislation_chunks:
        match = re.match(r"^\s*(\d+)\.", chunk.page_content.strip())
        chunk.metadata["section_number"] = match.group(1) if match else None
    
    return legislation_chunks

def judgment_chunking(pages):
    judgment_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    judgment_chunks = judgment_splitter.split_documents(pages)
    
    for chunk in judgment_chunks:
        chunk.metadata["section_number"] = None
    
    return judgment_chunks
    


# further ahead, there could be more types:
# gazette — government notifications, amendments published in Gazette of India
# circular — ministry circulars and guidelines
# rulebook — subordinate legislation like bail rules, court fees rules
# constitution — Constitution of India is neither judgment nor legislation in the traditional sense

chunking_formatters = {
    "legislation": legislation_chunking,
    "judgment": judgment_chunking
}


if not docs:
    print("Nothing new to ingest")
else:
    docs_by_type = {}
    for page in docs:
        doc_type = page.metadata["doc_type"]
        if doc_type not in docs_by_type:
            docs_by_type[doc_type] = []
        docs_by_type[doc_type].append(page)
    chunks = []


    for doc_type, pages in docs_by_type.items():
        chunker = chunking_formatters.get(doc_type)
        if chunker:
            chunks.extend(chunker(pages))
        else:
            print(f"Warning: No chunker found for doc_type '{doc_type}' — skipping")
            

    batches = range(0, len(chunks), batch_size)
    for i in tqdm(batches, desc="Adding to DB"):
        batch = chunks[i:i + batch_size]
        VectorStorage.add_documents(batch)
    print("Ingestion Successfull in VectorDB!")


    if os.path.exists("Database/bm25_index.pkl"):
        with open("Database/bm25_index.pkl", "rb") as f:
            existing_bm25 = pickle.load(f)
        all_docs = existing_bm25.docs + chunks
        print("Building BM25 index...")
        bm25_retriever = BM25Retriever.from_documents(all_docs)
        print("BM25 index saved!")
    else:
        print("Building BM25 index...")
        bm25_retriever = BM25Retriever.from_documents(chunks)
        print("BM25 index saved!")
    
    with open("Database/bm25_index.pkl", "wb") as f:
        pickle.dump(bm25_retriever, f)

    
    
    sections_found = [c for c in chunks if c.metadata.get("section_number")]
    print(f"Sections extracted: {len(sections_found)} out of {len(chunks)} chunks")








