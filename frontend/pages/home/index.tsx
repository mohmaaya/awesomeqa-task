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
                 sx={{ 
                  margin: '0 4px',
                  background: '#1c1c1f',
                  color:'white',
                  flexDirection: 'column', 
                  alignItems: 'flex-start',    
                  textAlign: 'center',  
                  width: '200px',
                  padding: '8px',
                  textTransform: 'none'
                }}
              >
                <CollectionsBookmarkTwoToneIcon />
                Knowledge Base
              </Button>

             <Button
                variant="contained"
                color="primary"
                href= "home/tickets"
                sx={{ 
                  margin: '0 4px',
                  background: '#1c1c1f',
                  color:'white',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  textAlign: 'center',
                  width: '200px',
                  padding: '8px',
                  textTransform: 'none'
                }}
             >
                <SupportAgentTwoToneIcon />
                Tickets
             </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                sx={{ 
                  margin: '0 4px',
                  background: '#1c1c1f',
                  color:'white',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  textAlign: 'center',
                  width: '200px',
                  padding: '8px',
                  textTransform: 'none'
                }}
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
