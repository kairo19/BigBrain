import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from '../pages/Dashboard';
import { Button, TextField } from '@mui/material';

describe('Dashboard testing', () => {
  it('has a create quiz button', () => {
    const dashboard = shallow(<Dashboard/>);
    expect(dashboard.find(Button).text()).toEqual('Create a new quiz');
  });
  it('has a quiz title textfield', () => {
    const dashboard = shallow(<Dashboard/>);
    const textfield = dashboard.find(TextField);
    expect(textfield.length).toBe(1);
  });
});
