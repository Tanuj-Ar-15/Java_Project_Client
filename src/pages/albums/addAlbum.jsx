import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
// material-ui
import Button from '@mui/material/Button';
// third party

import { Container } from '@mui/system';
import { TextField } from '@mui/material';
import { fetchPostData, fetchPostWithAuth } from 'client/client';

// ============================|| JWT - LOGIN ||============================ //

export default function Addalbum() {
  let initialState = {
    name: '',
    description: ''
  };
  let naigate = useNavigate();
  const isLogin = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      naigate('/login');
    }
  };

  useEffect(() => {
    isLogin();
  }, []);
  let [inpData, setInpdata] = useState(initialState);
  let [errors, setErrors] = useState({ name: '', description: '' });
  let [loginError, setLoginError] = useState();

  let handleInputs = (e) => {
    setInpdata((prevdata) => {
      return {
        ...prevdata,
        [e.target.name]: e.target.value
      };
    });
  };
  const handleSubmit = async () => {
    setErrors({ email: '', password: '' });
    if (!inpData.name.trim()) {
      setErrors((prevError) => {
        return {
          ...prevError,
          name: 'PLease Enter Name of the Album !'
        };
      });
      return;
    }
    if (!inpData.description.trim()) {
      setErrors((prevError) => {
        return {
          ...prevError,
          description: 'PLease Enter Description !'
        };
      });
      return;
    }

    const loginUri = '/album/add';

    try {
      const addAlbum = await fetchPostWithAuth(loginUri, inpData);
      setLoginError(true);
      naigate('/add-album');
      setInpdata(initialState);
    } catch (error) {
      console.log('error in login - ' + error);
      setLoginError(false);
    }
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Name"
          value={inpData.name}
          onChange={handleInputs}
          name="name"
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Description"
          value={inpData.description}
          onChange={handleInputs}
          name="description"
          error={!!errors.description}
          helperText={errors.description}
          multiline
          rows={4}
        />

        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
          Add Album
        </Button>

        {loginError && <p style={{ color: 'green' }}>Album Created Successfully..!</p>}
      </Container>
    </>
  );
}

Addalbum.propTypes = { isDemo: PropTypes.bool };
