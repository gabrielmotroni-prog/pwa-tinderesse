// 1 importar React
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";

// Statefull: classe

//primeira letra maiuscula
// class StudentInfo extends React.Component {
//   //contem toda parte de UI, codifo de fato que vai para tela
//   //pelo react dom
//   render() {
//     return (
//       <div>
//         <h1>Informacoes do Estudante:</h1>
//         <p> Nome: Gabriel Motroni </p>
//         <p> Interesses: React, Git e Github</p>
//       </div>
//     );
//   }
// }

// Stateless - funcional

const StudentInfo = (props) => {
  const [time, setTime] = useState(0);

  //executa uma vez quando objeto for montado
  useEffect(() => {
    setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  }, []); // so executa uma vez. nao observa ninguem

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "green",
        margin: 12,
        flex: props.flex,
      }}
    >
      <h1>Informacoes do Estudante:</h1>
    </div>
  );
};

export default StudentInfo;
