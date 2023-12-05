import json
from typing import Optional


class TicketRepository:
    def __init__(self, filepath: str):
        with open(filepath) as json_file:
            self.data = json.load(json_file)

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

    def update_ticket_status(self, id: str, status:str) -> bool:
         for ticket in self.data["tickets"]:
            if ticket["id"] == id:  
                ticket["status"] = status
                return True
         return False 