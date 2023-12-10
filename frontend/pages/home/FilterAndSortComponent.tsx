import React, { useState } from "react";
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton, MenuButton } from '@mui/base/MenuButton';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Ticket } from "../types/types";
import { TicketHttpService } from "../HTTPTickets/tickets.service";

interface FilterSortComponentProps {
    onFilter: (chosenTickets: Ticket[], chosenTicketsType: string) => void;
    onSort: (tickets: Ticket[]) => void;
    tickets: Ticket[];
}

const FilterAndSortComponent: React.FC<FilterSortComponentProps> = ({

    onFilter,
    onSort,
    tickets
}) => {

    const [sort, setSort] = useState<string>("");
    const [filter, setFilter] = useState<string>("");
    
    const createHandleMenuClick = async (event: SelectChangeEvent) => {

        const chosenTicketsType = event.target.value;
        try {
            let tickets = [];
           
            switch (chosenTicketsType) {
                case 'All':
                    tickets = await TicketHttpService.getTickets();
                    break;
                case 'Open':
                    tickets = await TicketHttpService.getOpenTickets();
                    break;
                case 'Closed':
                    tickets = await TicketHttpService.getClosedTickets();
                    break;
                default:
                    break;
            }

            onFilter(tickets, chosenTicketsType);
            setFilter(chosenTicketsType);
        } catch (error) {
            console.error(`Could not fetch ${chosenTicketsType} tickets`, error);
        }
    };

    

    const handleChange = (event: SelectChangeEvent) => {

        const value = event.target.value;
        if (value == "asc") {
            setSort(value);
            tickets.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        }
        else {
            setSort(value);
            tickets.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        }
       
        onSort(tickets);
    };

    return (
        <>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Filter Tickets</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filter}
                        label="Filter"
                        onChange={createHandleMenuClick}
                    >
                        <MenuItem value={"All"}>All Tickets</MenuItem>
                        <MenuItem value={"Open"}>Open Tickets</MenuItem>
                        <MenuItem value={"Closed"}>Closed Tickets</MenuItem>

                    </Select>
                </FormControl>
            </Box>

            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sort Tickets</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sort}
                        label="Sort"
                        onChange={handleChange}
                    >
                        <MenuItem value={"asc"}>Oldest to Newest </MenuItem>
                        <MenuItem value={"desc"}>Newest to Oldest </MenuItem>
                      
                    </Select>
                </FormControl>
            </Box>
        </>
        );
};


export default FilterAndSortComponent;