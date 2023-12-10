import axios from 'axios';
import ticketMapper from '../types/ticketMapper';
import { Ticket, TicketDTO } from "../types/ticket"

export class TicketHttpService {
    

    public static async getTickets(): Promise<Ticket[]> {

       const response = await axios.get<TicketDTO[]>("http://localhost:5001/tickets");
       return response.data.map(ticket => ticketMapper.map(ticket));
    }

    public static async getOpenTickets(): Promise<Ticket[]> {

        const response = await axios.get<TicketDTO[]>("http://localhost:5001/opentickets");
        return response.data.map(ticket => ticketMapper.map(ticket));
    }

    public static async getClosedTickets(): Promise<Ticket[]> {

        const response = await axios.get<TicketDTO[]>("http://localhost:5001/closedtickets");
        return response.data.map(ticket => ticketMapper.map(ticket));
    }

    public static async updateTicket(ticketId: string, newTicketStatus: string, ticketWindow: string): Promise<Ticket[]> {

        const response = await axios.put<TicketDTO[]>(`http://localhost:5001/ticket/${ticketId}`, {
            status: newTicketStatus,
            ticket_window: ticketWindow
        });

        return response.data.map(ticket => ticketMapper.map(ticket));
    }
    

}