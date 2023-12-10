import * as React from "react";
import { NextPage } from "next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import CollectionsBookmarkTwoToneIcon from '@mui/icons-material/CollectionsBookmarkTwoTone';
import SupportAgentTwoToneIcon from '@mui/icons-material/SupportAgentTwoTone';
import LightbulbTwoToneIcon from '@mui/icons-material/LightbulbTwoTone';

const Home: NextPage = () => {

  const handleClick = async () => {
    console.log("clicked");
    };

    const buttonStyles = {
        margin: '0 4px',
        background: '#1c1c1f',
        color: 'white',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'center',
        width: '200px',
        padding: '8px',
        textTransform: 'none',
    };

  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 15, mb: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                sx={buttonStyles}
              >
                <CollectionsBookmarkTwoToneIcon />
                Knowledge Base
              </Button>

             <Button
                variant="contained"
                color="primary"
                href= "home/tickets"
                sx={buttonStyles}
             >
                <SupportAgentTwoToneIcon /> 
                Tickets
             </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                sx={buttonStyles}
              >
                <LightbulbTwoToneIcon />
                FAQ
              </Button>



            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
