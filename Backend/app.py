import json
import pickle
import numpy as np
import nltk
from tensorflow.keras.models import load_model
import spacy
from flask_cors import CORS
from flask import Flask, render_template, request, jsonify, send_from_directory
from utils import *
import os


#<link rel="shortcut icon" href="{{ url_for('static', filename='favicon.ico') }}">

# Init Flask app
app = Flask(__name__, static_folder="build/static", template_folder="build")
CORS(app)

# Routes
# Hello
@app.route("/")
def home():
    return render_template("index.html")


# Response Route (JSON APPLICATION REQUEST)
@app.route("/chatbot", methods=["POST"])
def chatbot():
    request_data = request.get_json()
    message = request_data["message"]
    ints = predict_class(message)
    response = get_response(ints, intents)
    print(response)
    return jsonify({"message": response, "id": "bot777"})


if __name__ == "__main__":
    app.run(debug=True)