import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
// material-ui
import Button from '@mui/material/Button';
// third party

import { Container } from '@mui/system';
import { TextField } from '@mui/material';
import { fetchPostWithAuth, fetchDataWithAuth } from 'client/client';
import { date } from 'yup';
import Header from './comp/Header';

// ============================|| JWT - LOGIN ||============================ //

export default function EditAlbum() {
  const [getData, setData] = useState({});

  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const id = queryParam.get('id');

  const getAlbum = async () => {
    try {
      const apiUrl = '/album/all/' + id;
      let album = await fetchDataWithAuth(apiUrl);
      setData(album.data[0]);
    } catch (error) {
      console.log(error);
    }
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
    getAlbum();
  }, []);

  let [errors, setErrors] = useState({ name: '', description: '' });
  let [loginError, setLoginError] = useState();

  let handleInputs = (e) => {
    setData((prevdata) => {
      return {
        ...prevdata,
        [e.target.name]: e.target.value
      };
    });
  };
  const handleSubmit = async () => {
    setErrors({ email: '', password: '' });
    if (!getData.name.trim()) {
      setErrors((prevError) => {
        return {
          ...prevError,
          name: 'PLease Enter Name of the Album !'
        };
      });
      return;
    }
    if (!getData.description.trim()) {
      setErrors((prevError) => {
        return {
          ...prevError,
          description: 'PLease Enter Description !'
        };
      });
      return;
    }

    const updateUri = '/album/update/' + id;

    try {
      const addAlbum = await fetchPostWithAuth(updateUri, getData);
      setLoginError(true);
      naigate('/'); 
    } catch (error) {
      console.log('error in login - ' + error);
      setLoginError(false);
    }
  };
  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs" sx={{ mt: 2 }}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Name"
          value={getData.name || ""}
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
          value={getData.description ||  ""}
          onChange={handleInputs}
          name="description"
          error={!!errors.description}
          helperText={errors.description}
          multiline
          rows={4}  
        />

        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
          Update Album
        </Button>

        {loginError && <p style={{ color: 'green' }}>Album Updated Successfully..!</p>}
      </Container>
    </>
  );
}

EditAlbum.propTypes = { isDemo: PropTypes.bool };
