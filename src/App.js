import "./App.css";
import Introduction from "./components/IntroductionText";
import Socials from "./components/Socials";
import { Grid } from "@mui/material";
import BackgroundFloor from "./components/BackgroundFloor";
import FlyingTurtle from "./components/FlyingTurtle";
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <div className="App">
      <FlyingTurtle />
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        style={{
          zIndex: 1,
          maxHeight: "calc(100vh - 60px)",
          minWidth: "100%",
          overflow: "auto",
        }}
        spacing={2}
      >
        <Grid item xs={6}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={10}>
              <ChatBot />
              <Introduction />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Socials />
          </Grid>
        </Grid>
      </Grid>
      <BackgroundFloor />
    </div>
  );
}

export default App;
