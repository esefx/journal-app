from datetime import datetime, timezone
import json

from flask import Flask
from flask_cors import CORS, cross_origin
from flask import request
from flask import g
import requests
import os
import sqlite3


app = Flask(__name__)
cors = CORS(app)
app.secret_key = "nothing"


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        print('Connecting to database...')
        db = sqlite3.connect(":memory:")
        g._database = db
        print(hasattr(g, "_database"))
    print("Connected to database")
    return db


def init_db():
    print("Initializing database...")
    with app.app_context():
        db = get_db()
        db.cursor().execute("""
        CREATE TABLE IF NOT EXISTS journal_entries(
        recording BLOB,
        job_id TEXT UNIQUE,
        created_at TEXT,
        emotions TEXT
        );
        """)
        db.commit()
    print("Database initialized")


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

HUME_AI_BASE_URL='https://api.hume.ai/v0/batch/jobs'

HUME_API_KEY = os.getenv('HUME_API_KEY')
if HUME_API_KEY is None:
    print("HUME_API_KEY not set")
    raise Exception("HUME_API_KEY not set")

init_db()


@app.post('/journal')
@cross_origin()
def journal():
    recording = request.files['file']

    data = [recording, "blahblah", datetime.now(timezone.utc).isoformat()]
    with app.app_context():
        get_db().cursor().execute("""INSERT INTO journal_entries (recording, job_id, created_at)
            VALUES (?, ?, ?)
            """, data)
        get_db().commit()

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
    res = get_db().cursor().execute("SELECT * FROM journal_entries WHERE job_id = ?", (job_id,))
    print("[DEBUG] DB: ", res.fetchone())
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