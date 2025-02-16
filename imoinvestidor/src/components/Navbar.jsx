import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
        {/* logo */}
        <div className="text-2xl font-bold text-blue-400">
            <Link to="/">ImoInvestor</Link>
        </div>

        <button className="px-6 py-2 rounded-md hover:bg-yellow-700 transition">
          Criar Anúncio
        </button>

        {/* botões de login e register */}
        <div className="flex gap-4">
            <button>
                Login
            </button>

            <button>
                Registrar
            </button>
        </div>
    </nav>
  );
}

export default Navbar;
