import React from "react";
//estilo em texto
import Typography from "@material-ui/core/Typography";
import StudentCard from "../Components/StudentCard";
import StudentBrief from "../Components/StudentBrief";

const FindStudents = (props) => {
  const defaultImage = "https://avatars.githubusercontent.com/u/60718584?v=4";

  const nextStudent = () => {
    console.log("proximo estudante");
  };

  const handleLike = () => {
    console.log("gostei");
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
      <StudentCard
        image={defaultImage}
        handleReject={nextStudent}
        handleLike={handleLike}
      >
        <StudentBrief name={"Gabriel"} bio={"Desenvolvedor"}></StudentBrief>
      </StudentCard>
    </div>
  );
};

export default FindStudents;
