import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { PropertyCard } from '../components/PropertyCard';
import { TeamSection } from '../components/TeamSection';
import { SoldBlog } from '../components/SoldBlog';

export default function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <>
      {/* Hero & Search Section */}
      <section className="pt-24 pb-16 px-8 bg-[#F5F5F5] text-center flex flex-col items-center justify-center gap-10 min-h-[40vh]">
        <h2 className="text-3xl font-bold text-[#0A2647] max-w-4xl leading-snug">
          Sonha com uma casa grande com um belo jardim? Ou talvez um apartamento moderno num bairro tranquilo? 
          Seja qual for o seu sonho, focamo-nos no panorama geral para ajudá-lo a encontrar o lar perfeito.
        </h2>
        
        {/* Search Box */}
        <div className="bg-[#FFFFFF] shadow-lg px-10 py-8 rounded-xl text-center w-full max-w-5xl">
          <h3 className="text-2xl font-bold text-[#0A2647]">Encontre o imóvel dos seus sonhos</h3>
          
          <div className="flex flex-wrap w-full justify-center gap-4 mt-6">
            
            {/* Select Cidade */}
            <select className="border border-gray-300 px-4 py-3 rounded-lg text-[#0A2647] w-1/6 min-w-[150px]">
              <option>Selecione a Cidade</option>
            </select>

            {/* Select Tipo de Casa */}
            <select className="border border-gray-300 px-4 py-3 rounded-lg text-[#0A2647] w-1/6 min-w-[150px]">
              <option>Tipo de Casa</option>
            </select>

            {/* Barra de Pesquisa - Maior Largura */}
            <div className="relative flex-1 min-w-[300px]">
              <input 
                type="text" 
                placeholder="Buscar imóveis..." 
                className="border border-gray-300 px-4 py-3 pr-12 rounded-lg text-[#0A2647] w-full focus:outline-none focus:ring-2 focus:ring-[#CFAF5E]" 
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#0A2647]">
                🔍
              </span>
            </div>

            {/* Botão de busca */}
            <button className="bg-[#CFAF5E] text-white px-6 py-3 rounded-lg font-semibold min-w-48 hover:bg-[#b89a4e] transition cursor-pointer">
              Ver Imóveis
            </button>

          </div>
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
        <div className="flex gap-6">
          {[{
            title: "Receba notificações sobre novos imóveis",
            text: "Cadastre-se para ser notificado sempre que um imóvel for listado na sua região de interesse. Escolha as cidades e bairros desejados e selecione o método de contato preferido.",
            button: "Definir Região",
            bgColor: "bg-[#0A2647]",
            path: "/map"
          }, {
            title: "Quer vender ou alugar seu imóvel?",
            text: "Anuncie seu imóvel de forma rápida e eficiente para alcançar mais compradores e locatários interessados.",
            button: "Criar Anúncio",
            bgColor: "bg-[#3A3A3A]",
            path: "/create-add"
          }].map((item, index) => (
            <div key={index} className="bg-white p-8 rounded shadow flex-1 flex flex-col items-center">
              <div className="w-full h-48 bg-gray-300 rounded mb-4"></div>
              <div className="flex-1 text-center">
                <h3 className="text-lg font-medium text-[#0A2647] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{item.text}</p>
              </div>
              <button 
              className={`${item.bgColor} text-white px-4 py-2 rounded w-full mt-auto cursor-pointer`}
              onClick={() => navigate(item.path)}
              >
                {item.button}
              </button>
            </div>
          ))}
        </div>
      </section>
      
      {/* New Properties */}
      <section className="p-6">
        <h3 className="text-xl font-semibold text-[#0A2647] mb-4">Novidades Imóveis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <PropertyCard
              key={i}
              title="Novo Imóvel"
              description="Descrição breve do imóvel"
              price="600.000 $"
              hidePrice={!isLoggedIn}
              onClick={() => isLoggedIn ? navigate(`/listagem/${i}`) : navigate('/login')}
            />
          ))}
        </div>
      </section>

      {/* Reduções de Preço */}
      <section className="p-6">
        <h3 className="text-xl font-semibold text-[#0A2647] mb-4">Reduções de Preço</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[4, 5, 6].map((i) => (
            <PropertyCard
              key={i}
              title="Imóvel com Desconto"
              description="Descrição breve do imóvel"
              price="500.000 $"
              hidePrice={!isLoggedIn}
              onClick={() => isLoggedIn ? navigate(`/listagem/${i}`) : navigate('/login')}
            />
          ))}
        </div>
      </section>

      <TeamSection />
      
      {/* Organizations and Partners Section */}
      <section className="p-6 bg-[#FAEBC8] text-[#0A2647] text-center">
        <h3 className="text-xl font-semibold mb-4">Organizações e Parceiros - Encontre profissionais confiáveis</h3>
        <div className="flex justify-center gap-8">
          {["Imobiliária X", "Corretor Y", "Consultoria Z"].map((partner, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-[#D9CBA5] rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium">{partner}</p>
            </div>
          ))}
        </div>
      </section>

      {/* App Section */}
      <section className="p-6 bg-[#E5E5E5] text-center">
        <h3 className="text-xl font-semibold text-[#0A2647] mb-4">Baixe a nossa aplicação para uma experiência melhor!</h3>
        <button className="bg-[#3A3A3A] text-white px-4 py-2 rounded cursor-pointer">Instalar App</button>
      </section>

      <SoldBlog />
    </>
  );
}

