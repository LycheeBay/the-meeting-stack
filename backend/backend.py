from flask import Flask, jsonify, request, abort
from flask_cors import CORS
import meeting

app = Flask(__name__)
CORS(app)
meeting_list = meeting.Meetings()

# define a sample endpoint
@app.route('/hello', methods=['GET'])
def hello():
    return jsonify({'message': 'Hello, World!'})

# add a meeting, accepting two parameters
@app.route('/new_meeting', methods=['POST'])
def new_meeting():
    if not request.json or not 'name' in request.json or not 'attendees' in request.json:
        abort(400)
    if 'id' in request.json:
        if meeting_list.check_id_in_use(request.json['id']):
            return jsonify({'message': 'ID already in use!'})
        new_meeting = meeting.Meeting(request.json['name'], request.json['attendees'], request.json['id'])
    else:
        meeting_id = meeting_list.get_new_id()
        new_meeting = meeting.Meeting(request.json['name'], request.json['attendees'], meeting_id)
    meeting_list.add_meeting(new_meeting)
    return jsonify({'message': 'Meeting added!', 'meeting_id': new_meeting.id})

# add an attendee to a meeting
@app.route('/join_meeting', methods=['POST'])
def add_attendee():
    if not request.json or not 'meeting_id' in request.json or not 'name' in request.json:
        abort(400)
    if meeting_list.join_meeting(request.json['meeting_id'], request.json['name']):
        return jsonify({'message': 'Attendee added!'})
    else:
        return jsonify({'message': 'Attendee not added!'})
    
# add an attendee to a meeting's stack
@app.route('/add_to_stack', methods=['POST'])
def add_to_stack():
    if not request.json or not 'meeting_id' in request.json or not 'name' in request.json:
        abort(400)
    for meeting in meeting_list.meetings:
        if meeting.id == request.json['meeting_id']:
            if meeting.add_to_stack(request.json['name']):
                return jsonify({'message': 'Attendee added to stack!'})
            else:
                return jsonify({'message': 'Attendee not added to stack!'})
    return jsonify({'message': 'Meeting not found!'})

# remove an attendee from a meeting's stack
@app.route('/remove_from_stack', methods=['POST'])
def remove_from_stack():
    if not request.json or not 'meeting_id' in request.json or not 'name' in request.json:
        abort(400)
    for meeting in meeting_list.meetings:
        if meeting.id == request.json['meeting_id']:
            if meeting.remove_from_stack(request.json['name']):
                return jsonify({'message': 'Attendee removed from stack!'})
            else:
                return jsonify({'message': 'Attendee not removed from stack!'})
    return jsonify({'message': 'Meeting not found!'})

# add an attendee to a meeting's direct response
@app.route('/add_to_direct_response', methods=['POST'])
def add_to_direct_response():
    if not request.json or not 'meeting_id' in request.json or not 'name' in request.json:
        abort(400)
    for meeting in meeting_list.meetings:
        if meeting.id == request.json['meeting_id']:
            if meeting.add_to_direct_response(request.json['name']):
                return jsonify({'message': 'Attendee added to direct response!'})
            else:
                return jsonify({'message': 'Attendee not added to direct response!'})
    return jsonify({'message': 'Meeting not found!'})

# remove an attendee from a meeting's direct response
@app.route('/remove_from_direct_response', methods=['POST'])
def remove_from_direct_response():
    if not request.json or not 'meeting_id' in request.json or not 'name' in request.json:
        abort(400)
    for meeting in meeting_list.meetings:
        if meeting.id == request.json['meeting_id']:
            if meeting.remove_from_direct_response(request.json['name']):
                return jsonify({'message': 'Attendee removed from direct response!'})
            else:
                return jsonify({'message': 'Attendee not removed from direct response!'})
    return jsonify({'message': 'Meeting not found!'})

# get a meeting's stack
@app.route('/get_stack', methods=['POST'])
def get_stack():
    if not request.json or not 'meeting_id' in request.json:
        abort(400)
    for meeting in meeting_list.meetings:
        if meeting.id == request.json['meeting_id']:
            return jsonify({'stack': meeting.stack})
    return jsonify({'message': 'Meeting not found!'})

# get a meeting's direct response
@app.route('/get_direct_response', methods=['POST'])
def get_direct_response():
    if not request.json or not 'meeting_id' in request.json:
        abort(400)
    for meeting in meeting_list.meetings:
        if meeting.id == request.json['meeting_id']:
            return jsonify({'direct_response': meeting.direct_response})
    return jsonify({'message': 'Meeting not found!'})

# get a meeting's attendees
@app.route('/get_attendees', methods=['POST'])
def get_attendees():
    if not request.json or not 'meeting_id' in request.json:
        abort(400)
    for meeting in meeting_list.meetings:
        if meeting.id == request.json['meeting_id']:
            return jsonify({'attendees': meeting.attendees})
    return jsonify({'message': 'Meeting not found!'})

# get a meeting's name
@app.route('/get_name', methods=['POST'])
def get_name():
    if not request.json or not 'meeting_id' in request.json:
        abort(400)
    for meeting in meeting_list.meetings:
        if meeting.id == request.json['meeting_id']:
            return jsonify({'name': meeting.name})
    return jsonify({'message': 'Meeting not found!'})

# get the number of meetings in progress
@app.route('/get_meeting_count', methods=['GET'])
def get_meeting_count():
    return jsonify({'meeting_count': len(meeting_list.meetings)})

# get timeout timestamp for a meeting
@app.route('/get_timeout', methods=['POST'])
def get_timeout():
    if not request.json or not 'meeting_id' in request.json:
        abort(400)
    for meeting in meeting_list.meetings:
        if meeting.id == request.json['meeting_id']:
            return jsonify({'timeout': meeting.date + meeting_list.timeout_interval})
    return jsonify({'message': 'Meeting not found!'})

# run the app
if __name__ == '__main__':
    app.run(debug=True)
