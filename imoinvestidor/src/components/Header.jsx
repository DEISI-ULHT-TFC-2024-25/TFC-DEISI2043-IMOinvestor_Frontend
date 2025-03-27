import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold">
        <Link to="/">ImoInvestor</Link>
      </div>
      <button className="px-6 py-2 rounded-md hover:bg-yellow-700 transition">
        Criar Anúncio
      </button>
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-[#CFAF5E] text-white rounded-md"><Link to="/login">Login</Link></button>
        <button className="px-4 py-2 bg-[#CFAF5E] text-white rounded-md"><Link to="/register">Registar</Link></button>
      </div>
    </nav>
  );
}