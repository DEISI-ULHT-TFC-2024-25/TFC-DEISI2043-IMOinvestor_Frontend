import { useEffect, useState } from "react";
import { getUser, updateUser } from "@services/authService";
import { updateUserProfile } from "@services/userService";
import { getOrganizationById } from "@services/organizationService";
import useAuth from "@hooks/useAuth";

import TextField from "@common/TextField";
import SelectField from "@common/SelectField";

export default function UserSettings() {
    const { setUser } = useAuth();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        date_of_birth: "",
        lang_key: "PT",
    });
    const [organization, setOrganization] = useState(null);

    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const userData = getUser();
        if (userData) {
        setFormData({
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            date_of_birth: userData.date_of_birth,
            lang_key: userData.lang_key || "PT",
        });

        if (userData.organization_ids?.[0]) {
            getOrganizationById(userData.organization_ids[0])
            .then(setOrganization)
            .catch(console.error);
        }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserProfile(formData);
            const updated = updateUser(formData);
            setUser?.(updated);
            setSuccessMessage("Dados atualizados com sucesso!");
        } catch (err) {
            setSuccessMessage("Erro ao atualizar: " + err.message);
        }

        setTimeout(() => setSuccessMessage(""), 3000);
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-[#0A2647] mb-6">Informações Pessoais</h1>

            {successMessage && (
                <div className="text-green-700 bg-green-100 border border-green-300 p-3 rounded mb-4">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <TextField
                label="Primeiro Nome"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                />

                <TextField
                label="Último Nome"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                />

                <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                />

                <TextField
                label="Data de Nascimento"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
                />

                <SelectField
                label="Idioma"
                name="lang_key"
                value={formData.lang_key}
                onChange={handleChange}
                options={[
                    { label: "Português", value: "PT" },
                    { label: "Inglês", value: "EN" },
                ]}
                />

                <div className="md:col-span-2 mt-6">
                <h2 className="text-xl font-semibold text-[#0A2647] mb-2">Organização</h2>
                {organization ? (
                    <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                    <p className="font-semibold text-lg">{organization.name}</p>
                    <p>{organization.city}, {organization.email}</p>
                    </div>
                ) : (
                    <p className="text-gray-500">Nenhuma organização associada.</p>
                )}
                </div>

                <div className="md:col-span-2 mt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition duration-200"
                    >
                        Guardar Alterações
                    </button>
                </div>
            </form>
        </div>
    );
}
