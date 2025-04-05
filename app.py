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
    title = data.get('title')
    user = data.get('user')
    duration = data.get('duration')
    BPM = data.get('BPM')
    notes = data.get('notes')  # Get the notes array

    # Save to the database
    conn = sqlite3.connect("recordings.db")
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO recordings (title, user, duration, BPM, notes) VALUES (?, ?, ?, ?, ?)",
        (title, user, duration, BPM, json.dumps(notes))  # Save notes as JSON
    )
    conn.commit()
    conn.close()

    return jsonify({"message": "Recording saved!"})

@app.route('/getRecordings', methods=['GET'])
def getRecordings():
    try:
        conn = sqlite3.connect("recordings.db")
        cursor = conn.cursor()
        cursor.execute("SELECT id, title, user, duration, BPM, recordedNotes FROM recordings")
        recordings = cursor.fetchall()
        conn.close()

        recordings_list = [
            {
                'title': r[1],
                'user': r[2],
                'duration': r[3],
                'BPM': r[4],
                'notes': json.loads(r[5])  
            }
            for r in recordings
        ]
        return jsonify(recordings_list)

    except Exception as e:
        print("Error fetching recordings:", e)
        return jsonify({"error": "Failed to fetch recordings"}), 500



if __name__ == "__main__":
    app.run(debug=True)