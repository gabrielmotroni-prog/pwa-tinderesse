import React, { useState } from "react";
import axios from "axios";
//estilo em texto
import Typography from "@material-ui/core/Typography";
//componente texto
import TextField from "@material-ui/core/TextField";
//botao
import Button from "@material-ui/core/Button";
//alert - plus feito por mim
import Alert from "@mui/material/Alert";
//css
import "./Profile.css";
import { setUser } from "../Service/FireStore";
//permisao push notification
import { requestPermision } from "../Service/PushNotificatons";

const Profile = (props) => {
  const defaultImage =
    "https://cdn-icons-png.flaticon.com/512/16/16363.png?w=1060&t=st=1682014089~exp=1682014689~hmac=94e5fbf63dbfcd6c1a6e2d0d4728dae181af0fef63e3eee773bac852e1d28eab";

  //alert 404
  const [alertError, setAlertError] = useState(false);

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

  const getGitHub = async () => {
    //buscar user api github
    try {
      const response = await axios.get(
        `https://api.github.com/users/${gitHubUser}`
      );

      const {
        data: { name, bio, avatar_url, followers, public_repos },
      } = response;
      console.log(bio);
      setName(name);
      setBio(bio);
      setImage(avatar_url);
    } catch (error) {
      error.request.status === 404 ? setAlertError(true) : console.log();
      setName("");
      setBio("");
      setWhatsapp("");
      setImage(defaultImage);
    }

    console.log("cliquei github");
  };
  const saveChanges = () => {
    //dados dos campos
    const userDate = { gitHubUser, name, whatsapp, bio, image };
    //salvar localmente
    localStorage.setItem("userDate", JSON.stringify(userDate));
    //salvar no DB remoto
    setUser(userDate);
    console.log("cliquei salvar");
    //permisao para push notifications
    requestPermision();
  };
  return (
    <div className="Profile-container">
      <Typography>Seu Perfil</Typography>
      <div className="Profile-info">
        <div className="Profile-picture-wrapper">
          <img
            src={image}
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
            {alertError && (
              <Alert
                severity="error"
                onClose={() => {
                  setAlertError(false);
                }}
              >
                Usuário não encontrado
              </Alert>
            )}
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
