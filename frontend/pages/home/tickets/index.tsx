import * as React from "react";
import { NextPage } from "next";
import { useState, useEffect, Fragment } from "react";
import { TicketHttpService } from "../../HTTPTickets/tickets.service";
import { Ticket } from "../../types/types";
import Pagination from '@mui/material/Pagination';
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import FilterAndSortComponent from "../FilterAndSortComponent";
import Button from '@mui/material/Button';

const Tickets: NextPage = () => {

    const [tickets, setTickets] = useState <Ticket[]>([]);
    const [page, setPage] = useState<number>(1);
    const pageCount = 20;
    const [currPageTickets, setCurrPageTickets] = useState<Ticket[]>([]);
    const [ticketWindow, setCurrentTicketWindow] = useState<string>("All");

    useEffect(() => {

        (async () => {

            try {

                const allTickets = await TicketHttpService.getTickets();

                setTickets(allTickets);
                setCurrPageTickets(allTickets.slice(0, pageCount));
            } catch (error) {
                console.error("Could not fetch tickets", error);
            }
            
        })();
    }, []);


    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        setCurrPageTickets(() => {
            return tickets.slice((value * pageCount) - pageCount, (value * pageCount))
        });
    };

    const handleTicketsFilter = (tickets: Ticket[], ticketWindow: string) => {
     
        setTickets(tickets);
        setCurrPageTickets(tickets.slice(0, pageCount));
        setCurrentTicketWindow(ticketWindow);
    }

    const handleTicketsSort = (tickets: Ticket[]) => {
       
        setTickets(tickets);
        setCurrPageTickets(tickets.slice(0, pageCount))

    }

    const handleDiscordButtonClick = (message_url: string) => {
        window.open(message_url, '_blank');

    }

    const handleUpdateTicketStatus = (ticketId: string, ticketStatus: string) => {

        const newTicketStatus = ticketStatus === 'open' ? 'closed' : 'open';

            (async () => {

                try {

                    const updatedTicketsAndFetched = await TicketHttpService.updateTicket(ticketId, newTicketStatus, ticketWindow);

                    setTickets(() => updatedTicketsAndFetched);
                    setCurrPageTickets(() => {
                        return updatedTicketsAndFetched.slice((page * pageCount) - pageCount, (page * pageCount))
                    });
                } catch (error) {
                    console.error("Could not fetch tickets", error);
                }

            })();
        
       

    }

   
    return <Fragment>
        <div style={{ marginTop: '2rem' }}>

            <FilterAndSortComponent onFilter={handleTicketsFilter} onSort={ handleTicketsSort} tickets={tickets} />

            <Pagination
                count={Math.ceil(tickets.length / pageCount)}
                page={page}
                onChange={handlePageChange}
                sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
            />

            {currPageTickets.map(ticket => (

                <Card key={ticket.id} sx={{ maxWidth: 'xl', marginBottom: 2 }}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h6">
                               Ticket Status: {ticket.status}
                            </Typography>

                            <Typography fontSize="3" component="div" color="text.secondary">
                               Ticket TimeStamp: {ticket.timestamp.toLocaleString('en-US')};
                               
                            </Typography>

                            <Typography variant="body1">
                                Message Author: {ticket.author_name}
                                <br/>
                                Message Content: {ticket.content}
                            </Typography>

                            <Typography variant="body1">
                                <Button variant="contained" onClick={() => handleDiscordButtonClick(ticket.message_url)}>Open Message in Discord</Button>
                                <br />
                                <br />
                                <Button variant="contained"
                                    onClick={() => handleUpdateTicketStatus(ticket.id, ticket.status)}>
                                    {ticket.status === 'open' ? 'Close Ticket' : 'Open Ticket'}
                                </Button>

                            </Typography>

                        </CardContent>
                    </CardActionArea>
                </Card>

            ))}

        <Pagination
            count={Math.ceil(tickets.length / pageCount)}
            page={page}
            onChange={handlePageChange}
            sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
        />
        </div>
    </Fragment>
};

export default Tickets;
