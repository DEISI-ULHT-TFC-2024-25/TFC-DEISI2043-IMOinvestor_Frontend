import EditableField from "@settings/EditableField";
import PropTypes from "prop-types";

export default function AccountInfo({ formData, onSave }) {
  const handleLangChange = (e) => {
    const lang = e.target.value;
    onSave("lang_key", lang);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#0A2647] mb-4">Informações Pessoais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EditableField
          label="Primeiro Nome"
          name="first_name"
          value={formData.first_name}
          onSave={onSave}
        />
        <EditableField
          label="Último Nome"
          name="last_name"
          value={formData.last_name}
          onSave={onSave}
        />
        <EditableField
          label="Email"
          name="email"
          value={formData.email}
          onSave={onSave}
        />
        <EditableField
          label="Data de Nascimento"
          name="date_of_birth"
          value={formData.date_of_birth}
          onSave={onSave}
        />

        <div className="space-y-1 w-full">
          <p className="text-sm text-gray-500">Idioma</p>
          <select
            name="lang_key"
            value={formData.lang_key}
            onChange={handleLangChange}
            className="border border-gray-300 rounded px-3 py-2 bg-white w-full"
          >
            <option value="PT">Português</option>
            <option value="EN">Inglês</option>
          </select>
        </div>
      </div>
    </div>
  );
}

AccountInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};
