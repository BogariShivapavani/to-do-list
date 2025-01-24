from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

todos = []  # In-memory list to store todos

@app.route('/todos', methods=['GET'])
def get_todos():
    return jsonify(todos)

@app.route('/todos', methods=['POST'])
def add_todo():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({'error': 'Text is required'}), 400
    new_todo = {'id': len(todos) + 1, 'text': data['text'], 'completed': False}
    todos.append(new_todo)
    return jsonify(new_todo), 201

@app.route('/todos/<int:id>', methods=['PUT'])
def toggle_todo(id):
    todo = next((t for t in todos if t['id'] == id), None)
    if todo:
        todo['completed'] = not todo['completed']
        return jsonify(todo)
    return jsonify({'error': 'Todo not found'}), 404

@app.route('/todos/<int:id>', methods=['DELETE'])
def delete_todo(id):
    global todos
    todos = [t for t in todos if t['id'] != id]
    return '', 204

if __name__ == '__main__':
    app.run(debug=True, port=5000)
