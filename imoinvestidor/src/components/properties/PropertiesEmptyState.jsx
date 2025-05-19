import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function PropertiesEmptyState({
  message,
  showButton = true,
  buttonLabel = "Adicionar Propriedade",
}) {
  const navigate = useNavigate();
  return (
    <div className="text-center mt-16 text-[#0A2647]">
      <h2 className="text-xl font-semibold mb-4">{message}</h2>
      {showButton && (
        <button
          onClick={() => navigate("/create-property")}
          className="bg-[#CFAF5E] text-white px-6 py-3 rounded-md hover:bg-[#b89a4e] transition"
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
}

PropertiesEmptyState.propTypes = {
  message: PropTypes.string.isRequired,
  showButton: PropTypes.bool,
  buttonLabel: PropTypes.string,
};