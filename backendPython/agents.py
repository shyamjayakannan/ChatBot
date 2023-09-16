from langchain.agents import AgentType
from langchain.agents import Tool
from utils import *
from langchain.utilities import GoogleSearchAPIWrapper
from langchain.utilities.wolfram_alpha import WolframAlphaAPIWrapper
from langchain.agents import initialize_agent
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from parsers import *
from langchain.memory import ConversationBufferMemory

wolfram = WolframAlphaAPIWrapper()
search = GoogleSearchAPIWrapper()


summary_template= ''''
Write a summary of the following text in bulleted points: 
Format Instructions:
{format_instructions}

Query : 
{query}

''' 
summary_prompt = PromptTemplate(
    input_variables=["query"],
    template=summary_template,
    partial_variables={"format_instructions": summary_parser.get_format_instructions()}
)
summarize_chain = LLMChain(llm=llm, prompt=summary_prompt)

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
    Tool(
       name='Summarizer',
       func=summarize_chain.run,
       description='useful for summarizing texts'
    )
]

memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)


agent_chain  = initialize_agent(tools,  
                         llm,  
                         agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, 
                        #  verbose=True, 
                         max_iterations=6,
                         memory=memory
                         )

# print(agent_chain.run("What is the capital of India?"))