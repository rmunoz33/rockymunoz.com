import "../App.css";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import { useState } from "react";

const Introduction = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="IntroText">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Grid
          container
          spacing={2}
          style={{ fontSize: "2em", fontWeight: "bolder" }}
          alignItems="center"
        >
          <Grid item>{isHovered ? "Hello!" : "¡Hola!"}</Grid>
          <Grid item>😃</Grid>
        </Grid>
      </div>
      <p>
        My name is <b>Rocky</b>. I like to make awesome software tools that
        enrich people's lives, whether in their work, play, or day-to-day
        experience. My weapons of choice are{" "}
        <Link onClick={() => window.open("https://react.dev/", "_blank")}>
          React
        </Link>
        ,{" "}
        <Link onClick={() => window.open("https://nodejs.org/en", "_blank")}>
          Node.js
        </Link>
        ,{" "}
        <Link
          onClick={() =>
            window.open(
              "https://dotnet.microsoft.com/en-us/languages/csharp",
              "_blank"
            )
          }
        >
          C#
        </Link>
        ,{" "}
        <Link onClick={() => window.open("https://www.mongodb.com/", "_blank")}>
          MongoDB
        </Link>
        , and{" "}
        <Link onClick={() => window.open("https://www.mysql.com/", "_blank")}>
          MySQL
        </Link>{" "}
        (and the occassional{" "}
        <Link onClick={() => window.open("https://www.zsh.org/", "_blank")}>
          Zsh
        </Link>{" "}
        script).
      </p>
      <p>
        I also try to have a good work-life balance, which means when I'm not
        working I'm probably spending time with my wife and kids, or exploring
        every inch of Hyrule.{" "}
        <img
          src={require("../assets/navi.gif")}
          alt="Navi"
          style={{ height: "30px" }}
        />
      </p>
      <p>
        If you're interested in working with me, feel free to{" "}
        <Link
          onClick={() => (window.location = "mailto:almostheresy@gmail.com")}
        >
          shoot your shot
        </Link>
        ! 👈🏼
      </p>
      <p>or 👇🏼</p>
    </div>
  );
};

export default Introduction;
