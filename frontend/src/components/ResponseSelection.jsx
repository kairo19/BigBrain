import React from 'react'
import PropTypes from 'prop-types';
import { Button, Box, FormControlLabel, Checkbox, TextField } from '@mui/material';

const ResponseSelection = ({ iter, answer, handleCheckboxResponse, handleEditResponse, deleteResponseStructure }) => {
  return (
    <Box key={iter} style={{ margin: '10px' }}>
      <FormControlLabel control={<Checkbox checked={answer.correct} onClick={(e) => handleCheckboxResponse(iter)}/>} />
      <TextField key={iter} value={answer.response} onChange={(e) => handleEditResponse(e, iter)}/>
      <Button variant='contained' style={{ margin: '8pt 20pt' }} color='error' onClick={() => deleteResponseStructure(iter)}>Delete Answer</Button>
    </Box>
  )
}

ResponseSelection.propTypes = {
  iter: PropTypes.number,
  answer: PropTypes.object,
  handleCheckboxResponse: PropTypes.func,
  handleEditResponse: PropTypes.func,
  deleteResponseStructure: PropTypes.func
};

export default ResponseSelection
