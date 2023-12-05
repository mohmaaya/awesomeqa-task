from app.repositories.ticket_repository import TicketRepository
import uvicorn
from fastapi import Depends, FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse


app = FastAPI()

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

@app.put("/ticket/{id}")
async def update_ticket_status(
    id: str,
    request: Request,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):

    request_body = await request.json()
    status = request_body.get("status")

    if status is None:
        raise HTTPException(status_code=400, error="Status is not provided")

    updated_ticket_status = ticket_repository.update_ticket_status(id, status)

    if updated_ticket_status:
        tickets = ticket_repository.get_tickets()
        return JSONResponse(tickets, status_code=200)
   
    raise HTTPException(status_code=400, error="Update failed. Ticket not found")


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=5001, reload=True)
