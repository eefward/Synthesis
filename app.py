from flask import Flask, redirect, render_template, request, jsonify, session
from flask_cors import CORS 
import json
import sqlite3

import functions

functions.createRecordingsDB()

app = Flask(__name__, template_folder='templates', static_folder='static')
CORS(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/test")
def test():
    return render_template("test.html")

@app.route("/gallery")
def gallery():
    return render_template("gallery.html")

@app.route('/saveRecording', methods=['POST'])
def saveRecording():
    data = request.json

    recorded_notes = data.get('recording')
    title = data.get('title')
    user = data.get('user')
    duration = data.get('duration')
    bpm = data.get('BPM')

    if not recorded_notes or not isinstance(recorded_notes, list):
        return jsonify({"error": "Invalid recording format"}), 400

    conn = sqlite3.connect("recordings.db")
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO recordings (title, user, duration, BPM, recordedNotes)
        VALUES (?, ?, ?, ?, ?)
    """, (title, user, duration, bpm, json.dumps(recorded_notes)))
    conn.commit()
    conn.close()

    return jsonify({"message": "Recording saved!"})


@app.route('/getRecordings', methods=['GET'])
def get_recordings():
    conn = sqlite3.connect("recordings.db")
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, user, duration, BPM, recordedNotes FROM recordings")
    rows = cursor.fetchall()
    conn.close()

    recordings = []
    for row in rows:
        recordings.append({
            "id": row[0],
            "title": row[1],
            "user": row[2],
            "duration": row[3],
            "BPM": row[4],
            "recording": json.loads(row[5])
        })

    return jsonify(recordings)


if __name__ == "__main__":
    app.run(debug=True)