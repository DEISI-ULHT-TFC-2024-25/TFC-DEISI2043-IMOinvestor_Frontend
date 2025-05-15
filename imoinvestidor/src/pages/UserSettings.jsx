import { useEffect, useState } from "react";
import { getUser, updateUser } from "@services/authService";
import { updateUserProfile } from "@services/userService";
import { getOrganizationById } from "@services/organizationService";
import useAuth from "@hooks/useAuth";

import AccountInfo from "@settings/AccountInfo";
import OrganizationInfo from "@settings/OrganizationInfo";
import Security from "@settings/Security";
import Subscription from "@settings/Subscription";
import Region from "@settings/Region";
import Notifications from "@settings/Notifications";

const fieldLabels = {
  first_name: "Primeiro Nome",
  last_name: "Último Nome",
  email: "Email",
  date_of_birth: "Data de Nascimento",
  phone: "Telefone",
  lang_key: "Idioma",
};

const SETTINGS_SECTIONS = [
  { id: "account", label: "Informações Pessoais" },
  { id: "security", label: "Segurança" },
  { id: "subscription", label: "Plano de Subscrição" },
  { id: "region", label: "Preferências Regionais" },
  { id: "notifications", label: "Notificações" },
  { id: "organization", label: "Organização" },
];

export default function UserSettingsPage() {
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    phone: "",
    lang_key: "PT",
  });
  const [organization, setOrganization] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [activeSection, setActiveSection] = useState("account");

  useEffect(() => {
    const userData = getUser();
    if (userData) {
      setFormData({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        date_of_birth: userData.date_of_birth,
        phone: userData.phone,
        lang_key: userData.lang_key || "PT",
      });
      if (userData.organization_ids?.[0]) {
        getOrganizationById(userData.organization_ids[0])
          .then(setOrganization)
          .catch(console.error);
      }
    }
  }, []);

  const handleFieldSave = (field, value) => {
    if (formData[field] === value) return;
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);

    updateUserProfile(updatedData)
      .then(() => {
        const updated = updateUser(updatedData);
        setUser?.(updated);
        const label = fieldLabels[field] || field;
        setSuccessMessage(`Campo "${label}" atualizado com sucesso.`);
      })
      .catch((err) => {
        const label = fieldLabels[field] || field;
        setSuccessMessage(`Erro ao atualizar "${label}": ${err.message}`);
      });

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "account":
        return <AccountInfo formData={formData} onSave={handleFieldSave} />;
      case "security":
        return <Security />;
      case "subscription":
        return <Subscription />;
      case "region":
        return <Region langKey={formData.lang_key} onChange={handleFieldSave} />;
      case "notifications":
        return <Notifications />;
      case "organization":
        return <OrganizationInfo organization={organization} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex max-w-6xl mx-auto mt-8 p-4 gap-10">
      <aside className="w-1/4 border-r pr-4">
        <h2 className="text-lg font-semibold mb-4">Definições</h2>
        <ul className="space-y-3 text-sm text-[#0A2647] font-medium">
          {SETTINGS_SECTIONS.map((section) => (
            <li
              key={section.id}
              className={`cursor-pointer hover:underline ${activeSection === section.id ? "text-[#CFAF5E] font-semibold" : ""}`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.label}
            </li>
          ))}
        </ul>
      </aside>

      <section className="flex-1 space-y-6">
        {successMessage && (
          <div className="text-green-700 bg-green-100 border border-green-300 p-3 rounded">
            {successMessage}
          </div>
        )}

        {renderSection()}
      </section>
    </div>
  );
}
