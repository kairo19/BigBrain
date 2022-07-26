import React from 'react'
import defaultImg from '../img/question.svg'
import { Button, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const QuestionCard = ({ question, deleteQuestion }) => {
  const navigate = useNavigate();

  return (
    <Grid item key={question.id}>
      <Paper elevation={3} style={{ margin: '20px 10px', padding: '20pt' }}>
        <Typography variant='h5' style={{ margin: '5pt' }}>{question.title}</Typography>
        {
        question.picture !== ''
          ? <img src={question.picture ?? defaultImg} style={{ maxWidth: '200pt', margin: '1%', objectFit: 'contain' }}/>
          : ''
        }
        <Grid>
          <Button variant='contained' color='info' style={{ margin: '5pt' }} onClick={() => navigate(question.id)}>Edit Question</Button>
          <Button variant='contained' color='error' style={{ margin: '5pt' }} onClick={() => deleteQuestion(question)}>Delete Question</Button>
        </Grid>
      </Paper>
    </Grid>
  )
}

QuestionCard.propTypes = {
  question: PropTypes.object,
  deleteQuestion: PropTypes.func
};

export default QuestionCard
