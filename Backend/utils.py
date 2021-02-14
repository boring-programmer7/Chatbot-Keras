import json
import pickle
import numpy as np
import nltk
from tensorflow.keras.models import load_model
import spacy
import random

# Load Models

# load Spacy Model
# nlp = spacy.load("en_core_web_sm") #English
nlp = spacy.load("es_core_news_sm")  # Spanish
# load pickles
words = pickle.load(open("assets/words.pkl", "rb"))
classes = pickle.load(open("assets/classes.pkl", "rb"))
# load data (intents) json
intents = json.loads(open("assets/intents.json", encoding="utf-8").read())
# Load Model
model = load_model("assets/chatbotmodel.h5")


def clean_sentence(sentence, ignore_letters=["?", "!", "¡", "¿", ",", "."]):
    # Tokenize
    sentence_words = sentence.split()
    # Lematize and normalize
    normWords = normalize(" ".join(sentence_words))
    sentence_words = [
        lemma for lemma in lemmatizer(normWords) if lemma not in ignore_letters
    ]
    if sentence_words == []:
        return sentence.lower().split()
    return sentence_words


# Matrix from text


def bag_of_words(sentence):
    """
    Matriz del mismo tamaño que la usada para entrenar x[i,j].

    si x[i,j] = 1 la palabra j de la oración i SI está en la lista de palabras de
        entrenamiento (features)

    si x[i,j] = 0 la palabra j de la oración i NO está en la lista de palabras de
        entrenamiento (features)"""
    sentence_words = clean_sentence(sentence)
    bag = [0] * len(words)
    for w in sentence_words:
        for i, word in enumerate(words):
            if word == w:
                bag[i] = 1
    return np.array(bag)


# Predict Class from sentence


def predict_class(sentence):
    bow = bag_of_words(sentence)
    x = np.array([bow])
    res = model.predict(x)[0]
    results = [[i, r] for i, r in enumerate(res)]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        _data = {"intent": classes[r[0]], "probability": r[1]}
        return_list.append(_data)
        return return_list


def get_response(intents_list, intents_json, ERROR_THRESHOLD=0.7):
    """
    intentens_list: list prediction od model,
    intents_json: own data (json file)
    ERROR_THRESHOL: Minimum probablity to give a response
    """
    print(intents_list[0]["probability"])
    if intents_list[0]["probability"] < ERROR_THRESHOLD:
        return "Lo siento, no entiendo lo que me dices, pero puedes preguntarme por el menu!"

    tag = intents_list[0]["intent"]  # get intent mayor probability
    list_intents = intents_json["intents"]
    for i in list_intents:
        if i["tag"] == tag:
            results = random.choice(i["responses"])  # Random response from responses
            break
    return results


def normalize(
    text,
    tildes={"á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u"},
    save_words=["dias", "donde"],
):

    # Remove tildes
    text = text.lower()
    for k, v in tildes.items():
        text = text.replace(k, v)
    # spacy model
    doc = nlp(text)
    # drop stopwords and punctuation
    words = []
    for t in doc:
        if not t.is_punct | t.is_stop:
            words.append(t.orth_)
        elif not t.is_punct and t.orth_ in save_words:
            words.append(t.orth_)

    # words = [t.orth_ for t in doc if not t.is_punct | t.is_stop]
    lexical_tokens = [t.lower() for t in words if len(t) > 2 and t.isalpha()]
    return " ".join(lexical_tokens)


# Lemmatizer
def lemmatizer(text):
    doc = nlp(text)
    lemmas = [tok.lemma_.lower() for tok in doc]
    return lemmas
