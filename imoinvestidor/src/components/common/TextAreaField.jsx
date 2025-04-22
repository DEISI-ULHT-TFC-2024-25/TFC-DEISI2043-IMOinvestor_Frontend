import PropTypes from 'prop-types';

export default function TextAreaField({ label, name, value, onChange, rows = 5, required = false }) {
  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-semibold text-[#0A2647]" htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        className="border border-gray-300 rounded w-full p-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#CFAF5E]"
      ></textarea>
    </div>
  );
}

TextAreaField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.number,
  required: PropTypes.bool,
};
