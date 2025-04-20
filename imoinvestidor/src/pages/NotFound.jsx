import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-5xl font-bold text-[#0A2647] mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8">Página não encontrada.</p>
      <Link to="/">
        <button className="bg-[#CFAF5E] hover:bg-[#b89a4e] text-[#0A2647] font-semibold px-6 py-3 rounded-md shadow-md transition">
          Voltar à Página Inicial
        </button>
      </Link>
    </div>
  );
}
