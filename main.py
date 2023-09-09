# Import necessary libraries
from flask import Flask, jsonify , request
from flask_cors import CORS
from agents import *


app = Flask(__name__)

CORS(app)

@app.route('/chatbot', methods=['POST'])
def chatbot():
    try:
        user_input = request.json.get('question')
        if user_input:
            print(user_input)
            output = agent_chain.run(user_input)
            # print('\n\n From DataBase : \n', output['source_documents'])
            response_obj = [{
                "text": output
            }]
            print(response_obj)
            response_headers = {
                "Access-Control-Allow-Origin": "*" 
            }
            return jsonify(response_obj), 200, response_headers
    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred"}), 500

if __name__ == "__main__":
    app.run(host="localhost", port=8501)
