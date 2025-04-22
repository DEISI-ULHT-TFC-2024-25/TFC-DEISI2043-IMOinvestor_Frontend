import PropTypes from 'prop-types';

export default function CheckboxGroup({ label, options = [], selectedOptions = [], onChange }) {
  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-semibold text-[#0A2647]">
        {label}
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {options.map((opt, idx) => (
          <label key={idx} className="flex gap-2 items-center text-[#0A2647]">
            <input
              type="checkbox"
              checked={selectedOptions.includes(opt)}
              onChange={() => onChange(opt)}
              className="accent-[#0A2647]"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}

CheckboxGroup.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selectedOptions: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
