/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
export const quizQuestionPublicReturn = question => {
  // console.log('the og question is: ' + JSON.stringify(question) + '\n')
  // const deepCopy = {...question}
  const answerList = []
  question.answers.forEach(ans => answerList.push({response: ans.response}));
  // console.log('answerList is: ' + JSON.stringify(answerList))
  // console.log('See question: ', question);
  return {
    id: question.id,
    title: question.title,
    timeLimit: question.timeLimit,
    points: question.points,
    youtube: question.youtube,
    picture: question.picture,
    singleChoice: question.singleChoice,
    questions: answerList
  };
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
export const quizQuestionGetCorrectAnswers = question => {
  console.log('the question is: ' + JSON.stringify(question))
  const answerList = [];
  question.answers.forEach((ans, iter) => ans.correct ? answerList.push(iter) : '');
  return answerList // For a single answer
};

/*
 For a given data structure of a question, get the IDs of
 all of the answers, correct or incorrect.
*/
export const quizQuestionGetAnswers = question => {
  const answerList = [];
  question.answers.forEach((ans, iter) => answerList.push(iter));
  return answerList; // For a single answer
};

/*
 For a given data structure of a question, get the duration
 of the question once it starts. (Seconds)
*/
export const quizQuestionGetDuration = question => {
  return question.timeLimit;
};

/*
"questions": [
  Example Question Structure --> Single response
  {
    title: 'what is the question?',
    timeLimit: '20',
    points: '10',
    youtube: '',
    picture: '',
    singleChoice: true,
    answers: [
      {
        response: 'Blue,
        correct: true
      },
      {
        response: 'Yellow',
        correct: false
      },
    ]
  },

  Example Question Structure --> Multiple response, have to get all of them
  {
    title: 'what is the multiple answers question?',
    timeLimit: '20', #  should be in seconds,
    points: '10',  # whatever it is worth,
    youtube: '',
    picture: '',
    singleChoice: false,
    answers: [
      {
        response: 'Blue,
        correct: true
      },
      {
        response: 'Yellow',
        correct: true
      }
    ]
  },
]
*/