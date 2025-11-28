import turtle from "../assets/flying_koopa_troopa.gif";
import "./FlyingTurtle.css";

const FlyingTurtle = () => {
  return (
    <div className="flying-turtle-container">
      <img alt="Flying Turtle" src={turtle} className="flying-turtle" />
    </div>
  );
};

export default FlyingTurtle;
