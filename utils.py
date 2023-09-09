from chromadb.api.types import Documents, Embeddings
import google.generativeai as palm
from typing import List, Tuple
from langchain.docstore.document import Document
import os
from langchain.vectorstores import Chroma
import yaml
from langchain.document_loaders import PyPDFLoader
from langchain.document_loaders import Docx2txtLoader
from langchain.text_splitter import SpacyTextSplitter, RecursiveCharacterTextSplitter
from langchain.llms import GooglePalm
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv()) # read local .env file


llm = GooglePalm(temperature=0.2)
palm.configure(api_key=os.environ['GOOGLE_API_KEY_PALM'])

models = [m for m in palm.list_models() if 'embedText' in m.supported_generation_methods]
model = models[0]

#_________________________________________________________________________________________
class Embedding:
  def __init__(self):
    self.embedder = palm


  def embed_documents(self, texts: Documents) -> Embeddings:
    # Embed the documents using any supported method
    return  [self.embedder.generate_embeddings(model=model, text=text)['embedding']
            for text in texts]
  
  def embed_query(self,query):
    return  self.embedder.generate_embeddings(model=model, text=query)['embedding']
            
#_________________________________________________________________________________________
# Text Loading
def load_data(path):
    type = path.split('.')[-1]
    if type == 'txt':
      with open(path, 'r') as f:
        docs = f.read()
        f.close()
      return docs
    elif type == 'pdf':
      document_loader = PyPDFLoader(file_path=path)
      document = document_loader.load_and_split()
      return document
    elif type == 'docx':
      loader = Docx2txtLoader("example_data/fake.docx")
      data = loader.load()
      return data

#_________________________________________________________________________________________
def load_config(CONFIG_PATH):
    with open(CONFIG_PATH, 'r') as f:
        config = yaml.safe_load(f)
    return config 

config = load_config('config.yaml')
#_________________________________________________________________________________________
# Using Splitters

def split_data(data):

  # text_splitter = RecursiveCharacterTextSplitter(
  #   chunk_size= config['chunk_size'], 
  #   chunk_overlap= config['chunk_overlap'],
  #   length_function=len,
  # )
  # Instantiate the SpacyTextSplitter with the desired chunk size
  text_splitter = SpacyTextSplitter(chunk_size=1000, chunk_overlap=20)

  # Split the text using SpacyTextSplitter
  texts = text_splitter.split_text(data)
  return texts

#_________________________________________________________________________________________

def create_db(data):
  embedder = Embedding()
  db = Chroma.from_documents(data, embedder, persist_directory='./user_db')
  return

#_________________________________________________________________________________________
def search_db(query)-> List[Tuple[Document, float]]:
   db = Chroma(embedding_function= Embedding(), persist_directory='./user_db')
   results = db.similarity_search_with_score(query)
   return results