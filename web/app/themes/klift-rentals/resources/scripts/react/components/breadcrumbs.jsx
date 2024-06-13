const Breadcrumbs = ({ data = [] }) => {
  return (
    <div className="d-flex align-items-end gap-3 p1">
      {data.map((item, index) => (
        <div key={index} className="d-flex align-items-end gap-3">
          <a href={item?.url}>
            <p
              className={`line-clamp-1 ${
                index === data.length - 1
                  ? "text-primary text-opacity-100"
                  : "text-secondary text-opacity-60"
              }`}
            >
              {item.name}
            </p>
          </a>
          {index < data.length - 1 ? (
            <p className="text-secondary text-opacity-40">|</p>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
