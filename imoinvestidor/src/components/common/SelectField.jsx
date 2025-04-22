import PropTypes from "prop-types";

export default function SelectField({ label, name, options, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 font-semibold text-sm text-[#0A2647]">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded w-full p-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#CFAF5E]"
      >
        <option value="">Selecione</option>
        {options.map((option, idx) => (
          <option key={idx} value={option.value ?? option}>
            {option.label ?? option}
          </option>
        ))}
      </select>
    </div>
  );
}

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
};
