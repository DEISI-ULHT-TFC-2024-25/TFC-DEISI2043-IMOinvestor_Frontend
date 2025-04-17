import { useState } from "react";
import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import logo from "../images/logo.png";

export default function Header() {
  const { isLoggedIn, user, logout } = useAuth();
  const { hasAnyRole } = useRole();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const showCreateButton = isLoggedIn ? hasAnyRole(["AGENT", "PROMOTOR"]) : true;
  const buttonLink = isLoggedIn ? "/create-add" : "/login";

  return (
    <nav className="bg-[#0A2647] text-white px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="IMOinvestor Logo" className="h-20 w-auto object-contain" />
        </Link>

        {showCreateButton && (
          <Link to={buttonLink}>
            <button className="px-4 py-2 bg-[#CFAF5E] text-white rounded-md hover:bg-[#b89a4e] transition hidden md:block">
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
            <div className="flex gap-2">
              <Link to="/login">
                <button className="px-4 py-2 bg-[#CFAF5E] text-white rounded-md hover:bg-[#b89a4e] transition">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-2 bg-[#CFAF5E] text-white rounded-md hover:bg-[#b89a4e] transition hidden md:block">
                  Registar
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
