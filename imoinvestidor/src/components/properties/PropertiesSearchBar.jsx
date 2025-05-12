import PropTypes from "prop-types";
import SearchInput from "@common/SearchInput";

export default function PropertiesSearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="mb-6">
      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Procurar propriedade por nome..."
      />
    </div>
  );
}

PropertiesSearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};
