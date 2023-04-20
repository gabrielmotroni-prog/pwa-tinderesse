import React, { useEffect, useState } from "react";
//estilo em texto
import Typography from "@material-ui/core/Typography";
import StudentCard from "../Components/StudentCard";
import StudentBrief from "../Components/StudentBrief";
import mockList from "../mock.json";

const FindStudents = (props) => {
  //indice da lista de todos
  const [index, setIndex] = useState(0);
  //estudante atual na tela
  const [student, setStudent] = useState();
  //chaves dos objetos - ids
  const [keys, setKeys] = useState();
  //lista de todos
  const [studentList, setStudentList] = useState();

  //inicializar os estados dos states
  const initStudentList = () => {
    const userKeys = Object.keys(mockList);
    setKeys(userKeys);
    setStudentList(mockList);
    setStudent(userKeys[0]);
  };

  //executar ao objeto montar
  useEffect(() => {
    initStudentList();
  }, []);

  const defaultImage = "https://avatars.githubusercontent.com/u/60718584?v=4";

  //atualizar indice
  const nextStudent = () => {
    const nextStudentIndex = index + 1;
    setIndex(nextStudentIndex);
    setStudent(keys[nextStudentIndex]);
    console.log(studentList[student].name);
  };

  const handleLike = () => {
    nextStudent();
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        padding: "5% 5% 0 5%",
        flexDirection: "column",
      }}
    >
      <Typography>Encontre estudantes</Typography>
      {studentList && studentList[student] && (
        <StudentCard
          image={studentList[student].image}
          handleReject={nextStudent}
          handleLike={handleLike}
        >
          <StudentBrief
            name={studentList[student].name}
            bio={studentList[student].bio}
          ></StudentBrief>
        </StudentCard>
      )}
    </div>
  );
};

export default FindStudents;
