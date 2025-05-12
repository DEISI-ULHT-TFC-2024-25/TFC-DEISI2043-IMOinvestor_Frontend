import PropTypes from "prop-types";
import { Search } from "lucide-react";

export default function SearchInput({ value, onChange, placeholder = "Pesquisar..." }) {
  return (
    <div className="relative max-w-md w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-gray-300 px-4 py-3 pr-12 rounded-lg text-[#0A2647] w-full focus:outline-none focus:ring-2 focus:ring-[#CFAF5E]"
      />
      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#0A2647]">
        <Search size={18} />
      </span>
    </div>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};
