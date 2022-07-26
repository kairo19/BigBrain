import React from 'react';
import Box from '@mui/material/Box';

const authContainerStyle = { bgcolor: '#cfe8fc', height: '50vh', margin: 'auto', borderRadius: '30px' };

const authContainerBox = () => {
  return (
    <Box maxWidth='sm' sx={ authContainerStyle } >
    </Box>
  )
}

export default authContainerBox;
