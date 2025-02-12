import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
// material-ui
import Button from '@mui/material/Button';
// third party

import { Container } from '@mui/system';
import { TextField } from '@mui/material';
import { fetchPostData } from 'client/client';

// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin() {
  let initialState = {
    email: '',
    password: ''
  };
  let naigate = useNavigate();
  const isLogin =()=> {
    const token = localStorage.getItem("token")
    if(token){
      naigate("/")
      window.location.reload()
    }
  }

  useEffect(()=> {

isLogin()
  } , [])
  let [inpData, setInpdata] = useState(initialState);
  let [errors, setErrors] = useState({ email: '', password: '' });
  let [loginError , setLoginError] = useState("");

  let handleInputs = (e) => {
    setInpdata((prevdata) => {
      return {
        ...prevdata,
        [e.target.name]: e.target.value
      };
    });
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inpData.email);
  };

  const validatePassword =   () => {
    return inpData.password.length >= 6 && inpData.password.length <= 16;
  };

  const handleLogin =  async () => {

setErrors({email: "" , password: ""})

    if (!validateEmail()) {
      setErrors((prevError) => {
        return {
          ...prevError,
          email: 'Invalid Email Format..!'
        };
      });
      return
    }
    if (!validatePassword()) {   
      setErrors((prevError) => {
        return {
          ...prevError,
          password: 'Invalid Password Format..!'
        };
      });
      return
    }

const loginUri = "/auth/add/account";

try {
const loginData = await  fetchPostData(loginUri , {username: inpData.email , password: inpData.password})
setLoginError("");
naigate("/login")
console.log(loginData);

} catch (error) {
  console.log("error in login - " + error);
  setLoginError("Error in Login in .. Please Check Credentials")
}





  };

  



  return (
    <>
      <Container component="main" maxWidth="xs">
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Email"
          value={inpData.email}
          onChange={handleInputs}
          name="email"
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Password"
          value={inpData.password}
          onChange={handleInputs}
          name="password"
          error={!!errors.password}
          helperText={errors.password}
        />

        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Add Account
        </Button>

        {loginError.length > 0 && <p style={{color: "red"}} >{loginError}</p>}
      </Container>
    </>
  );
}

AuthLogin.propTypes = { isDemo: PropTypes.bool };
