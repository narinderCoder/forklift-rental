const ProductButton = ({ image, title, icon, className, ...props }) => {
  const Icon = icon ? icon : null;
  return (
    <button className={`product-button ${className}`} {...props}>
      {image ? (
        <img
          src={image}
          alt={image}
          width={20}
          height={20}
          className="text-primary"
        />
      ) : null}
      {icon ? <Icon className="text-primary" /> : null}
      <p className="p1 text-secondary" style={{ opacity: 0.6 }}>
        {title}
      </p>
    </button>
  );
};

export default ProductButton;
