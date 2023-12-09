import axios from 'axios';
import ticketMapper from '../types/ticketMapper';
import { Ticket, TicketDTO } from "../types/types"

export class TicketHttpService {

    public static async getTickets(): Promise<Ticket[]> {

       const response = await axios.get<TicketDTO[]>("http://localhost:5001/tickets");
       return response.data.map(ticket => ticketMapper.map(ticket));
    }

}