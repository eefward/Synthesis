from flask import Flask, redirect, render_template, request, jsonify, session

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/test.html")
def test():
    return render_template("test.html")

if __name__ == "__main__":
    app.run(debug=True)