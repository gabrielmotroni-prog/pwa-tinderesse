import React, { Fragment } from "react";
import { Fab } from "@material-ui/core";

import { Favorite, Cancel } from "@material-ui/icons";

const StudentCard = (props) => {
  const { children, image, handleReject, handleLike } = props;
  return (
    <Fragment>
      <div
        style={{
          margin: 8,
          borderRadius: 16,
          display: "flex",
          flex: 1,
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "cover",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {children}
      </div>
      <div
        style={{
          zIndex: 1,
          marginTop: -42,
          width: "90%",
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "5%",
          marginRight: "5%",
        }}
      >
        <Fab onClick={handleReject} color="secondary" aria-label="Cancelar">
          <Cancel />
        </Fab>
        <Fab onClick={handleLike} color="primary" aria-label="Like">
          <Favorite />
        </Fab>
      </div>
    </Fragment>
  );
};

export default StudentCard;
