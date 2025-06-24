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
  min,
  preventNegative = false,
  ...rest
}) {
  const handleChange = (e) => {
    let newValue = e.target.value;
    
    // Handle negative value prevention for number inputs
    if (preventNegative && type === 'number') {
      const numValue = parseFloat(newValue);
      if (!isNaN(numValue) && numValue < 0) {
        newValue = '0';
      } else if (newValue === '-' || newValue === '-0') {
        newValue = '';
      }
    }
    
    // If the value hasn't changed, pass the original event
    if (newValue === e.target.value) {
      onChange(e);
      return;
    }
    
    // Create a new event object that preserves the original event structure
    const modifiedEvent = {
      ...e,
      target: {
        ...e.target,
        name: e.target.name, // Explicitly preserve the name
        value: newValue
      }
    };
    
    onChange(modifiedEvent);
  };

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
          onChange={handleChange}
          required={required}
          placeholder={placeholder}
          min={preventNegative && type === 'number' ? (min || '0') : min}
          className={`w-full p-3 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#CFAF5E] 
            ${prefix ? 'pl-12' : ''}
            ${inputClassName}`}
          {...rest}
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
  min: PropTypes.string,
  preventNegative: PropTypes.bool,
};