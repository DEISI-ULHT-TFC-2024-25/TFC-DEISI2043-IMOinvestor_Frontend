import { useState } from "react";
import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const { isLoggedIn, user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold">
        <Link to="/">ImoInvestor</Link>
      </div>
      <button className="px-4 py-2 bg-[#CFAF5E] text-white rounded-md hover:bg-[#b89a4e] transition">
        Criar Anúncio
      </button>
      <div className="flex gap-4 items-center">
        {isLoggedIn ? (
          <div className="relative">
            <div className="flex items-center gap-2 cursor-pointer" onClick={toggleDropdown}>
              <UserCircle size={24} />
              <span>{user?.name || "Usuário"}</span>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-10">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                  Meu Perfil
                </Link>
                <Link to="/investments" className="block px-4 py-2 hover:bg-gray-100">
                  Meus Investimentos
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="px-4 py-2 bg-[#CFAF5E] text-white rounded-md">Login</button>
            </Link>
            <Link to="/register">
              <button className="px-4 py-2 bg-[#CFAF5E] text-white rounded-md">Registar</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
