import { BACKEND_PORT } from '../config';

const apiCall = async (path, method, body) => {
  return new Promise((resolve, reject) => {
    const init = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: (path === 'admin/auth/logout' || path.indexOf('admin/quiz') !== -1 || path.indexOf('admin/session') !== -1 ? `Bearer ${localStorage.getItem('token')}` : undefined),
      },
      body: method === 'GET' ? undefined : JSON.stringify(body),
    }

    fetch(`http://localhost:${BACKEND_PORT}/${path}`, init)
      .then(response => response.json())
      .then(body => {
        if (body.error) {
          if (path.indexOf('play') === -1) {
            alert(body.error);
          } else {
            console.log('a failed call occured!')
          }
        } else {
          resolve(body);
        }
      });
  });
}

export default apiCall;
