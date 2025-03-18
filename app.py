from flask import Flask, redirect, render_template, request, jsonify, session
from flask_cors import CORS 

app = Flask(__name__, template_folder='templates', static_folder='static')
CORS(app) 

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/test.html")
def test():
    return render_template("test.html")

recordings = []

@app.route('/save_recording', methods=['POST'])
def save_recording():
    data = request.json
    recordings.append(data['recordedNotes'])  
    print("received:", data['recordedNotes'])  
    return jsonify({"message": "Recording saved successfully!"})

if __name__ == "__main__":
    app.run(debug=True)