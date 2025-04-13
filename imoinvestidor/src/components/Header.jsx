import { useState } from "react";
import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";
import useAuth from '../hooks/useAuth';
import useRole from "../hooks/useRole";
import ROLES from "../constants/roles";

export default function Header() {
  const { isLoggedIn, user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { hasAnyRole } = useRole();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          ImoInvestor
        </Link>

        {(!isLoggedIn || hasAnyRole([ROLES.AGENT, ROLES.PROMOTOR])) && (
        <Link to="/create-add">
          <button className="px-4 py-2 bg-[#CFAF5E] text-white rounded-md hover:bg-[#b89a4e] transition">
            Criar Anúncio
          </button>
        </Link>
         )}

        <div className="flex gap-2 items-center">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 cursor-pointer hover:text-[#CFAF5E]"
              >
                <UserCircle size={24} />
                <span>{user?.user_name || "Utilizador"}</span>
              </button>

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
                <button className="px-4 py-2 bg-[#CFAF5E] text-white rounded-md hover:bg-[#b89a4e] transition">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-2 bg-[#CFAF5E] text-white rounded-md hover:bg-[#b89a4e] transition">
                  Registar
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
