import { Ticket, TicketDTO } from "../types/types";

export default class StartupMapper {
    public static map(ticket: TicketDTO): Ticket {
        return {
            ...ticket,
           timestamp: new Date(ticket.timestamp)
           
        };
    }
}