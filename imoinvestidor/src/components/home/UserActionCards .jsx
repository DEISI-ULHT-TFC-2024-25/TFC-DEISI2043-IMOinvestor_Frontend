import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

export default function UserActionCards() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { hasAnyRole } = useRole();

  const showSecondCard = !isLoggedIn || hasAnyRole(["AGENT", "PROMOTOR"]);

  return (
    <section className="p-6">
      <div
        className={`flex ${
          showSecondCard ? "flex-col md:flex-row" : "justify-center"
        } gap-6`}
      >
        <div className="bg-white p-6 rounded shadow flex flex-col items-center w-full md:w-1/2">
          <div className="w-full h-40 bg-gray-200 rounded mb-4"></div>
          <div className="text-center flex-1">
            <h3 className="text-lg font-semibold text-[#0A2647] mb-2">
              Receba notificações sobre novos imóveis
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Cadastre-se para ser notificado sempre que um imóvel for listado
              na sua região de interesse. Escolha as cidades e bairros desejados
              e selecione o método de contato preferido.
            </p>
          </div>
          <button
            className="bg-[#0A2647] text-white px-4 py-2 rounded w-full mt-auto cursor-pointer"
            onClick={() => navigate("/map")}
          >
            Definir Região
          </button>
        </div>

        {showSecondCard && (
          <div className="bg-white p-6 rounded shadow flex flex-col items-center w-full md:w-1/2">
            <div className="w-full h-40 bg-gray-200 rounded mb-4"></div>
            <div className="text-center flex-1">
              <h3 className="text-lg font-semibold text-[#0A2647] mb-2">
                Quer vender ou alugar seu imóvel?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Anuncie seu imóvel de forma rápida e eficiente para alcançar
                mais compradores e locatários interessados.
              </p>
            </div>
            <button
              className="bg-[#3A3A3A] text-white px-4 py-2 rounded w-full mt-auto cursor-pointer"
              onClick={() => navigate(isLoggedIn ? "/create-add" : "/login")}
            >
              Criar Anúncio
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
