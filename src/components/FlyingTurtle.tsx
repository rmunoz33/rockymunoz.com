import turtle from "../assets/flying_koopa_troopa.gif";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    overflow: "hidden",
    position: "fixed",
    top: 0,
    zIndex: -1,
  },
  flyingTurtle: {
    height: "100px",
    marginTop: "0",
    animation: "$flyAcrossScreen 20s linear infinite",
  },
  "@keyframes flyAcrossScreen": {
    "0%": {
      transform: "translateX(-100%)",
    },
    "100%": {
      transform: "translateX(calc(100vw + 500px))",
    },
  },
}));

const FlyingTurtle = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <img alt="Flying Turtle" src={turtle} className={classes.flyingTurtle} />
    </div>
  );
};

export default FlyingTurtle;
