import React from 'react';
import { shallow } from 'enzyme';
import SessionJoin from '../pages/SessionJoin';
import { Button } from '@mui/material';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Login testing', () => {
  it('has a submit button', () => {
    const sessionJoin = shallow(<SessionJoin/>);
    expect(sessionJoin.find(Button).text()).toEqual('Join');
  });
});
