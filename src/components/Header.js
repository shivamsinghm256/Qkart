import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  if(hasHiddenAuthButtons)
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        
        <Stack spacing={2} direction="row">
          <Link to="/">
            <Button
              className="explore-button"
              startIcon={<ArrowBackIcon />}
              variant="text"
              >
              Back to explore
            </Button>
          </Link>
        </Stack>
      </Box>
    );
  else
  return (
    <Box className="header">
      <Box className="header-title">
          <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      
      <Stack spacing={2} direction="row" alignItems="center">
      {
      localStorage.getItem('username')?
        <>
        <Avatar src = "avatar.png" alt={localStorage.getItem('username')}/>
          <p className = "username-text">{localStorage.getItem('username')}</p>
          <Link to="/register">
            <Button onClick={()=>{
              localStorage.clear();
              window.location.reload()
            }}>
              LOGOUT
            </Button>
          </Link>
        </> :
          <> 
            <Link to="/login">
              <Button>Login</Button> 
            </Link>
            <Link to="/register">
              <Button
              >Register</Button>
            </Link>
          </>
        }
      </Stack>
    </Box>
  );
};

export default Header;
