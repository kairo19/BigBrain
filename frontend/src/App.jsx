import React, { useState } from 'react';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import EditQuizPage from './pages/EditQuizPage';
import EditQuestionPage from './pages/EditQuestionPage';
import {
  BrowserRouter,
  Routes,
  Route,
  // Link,
} from 'react-router-dom';
import ResultsOverview from './pages/ResultsOverview';
import SessionJoin from './pages/SessionJoin';
import SessionPlay from './pages/SessionPlay';
import Sidebar from './components/Sidebar';

function App () {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <BrowserRouter>
        <Sidebar isOpen={isOpen} toggle={toggle}/>
        <Navbar toggle={toggle}/>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/quiz' element={<Dashboard />} />
          <Route path='/results/:quizId' element={<ResultsOverview />} />
          <Route path='/editQuiz/:quizId' element={<EditQuizPage />} />
          <Route path='/editQuiz/:quizId/:questionId' element={<EditQuestionPage />} />
          <Route path='/join' element={<SessionJoin />} />
          <Route path='/join/:sessionId' element={<SessionJoin />} />
          <Route path='/play/:playerId' element={<SessionPlay />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
