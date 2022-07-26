import React from 'react';
import { shallow } from 'enzyme';
import Login from '../pages/Login';
import { Button } from '@mui/material';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Login testing', () => {
  it('has a submit button', () => {
    const login = shallow(<Login/>);
    expect(login.find(Button).text()).toEqual('Submit');
  });
});
