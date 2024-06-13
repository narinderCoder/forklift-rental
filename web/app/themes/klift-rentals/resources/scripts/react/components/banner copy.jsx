const Banner = ({
  image,
  children,
  height,
  filter = "brightness(0.5)",
  className = "",
  childrenClassName = "",
}) => {
  return (
    <div className="position-relative w-100" style={{ height }}>
      <div
        className={`w-100 ${className ? className : ""}`}
        style={{
          backgroundImage: image ? `url(${image})` : "none",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          zIndex: 10,
          transform: "scaleX(-1)",
          filter: filter,
          height,
        }}
      ></div>
      <div
        className={`position-absolute d-flex flex-column align-items-center ${childrenClassName}`}
        style={{
          zIndex: 20,
          transform: "translateX(-50%) translateY(-50%)",
          top: "50%",
          left: "50%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Banner;
