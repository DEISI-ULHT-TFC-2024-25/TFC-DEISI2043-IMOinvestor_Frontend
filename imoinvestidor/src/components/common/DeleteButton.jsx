import PropTypes from "prop-types";
import { Trash2 } from "lucide-react";

export default function DeleteButton({ onClick, title = "Eliminar", size = 16 }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="absolute top-1 right-1 p-1 bg-white bg-opacity-75 rounded-full cursor-pointer hover:bg-red-100 transition"
    >
        <Trash2 size={size} className="text-red-600" />
    </button>
  );
}

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  title:   PropTypes.string,
  size:    PropTypes.number,
};
