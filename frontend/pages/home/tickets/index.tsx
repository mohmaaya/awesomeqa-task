import * as React from "react";
import { NextPage } from "next";
import { useState, useEffect, Fragment } from "react";
import { TicketHttpService } from "../../HTTPTickets/tickets.service";
import { Ticket } from "../../types/ticket";
import Pagination from '@mui/material/Pagination';
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import FilterAndSortComponent from "../FilterAndSortComponent";
import Button from '@mui/material/Button';

const Tickets: NextPage = () => {

    const [tickets, setTickets] = useState <Ticket[]>([]); //State which stores all the tickets based on the ticket window.
    const [page, setPage] = useState<number>(1); //State for storing the current page number. It is used for calculating the next and previous page offsets
    const pageCount = 20; //Tickets to be shown at max per page
    const [currPageTickets, setCurrPageTickets] = useState<Ticket[]>([]); //State which stores the tickets of the current page, Updates with every change of page.
    const [ticketWindow, setCurrentTicketWindow] = useState<string>("All"); //State to store the current Filter(All tickets, Open tickets or Closed tickets)

    useEffect(() => { //Upon refreshing the application, the useEffect hook initiates the 'all tickets'

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

    //Function which handles the tickets update when the page changes.
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => { 
        setPage(value);
        setCurrPageTickets(() => {
            return tickets.slice((value * pageCount) - pageCount, (value * pageCount)) //Logic I wrote to calculate the indexes of tickets for each of the pages
        });
    };

    //Function which updates the tickets state whenever the filter is applied.
    const handleTicketsFilter = (tickets: Ticket[], ticketWindow: string) => {
     
        setTickets(tickets);
        setCurrPageTickets(tickets.slice(0, pageCount));
        setCurrentTicketWindow(ticketWindow);
    }

    //Function to update the tickets order when the sort is enabled.
    const handleTicketsSort = (tickets: Ticket[]) => {
       
        setTickets(tickets);
        setCurrPageTickets(tickets.slice(0, pageCount))

    }

    //Function to open the discord channel for the ticket.
    const handleDiscordButtonClick = (message_url: string) => {
        window.open(message_url, '_blank');

    }

    //Function which updates the status of the ticket. It could be opened and also closed.
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

           
            <FilterAndSortComponent  //Filter and Sort Component
                onFilter={handleTicketsFilter}
                onSort={handleTicketsSort}
                tickets={tickets} />

            <Pagination //Pagination Component
                count={Math.ceil(tickets.length / pageCount)}
                page={page}
                onChange={handlePageChange}
                sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
            />

            {currPageTickets.map(ticket => (

                //Card for each of the tickets and the important informatin regarding the ticket.
                <Card key={ticket.id}
                    sx={{ maxWidth: 'xl', marginBottom: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CardActionArea>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography gutterBottom variant="h6">
                               Ticket Status: {ticket.status}
                            </Typography>

                            <Typography variant="body1" sx={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px'
                            }}>
                               Ticket TimeStamp: {ticket.timestamp.toLocaleString('en-US')};
                               
                            </Typography>

                            <Typography variant="body1" sx={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px'
                            }}>
                                Message Author: {ticket.author_name}
  
                            </Typography>

                            <Typography variant="body1" sx={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px'
                            }}>
                                Message Content: {ticket.content}

                            </Typography>
                            <Typography variant="body1" sx={{
                                display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px'
                            }}>
                                
                                <Button variant="contained" //Button to open discord channel
                                    onClick={() => handleDiscordButtonClick(ticket.message_url)}
                                    sx={{ backgroundColor: '#ffffff', color: 'black'  }} >
                                    Open Message in Discord
                                </Button>

                              
                                <Button variant="contained"   //Button to update the status of the ticket
                                    onClick={() => handleUpdateTicketStatus(ticket.id, ticket.status)}
                                    sx={{ backgroundColor: '#ffffff', color: 'black' }}>
                                    {ticket.status === 'open' ? 'Close Ticket' : 'Open Ticket'}
                                </Button>

                            </Typography>

                        </CardContent>
                    </CardActionArea>
                </Card>

            ))}

        <Pagination
            count={Math.ceil(tickets.length / pageCount)} //To calculate the total pages required for pagination for the total tickets
            page={page}
            onChange={handlePageChange}
            sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
        />
        </div>
    </Fragment>
};

export default Tickets;
