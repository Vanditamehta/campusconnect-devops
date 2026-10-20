from flask import Flask, render_template, request, jsonify
import database

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/profile', methods=['POST'])
def create_profile():
    data = request.get_json()
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
