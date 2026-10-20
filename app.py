from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import database

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/profile', methods=['POST'])
def create_profile():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON payload"}), 400

    database.save_profile(
        data.get('name'),
        data.get('headline'),
        data.get('skills'),
        data.get('bio')
    )
    return jsonify({"message": "Profile saved successfully"}), 201

@app.route('/api/profiles', methods=['GET'])
def list_profiles():
    profiles = database.get_all_profiles()
    return jsonify(profiles), 200

if __name__ == '__main__':
    database.init_db()
    app.run(debug=True)
