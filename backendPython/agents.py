from langchain.agents import AgentType
from langchain.agents import Tool
import os, sys
sys.path.append(os.getcwd())
from backendPython.prompts import *
from backendPython.llms import *
from backendPython.parsers import *
from langchain.utilities import GoogleSearchAPIWrapper
from langchain.utilities.wolfram_alpha import WolframAlphaAPIWrapper
from langchain.agents import initialize_agent
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory

wolfram = WolframAlphaAPIWrapper()
search = GoogleSearchAPIWrapper()

summarize_chain = LLMChain(llm=llm, prompt=summary_prompt)
short_summary_chain = LLMChain(llm=llm, prompt=short_summary_prompt)
title_chain = LLMChain(llm=llm, prompt=title_prompt)

tools = [
    Tool(
    name="Google Search",  
    description="Search Google for recent results.", 
    func=search.run,  
    ),
    Tool(
    name="Wolfram Calculator",  
    description="To do calculations.",  
    func=wolfram.run,  
    ),
]

memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

agent_chain  = initialize_agent(tools,  
                         llm,  
                         agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, 
                         verbose=True, 
                         max_iterations=6,
                         memory=memory,                         
                         )

# print(agent_chain.run("what are fundamental rights? Explain at length."))