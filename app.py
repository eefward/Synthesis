from flask import Flask, redirect, render_template, request, jsonify, session
from flask_cors import CORS 
import json
import sqlite3

import functions

functions.temp_create_db()

app = Flask(__name__, template_folder='templates', static_folder='static')
CORS(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/test")
def test():
    return render_template("test.html")

recordings = []

@app.route('/saveRecording', methods=['POST'])
def saveRecording():
    data = request.json
    recorded_notes = data.get('recording')

    if not recorded_notes or not isinstance(recorded_notes, list):
        return jsonify({"error": "Invalid recording format"}), 400

    conn = sqlite3.connect("recordings.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO recordings (recordedNotes) VALUES (?)", (json.dumps(recorded_notes),))
    conn.commit()
    conn.close()

    return jsonify({"message": "Recording saved!"})




if __name__ == "__main__":
    app.run(debug=True)