const BackgroundFloor = () => {
  return (
    <img
      alt="Mario Background"
      src={require("../assets/mario_floor.png")}
      style={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        zIndex: -1,
        left: 0,
        right: 0,
      }}
    />
  );
};

export default BackgroundFloor;
