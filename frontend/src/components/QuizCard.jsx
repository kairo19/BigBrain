import React from 'react'
import defaultImg from '../img/question.svg'
import PropTypes from 'prop-types';
import { Grid, Typography, Button, Paper, Link } from '@mui/material'

const QuizCard = ({ post, deletePost, initiateGame, copyToClipboard, advanceNextQuestion, navigate }) => {
  return (
    <Grid item xs={12} md={6} lg={4} key={post.id}>
      <Paper elevation={3} style={{ margin: '0px', padding: '20pt' }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            {
              post.thumbnail !== ''
                ? <img src={post.thumbnail ?? defaultImg} style={{ maxWidth: '100px', margin: '5%', objectFit: 'contain' }}/>
                : ''
            }
          </Grid>
          <Grid item xs={8} style={{ justifyContent: 'center', alignSelf: 'center' }}>
            <Typography variant='h4' style={{ fontSize: '23pt' }} >{post.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Quiz ID: {post.id}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Total: {post.questions ?? '0'} questions</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Total time to complete: {post.totalTime ?? '0'} seconds</Typography>
          </Grid>
          <Grid item xs={6}>
            <Button variant='contained' color='info' onClick={() => navigate('/editQuiz/' + post.id)} >Edit</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant='contained' color='error' onClick={() => deletePost(post) }>Delete</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' color={post.active !== null ? 'warning' : 'success'} onClick={() => { initiateGame(post.id, post.active) }}>{post.active !== null ? 'End' : 'Start'}</Button>
          </Grid>
          <Grid item xs={12}>
            <Link onClick={() => { copyToClipboard(post.active) }}>{post.active !== null ? 'Game in progress - click here to copy link!' : ''}</Link>
          </Grid>
          <Grid item xs={12}>
            {
              post.active
                ? <Button variant='contained' color={'primary'} onClick={() => { advanceNextQuestion(post.id) }}>Advance Question</Button>
                : ''
            }
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

QuizCard.propTypes = {
  post: PropTypes.object,
  deletePost: PropTypes.func,
  initiateGame: PropTypes.func,
  copyToClipboard: PropTypes.func,
  advanceNextQuestion: PropTypes.func,
  navigate: PropTypes.func
};

export default QuizCard
