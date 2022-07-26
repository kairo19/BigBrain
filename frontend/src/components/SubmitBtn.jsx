import React from 'react';
import Button from '@mui/material/Button';

const defaultButtonStyle = { margin: '5px', width: '95%' };

const FormInput = () => {
  return (
    <div className='formInput'>
      <Button variant="contained" style= { defaultButtonStyle }>Submit</Button>
    </div>

  )
}

export default FormInput
