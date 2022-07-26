import React, { useEffect } from 'react';
// import apiCall from '../helpers/APICalls';
import { TextField, Button, Grid } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import apiCall from '../helpers/APICalls';

function SessionJoin () {
  const [sessionId, setSessionId] = React.useState('');
  const [name, setName] = React.useState('');
  const params = useParams();
  const navigate = useNavigate();

  const joinSession = async () => {
    const response = await apiCall(`play/join/${sessionId}`, 'POST', {
      name: name
    });
    navigate(`../play/${response.playerId}`)
    console.log(response);
  }

  useEffect(() => {
    setSessionId(params.sessionId ?? '')
  }, []);

  return (<> <div style={{ margin: '10pt' }}>
    <h1>Welcome</h1>
    <h3>To join a session, please enter your session ID and name below, then submit!</h3>
    <Grid item xs={12} md={6} lg={4} style={{ justifyContent: 'center', alignSelf: 'center', margin: '10pt 5pt' }}>
      <Grid item xs={12}>
        <TextField style={{ margin: '4pt 20pt' }} label='Please Enter a Session ID' value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}></TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField style={{ margin: '4pt 20pt' }} label='Please Enter Your Name' value={name}
        onChange={(e) => setName(e.target.value)}></TextField>
      </Grid>
      <Grid item xs={12}>
        <Button variant='contained' style={{ marginTop: '10pt', marginLeft: '20pt' }}
        onClick={joinSession}>Join</Button>
      </Grid>
    </Grid>
  </div></>)
}

export default SessionJoin;
