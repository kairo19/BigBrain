import React from 'react';
import { shallow } from 'enzyme';
import EditQuestionPage from '../pages/EditQuestionPage';
import { Button } from '@mui/material';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Edit quiz testing', () => {
  it('has a back to dashboard button', () => {
    const editQuestionPage = shallow(<EditQuestionPage/>);
    const button = editQuestionPage.find(Button);
    expect(button.at(0).text(1)).toEqual('Back to all quizzes');
  });
});
