import * as React from "react";
import { NextPage } from "next";
import { useState, useEffect, Fragment } from "react";
import { TicketHttpService } from "../../HTTPTickets/tickets.service";
import { Ticket } from "../../types/types";
import Pagination from '@mui/material/Pagination';
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

const Tickets: NextPage = () => {

    const [tickets, setTickets] = useState <Ticket[]>([]);
    const [page, setPage] = useState<number>(1);
    const pageCount = 20;
    const [currPageTickets, setCurrPageTickets] = useState<Ticket[]>([]);

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

    //console.log("All tickets", tickets);
    //console.log("Current Page Tickets", currPageTickets);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        setCurrPageTickets(() => {
            return tickets.slice((value * pageCount) - pageCount, (value * pageCount))
        });
    };
   
    return <Fragment>
        <div style={{ marginTop: '2rem' }}>
            {currPageTickets.map(ticket => (

                <Card key={ticket.id} sx={{ maxWidth: 'xl', marginBottom: 2 }}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h6">
                               Ticket Status: {ticket.status}
                            </Typography>

                            <Typography fontSize="3" component="div" color="text.secondary">
                                TimeStamp: {ticket.timestamp.toLocaleString('en-US')};
                                <br/>
                                URL: {ticket.message_url}
                            </Typography>

                            <Typography variant="body1">
                                Author: {ticket.author_name}
                                <br/>
                               Content: {ticket.content}
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
