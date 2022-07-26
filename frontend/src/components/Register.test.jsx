import React from 'react';
import { shallow } from 'enzyme';
import Register from '../pages/Register';
import { Button } from '@mui/material';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Register testing', () => {
  it('has a submit button', () => {
    const register = shallow(<Register/>);
    expect(register.find(Button).text()).toEqual('Submit');
  });
});
