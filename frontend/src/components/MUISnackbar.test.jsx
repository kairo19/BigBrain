import { shallow } from 'enzyme';
import React from 'react';
// import CustomizedSnackbars from './MUISnackbar';
import { Button } from '@mui/material';

describe('Testing Snackbar', () => {
  it('successfully alerts', () => {

  });
  it('has an autohide duration', () => {

  });
  it('view results button works', () => {
    const mockCallBack = jest.fn();
    const button = shallow(<Button onClick={mockCallBack}>ViewResults</Button>);
    button.find(Button).simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
  it('', () => {

  });
})
