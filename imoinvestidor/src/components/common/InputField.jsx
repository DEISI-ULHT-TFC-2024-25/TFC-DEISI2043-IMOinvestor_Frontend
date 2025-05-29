import PropTypes from 'prop-types';

export default function InputField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
  prefix = '',
  className = '',
  inputClassName = '',
  placeholder = '',
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          className="block mb-2 text-sm font-semibold text-[#0A2647]"
          htmlFor={name}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500 text-lg pointer-events-none">
            {prefix}
          </div>
        )}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`w-full p-3 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#CFAF5E] 
            ${prefix ? 'pl-12' : ''}
            ${inputClassName}`}
        />
      </div>
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  prefix: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
};
