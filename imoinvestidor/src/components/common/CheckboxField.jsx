import PropTypes from 'prop-types';

export default function CheckboxField({
  label,
  name,
  checked,
  onChange,
  className = '',
  disabled = false,
}) {
  return (
    <label
      className={
        `flex items-center gap-2 text-[#0A2647] font-medium ${className}`
      }
    >
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="h-4 w-4 accent-[#0A2647]"
      />
      <span>{label}</span>
    </label>
  );
}

CheckboxField.propTypes = {
  label:    PropTypes.string.isRequired,
  name:     PropTypes.string,
  checked:  PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  className:PropTypes.string,
  disabled: PropTypes.bool,
};