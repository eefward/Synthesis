from flask import Flask, redirect, render_template, request, jsonify, session
from flask_cors import CORS 
import json
import sqlite3

import functions
# import mysql_connector

# conn = mysql_connector.get_conn()

functions.createRecordingsDB()
functions.createUsersDB()

app = Flask(__name__, template_folder='templates', static_folder='static')
CORS(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/signup', methods=['POST'])
def signup():
    username = request.form.get('username')
    password = request.form.get('password')

    if not username or not password:
        return jsonify({'error': 'Missing fields'}), 400

    try:
        conn = sqlite3.connect("users.db")
        cursor = conn.cursor()

        cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Signup successful!'}), 200

    except sqlite3.IntegrityError:
        return jsonify({'error': 'Username already taken'}), 409
    except Exception as e:
        print("Signup error:", e)
        return jsonify({'error': 'Server error'}), 500


@app.route("/test")
def test():
    cur = conn.cursor()
    cur.execute("CREATE TABLE test(user INT)")
    return render_template("login.html")

@app.route("/gallery")
def gallery():
    return render_template("gallery.html")

@app.route('/saveRecording', methods=['POST'])
def saveRecording():
    try:
        data = request.json
        print("Received data:", data)

        title = data.get('title')
        user = data.get('user')
        duration = data.get('duration')
        bpm = data.get('BPM')
        notes = data.get('notes')

        if not all([title, user, duration is not None, bpm, notes]):
            print("Missing data in the request")
            return jsonify({"error": "Missing or invalid data"}), 400

        conn = sqlite3.connect("recordings.db")
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO recordings (title, user, duration, BPM, recordedNotes)
            VALUES (?, ?, ?, ?, ?)
        ''', (title, user, duration, bpm, json.dumps(notes)))
        conn.commit()
        conn.close()

        return jsonify({"message": "Recording saved!"})
    
    except Exception as e:
        print("Error in /saveRecording:", e)
        return jsonify({"error": "Server error"}), 500


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