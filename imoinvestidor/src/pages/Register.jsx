import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { register } from "../services/authService";
import { fetchOrganizations } from "../services/organizationService";

const PasswordRequirements = () => (
  <div className="text-red-600 text-sm mt-2">
    A tua password deve ter:
    <ul className="list-disc pl-5">
      <li>8 ou mais caracteres</li>
      <li>Pelo menos 1 letra maiúscula</li>
      <li>Pelo menos uma letra minúscula</li>
      <li>Pelo menos um número</li>
    </ul>
  </div>
);

const SocialLoginButton = ({ provider }) => (
  <button className="w-full flex items-center justify-center mb-3 border rounded p-2 hover:bg-gray-100">
    Continuar com {provider.charAt(0).toUpperCase() + provider.slice(1)}
  </button>
);

SocialLoginButton.propTypes = {
  provider: PropTypes.string.isRequired
};

export default function Registration() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [organizations, setOrganizations] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    preferredLanguage: "",
    role: "",
    organization: "",
    department: "",
    jobTitle: "",
    termsAccepted: false,
    receiveUpdates: false,
  });

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        const data = await fetchOrganizations();
        setOrganizations(data);
      } catch (err) {
        console.error("Erro ao carregar organizações:", err);
      }
    };
    loadOrganizations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name, checked) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      const requiresOrganization = ["agente", "promotor"].includes(formData.role);
  
      const institution_ids =
        requiresOrganization && formData.organization
          ? [parseInt(formData.organization)]
          : null;
  
      const payload = {
        ...formData,
        institution_ids,
      };
  
      await register(payload);
      console.log("Registo efetuado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro no registo:", error.message);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="bg-[#0A2647] text-white border-b py-6">
          <h1 className="text-2xl font-bold text-center">Registro de Utilizador</h1>
        </div>
        <div className="p-8 text-[#3A3A3A]">
          {step === 1 && (
            <div className="transition-all duration-300 ease-in-out transform">
              <div className="mb-6 space-y-3">
                <SocialLoginButton provider="facebook" />
                <SocialLoginButton provider="apple" />
                <SocialLoginButton provider="google" />
              </div>
              <h2 className="text-xl font-semibold mb-8">Informações Pessoais</h2>
              <div className="grid grid-cols-2 gap-6">
                <input type="text" name="name" placeholder="Primeiro Nome" value={formData.name} onChange={handleChange} className="border rounded p-2" />
                <input type="text" name="surname" placeholder="Último Nome" value={formData.surname} onChange={handleChange} className="border rounded p-2" />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border rounded p-2" />
                <input type="text" name="phone_number" placeholder="Telefone" value={formData.phone_number} onChange={handleChange} className="border rounded p-2" />
                <input type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} className="col-span-2 border rounded p-2" />
                <PasswordRequirements />
                <input type="password" name="confirmPassword" placeholder="Confirmar Senha" value={formData.confirmPassword} onChange={handleChange} className="col-span-2 border rounded p-2" />
                <input type="date" name="birthDate" placeholder="Data de Nascimento" value={formData.birthDate} onChange={handleChange} className="col-span-2 border rounded p-2" />
                <select name="preferredLanguage" value={formData.preferredLanguage} onChange={handleChange} className="col-span-2 border rounded p-2">
                  <option value="">Linguagem Preferida</option>
                  <option value="pt">Português</option>
                  <option value="eng">Inglês</option>
                </select>
                <button onClick={nextStep} className="col-span-2 mt-4 bg-[#CFAF5E] text-white py-2 rounded hover:bg-yellow-600">
                  Próximo
                </button>
                <p className="col-span-2 text-sm text-center mt-4">
                  já tem conta? <a href="/login" className="text-blue-600">Faça login</a>
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="transition-all duration-300 ease-in-out transform">
              <h2 className="text-xl font-semibold mb-8 text-gray-800">Detalhes Profissionais</h2>
              <select
                name="role_id"
                value={formData.role_id}
                onChange={handleChange}
                className="w-full border rounded p-2 mb-4"
              >
                <option value="">Selecione um papel</option>
                <option value="3">Investidor</option>
                <option value="4">Agente</option>
                <option value="5">Promotor</option>
              </select>

              {["4", "5"].includes(formData.role_id) && (
                <select
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="col-span-2 border rounded p-2"
                >
                  <option value="">Selecione uma organização</option>
                  {organizations.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </select>
              )}
              
              <div className="flex flex-col mt-6 space-y-4">
                <label className="flex items-center">
                  <input type="checkbox" checked={formData.termsAccepted} onChange={(e) => handleCheckboxChange("termsAccepted", e.target.checked)} className="mr-2" />
                  Ao clicar no botão aceito os Termos e Condições
                </label>
                <label className="flex items-center">
                  <input type="checkbox" checked={formData.receiveUpdates} onChange={(e) => handleCheckboxChange("receiveUpdates", e.target.checked)} className="mr-2" />
                  Sim, eu quero receber atualizações sobre produtos e serviços, promoções, ofertas especiais, novidades e eventos.
                </label>
              </div>

              <div className="col-span-2 flex justify-between space-x-4 mt-4">
                <button onClick={prevStep} className="w-full border rounded py-2 hover:bg-gray-100">Voltar</button>
                <button onClick={handleSubmit} className="w-full bg-[#CFAF5E] text-white py-2 rounded hover:bg-yellow-600">Finalizar</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
