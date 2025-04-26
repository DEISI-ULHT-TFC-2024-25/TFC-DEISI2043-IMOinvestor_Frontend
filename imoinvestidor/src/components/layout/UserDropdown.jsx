import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";
import Dropdown from "@common/Dropdown";
import useAuth from "@hooks/useAuth";

export default function UserDropdown() {
  const { user, logout } = useAuth();

  return (
    <Dropdown
      trigger={
        <div className="flex items-center gap-2 hover:text-[#CFAF5E]">
          <UserCircle size={24} />
          <span className="hidden sm:inline">{user?.user_name || "Utilizador"}</span>
        </div>
      }
    >
      {(close) => (
        <div className="w-48 overflow-hidden">
          <Link to="/profile" onClick={close} className="block px-4 py-2 hover:bg-gray-100">
            Meu Perfil
          </Link>
          <Link to="/investments" onClick={close} className="block px-4 py-2 hover:bg-gray-100">
            Meus Investimentos
          </Link>
          <Link to="/my-properties" onClick={close} className="block px-4 py-2 hover:bg-gray-100">
            Minhas Propriedades
          </Link>
          <button
            onClick={() => {
              logout();
              close();
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
          >
            Sair
          </button>
        </div>
      )}
    </Dropdown>
  );
}
