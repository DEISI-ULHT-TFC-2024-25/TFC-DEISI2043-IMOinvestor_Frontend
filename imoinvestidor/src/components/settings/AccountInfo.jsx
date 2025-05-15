import EditableField from "@settings/EditableField";
import PropTypes from "prop-types";

export default function AccountInfo({ formData, onSave }) {
  const handleLangChange = (e) => {
    const lang = e.target.value;
    onSave("lang_key", lang);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A2647] mb-10">Informações Pessoais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
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

        <div className="md:col-span-2 md:w-1/2">
          <label htmlFor="lang_key" className="block text-sm font-semibold text-[#0A2647] mb-2">
            Idioma
          </label>
          <select
            name="lang_key"
            id="lang_key"
            value={formData.lang_key}
            onChange={handleLangChange}
            className="border border-gray-300 rounded w-full p-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#CFAF5E]"
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
