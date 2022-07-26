import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Paper, Grid, Typography, Box } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import apiCall from '../helpers/APICalls';
import Modal from '@mui/material/Modal';

let interval = null;
let interval2 = null;
let answerList = [];
let answerIds = [];

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function SessionPlay () {
  const [questionTitle, setQuestionTitle] = React.useState('');
  const [questionYoutube, setQuestionYoutube] = React.useState('');
  const [questionPicture, setQuestionPicture] = React.useState('');
  const [seconds, setSeconds] = React.useState(0);
  const [questionId, setQuestionId] = React.useState('');
  const [selection, setSelection] = React.useState([]);
  const [correctAnswer, setCorrectAnswer] = React.useState([]);
  const [popup, setPopup] = React.useState(false);
  const [isSingle, setIsSingle] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  const [results, setResults] = React.useState([]);
  const didMount = useRef(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const params = useParams();
  const playerId = params.playerId;

  useEffect(() => {
    clearInterval(interval)
    interval = setInterval(async () => {
      const newResponse = await getNewQuestion();
      if (newResponse.question.id !== questionId) {
        getQuestion();
        clearInterval(interval);
        setPopup(false);
      }
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        setPopup(true);
        getAnswers();
      }
    }, 1000);
  });

  useEffect(() => {
    clearInterval(interval2)
    interval2 = setInterval(async () => {
      const newResponse = await getStudentResults();
      if (newResponse) {
        setResults(newResponse);
        console.log(newResponse)
        if (didMount.current === false) {
          handleOpenModal();
          didMount.current = true;
        }
        return clearInterval(interval);
      }
    }, 1000);
  });

  useEffect(() => {
    console.log(playerId)
    console.log('answer useeffect activated')
    if (popup) {
      console.log('getting answers')
      getAnswers();
    }
  }, [popup]);

  const getQuestion = async () => {
    const response = await apiCall(`play/${playerId}/question`, 'GET', {})
    setQuestionId(response.question.id)
    setQuestionTitle(response.question.title);
    // Video or image
    setQuestionYoutube(response.question.youtube);
    setQuestionPicture(response.question.picture);
    // A countdown with how many seconds remain until you can't answer
    setSeconds(response.question.timeLimit);
    // A selection of either single or multiple answers, that are clickable
    setSelection(response.question.questions);
    // if multiple or single
    setIsSingle(response.question.singleChoice)
    // clear response list
    answerList = [];
    answerIds = [];
    setPopup(false);
  }

  const getStudentResults = async () => {
    const response = await apiCall(`play/${playerId}/results`, 'GET', {})
    return response;
  }

  const getNewQuestion = async () => {
    const response = await apiCall(`play/${playerId}/question`, 'GET', {})
    return response;
  }

  const getAnswers = async () => {
    const answers = [];
    const response = await apiCall(`play/${playerId}/answer`, 'GET', {});
    answerIds = response.answerIds;
    selection.forEach((option, iter) => {
      if (response.answerIds.includes(iter)) {
        answers.push(option.response)
      }
    });
    setCorrectAnswer(answers);
  }

  const submitAnswers = async (iter) => {
    if (isSingle) {
      answerList = [];
    }
    answerList.push(iter);
    answerList = [...new Set(answerList)];
    const response = await apiCall(`play/${playerId}/answer`, 'PUT', {
      answerIds: answerList,
    });
    console.log(response);
    console.log('my answer list is: ' + answerList)
    console.log(isSingle);
  }

  const disableButtons = (iter) => {
    if (seconds === 0) {
      return true;
    } else if (isSingle) {
      if (iter === answerList[0]) {
        return false;
      } else if (answerList.length === 1) {
        return true;
      }
    }
    return false;
  }

  const DisplayCorrectIcon = ({ iter }) => {
    console.log('WEUFIWEFWEHUFWEHIUFWEUIHF')
    if (answerIds.includes(iter)) {
      return (<CheckCircle style={{ color: 'green' }} />)
    } else {
      return (<CancelIcon style={{ color: 'darkred' }} />)
    }
  }

  const colorSelector = (iter) => {
    if (answerList.includes(iter)) {
      return '#18191A';
    }
    switch (iter) {
      case 0:
        return '#106B03';
      case 1:
        return '#1368CE';
      case 2:
        return '#C60929';
      case 3:
        return '#F5A23D';
      case 4:
        return '#028282';
      case 5:
        return '#767676';
    }
  }

  /*
  PLEASE READ:
  THE ORDER OF HOW THIS GOES IS
  - Make sure you start the quiz from admin side, have two screen open for this
  1. PLAYER ENTERS QUIZ BY ENTERING SESSION ID AND NAME
  2. PLAYER WAIT FOR ADMIN TO PRESS ADVANCE
  3. PLAYER CAN CHECK STATUS BY CLICKING ON START QUIZ, IF RETURN TRUE, QUIZ HAS STARTED -
    - NOTE THAT YOU NEED TO PRESS ADVANCE QUIZ ONE TIME TO BEGIN THE FIRST QUESTION
  4. PRESS START QUIZ TO CONFIRM THE QUIZ HAS STARTED
  5. PRESS GET QUESTION TO GET THE QUESTION
  6. PRESS SUBMIT ANSWER TO SUBMIT YOUR ANSWER, RN IT IS HARD CODED
    - NOTE THAT IT USES ITER AS THE KEY (E.G. THE POSITION OF THE ANSWER) WHEN YOU SUBMIT
  7. PRESS GET ANSWER TO CONFIRM WHETHER IF YOU GOT IT CORRECT OR NOT
  */
  return (<>
    <Paper elevation={3} style={{ margin: '20pt auto', padding: '10pt', maxWidth: '800px' }}>
      <h1>{questionTitle === '' ? 'Pending Question' : questionTitle}</h1>
      <div>
        {questionYoutube !== '' ? <iframe width="100%" height="315pt" margin="auto auto" src={questionYoutube}></iframe> : <img width='100%' src={questionPicture}></img>}
      </div>
      <h3>{seconds < 1 ? 'Call next question' : 'Time left: ' + seconds}</h3>
      <Grid container spacing={2}>
      {
        selection.map((option, iter) => {
          return (
            <Grid item key={iter} xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button disabled={disableButtons(iter)} onClick={() => submitAnswers(iter)} key={iter} style={{ backgroundColor: colorSelector(iter), color: answerList.includes(iter) ?? '#FFFFFF', width: '100%', fontSize: '10pt' }} variant="contained">{option.response}</Button>
              {answerIds.length > 0 ? <DisplayCorrectIcon iter={iter} /> : null}
            </Grid>
          )
        })
      }
      </Grid>
      {popup
        ? <Paper elevation={3} style={{ margin: '20px 10px', padding: '8pt' }}>
          <Typography variant='h3' style={{ fontSize: '18pt' }} >The correct answer(s): {correctAnswer.join(', ')}</Typography>
        </Paper>
        : ''}
      <div>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Quiz Overview:
            </Typography>
            {
              results
                ? results.map((eachQuestion, iter) => {
                    return (
                      <>
                        <Typography key={iter} id="modal-modal-description" sx={{ mt: 2 }}>
                        Question {iter + 1}: You have answered the question {eachQuestion.correct ? 'correct' : 'incorrect'}
                        </Typography>
                      </>
                    )
                  })
                : ''
            }
          </Box>
        </Modal>
      </div>
    </Paper>

  </>)
}

export default SessionPlay;
