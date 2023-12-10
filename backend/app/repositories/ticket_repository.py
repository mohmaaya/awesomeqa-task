import json
from typing import Optional


class TicketRepository:
    def __init__(self, filepath: str):
        with open(filepath) as json_file:
            self.data = json.load(json_file)

    # Since we have not used any relational DB to use joins, I used the simple list comprehension to match the ticket and the message based on msg id to return to the frontend
    def get_tickets(self, limit: Optional[int] = None) -> list[dict]:
        return  [
    {
        "id": ticket["id"],
        "status": ticket["status"],
        "timestamp": ticket["timestamp"],
        "message_url": message["msg_url"],
        "content": message["content"],
        "author_name": message["author"]["name"]
    }
    for ticket in self.data["tickets"]
    for message in self.data["messages"]
    if ticket["msg_id"] == message["id"]
    ]

    #Method to obtain the open tickets. I used the logic of sending the types of tickets from the BE itself and not filter in the FE since if there are thousands of tickets then it could slow down the FE and with the use of DB, such operation is cheap in the BE.
    def get_open_tickets(self, limit: Optional[int] = None) -> list[dict]:
        return  [
    {
        "id": ticket["id"],
        "status": ticket["status"],
        "timestamp": ticket["timestamp"],
        "message_url": message["msg_url"],
        "content": message["content"],
        "author_name": message["author"]["name"]
    }
    for ticket in self.data["tickets"]
    for message in self.data["messages"]
    if ticket["msg_id"] == message["id"] and ticket["status"] == "open"
    ]
    
    def get_closed_tickets(self, limit: Optional[int] = None) -> list[dict]:
        return  [
    {
        "id": ticket["id"],
        "status": ticket["status"],
        "timestamp": ticket["timestamp"],
        "message_url": message["msg_url"],
        "content": message["content"],
        "author_name": message["author"]["name"]
    }
    for ticket in self.data["tickets"]
    for message in self.data["messages"]
    if ticket["msg_id"] == message["id"] and ticket["status"] == "closed"
    ]

    #Method to update the status of the ticket
    def update_ticket_status(self, id:str, status:str) -> bool:
         for ticket in self.data["tickets"]:
            if ticket["id"] == id:  
                ticket["status"] = status
                return True
         return False 