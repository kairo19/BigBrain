import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormInput from '../components/FormInput'
import apiCall from '../helpers/APICalls';
import Box from '@mui/material/Box';

function Login () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const defaultButtonStyle = { margin: '5px', width: '95%' };
  const formStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' };
  const authContainerStyle = { height: '50vh', margin: 'auto', marginTop: '20pt', borderRadius: '30px' };

  const login = async () => {
    if (email === '' || password === '') {
      alert('Invalid email or password');
    }

    const response = await apiCall('admin/auth/login', 'POST', { email, password });

    if (response === undefined) {
      alert('Incorrect Log In Details');
    } else {
      navigate('/quiz');
      localStorage.setItem('token', response.token);
    }
  }
  return (<>
    <Box maxWidth='sm' sx={ authContainerStyle } >
      <Grid container spacing={2} style = { formStyle } >
        <h1 style={{ paddingTop: '20px' }}>Login</h1>
        <Grid item xs={12}>
          <FormInput label='Email' action={setEmail} type='text'/>
        </Grid>
        <Grid item xs={12}>
          <FormInput label='Password' action={setPassword} type='password'/>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" style= { defaultButtonStyle } onClick={login}>Submit</Button>
        </Grid>
        <Grid item xs={12}>
          <Link to = '/register'>Don&apos;t have an account? Click here to register!</Link>
        </Grid>
      </Grid>
    </Box >
  </>);
}

export default Login;
