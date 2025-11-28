import "./App.css";
import Introduction from "./components/IntroductionText";
import Socials from "./components/Socials";
import BackgroundFloor from "./components/BackgroundFloor";
import FlyingTurtle from "./components/FlyingTurtle";
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <div className="App">
      <FlyingTurtle />
      <div className="main-content">
        <div className="content-wrapper">
          <ChatBot />
          <Introduction />
        </div>
        <Socials />
      </div>
      <BackgroundFloor />
    </div>
  );
}

export default App;
