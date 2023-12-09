export interface Ticket {

	id: string,
	status: string,
	timestamp: Date,
	message_url: string,
	content: string,
	author_name: string,
}

export interface TicketDTO extends Omit<Ticket, 'timestamp'> {
	timestamp: string;
	}