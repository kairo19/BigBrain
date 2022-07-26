import React from 'react';
import apiCall from '../helpers/APICalls';

async function Logout () {
  try {
    const response = await apiCall('admin/auth/logout', 'POST', { });
    // Invalidate the old token
    localStorage.setItem('token', null);
    console.log(JSON.stringify(response));
  } catch (err) {
    console.log(err);
  }

  return (<>
  </>)
}

export default Logout;
