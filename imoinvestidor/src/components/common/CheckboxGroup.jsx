import PropTypes from 'prop-types';
import CheckboxField from '@common/CheckboxField';

export default function CheckboxGroup({
  label,
  options = [],
  selectedOptions = [],
  onChange,
}) {
  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-semibold text-[#0A2647]">
        {label}
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {options.map((opt, idx) => (
          <CheckboxField
            key={idx}
            label={opt}
            name={`extra_${opt}`}
            checked={selectedOptions.includes(opt)}
            onChange={() => onChange(opt)}
          />
        ))}
      </div>
    </div>
  );
}

CheckboxGroup.propTypes = {
  label:           PropTypes.string.isRequired,
  options:         PropTypes.array.isRequired,
  selectedOptions: PropTypes.array.isRequired,
  onChange:        PropTypes.func.isRequired,
};