import ReactSelect from "react-select";

const Select = ({ options, placeholder, onChange }) => {
  return (
    <ReactSelect
      options={options}
      unstyled
      classNames={{
        placeholder: () => "text-secondary text-opacity-40",
        singleValue: () => "text-secondary",
        option: () => "bg-white p-2",
        dropdownIndicator: () => "text-secondary text-opacity-40",
        menu: () =>
          "bg-white text-secondary px-4 py-4 border border-top-0 border-opacity-20 rounded-2 rounded-top-0",
        control: (state) =>
          state.menuIsOpen
            ? "select-product-menu w-100 p1 rounded-2 rounded-bottom-0"
            : "select-product-menu w-100 p1 rounded-2",
      }}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Select;
