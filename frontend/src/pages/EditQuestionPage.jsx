import React, { useEffect } from 'react';
import { Radio, Grid, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Button, Paper, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import apiCall from '../helpers/APICalls';
import { fileToDataUrl } from '../helpers/fileToUrlHelper';
import ResponseSelection from '../components/ResponseSelection';

export default function EditQuestionPage () {
  const [singleChoice, setSingleChoice] = React.useState('single');
  const [hasFetchedQuestion, setHasFetchedQuestion] = React.useState(false);
  const [quizName, setQuizName] = React.useState('');
  const [allQuestions, setAllQuestions] = React.useState([]);
  const [thumbnail, setThumbnail] = React.useState('');
  const [targetedQuestion, setTargetedQuestion] = React.useState([]);
  const [allResponses, setAllResponses] = React.useState([]);
  const [newResponse, setNewResponse] = React.useState('');
  const [editTime, setEditTime] = React.useState('');
  const [editPoints, setEditPoints] = React.useState('');
  const [addPicture, setAddPicture] = React.useState('');
  const [addYoutubeLink, setAddYoutubeLink] = React.useState('');
  const params = useParams();
  const navigate = useNavigate();

  const [questionTitle, setQuestionTitle] = React.useState('');

  const getQuestions = async () => {
    const result = await apiCall(`admin/quiz/${params.quizId}`, 'GET', {});
    setQuizName(result.name);
    setAllQuestions(result.questions);
    setThumbnail(result.thumbnail);
    setHasFetchedQuestion(!hasFetchedQuestion);
  }

  const handleQTypeInput = (e) => {
    setSingleChoice(e.target.value);
    if (e.target.value === 'single') {
      setAllResponses(allResponses.forEach((item) => {
        item.correct = false;
      }));
    }
    updateQuestionStructure(allResponses, e.target.value, editTime, editPoints);
  }

  const handleSetNewTime = (e) => {
    setEditTime(e.target.value);
    updateQuestionStructure(allResponses, singleChoice, e.target.value, editPoints);
  }

  const handleSetNewPoints = (e) => {
    setEditPoints(e.target.value);
    updateQuestionStructure(allResponses, singleChoice, editTime, e.target.value);
  }

  // UPDATE NEW QUESTION SECTION
  const handleSetNewResponse = (e) => {
    setNewResponse(e.target.value);
  }

  // UPDATE NEW QUESTION SECTION
  const handleYoutubeLink = (e) => {
    setAddYoutubeLink(e.target.value);
  }

  const handleEditResponse = (e, iter) => {
    allResponses[iter].response = e.target.value;
    setAllResponses(allResponses);
    setHasFetchedQuestion(!hasFetchedQuestion);
  }

  const handleQuestionTitle = (e) => {
    setQuestionTitle(e.target.value);
  }

  const handleCheckboxResponse = (iter) => {
    // for single, make all of them false, then only the iter true
    if (singleChoice === 'single') {
      setAllResponses(allResponses.forEach((item, position) => {
        position === iter ? item.correct = true : item.correct = false;
      }));
    } else {
      setAllResponses(allResponses[iter].correct = !allResponses[iter].correct);
    }
    updateQuestionStructure(allResponses, singleChoice, editTime, editPoints);
  }

  const handlePictureAddition = (e) => {
    try {
      fileToDataUrl(e.target.files[0]).then((imageData) => {
        setAddPicture(imageData);
        console.log(`my photo is: ${imageData}`);
      })
    } catch (err) {
      alert(`${err} File will not be uploaded when submitted.`)
    }
  }

  // Refresh the structure of the current JSON allQuestions
  const updateQuestionStructure = (allMyResponses, updatedSingleChoice, updatedTimeLimit, updatedPoints) => {
    allQuestions.forEach((question) => {
      if (question.id === params.questionId) {
        question.answers = allMyResponses;
        question.singleChoice = updatedSingleChoice === 'single';
        question.timeLimit = updatedTimeLimit;
        question.points = updatedPoints;
        question.picture = addPicture;
        question.youtube = addYoutubeLink;
        question.title = questionTitle;
        // question.youtube =
      }
    })
    // This basically activates the useEffect hook and updates the UI
    setAllQuestions(allQuestions);
    setHasFetchedQuestion(!hasFetchedQuestion);
  }

  const addResponseStructure = () => {
    // TODO: Ensure add answers do not exceed 6
    if (allResponses.length >= 6) {
      // TODO: Call MUI Snackbar to make alert sexy
      alert('Exceeding 6 questions, please delete one to continue.')
    } else {
      const tempResponse = [...allResponses, {
        response: `${newResponse}`,
        correct: false
      }]
      setAllResponses(tempResponse);
      updateQuestionStructure(tempResponse, singleChoice, editTime, editPoints);
      setNewResponse('');
    }
  }

  const deleteResponseStructure = (iter) => {
    const tempResponse = allResponses.splice(iter, 1)
    console.log('irrelevant' + JSON.stringify(tempResponse));
    console.log(allResponses);
    setAllResponses(allResponses);
    updateQuestionStructure(allResponses, singleChoice, editTime, editPoints);
  }

  // This is used to so an api call to update the quiz structure
  const updateToServer = async () => {
    updateQuestionStructure(allResponses, singleChoice, editTime, editPoints);
    const numberOfAnswers = checkNoCorrectAnswers();
    if (singleChoice === 'multiple' && numberOfAnswers < 2) {
      alert('Please ensure your answers are not less than 2 due to multi selection. Either select more answers or create more!');
    } else if (singleChoice === 'single' && numberOfAnswers !== 1) {
      alert('Please ensure you have one answer due to single selection.');
    } else if (allResponses.length < 2) {
      alert('Please ensure you have more than one answer selection.');
    } else {
      alert('Form has been submitted')
      const response = await apiCall(`admin/quiz/${params.quizId}`, 'PUT', {
        questions: allQuestions,
        name: quizName,
        thumbnail: thumbnail
      });
      console.log(response);
    }
  }

  const checkNoCorrectAnswers = () => {
    let numberOfAnswers = 0;
    allResponses.forEach((item) => {
      if (item.correct === true) {
        numberOfAnswers++;
      }
    })
    return numberOfAnswers;
  }

  useEffect(() => {
    getQuestions();
  }, [])

  useEffect(() => {
    allQuestions.forEach((question) => {
      if (question.id === params.questionId) {
        setTargetedQuestion(question);
        setAllResponses(targetedQuestion.answers);
        setSingleChoice(targetedQuestion.singleChoice ? 'single' : 'multiple');
        setAddPicture(targetedQuestion.picture);
        setAddYoutubeLink(targetedQuestion.youtube);
        setEditPoints(targetedQuestion.points ?? 0);
        setEditTime(targetedQuestion.timeLimit ?? 0);
        setAddYoutubeLink(targetedQuestion.youtube ?? '')
        setQuestionTitle(targetedQuestion.title ?? '')
      }
    })
  }, [hasFetchedQuestion, allQuestions])

  function backToAllQuizzes () {
    navigate(`/editQuiz/${params.quizId}`);
  }

  return (<>
    <Grid item style={{ margin: '10pt 5pt' }}>
        <Button variant='contained' color='warning' onClick={backToAllQuizzes}>Back to all quizzes</Button>
    </Grid>
    <Typography variant='h4' style={{ fontSize: '23pt' }} >Edit Question:</Typography>
    <Paper elevation={2} style={{ display: 'flex', justifyContent: 'center', alignSelf: 'center', maxWidth: '600px', margin: '20pt auto', padding: '20pt' }}>
      <Grid container spacing={2}>
        <Grid item>
          <FormControl>
            <Grid item xs={12}>
              <FormControlLabel control={<TextField style={{ margin: '20pt 10pt', width: '100%' }} label="Question Title" value={questionTitle} onChange={handleQuestionTitle}></TextField>}/>
            </Grid>
            <Grid item xs={12}>
              <FormLabel id="single-multiple-answer-choice">Question Type</FormLabel>
            </Grid>
            <RadioGroup row value={singleChoice ?? 'single'}>
              <FormControlLabel value="single" control={<Radio />} label="Single Choice" onClick={handleQTypeInput}/>
              <FormControlLabel value="multiple" control={<Radio />} label="Multiple Choice" onClick={handleQTypeInput}/>
            </RadioGroup>
            <Grid item>
              <TextField style={{ margin: '4pt 20pt' }} label='Add Answer Here' value={newResponse} onChange={handleSetNewResponse}></TextField>
              <Button variant='contained' color='info' style={{ margin: '9pt 20pt' }} onClick={addResponseStructure}>Add Another Answer</Button>
            </Grid>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <>
          {
            targetedQuestion.answers
              ? targetedQuestion.answers.map((answer, iter) => {
                  return (
                    <ResponseSelection key={iter} iter={iter} answer={answer} handleCheckboxResponse={handleCheckboxResponse} handleEditResponse={handleEditResponse} deleteResponseStructure={deleteResponseStructure}></ResponseSelection>
                  )
                }
                )
              : null
          }
          </>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel control={<TextField style={{ margin: '4pt 20pt' }} label="Enter Time Limit" value={editTime} onChange={handleSetNewTime}></TextField>}/>
          <FormControlLabel control={<TextField style={{ margin: '4pt 20pt' }} label="Enter Points" value={editPoints} onChange={handleSetNewPoints}></TextField>}/>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">Question Enhancement</FormLabel>
            <RadioGroup row>
              <TextField style={{ margin: '8pt 20pt' }} label="Enter YouTube URL Here" value={addYoutubeLink} onChange={handleYoutubeLink}></TextField>
              <Button variant='contained' style={{ margin: '8pt 20pt' }} component='label'>Upload Picture <input type='file' hidden onChange={handlePictureAddition}></input></Button>
            </RadioGroup>
          </FormControl>
        </Grid>
        {/* */}
        <Grid item>
        </Grid>
      <Button variant='contained' color='success' onClick={() => updateToServer()} >Submit Edit</Button>
      </Grid>
    </Paper>
  </>)
}
