import React from 'react';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

const defaultButtonStyle = { margin: '5px', width: '100%' };

const FormInput = ({ label, action, type }) => {
  return (
    <div className='formInput'>
      <TextField id={label} label={label} type={type} variant="outlined" style= { defaultButtonStyle } onChange={e => action(e.target.value)}/>
    </div>

  )
}

FormInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  action: PropTypes.func
};

export default FormInput
