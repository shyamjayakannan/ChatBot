import os, sys
sys.path.append(os.getcwd())
from backendPython.utils import *
# db_path = 'backendPython/info_db/chroma.sqlite3'
# db = Chroma(embedding_function = Embedding(), persist_directory= db_path)

class DB_Query:
  def __init__(self , db_path , top_k = 3):
    self.top_k = top_k
    self.db_path = db_path
    self.db = Chroma(embedding_function = Embedding(), persist_directory= db_path)

  def run(self , query:str)->List[dict]:
    docs =  self.db.similarity_search_with_relevance_scores(query = query , k= self.top_k)
    results = []
    max_score = max(docs[0][1] , docs[1][1], docs[2][1])
    if max_score < 0.5:
      for doc in docs:
        if doc[1] >= 0.5:   # relevance score
          docs.append(doc)
          text = summarize_chain.run(doc[0].page_content)
          dict_ = {'text':text , 'metadata':doc[0].metadata}
          results.append(dict_)
    else:
      result = agent_chain.run(query)
      results.append({'texts':result , 'metadata':None })

    return results
  


  