import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiCall from '../helpers/APICalls';
import { Button, Box, Grid, TextField, Typography } from '@mui/material';
import { fileToDataUrl } from '../helpers/fileToUrlHelper';
import defaultImg from '../img/question.svg'
import QuestionCard from '../components/QuestionCard';

function EditQuizPage () {
  const [quiz, setQuiz] = React.useState();
  const [quizName, setQuizName] = React.useState('');
  const [allQuestions, setAllQuestions] = React.useState([]);
  const [thumbnail, setThumbnail] = React.useState('');
  const [onChange, setOnChange] = React.useState(true);
  const [newQuestion, setNewQuestion] = React.useState('');
  const params = useParams();
  const isMounted = useRef(false);
  const navigate = useNavigate();

  const getQuestions = async () => {
    const response = await apiCall(`admin/quiz/${params.quizId}`, 'GET', {});
    setQuiz(response);
    setQuizName(response.name);
    setAllQuestions(response.questions);
    setThumbnail(response.thumbnail);
    console.log(quiz);
  }

  const handleNewQuestion = (e) => {
    setNewQuestion(e.target.value);
  }

  const deleteQuestion = (question) => {
    setAllQuestions(allQuestions.filter((item) => item.id !== question.id));
    setOnChange(!onChange);
  }

  const addQuestion = () => {
    const newQuestionType = {
      id: allQuestions.length !== 0 ? (parseInt(allQuestions[0].id) + 1).toString() : '1',
      title: newQuestion,
      timeLimit: 0,
      points: 0,
      youtube: '',
      picture: '',
      singleChoice: true,
      answers: []
    }
    console.log(newQuestionType)
    setAllQuestions([newQuestionType, ...allQuestions]);
    setNewQuestion('');
    setOnChange(!onChange);
  }

  const handlePictureAddition = (e) => {
    try {
      fileToDataUrl(e.target.files[0]).then((imageData) => {
        updateThumbnail(imageData);
        setThumbnail(imageData);
        console.log(`my photo is: ${imageData}`);
      })
    } catch (err) {
      alert(`${err} File will not be uploaded when submitted.`)
    }
  }

  const updateThumbnail = async (thumbnail) => {
    const response = await apiCall(`admin/quiz/${params.quizId}`, 'PUT', {
      questions: allQuestions,
      name: quizName,
      thumbnail: thumbnail
    });
    console.log(response);
  }

  useEffect(() => {
    params ?? navigate('quiz');
    getQuestions();
  }, [])

  // Use effect for to remove question or add question
  useEffect(async () => {
    if (isMounted.current) {
      const response = await apiCall(`admin/quiz/${params.quizId}`, 'PUT', {
        questions: allQuestions,
        name: quizName,
        thumbnail: thumbnail
      });
      console.log(response);
      getQuestions();
    } else {
      isMounted.current = true;
    }
  }, [onChange])

  function backToDashboard () {
    navigate('/quiz');
  }

  return (<>
    <Grid item style={{ margin: '10pt 5pt' }}>
        <Button variant='contained' color='warning' onClick={backToDashboard}>Back to Dashboard</Button>
    </Grid>
    <Grid item xs={12} md={6} lg={4} style={{ justifyContent: 'center', alignSelf: 'center', margin: '10pt 5pt' }}>
      <Grid item xs={12}>
        <Typography variant='h1' style={{ fontSize: '20pt' }} >Add a question here:</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField style={{ margin: '4pt 0pt' }} label='Question Title' value={newQuestion} onChange={handleNewQuestion}></TextField>
        <Button variant='contained' style={{ margin: '10pt 20pt' }} color='info' onClick={() => addQuestion()}>Add New Question</Button>
      </Grid>
      <Grid item xs={12}>
        {
          thumbnail !== ''
            ? <img src={thumbnail ?? defaultImg} style={{ maxWidth: '250pt', margin: '5%', objectFit: 'contain' }}/>
            : ''
        }
      </Grid>
      <Grid item xs={12}>
        <Button style={{ margin: '10pt 3pt' }} variant='contained' component='label'>Edit Current Thumbnail <input type='file' hidden onChange={ handlePictureAddition }></input></Button>
      </Grid>
        <Typography variant='h1' style={{ fontSize: '20pt', margin: '5pt' }} >Here are all the questions:</Typography>
      <Grid container spacing={2}>
        {allQuestions?.map((question, iter) => (
          <QuestionCard key={iter} question={question} deleteQuestion={deleteQuestion}></QuestionCard>
        ))}
      </Grid>
    </Grid>
    <Box style= {{ margin: '20pt' }}>
    </Box>
  </>)
}

export default EditQuizPage;
