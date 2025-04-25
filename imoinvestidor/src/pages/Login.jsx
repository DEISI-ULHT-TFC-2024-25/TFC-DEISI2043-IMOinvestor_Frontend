import { useState } from "react";
import PropTypes from "prop-types";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import useAuth from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SocialLoginButton = ({ provider }) => (
  <button className="w-full flex items-center justify-center mb-3 border rounded p-2 hover:bg-gray-100">
    Continuar com {provider.charAt(0).toUpperCase() + provider.slice(1)}
  </button>
);

SocialLoginButton.propTypes = {
  provider: PropTypes.string.isRequired,
};

export default function Login() {
  const [formData, setFormData] = useState({ user_name: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData);
    if (success) navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="bg-[#0A2647] text-white border-b py-6">
          <h1 className="text-2xl font-bold text-center">Login</h1>
        </div>
        <div className="p-8">
          <div className="mb-6 space-y-3">
            <SocialLoginButton provider="facebook" />
            <SocialLoginButton provider="apple" />
            <SocialLoginButton provider="google" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="user_name"
              placeholder="Utilizador"
              value={formData.user_name}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Senha"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded p-2 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button 
              type="submit" 
              className="w-full bg-[#CFAF5E] text-white py-2 rounded hover:bg-yellow-600"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            Ainda não tem uma conta? <a href="/register" className="text-blue-600">Registre-se</a>
          </p>
        </div>
      </div>
    </div>
  );
}