import "../App.css";
import { Grid, Tooltip } from "@mui/material";

const Socials = () => {
  return (
    <div className="Socials">
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Tooltip title="LinkedIn">
          <Grid item>
            <img
              src={require("../assets/linkedin.png")}
              alt="LinkedIn"
              style={{ height: "3em", cursor: "pointer" }}
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/rocky-munoz/",
                  "_blank"
                )
              }
            />
          </Grid>
        </Tooltip>
        <Tooltip title="GitHub">
          <Grid item>
            <img
              src={require("../assets/github.png")}
              alt="Github"
              style={{ height: "3em", cursor: "pointer" }}
              onClick={() =>
                window.open("https://github.com/rmunoz33", "_blank")
              }
            />
          </Grid>
        </Tooltip>
        <Tooltip title="Codewars">
          <Grid item>
            <img
              src={require("../assets/codewars.png")}
              alt="Codewars"
              style={{ height: "3em", cursor: "pointer" }}
              onClick={() =>
                window.open("https://www.codewars.com/users/rmunoz33", "_blank")
              }
            />
          </Grid>
        </Tooltip>
      </Grid>
    </div>
  );
};

export default Socials;
