import React, { useEffect } from 'react';
import apiCall from '../helpers/APICalls';
import fetchGameData from '../helpers/fetchGameData';
import Posts from '../components/Posts';
import { TextField, Button } from '@mui/material'

function Dashboard () {
  const [posts, setPosts] = React.useState([]);
  const [newQuiz, setNewQuiz] = React.useState('');
  const [onCreate, setOnCreate] = React.useState(false);
  const [toggleRefresh, setToggleRefresh] = React.useState(false);

  const onClickNewQuiz = async () => {
    await apiCall('admin/quiz/new', 'POST', {
      name: newQuiz
    });
    setOnCreate(!onCreate);
    setToggleRefresh(!toggleRefresh);
  }

  const getAllGames = async () => {
    const response = await apiCall('admin/quiz', 'GET', { });
    if (response === undefined) alert('Invalid token');
    else {
      const allGames = response.quizzes;
      Promise.all(allGames.map(quiz => fetchGameData(quiz.id)))
        .then((result) => {
          const newAllGames = result.map((quiz, iter) => {
            let totalTime = 0;
            quiz.questions.forEach((question) => {
              totalTime += parseInt(question.timeLimit);
            })
            allGames[iter].questions = quiz.questions.length;
            allGames[iter].totalTime = totalTime;
            return allGames[iter];
          });
          console.log(newAllGames);
          setPosts(newAllGames);
        });
    }
  }

  const handleQuizChange = (e) => {
    setNewQuiz(e.target.value)
  }

  const handleToggleRefresh = () => {
    setToggleRefresh(!toggleRefresh);
  }

  useEffect(() => {
    getAllGames();
    setNewQuiz('');
  }, [toggleRefresh])

  return (<>
    <div style={{ margin: '10pt 30pt' }}>
    <h1 style={{ textAlign: 'center' }}>Dashboard</h1>
    <h4 style={{ marginLeft: '21pt' }}>Create a New Quiz</h4>
    <TextField style={{ margin: '0pt 20pt' }} label='Quiz Title' value={newQuiz} onChange={handleQuizChange}>
    </TextField>
    <Button variant='contained' style={{ marginTop: '10pt', marginLeft: '21pt' }} onClick={onClickNewQuiz}>Create a new quiz</Button>
    <br/>
    <h4 style={{ marginLeft: '21pt' }}>All Available Quizzes</h4>
    <div className='quiz-container mt-5'>
      <Posts posts={posts} setPosts={setPosts} setRefresh={handleToggleRefresh}/>
    </div>
   </div>
  </>)
}

export default Dashboard;
