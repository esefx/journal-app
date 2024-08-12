import json

from flask import Flask
from flask_cors import CORS, cross_origin
from flask import request
import requests
import os


app = Flask(__name__)
cors = CORS(app)
app.secret_key = "nothing"

HUME_AI_BASE_URL='https://api.hume.ai/v0/batch/jobs'

HUME_API_KEY = os.getenv('HUME_API_KEY')
if HUME_API_KEY is None:
    print("HUME_API_KEY not set")
    raise Exception("HUME_API_KEY not set")

@app.post('/journal')
@cross_origin()
def journal():
    recording = request.files['file']

    # Call Hume AI API
    args = {
        'file': recording,
        'json': json.dumps({'models': {'prosody': {'granularity': 'sentence'}}})
    }
    resp = requests.post(HUME_AI_BASE_URL,
                         files=args,
                         headers={
                             'X-Hume-Api-Key': HUME_API_KEY
                         })

    print("Result -----")
    print(resp.status_code)
    print(resp.text)
    print(resp.json())
    print("End of journal")
    return resp.json()

@app.route("/journal/jobs/<job_id>") #TODO: query params for returns raw response vs returns filtered
@cross_origin()
def jobs(job_id):
    resp = requests.get(HUME_AI_BASE_URL + f"/{job_id}/predictions",
                        headers={
                            'X-Hume-Api-Key': HUME_API_KEY
                        }
                        )
    j = resp.json()
    models_responses = j[0]["results"]["predictions"][0]["models"]  # dict of models

    l = []
    for k in models_responses:
        # there is potential for duplicates of emotions* TODO: fix later
        l.extend(models_responses[k]["grouped_predictions"][0]["predictions"][0][
                     "emotions"])  # emotions has more than 1 time-span for predictions.

    sorted_l = sorted(l, key=lambda x: x["score"], reverse=True)

    return sorted_l[:3]