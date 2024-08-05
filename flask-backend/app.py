import base64
import json

from flask import Flask
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv, dotenv_values



from flask import request
from flask import make_response
import requests
import subprocess
import os


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.secret_key = "nothing"
load_dotenv()

HUME_AI_BASE_URL='https://api.hume.ai/v0/batch/jobs'

HUME_API_KEY = os.getenv('HUME_API_KEY')
print("Hume Api key", HUME_API_KEY)

@app.route('/')
def hello():
    return 'Hello, World!'


@app.post('/journal')
@cross_origin()
def journal():
    body = request.get_json()
    audio_data = body['audioData']
    audio_data = audio_data.split(",")[1]  # Removing the data URL part of the string
    audio_bytes = base64.b64decode(audio_data)

    # Save the decoded audio to a file
    audio_file_path = 'received_audio.mp3'
    with open(audio_file_path, 'wb') as audio_file:
        audio_file.write(audio_bytes)

    # Call Hume AI API
    if audio_file_path:
        analyze_audio(audio_file_path)
        return 'Audio Received and Saved!'
    return 'no file path found'


def analyze_audio(audio_file):
    with open(audio_file, "rb") as testfile:
        f = {
            'file': testfile,
            'json': json.dumps({'models': {'prosody': {'granularity': 'sentence'}}})
        }
        resp = requests.post(HUME_AI_BASE_URL,
                             files=f,
                             headers={
                                 'X-Hume-Api-Key': HUME_API_KEY
                             }
                             )
    print("Result -----")
    print(resp.status_code)
    print(resp.text)
    print(resp.json())
    print("End of journal")


# @app.post('/form')
# def form():
#     print("[DEBUG] Fake form")
#     print(request.headers)
#     request.files['files'].save("test.mp3")
#     return { k: request.files[k].name for k in request.files }


# @app.post('/callback')
# def notify():
#     return 1