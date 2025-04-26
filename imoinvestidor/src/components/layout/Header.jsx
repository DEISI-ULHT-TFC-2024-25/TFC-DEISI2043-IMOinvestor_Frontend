import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import useAuth from "@hooks/useAuth";
import useRole from "@hooks/useRole";
import logo from "@images/logo.png";
import LanguageSelector from "@layout/LanguageSelector";
import UserDropdown from "@layout/UserDropdown";

export default function Header() {
  const { isLoggedIn } = useAuth();
  const { hasAnyRole } = useRole();

  const showCreateButton = isLoggedIn ? hasAnyRole(["AGENT", "PROMOTOR"]) : true;
  const createButtonLink = isLoggedIn ? "/create-add" : "/login";

  return (
    <nav className="bg-[#0A2647] text-white px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative py-2">

        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="IMOinvestor Logo" className="h-20 w-auto object-contain" />
        </Link>

        {showCreateButton && (
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex">
            <Link to={createButtonLink}>
              <button className="px-6 py-2 bg-[#CFAF5E] text-[#0A2647] font-semibold rounded-md hover:bg-[#b89a4e] transition">
                Criar Anúncio
              </button>
            </Link>
          </div>
        )}

        <div className="flex items-center gap-4">
          <LanguageSelector />

          <Link to="/favorites" className="hover:text-[#CFAF5E]">
            <Heart size={24} />
          </Link>

          {isLoggedIn ? (
            <UserDropdown />
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <button className="px-4 py-2 bg-[#CFAF5E] text-[#0A2647] font-semibold rounded-md hover:bg-[#b89a4e] transition">
                  Login
                </button>
              </Link>
              <Link to="/register" className="hidden md:block">
                <button className="px-4 py-2 border border-[#CFAF5E] text-[#CFAF5E] rounded-md hover:bg-[#CFAF5E] hover:text-[#0A2647] transition">
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
