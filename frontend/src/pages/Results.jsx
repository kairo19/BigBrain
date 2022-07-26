// import React, { useEffect, useState } from 'react';
// import apiCall from '../helpers/APICalls';
// import { useParams } from 'react-router-dom';

// let playerId = ''

// function Results () {
//   const [results, setResults] = useState({});
//   const params = useParams();

//   useEffect(async () => {
//     playerId = params.playerId;
//     const response = await apiCall(`play/${playerId}/results`, 'GET', {})
//     console.log('params is: ' + JSON.stringify(params));
//     console.log('params really is: ' + params.playerId)
//     setResults(response);
//     console.log('this wont show much: ' + results);
//     console.log(JSON.stringify(response));
//   }, [])

//   return (<>
//     <h1>Your results:</h1>
//     <div>
//       {
//         // <span>Question {questionId}</span>
//       }
//     </div>
//   </>)
// }

// export default Results;
