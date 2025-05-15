import PropTypes from "prop-types";

const SETTINGS_SECTIONS = [
  { id: "account", label: "Informações Pessoais" },
  { id: "security", label: "Segurança" },
  { id: "subscription", label: "Plano de Subscrição" },
  { id: "region", label: "Preferências Regionais" },
  { id: "notifications", label: "Notificações" },
  { id: "organization", label: "Organização" },
];

export default function SettingsSidebar({ activeSection, onSelect }) {
  return (
    <aside className="w-full sm:w-1/3 lg:w-1/4 border-r pr-6">
      <h2 className="text-lg font-semibold mb-10">Definições</h2>
      <ul className="space-y-8 text-sm text-[#0A2647] font-medium">
        {SETTINGS_SECTIONS.map((section) => (
          <li
            key={section.id}
            className={`cursor-pointer hover:underline transition-colors duration-150 ${
              activeSection === section.id ? "text-[#CFAF5E] font-semibold" : ""
            }`}
            onClick={() => onSelect(section.id)}
          >
            {section.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}

SettingsSidebar.propTypes = {
  activeSection: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
