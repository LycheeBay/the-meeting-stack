# BEGIN: 8f5d6hj3k7e9
from threading import Thread
from time import time
import random

class Meeting:
    def __init__(self, name, attendees, id):
        self.name = name
        self.id = id
        # assign date to be UNIX timestamp
        self.date = int(time())
        self.attendees = [attendees]
        self.stack = []
        self.direct_response = []

    def add_attendee(self, attendee):
        if attendee not in self.attendees:
            self.attendees.append(attendee)
            return True
        return False

    def remove_attendee(self, attendee):
        self.attendees.remove(attendee)

    def add_to_stack(self, attendee):
        if attendee in self.attendees and attendee not in self.stack:
            self.stack.append(attendee)
            return True
        return False
    
    def remove_from_stack(self, attendee):
        if attendee in self.stack:
            self.stack.remove(attendee)
            return True
        return False
    
    def add_to_direct_response(self, attendee):
        if attendee in self.attendees and attendee not in self.direct_response:
            self.direct_response.append(attendee)
            return True
        return False
    
    def remove_from_direct_response(self, attendee):
        if attendee in self.direct_response:
            self.direct_response.remove(attendee)
            return True
        return False

class Meetings:
    def __init__(self):
        self.meetings = []
        self.timeout_interval = 3600

    def add_meeting(self, meeting: Meeting):
        self.meetings.append(meeting)

    def check_id_in_use(self, id):
        for meeting in self.meetings:
            if meeting.id == id:
                return True
        return False
    
    def make_id(self):
        id = random.randint(100000, 999999)
        while self.check_id_in_use(id):
            id = random.randint(100000, 999999)
        return id

    def join_meeting(self, meeting_id, attendee):
        for meeting in self.meetings:
            if meeting.id == meeting_id:
                return meeting.add_attendee(attendee)
        return False

    def check_timed_out_meetings(self):
        def remove_timed_out_meetings():
            current_time = int(time())
            for meeting in self.meetings:
                if current_time - meeting.date > self.timeout_interval:
                    self.meetings.remove(meeting)
        t = Thread(target=remove_timed_out_meetings)
        t.start()