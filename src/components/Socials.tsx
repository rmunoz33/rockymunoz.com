import "../App.css";

const Socials = () => {
  const iconStyle: React.CSSProperties = {
    height: "3em",
    cursor: "pointer",
  };

  return (
    <div style={{ display: "flex", gap: "16px", justifyContent: "center", alignItems: "center" }}>
      <img
        src={require("../assets/linkedin.png")}
        alt="LinkedIn"
        title="LinkedIn"
        style={iconStyle}
        onClick={() =>
          window.open("https://www.linkedin.com/in/rocky-munoz/", "_blank")
        }
      />
      <img
        src={require("../assets/github.png")}
        alt="Github"
        title="GitHub"
        style={iconStyle}
        onClick={() => window.open("https://github.com/rmunoz33", "_blank")}
      />
      <img
        src={require("../assets/codewars.png")}
        alt="Codewars"
        title="Codewars"
        style={iconStyle}
        onClick={() =>
          window.open("https://www.codewars.com/users/rmunoz33", "_blank")
        }
      />
    </div>
  );
};

export default Socials;
