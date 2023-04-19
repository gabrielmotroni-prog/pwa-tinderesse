import React from "react";
//bd mockado
import mockList from "../mock.json";
//estilo em texto
import Typography from "@material-ui/core/Typography";
import MatchItem from "../Components/MatchItem";
import InfoLine from "../Components/InfoLine";

const MatchList = (props) => {
  const matchlist = mockList;
  const keys = Object.keys(matchlist);

  return (
    <div>
      <Typography>Match list</Typography>
      {keys.map((id) => (
        <MatchItem image={matchlist[id].image}>
          <InfoLine icon="assignment_ind" text={matchlist[id].name} />
          <InfoLine icon="chat" text={matchlist[id].whatsapp} />
        </MatchItem>
      ))}
    </div>
  );
};

export default MatchList;
