const ContentCard = ({
  image,
  title,
  description,
  flip = false,
  variant = "default",
  className = "",
}) => {
  return (
    <div
      className={`${className} row g-md-4 p-0 m-0 g-4 align-items-center w-100`}
    >
      <div
        className={`col-12 col-md-6 col-lg-4 align-self-center rounded-3 ${
          flip ? "order-md-1" : "order-md-2"
        }`}
      >
        <img
          src={image}
          alt={image}
          width="100%"
          height="auto"
          className="rounded-3"
        />
      </div>
      <div
        className={`col-12 col-md-6 col-lg-8 ${
          flip ? "order-md-2" : "order-md-1"
        }`}
      >
        <div>
          {variant === "sm" ? (
            <h5 className="h5">{title}</h5>
          ) : (
            <h4 className="h4">{title}</h4>
          )}
          <p className="p1">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
