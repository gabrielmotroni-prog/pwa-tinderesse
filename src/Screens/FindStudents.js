import React, { useEffect, useState } from "react";
//estilo em texto
import Typography from "@material-ui/core/Typography";
import StudentCard from "../Components/StudentCard";
import StudentBrief from "../Components/StudentBrief";
//import mockList from "../mock.json";
import { checkLikes, getUsers, likeUser, setMatch } from "../Service/FireStore";

const FindStudents = (props) => {
  //obter usuario atual localStorage
  const StorageData = JSON.parse(localStorage.getItem("userDate")) || {};
  const { gitHubUser } = StorageData;

  //indice da lista de todos
  const [index, setIndex] = useState(0);
  //estudante atual na tela
  const [student, setStudent] = useState();
  //chaves dos objetos - ids
  const [keys, setKeys] = useState();
  //lista de todos
  const [studentList, setStudentList] = useState();
  // quando ocorre match mutou
  const [isMatchHappening, setIsMatchHappening] = useState(false);

  //obter chaves usuarios DB remoto
  const getUserKeys = async () => {
    const users = await getUsers();
    return Object.keys(users);
  };

  //inicializar os estados dos states
  const initStudentList = async () => {
    const userKeys = await getUserKeys();
    setKeys(userKeys);
    setStudentList(await getUsers());
    setStudent(userKeys[0]);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(
          "A minha localização é: ",
          position.coords.latitude,
          "latitude, e ",
          position.coords.longitude,
          "longitude"
        );
      });
    }
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
  };

  // like mutuo: tanto usuario dar e receber like
  const handleMatch = () => {
    //troca texto
    setIsMatchHappening(true);
    //registra match DB
    setMatch(studentList[student], gitHubUser);
    //registra localmente
    const matchList = JSON.parse(localStorage.getItem("matchList")) || {};
    console.log(student);
    matchList[student] = {
      name: studentList[student].name,
      whatsapp: studentList[student].whatsapp,
      image: studentList[student].image,
    };
    localStorage.setItem("matchList", JSON.stringify(matchList));
    //
    // vibra quando ocorrer match -  se estiver disponivel
    if (navigator.vibrate) {
      //promove intervalos entre vibracoes
      navigator.vibrate([200, 200, 400, 400, 800, 800, 200, 200]);
    }
    //apos 3s aviso de match some na tela
    setTimeout(() => {
      setIsMatchHappening(false);
      nextStudent();
    }, 3000);
  };

  const handleLike = async () => {
    //usuario aberto na tela | usuario salvado navegante
    likeUser(studentList[student], gitHubUser);

    //obter likes em nome do usuario atual
    const myLike = await checkLikes(gitHubUser);

    //verifica se houve match mutuo
    const isStudentInMyList = myLike && myLike[studentList[student].gitHubUser];
    if (isStudentInMyList) {
      handleMatch();
      console.log("Its a match!");
    } else {
      console.log("Não foi ainda");
      nextStudent();
    }
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
            name={isMatchHappening ? "Parabéns!" : studentList[student].name}
            bio={
              isMatchHappening
                ? "Você tem um novo match, confira na aba de matches"
                : studentList[student].bio
            }
          ></StudentBrief>
        </StudentCard>
      )}
    </div>
  );
};

export default FindStudents;
