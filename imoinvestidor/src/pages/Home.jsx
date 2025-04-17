import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { TeamSection } from '../components/home/TeamSection';
import { SoldBlog } from '../components/home/SoldBlog';
import { OrganizationsSection } from '../components/home/OrganizationsSection';
import NewPropertiesListing from '../components/home/NewPropertiesListing';
import { useState } from 'react';
import useRole from "../hooks/useRole";

export default function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { hasAnyRole } = useRole();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedBaths, setSelectedBaths] = useState([]);

  const toggleSelection = (item, setSelected, selected) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };
  
  return (
    <>
      {/* Hero & Search Section */}
      <section className="pt-24 pb-16 px-8 bg-[#F5F5F5] text-center flex flex-col items-center justify-center gap-10 min-h-[40vh]">
        <div className="bg-white shadow-lg px-10 py-8 rounded-xl text-center w-full max-w-5xl mx-auto mb-10">
          <h3 className="text-2xl font-bold text-[#0A2647] mb-6">
            Explore oportunidades imobiliárias
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center w-full gap-4 mb-4">

            <div className="order-2 sm:order-1 w-full sm:w-auto">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-sm text-blue-600 hover:underline border border-blue-600 px-4 py-3 rounded-lg w-full sm:w-auto"
              >
                Pesquisa Avançada
              </button>
            </div>

            <div className="order-1 sm:order-2 w-full sm:flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Procurar imóveis..."
                  className="border border-gray-300 px-4 py-3 pr-12 rounded-lg text-[#0A2647] w-full focus:outline-none focus:ring-2 focus:ring-[#CFAF5E]"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#0A2647]">
                  🔍
                </span>
              </div>
            </div>

            <div className="order-3 w-full sm:w-auto">
              <button
                className="bg-[#CFAF5E] text-white px-6 py-3 rounded-lg font-semibold w-full sm:w-auto hover:bg-[#b89a4e] transition cursor-pointer"
              >
                Ver Imóveis
              </button>
            </div>

          </div>

          {showAdvanced && (
            <div className="mt-4 border-t pt-6 space-y-4 text-left text-sm text-[#0A2647]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <input 
                  type="number" 
                  placeholder="Preço Mínimo (€)" 
                  className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#CFAF5E]" 
                />

                <input 
                  type="number" 
                  placeholder="Preço Máximo (€)" 
                  className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#CFAF5E]" 
                />

                <input 
                  type="number" 
                  placeholder="Rentabilidade mínima (ROI %)" 
                  className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#CFAF5E]" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#CFAF5E]">
                  <option>Tipo de Casa</option>
                </select>

                <select className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#CFAF5E]">
                  <option>Estado do Imóvel</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Quartos</label>
                  <div className="flex flex-wrap gap-2">
                    {['T0', 'T1', 'T2', 'T3', 'T4', 'T6+'].map((tipo) => (
                      <button
                        key={tipo}
                        type="button"
                        onClick={() => toggleSelection(tipo, setSelectedRooms, selectedRooms)}
                        className={`px-3 py-2 rounded border text-sm ${selectedRooms.includes(tipo) ? 'bg-[#CFAF5E] text-white' : 'bg-gray-100'}`}
                      >
                        {tipo}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Casas de Banho</label>
                  <div className="flex flex-wrap gap-2">
                    {['1', '2', '3', '4+'].map((tipo) => (
                      <button
                        key={tipo}
                        type="button"
                        onClick={() => toggleSelection(tipo, setSelectedBaths, selectedBaths)}
                        className={`px-3 py-2 rounded border text-sm ${selectedBaths.includes(tipo) ? 'bg-[#CFAF5E] text-white' : 'bg-gray-100'}`}
                      >
                        {tipo}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>


      {/* Recent Searches Section */}
      <section className="p-6">
        <h3 className="text-xl font-semibold text-[#0A2647] mb-4">Suas Pesquisas Recentes</h3>
        <div className="flex gap-4">
          {["Apartamento em Lisboa", "Casa em Cascais", "Estudio em Parede"].map((search, index) => (
            <div key={index} className="bg-white p-4 rounded shadow text-center">
              <p className="text-sm font-medium text-[#0A2647]">{search}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Interest and Ad Creation Section */}
      <section className="p-6">
        <div className="flex flex-col md:flex-row gap-6">

          <div className="bg-white p-6 rounded shadow flex flex-col items-center w-full md:w-1/2">
            <div className="w-full h-40 bg-gray-200 rounded mb-4"></div>
            <div className="text-center flex-1">
              <h3 className="text-lg font-semibold text-[#0A2647] mb-2">
                Receba notificações sobre novos imóveis
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Cadastre-se para ser notificado sempre que um imóvel for listado na sua região de interesse. 
                Escolha as cidades e bairros desejados e selecione o método de contato preferido.
              </p>
            </div>
            <button
              className="bg-[#0A2647] text-white px-4 py-2 rounded w-full mt-auto cursor-pointer"
              onClick={() => navigate("/map")}
            >
              Definir Região
            </button>
          </div>

          {(!isLoggedIn || hasAnyRole(["AGENT", "PROMOTOR"])) && (
            <div className="bg-white p-6 rounded shadow flex flex-col items-center w-full md:w-1/2">
              <div className="w-full h-40 bg-gray-200 rounded mb-4"></div>
              <div className="text-center flex-1">
                <h3 className="text-lg font-semibold text-[#0A2647] mb-2">
                  Quer vender ou alugar seu imóvel?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Anuncie seu imóvel de forma rápida e eficiente para alcançar mais compradores e locatários interessados.
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
      
      <NewPropertiesListing  isLoggedIn={isLoggedIn}/>

      <TeamSection />
      
      <OrganizationsSection />


      {/* App Section */}
      <section className="p-6 bg-[#E5E5E5] text-center">
        <h3 className="text-xl font-semibold text-[#0A2647] mb-4">Baixe a nossa aplicação para uma experiência melhor!</h3>
        <button className="bg-[#3A3A3A] text-white px-4 py-2 rounded cursor-pointer">Instalar App</button>
      </section>

      <SoldBlog />
    </>
  );
}

