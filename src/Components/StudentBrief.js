import React from "react";
import { Typography } from "@material-ui/core";

import "./StudentBrief.css";

const StudentBrief = (props) => {
  const { name, bio } = props;
  return (
    <div
      style={{
        margin: 16,
        marginBottom: 42,
      }}
    >
      <Typography className="StudentBrief-text-style">
        {name} : {bio}
      </Typography>
    </div>
  );
};

export default StudentBrief;
