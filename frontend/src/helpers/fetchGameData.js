import apiCall from './APICalls';

const fetchGameData = async (quizId) => {
  const response = await apiCall(`admin/quiz/${quizId}`, 'GET', {
    quizid: quizId
  });
  return response;
}

export default fetchGameData;
