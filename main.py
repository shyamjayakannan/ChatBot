# Import necessary libraries
from flask import Flask, jsonify, request
from flask_cors import CORS
# from agents import *
import os

app = Flask(__name__)

CORS(app)


UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/chatbot', methods=['POST'])
def chatbot():
    try:
        user_input = request.json.get('question')
        if user_input:
            print(user_input)
            # output = agent_chain.run(user_input)4
            output = user_input
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


@app.route('/chatbotimage', methods=['POST'])
def chatbotimage():
    try:
        question = request.form.get('question')
        uploaded_file = request.files.get('file')

        if not question or not uploaded_file:
            return jsonify({"error": "Missing question or file"}), 400

        if uploaded_file:
            filename = os.path.join(
                app.config['UPLOAD_FOLDER'], uploaded_file.filename)
            uploaded_file.save(filename)

        response_obj = [{
            "text": question,
            "file_name": uploaded_file.filename,
            "message": " File uploaded and saved successfully."
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
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(host="localhost", port=8501)
