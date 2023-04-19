import "./App.css";

//base das nossas telas:

//vamos fzr nossa aplicacao em em cima de um card<<<<<<
import Card from "@material-ui/core/Card";
//o proprio card MUI tem actions
import CardActions from "@material-ui/core/CardActions";
//area de conteudo do nosso card
import CardContent from "@material-ui/core/CardContent";
//navegacao
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
//icones
import FavoriteIcon from "@material-ui/icons/Favorite";
import SchoolIcon from "@material-ui/icons/School";
import FaceIcon from "@material-ui/icons/Face";
// telas
import MatchList from "./Screens/MatchList";
import FindStudents from "./Screens/FindStudents";
import Profile from "./Screens/Profile";
import { useState } from "react";

function App() {
  //telas
  const ComponentStack = [<MatchList />, <FindStudents />, <Profile />];
  //set entre diferentes telas
  const [tab, setTab] = useState(1);

  return (
    <div className="App">
      <div className="App-body">
        <Card
          style={{
            flex: 1,
            marginTop: "1%", //alterei original
            display: "flex",
            marginBottom: "1%",
            flexDirection: "column",
            width: "100%",
            maxWidth: 600, //nao passa 600pixel
          }}
        >
          <CardContent
            style={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            {ComponentStack[tab]}
          </CardContent>
          <CardActions style={{ display: "flex" }}>
            <BottomNavigation
              style={{ flex: 1 }}
              defaultValue={tab}
              onChange={(newTab, value) => {
                console.log(value);
                setTab(value);
              }}
              showLabels
            >
              <BottomNavigationAction label="Match" icon={<FavoriteIcon />} />
              <BottomNavigationAction
                label="Estudantes"
                icon={<SchoolIcon />}
              />
              <BottomNavigationAction label="Perfil" icon={<FaceIcon />} />
            </BottomNavigation>
          </CardActions>{" "}
        </Card>
      </div>
    </div>
  );
}

export default App;
