import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormInput from '../components/FormInput';
import apiCall from '../helpers/APICalls';
import Box from '@mui/material/Box';

function Register () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const navigate = useNavigate();

  const defaultButtonStyle = { margin: '5px', width: '100%' };

  const formStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' };
  const authContainerStyle = { height: '60vh', margin: 'auto', marginTop: '20pt', borderRadius: '30px', padding: 'auto' };

  const register = async (email, password, name) => {
    if (email === '' || password === '' || name === '') {
      alert('Please fill out all fields');
    }

    const response = await apiCall('admin/auth/register', 'POST', { email, password, name });
    console.log(response);

    if (response === undefined) {
      alert('Email already associated with another user');
    } else {
      localStorage.setItem('token', response.token);
      navigate('/quiz');
    }
  }
  return (<>
    <Box maxWidth='sm' sx={ authContainerStyle } >
          <Grid container spacing={2} style = { formStyle } >
            <h1 style={{ paddingTop: '20px' }}>Register</h1>
            <Grid item xs={12}>
              <FormInput label='Email' action={setEmail} type='text'/>
            </Grid>
            <Grid item xs={12}>
              <FormInput label='Password' action={setPassword} type='password'/>
            </Grid>
            <Grid item xs={12}>
              <FormInput label='Name' action={setName} type='text'/>
            </Grid>
            <Grid item xs={12}>
              <Button id='submit' variant="contained" style={ defaultButtonStyle } onClick={() => register(email, password, name)}>Submit</Button>
            </Grid>
            <Grid item xs={12}>
              <Link to = '/login'>Have an account? Click here to login!</Link>
            </Grid>

          </Grid>
    </Box>
  </>);
}

export default Register;
