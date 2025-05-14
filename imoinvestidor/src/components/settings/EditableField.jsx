import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";

export default function EditableField({ label, name, value, onSave }) {
  const [editing, setEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value ?? "");

  useEffect(() => {
    if (editing) {
      setLocalValue(value ?? "");
    }
  }, [editing, value]);

  const handleCancel = () => {
    setLocalValue(value ?? "");
    setEditing(false);
  };

  const handleSave = () => {
    onSave(name, localValue.trim());
    setEditing(false);
  };

  return (
    <div className="space-y-1 w-full">
      <p className="text-sm text-gray-500">{label}</p>
      {editing ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            name={name}
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 bg-white w-full"
            autoFocus
          />
          <button
            type="button"
            className="text-green-600 hover:text-green-800"
            onClick={handleSave}
          >
            <Check size={18} />
          </button>
          <button
            type="button"
            className="text-red-500 hover:text-red-700"
            onClick={handleCancel}
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <p>{value || "—"}</p>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-blue-600 text-sm"
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );
}

EditableField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onSave: PropTypes.func.isRequired,
};
