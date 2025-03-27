from flask import Flask, redirect, render_template, request, jsonify, session
from flask_cors import CORS 
import sqlite3

import functions

app = Flask(__name__, template_folder='templates', static_folder='static')
CORS(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/test")
def test():
    return render_template("test.html")

recordings = []

@app.route("/gallery")
def gallery():
    return render_template("gallery.html")

@app.route('/saveRecording', methods=['POST'])
def saveRecording():
    data = request.json
    recorded_notes = data.get('recordedNotes')

    if not recorded_notes:
        return jsonify({"error": "No recorded notes provided"}), 400

    conn = sqlite3.connect("recordings.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO recordings (recordedNotes) VALUES (?)", (recorded_notes,))
    conn.commit()
    conn.close()

    print("Received:", recorded_notes)
    return jsonify({"message": "Recording saved!"})

if __name__ == "__main__":
    app.run(debug=True)