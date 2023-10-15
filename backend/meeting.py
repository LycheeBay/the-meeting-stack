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
        self.reset_direct_response()

    def add_attendee(self, attendee):
        self.date = int(time())
        if attendee not in self.attendees:
            self.attendees.append(attendee)
            self.reset_direct_response()
            return True
        return False

    def remove_attendee(self, attendee):
        self.date = int(time())
        self.attendees.remove(attendee)
        self.reset_direct_response()

    def add_to_stack(self, attendee):
        self.date = int(time())
        if attendee in self.attendees and attendee not in self.stack:
            if len(self.stack) > 0:
                if self.stack[-1] == attendee:
                    return False
            self.stack.append(attendee)
            return True
        return False
    
    def remove_from_stack(self, attendee):
        self.date = int(time())
        if attendee in self.stack:
            # having concluded the most current discussion, reset direct response
            if attendee == self.stack[0]:
                self.reset_direct_response()
            self.stack.remove(attendee)
            return True
        
        return False
    
    def reset_direct_response(self):
        self.date = int(time())
        self.direct_response_made = {}
        for attendee in self.attendees:
            self.direct_response_made[attendee] = False

    def add_to_direct_response(self, attendee):
        self.date = int(time())
        if attendee in self.attendees and attendee not in self.direct_response and self.direct_response_made[attendee] == False:
            if len(self.stack) > 0:
                if self.stack[0] == attendee:
                    return False
            self.direct_response.append(attendee)
            self.direct_response_made[attendee] = True
            return True
        return False
    
    def remove_from_direct_response(self, attendee):
        self.date = int(time())
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