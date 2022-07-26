import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars ({ open, handleClose, message, navigateFunc }) {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={18000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
          {message.indexOf('Stop') !== -1
            ? <Button color="inherit" size="small" onClick={navigateFunc}>
              View Results
            </Button>
            : ''
          }
        </Alert>
      </Snackbar>
    </Stack>
  );
}

CustomizedSnackbars.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  message: PropTypes.string,
  navigateFunc: PropTypes.func
};
