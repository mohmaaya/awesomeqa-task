from app.repositories.ticket_repository import TicketRepository
import uvicorn
from fastapi import Depends, FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TICKET_FILEPATH = "../data/awesome_tickets.json"
ticket_repository = TicketRepository(filepath=TICKET_FILEPATH)


@app.get("/healthz")
async def root():
    return "OK"

@app.get("/tickets")
async def get_tickets(
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    tickets = ticket_repository.get_tickets()
    return JSONResponse(tickets, status_code=200)

@app.get("/opentickets")
async def get_open_tickets(
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    open_tickets = ticket_repository.get_open_tickets()
    return JSONResponse(open_tickets, status_code=200)

@app.get("/closedtickets")
async def get_closed_tickets(
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    closed_tickets = ticket_repository.get_closed_tickets()
    return JSONResponse(closed_tickets, status_code=200)

@app.put("/ticket/{id}")
async def update_ticket_status(
    id: str,
    request: Request,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):

    request_body = await request.json()
    status = request_body.get("status")
    ticket_window = request_body.get("ticket_window")

    print(status)
    print(ticket_window)
    print(id)

    if status is None:
        raise HTTPException(status_code=400, error="Status is not provided")

    if ticket_window is None:
        raise HTTPException(status_code=400, error="Ticket window is not provided")

    updated_ticket_status = ticket_repository.update_ticket_status(id, status)

    tickets = []
    if updated_ticket_status:
        if ticket_window == 'All':
            tickets = ticket_repository.get_tickets()
        elif ticket_window == 'Open':
            tickets = ticket_repository.get_open_tickets()
        elif ticket_window == 'Closed':
            tickets = ticket_repository.get_closed_tickets()

    return JSONResponse(tickets, status_code=200)

        
   
    raise HTTPException(status_code=400, error="Update failed. Ticket not found")


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=5001, reload=True)
