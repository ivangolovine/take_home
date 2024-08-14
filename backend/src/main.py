import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.DEBUG)

directory = '/tempDatabase'
file_path = os.path.join(directory, 'templates.json')

@app.route('/api/submit', methods=['POST'])
def submit():
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "No Data"}), 400
    
    id = data.get('id')
    title = data.get('title')
    textBox = data.get('textBox')

    data_to_save = {
        "id": id,
        "title": title,
        "textBox": textBox 
    }

    if not os.path.exists(directory):
        os.makedirs(directory)


    try:
        if os.path.exists(file_path):
            with open(file_path, 'r') as json_file:
                try:
                    templates = json.load(json_file)
                except json.JSONDecodeError:
                    templates = []
                    app.logger.warning("File corrupted")
        else:
            templates = []
        
        templates.append(data_to_save)

        with open(file_path, 'w') as json_file:
            json.dump(templates, json_file, indent=4)

    except Exception as e:
        app.logger.error(f"An error occurred: {e}")

    return jsonify(data_to_save), 201

@app.route('/api/templates', methods=['GET'])
def fetchTemplate():    
    if not os.path.exists(file_path):
        return jsonify([]), 200

    try:
        with open(file_path, 'r') as json_file:
            try:
                templates = json.load(json_file)
            except json.JSONDecodeError:
                templates = []

    except Exception as e:
        return jsonify({"error": "Error fetching templates"}), 500

    return jsonify(templates), 200
    
@app.route('/api/templates/<int:id>', methods=['DELETE'])
def delete_template(id):
    if not os.path.exists(file_path):
        return jsonify({"error": "File not found"}), 404

    try:
        with open(file_path, 'r') as json_file:
            templates = json.load(json_file)
    except json.JSONDecodeError:
        return jsonify({"error": "Corrupted File"}), 500

    template_exists = any(template['id'] == id for template in templates)
    if not template_exists:
        return jsonify({"error": "Template not found"}), 404

    templates = [template for template in templates if template['id'] != id]

    try:
        with open(file_path, 'w') as json_file:
            json.dump(templates, json_file, indent=4)
    except Exception as e:
        return jsonify({"error": f"Failed to save file: {str(e)}"}), 500

    return jsonify({"message": "Template deleted"}), 200

@app.route('/api/templates/<int:id>', methods=['PUT'])
def update_template(id):  
    if not os.path.exists(file_path):
        return jsonify({"error": "File not found"}), 404

    try:
        with open(file_path, 'r') as json_file:
            try:
                templates = json.load(json_file)
            except json.JSONDecodeError:
                return jsonify({"error": "Corrupted File"}), 500

    except Exception as e:
        return jsonify({"error": f"File Reading Failed: {str(e)}"}), 500

    template_index = next((index for (index, arr) in enumerate(templates) if arr["id"] == id), None)

    if template_index is None:
        return jsonify({"error": "Missing Template"}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({"error": "No Data"}), 400
    
    title = data.get('title')
    textBox = data.get('textBox')
    
    templates[template_index]['title'] = title
    templates[template_index]['textBox'] = textBox

    try:
        with open(file_path, 'w') as json_file:
            json.dump(templates, json_file, indent=4)
    except Exception as e:
        return jsonify({"error": f"Failed to save file: {str(e)}"}), 500

    return jsonify(templates[template_index]), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)