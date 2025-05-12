import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function PropertiesEmptyState({ orgName }) {
  const navigate = useNavigate();
  return (
    <div className="text-center mt-16 text-[#0A2647]">
      <h2 className="text-xl font-semibold mb-4">
        Ainda não existem propriedades para {orgName}.
      </h2>
      <button
        onClick={() => navigate("/create-property")}
        className="bg-[#CFAF5E] text-white px-6 py-3 rounded-md hover:bg-[#b89a4e] transition"
      >
        Adicionar Propriedade
      </button>
    </div>
  );
}

PropertiesEmptyState.propTypes = {
  orgName: PropTypes.string.isRequired,
};
