import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Grid, Box } from '@mui/material'
import apiCall from '../helpers/APICalls';
import { useNavigate } from 'react-router-dom';
import MUISnackbar from './MUISnackbar'
import QuizCard from './QuizCard';

const Posts = ({ posts, setPosts, setRefresh }) => {
  const navigate = useNavigate();
  const [alertUser, setAlertUser] = React.useState(false);
  const [message, setMessage] = useState('');
  const [currentSession, setCurrentSession] = useState('');

  const handleAlertUser = () => {
    setAlertUser(true);
  }

  const handleCloseAlertUser = (event, reason) => {
    setAlertUser(false);
  }

  const deletePost = async (deletedItem) => {
    setPosts(posts.filter((item) => item.id !== deletedItem.id));
    const response = await apiCall(`admin/quiz/${deletedItem.id}`, 'DELETE', {});
    console.log(response);
  }

  const navigateToResults = async () => {
    navigate(`/results/${currentSession}`)
  }

  const returnSessionId = async (quizId) => {
    const reply = await apiCall(`admin/quiz/${quizId}`, 'GET', {
      quizid: quizId
    });
    return reply.active;
  }

  const initiateGame = async (quizId, ifActive) => {
    if (ifActive === null) {
      const response = await apiCall(`admin/quiz/${quizId}/start`, 'POST', {
        quizid: quizId
      });
      console.log('my response is: ' + JSON.stringify(response));

      const currSessId = await returnSessionId(quizId);

      setCurrentSession(currSessId);
      copyToClipboard(currSessId);
      setMessage(`Start success. Session address copied to clipboard! [Session ID: ${currSessId}]`)
      handleAlertUser();
    } else {
      const currSessId = await returnSessionId(quizId);
      setCurrentSession(currSessId);
      await apiCall(`admin/quiz/${quizId}/end`, 'POST', {
        quizid: quizId
      });
      setMessage('Stop success. Click to view the results:')
      handleAlertUser();
    }
    setRefresh();
  }

  const copyToClipboard = (webLink) => {
    setMessage(`Link copied to clipboard! [Session ID: ${webLink}]`);
    handleAlertUser();
    navigator.clipboard.writeText(`${window.location.hostname}:${window.location.port}/join/${webLink}`);
  }

  const advanceNextQuestion = async (quizId) => {
    const response = await apiCall(`admin/quiz/${quizId}/advance`, 'POST', {});
    if (response.error) {
      setMessage('Reached last question, please end quiz!');
      handleAlertUser();
    }
    console.log('next question called')
  }

  console.log('alertUser is currently: ' + alertUser)

  return (<>
    <Box style= {{ margin: '20pt' }}>
      <Grid container spacing={2}>
        {posts?.map((post, iter) => (
          <QuizCard key={iter} post={post} deletePost={deletePost} initiateGame={initiateGame} copyToClipboard={copyToClipboard} advanceNextQuestion={advanceNextQuestion} navigate={navigate}></QuizCard>
        ))}
        {
          alertUser
            ? <MUISnackbar
            open={alertUser}
            handleClose={handleCloseAlertUser}
            message={message}
            navigateFunc={navigateToResults}
          />
            : ''
        }
      </Grid>
    </Box>
    </>);
};

Posts.propTypes = {
  posts: PropTypes.array,
  setPosts: PropTypes.func,
  setRefresh: PropTypes.func
};

export default Posts;
