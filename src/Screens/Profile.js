import React, { useState } from "react";
//estilo em texto
import Typography from "@material-ui/core/Typography";
//componente texto
import TextField from "@material-ui/core/TextField";
//botao
import Button from "@material-ui/core/Button";
//css
import "./Profile.css";

const Profile = (props) => {
  const defaultImage = "https://avatars.githubusercontent.com/u/60718584?v=4";

  //obter dados
  const StorageData = JSON.parse(localStorage.getItem("userDate")) || {};

  const [gitHubUser, setGitHubUser] = useState(StorageData.gitHubUser || "");
  const handleGitHubUserChange = (event) => {
    setGitHubUser(event.target.value);
  };
  const [name, setName] = useState(StorageData.name || "");
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const [whatsapp, setWhatsapp] = useState(StorageData.whatsapp || "");
  const handleWhatsAppChange = (event) => {
    setWhatsapp(event.target.value);
  };
  const [bio, setBio] = useState(StorageData.bio || "");
  const handleBioChange = (event) => {
    setBio(event.target.value);
  };
  const [image, setImage] = useState(StorageData.image || defaultImage);
  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const getGitHub = () => {
    console.log("cliquei github");
  };
  const saveChanges = () => {
    //dados dos campos
    const userDate = { gitHubUser, name, whatsapp, bio, image };
    //salvar localmente
    localStorage.setItem("userDate", JSON.stringify(userDate));
    console.log("cliquei salvar");
  };
  return (
    <div className="Profile-container">
      <Typography>Seu Perfil</Typography>
      <div className="Profile-info">
        <div className="Profile-picture-wrapper">
          <img
            src={defaultImage}
            alt="Foto de perfil"
            style={{ height: 140, width: 140 }}
          />
        </div>
        <form className="Profile-flex-full" noValidate autoComplete="off">
          <div className="Profile-form-wrapper">
            <TextField
              className="Profile-flex-full"
              id="github-username"
              value={gitHubUser}
              onChange={handleGitHubUserChange}
              label="Usuario do GitHub"
            />
            <TextField
              value={name}
              onChange={handleNameChange}
              className="Profile-flex-full"
              id="name"
              label="Nome"
            />
            <TextField
              value={whatsapp}
              onChange={handleWhatsAppChange}
              className="Profile-flex-full"
              id="whatsapp"
              label="Whatsapp"
            />
          </div>
        </form>
      </div>
      <div className="Profile-info">
        <TextField
          multiline
          rowsMax="4"
          onChange={handleBioChange}
          value={bio}
          className="Profile-flex-full"
          id="bio"
          label="bio"
        ></TextField>
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "flex-end",
          justifyContent: "space-around",
        }}
      >
        <Button onClick={getGitHub}>Buscar GitHub</Button>
        <Button onClick={saveChanges} color="primary">
          Salvar
        </Button>
      </div>
    </div>
  );
};
export default Profile;
