import "../App.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Introduction = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="IntroText">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          style={{
            display: "flex",
            gap: "16px",
            fontSize: "2em",
            fontWeight: "bolder",
            alignItems: "center",
          }}
        >
          <span className="Greeting">{isHovered ? "Hello!" : "¡Hola!"}</span>
        </div>
      </div>
      <p>
        My name is <b>Rocky</b>. I like to make awesome software tools that
        enrich people's lives, whether in their work, play, or day-to-day
        experience. My weapons of choice are{" "}
        <Link
          onClick={() => window.open("https://react.dev/", "_blank")}
          to="#"
        >
          React
        </Link>
        ,{" "}
        <Link
          onClick={() => window.open("https://nodejs.org/en", "_blank")}
          to="#"
        >
          Node.js
        </Link>
        ,{" "}
        <Link
          onClick={() => window.open("https://www.python.org/", "_blank")}
          to="#"
        >
          Python
        </Link>
        ,{" "}
        <Link
          onClick={() => window.open("https://www.langchain.com/", "_blank")}
          to="#"
        >
          LangChain
        </Link>
        , and{" "}
        <Link
          onClick={() => window.open("https://www.mysql.com/", "_blank")}
          to="#"
        >
          MySQL
        </Link>{" "}
        (and the occasional{" "}
        <Link
          onClick={() => window.open("https://www.zsh.org/", "_blank")}
          to="#"
        >
          Zsh
        </Link>{" "}
        script).
      </p>
      <p>
        I also try to have a good work-life balance, which means when I'm not
        working I'm probably spending time with my wife and kids, or exploring
        every inch of Hyrule.
      </p>
      <p>
        If you're interested in working with me, feel free to{" "}
        <Link
          onClick={() =>
            (window.location.href = "mailto:almostheresy@gmail.com")
          }
          to="#"
        >
          shoot your shot
        </Link>
        ! Or click the chat icon in the bottom right to talk to a chatbot I
        trained to answer questions about me.
      </p>
    </div>
  );
};

export default Introduction;
