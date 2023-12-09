import { ticket, ticketDTO } from "../types/types";

export default class StartupMapper {
    public static map(ticket: ticketDTO): ticket {
        return {
            ...ticket,
           timestamp: new Date(ticket.timestamp)
           
        };
    }
}