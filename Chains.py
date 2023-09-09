from utils import llm
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain.chains import RetrievalQAWithSourcesChain
from agents import *

# QA ConversationChain

db = Chroma(embedding_function= Embedding(), persist_directory='./user_db')
doc_qa_chain = RetrievalQAWithSourcesChain.from_chain_type(llm=llm,
                                                    chain_type="refine",
                                                    retriever=db.as_retriever(), 
                                                    )

# ConversationChain
template = """You are a friendly bot to interact with users. Be calm and polite

Current conversation:
{history}

{input}"""


conversation_chain = ConversationChain(
    llm=llm,
    verbose=True,
    prompt=PromptTemplate(template=template, input_variables=["history", "input"]),
    memory=ConversationBufferMemory(ai_prefix='Friend', human_prefix='Sarvagya', )
)
