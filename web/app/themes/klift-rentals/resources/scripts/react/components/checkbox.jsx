const Checkbox = ({
  label,
  name,
  checked,
  onChange,
  disabled = false,
  reverse = false,
  className,
  checkboxClass,
  val
}) => {
  return (
    <div
      style={{
        padding: "0.5rem 1rem",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      className={`${reverse ? "flex-row-reverse" : ""} ${
        className ? className : ""
      } d-flex flex-row gap-2 w-100`}
    >
      <label
        htmlFor={name}
        className={`flex-1 ${
          reverse
            ? "text-opacity-60 text-secondary"
            : "text-opacity-40 text-secondary"
        }`}
      >
        {label}
      </label>
      <div className={`position-relative`} style={{ height: "1.25rem" }}>
        <input
          name={name}
          checked={checked}
          onChange={onChange}
          type="checkbox"
          value={val}
          disabled={disabled}
          className={`checkbox peer ${checkboxClass}`}
        />
        <svg
          className={`checkbox-icon show-on-checked ${checkboxClass}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    </div>
  );
};

export default Checkbox;
