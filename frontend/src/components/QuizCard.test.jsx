import { shallow } from 'enzyme';
import React from 'react';
import QuizCard from './QuizCard';
import { Button, Typography } from '@mui/material';

describe('Testing quiz card', () => {
  const placeholder = {
    title: 'Quiz1',
    active: null,
    createdAt: '2022-04-19T14:39:14.783Z',
    id: 751607782,
    oldSessions: [],
    owner: '123',
    questions: 2,
    thumbnail: null,
    totalTime: 60,
  }

  it('has correct formatting for quiz card', () => {
    const item = shallow(<QuizCard post={placeholder}/>)
    const paperView = item.find('.Grid')
    expect(paperView).toHaveLength(0);
  });

  it('can display correct quiz Id', () => {
    const item = shallow(<QuizCard post={placeholder}/>)
    const quizId = item.find(Typography);
    expect(quizId.at(1).text()).toEqual('Quiz ID: 751607782');
  });

  it('can display correct number of questions', () => {
    const item = shallow(<QuizCard post={placeholder}/>)
    const noQ = item.find(Typography);
    expect(noQ.at(2).text()).toEqual('Total: 2 questions');
  });

  it('can display total time to complete', () => {
    const item = shallow(<QuizCard post={placeholder}/>)
    const totalTime = item.find(Typography)
    expect(totalTime.at(3).text()).toEqual('Total time to complete: 60 seconds');
  });

  it('should have 3 buttons', () => {
    const item = shallow(<QuizCard post={placeholder}/>)
    const button = item.find(Button);
    expect(button.length).toBe(3);
  });
});
