// import React from 'react';
// // import { useParams } from 'react-router-dom';
// import { Paper, Table, TableContainer, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
// // import apiCall from '../helpers/APICalls';

// function ResultsOverview () {
//   /*
//   const getResults = async () => {
//     const response = await apiCall(`play/${playerId}/results`, 'GET', {})
//     console.log(response);
//   }
//   */
//   function createData (
//     name: string,
//     score: number,
//   ) {
//     return { name, score };
//   }

//   const rows = [
//     createData('Frozen yoghurt', 159),
//     createData('Ice cream sandwich', 237),
//     createData('Eclair', 262),
//     createData('Cupcake', 305),
//     createData('Gingerbread', 356),
//   ];

//   return (<><div style={{ margin: '10pt' }}>
//     <h1>Here&apos;s how everyone did:</h1>
//     <Paper elevation={3} style={{ margin: '20pt 100pt', padding: '50pt' }}>
//       {/* Table of up to top 5 users and their score */}
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 1 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Player</TableCell>
//               <TableCell align="right">Score</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <TableRow
//                 key={row.name}
//                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//               >
//                 <TableCell component="th" scope="row">{row.name}</TableCell>
//                 <TableCell align="right">{row.score}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       {/* Bar/Line chart showing a breakdown of what percentage of people (Y axis) got certain questions (X axis) correct */}
//       {/* Some chart showing the average response/answer time for each question */}
//       {/* Any other interesting information you see fit */}
//     </Paper>
//   </div>
//   </>);
// }

// export default ResultsOverview;
