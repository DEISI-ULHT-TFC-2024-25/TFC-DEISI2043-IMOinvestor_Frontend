import { useState } from "react";
import { Pencil, Eye, Star, Bed, Bath, Square, Calendar, Filter, X, Layers } from "lucide-react";

const PropertyList = () => {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    minArea: "",
    maxArea: ""
  });
  
  const [showFilters, setShowFilters] = useState(true);
  const [favorites, setFavorites] = useState({});

  // Mock de propriedades
  const properties = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    title: "Beautiful Family Home",
    price: "€888,888",
    location: "Some Road, Place",
    bedrooms: 4,
    bathrooms: 2,
    area: 126,
    type: "Moradia",
    dateAdded: "Novo hoje"
  }));

  // Atualizar filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Alternar favoritos
  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="flex h-screen">
      {/* Painel esquerdo - Filtros e Listagem */}
      <div className="w-2/5 h-full overflow-hidden flex flex-col border-r">
        <div className="p-4 border-b bg-gradient-to-r from-[#0A2647] to-[#0c3055]">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold text-white">Imóveis Disponíveis</h2>
            <button 
              onClick={() => setShowFilters(!showFilters)} 
              className="flex items-center text-[#CFAF5E] hover:text-[#e6c670] bg-transparent border-none cursor-pointer px-2 py-1"
            >
              {showFilters ? <X size={16} className="mr-1" /> : <Filter size={16} className="mr-1" />}
              {showFilters ? "Esconder filtros" : "Filtros"}
            </button>
          </div>
          
          {/* Filtros principais */}
          {showFilters && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Filtro de Preço */}
              <div>
                <label className="block text-sm text-gray-200 mb-1">Preço mínimo</label>
                <input
                  type="text"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="€ Min"
                  className="w-full p-2 border border-[#CFAF5E] bg-white/90 rounded focus:outline-none focus:ring-2 focus:ring-[#CFAF5E]"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-200 mb-1">Preço máximo</label>
                <input
                  type="text"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="€ Max"
                  className="w-full p-2 border border-[#CFAF5E] bg-white/90 rounded focus:outline-none focus:ring-2 focus:ring-[#CFAF5E]"
                />
              </div>

              {/* Filtro de Quartos */}
              <div>
                <label className="block text-sm text-gray-200 mb-1">Quartos</label>
                <select
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-[#CFAF5E] bg-white/90 rounded focus:outline-none focus:ring-2 focus:ring-[#CFAF5E]"
                >
                  <option value="">Qualquer</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>

              {/* Filtro de Casas de Banho */}
              <div>
                <label className="block text-sm text-gray-200 mb-1">Casas de banho</label>
                <select
                  name="bathrooms"
                  value={filters.bathrooms}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-[#CFAF5E] bg-white/90 rounded focus:outline-none focus:ring-2 focus:ring-[#CFAF5E]"
                >
                  <option value="">Qualquer</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>

              {/* Filtro de Área (m²) */}
              <div>
                <label className="block text-sm text-gray-200 mb-1">Área mínima (m²)</label>
                <input
                  type="text"
                  name="minArea"
                  value={filters.minArea}
                  onChange={handleFilterChange}
                  placeholder="Min m²"
                  className="w-full p-2 border border-[#CFAF5E] bg-white/90 rounded focus:outline-none focus:ring-2 focus:ring-[#CFAF5E]"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-200 mb-1">Área máxima (m²)</label>
                <input
                  type="text"
                  name="maxArea"
                  value={filters.maxArea}
                  onChange={handleFilterChange}
                  placeholder="Max m²"
                  className="w-full p-2 border border-[#CFAF5E] bg-white/90 rounded focus:outline-none focus:ring-2 focus:ring-[#CFAF5E]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Lista de propriedades */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 relative bg-gray-50">
          {properties.map((prop) => (
            <div key={prop.id} className="border border-gray-200 p-4 rounded-lg mb-4 relative bg-white hover:shadow-md transition-shadow">
              <div className="flex gap-2 mb-2">
                <span className="bg-[#0A2647] text-white text-xs px-2 py-1 rounded">{prop.type}</span>
                <span className="bg-[#CFAF5E]/20 text-[#8A7430] text-xs px-2 py-1 rounded flex items-center">
                  <Calendar size={12} className="mr-1" /> {prop.dateAdded}
                </span>
              </div>
              <p className="font-semibold text-lg text-[#0A2647]">{prop.title}</p>
              <p className="text-gray-500 text-sm">{prop.location}</p>
              <p className="text-[#0A2647] font-medium mt-1">{prop.price}</p>
              <div className="flex gap-3 mt-2 mb-2 text-gray-600 text-sm">
                <div className="flex items-center"><Bed size={14} className="mr-1" /> {prop.bedrooms}</div>
                <div className="flex items-center"><Bath size={14} className="mr-1" /> {prop.bathrooms}</div>
                <div className="flex items-center"><Square size={14} className="mr-1" /> {prop.area} m²</div>
              </div>
              <div className="absolute top-4 right-4">
                <button 
                  onClick={() => toggleFavorite(prop.id)} 
                  className={`${favorites[prop.id] ? 'text-[#CFAF5E]' : 'text-gray-400'} hover:text-[#CFAF5E] bg-transparent border-none cursor-pointer`}
                >
                  <Star size={20} fill={favorites[prop.id] ? "currentColor" : "none"} />
                </button>
              </div>
              <div className="absolute bottom-4 right-4 text-[#0A2647] flex items-center cursor-pointer hover:text-[#CFAF5E] transition-colors">
                <Eye size={16} className="mr-1" /> <span>Ver</span>
              </div>
            </div>
          ))}
          
          {/* Botão "Ver Todos" fixo no fundo da listagem */}
          <div className="sticky bottom-4 left-0 w-full flex justify-center">
            <button className="bg-[#CFAF5E] hover:bg-[#bfa04c] text-[#0A2647] font-medium px-8 py-2 rounded shadow-lg cursor-pointer border-none">
              Ver Todos
            </button>
          </div>
        </div>
      </div>

      {/* Mapa */}
      <div className="w-3/5 h-full bg-gray-200 flex flex-col relative">
        {/* Aviso */}
        <div className="bg-[#CFAF5E]/20 text-[#0A2647] text-center py-2 text-sm absolute top-0 left-0 w-full border-b border-[#CFAF5E]/30">
          Move o mapa para localizar a área que te interessa antes de desenhar a zona onde procuras
        </div>

        {/* Mapa Placeholder */}
        <div className="flex flex-1 items-center justify-center mt-8">
          <p className="text-gray-500 text-lg">Mapa Placeholder</p>
        </div>

        {/* Botões */}
        <div className="absolute top-12 right-4 flex gap-2">
          <button className="border border-[#0A2647] text-[#0A2647] bg-white px-4 py-1 rounded shadow-md hover:bg-[#0A2647] hover:text-white cursor-pointer">
            Mapa
          </button>
          <button className="border border-[#0A2647] text-[#0A2647] bg-white px-4 py-1 rounded shadow-md hover:bg-[#0A2647] hover:text-white cursor-pointer">
            Satélite
          </button>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <button className="bg-[#0A2647] hover:bg-[#0d305a] text-white px-4 py-2 rounded flex items-center shadow-md cursor-pointer border-none">
            <Pencil size={16} className="mr-2" /> Desenhar a tua zona
          </button>
        </div>

        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button className="p-2 bg-white border border-[#0A2647] text-[#0A2647] rounded shadow-md hover:bg-[#0A2647] hover:text-white cursor-pointer">
            <Layers size={16} />
          </button>
          <button className="p-2 bg-white border border-[#0A2647] text-[#0A2647] rounded shadow-md hover:bg-[#0A2647] hover:text-white cursor-pointer">
            +
          </button>
          <button className="p-2 bg-white border border-[#0A2647] text-[#0A2647] rounded shadow-md hover:bg-[#0A2647] hover:text-white cursor-pointer">
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;