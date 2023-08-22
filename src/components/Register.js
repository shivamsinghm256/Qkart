import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  let [a, b] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  let [loadIcon, getLoadIcon] = useState(false);


  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    getLoadIcon(true);    
    if(validateInput(formData)){
      try {  
          await axios.post(config.endpoint + "/auth/register", {
            username: formData.username,
            password: formData.password
          }).then((resp)=> console.log(resp));  
          enqueueSnackbar('Registered successfully',{ 
            variant: 'success'
          });
        } catch (e) {
          if(e.response===undefined){
            enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.",{ 
              variant: 'error',
              autoHideDuration: 1000 
            });
          }
          else
            enqueueSnackbar("/Username is already taken/i",{ 
              variant: 'error',
              autoHideDuration: 1000 
            });
      }
    }
    getLoadIcon(false);  
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    try{
      if(data.username===""){
        throw "Username is a required field";
      }
      else if(data.username.length<6){
        throw "Username must be at least 6 characters";
      }

      if(data.password===""){
        throw "Password is a required field";
      }
      else if(data.password.length<6){
        throw "Password must be at least 6 characters";
      }
      if(data.password!==data.confirmPassword){
        throw "Passwords do not match";
      }
      return true;
    }
    catch(e){
      enqueueSnackbar(e,{ 
        variant: 'error',
        autoHideDuration: 1000
      });
      return false;
    }
   
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            onChange={(e) => b({
              username: e.target.value,
              password: a.password,
              confirmPassword: a.confirmPassword
            })}
            fullWidth
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            onChange={(e) => b({
              username: a.username,
              password: e.target.value,
              confirmPassword: a.confirmPassword
            })}
            placeholder="Enter a password with minimum 6 characters"
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            onChange={(e) => b({
              username: a.username,
              password: a.password,
              confirmPassword: e.target.value
            })}
            fullWidth
          />
            
            {/* <div class="loader"></div> */}
          {loadIcon?<span className="loading"><CircularProgress /></span>:
           <Button className="button" variant="contained"
           onClick={()=>register(a)}
           >Register Now
           </Button>}
          <p className="secondary-action">
            Already have an account?{" "}
             <a className="link" href="#">
              Login here
             </a>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
