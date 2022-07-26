import { shallow } from 'enzyme';
import React from 'react';
// import FormInput from './FormInput';
import { TextField } from '@mui/material';

describe('Testing form input', () => {
  it('has values that can be changed', () => {
    const onChange = jest.fn();
    shallow(<TextField onChange={onChange} />).simulate('change');
    expect(onChange).toHaveBeenCalledTimes(1)
  });
})
