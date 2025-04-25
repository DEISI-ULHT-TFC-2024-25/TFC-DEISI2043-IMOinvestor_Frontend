import PropTypes from "prop-types";
import AdvancedSearchOptions from "@home/AdvancedSearchFilters";

export default function HeroSearch({
  showAdvanced,
  setShowAdvanced,
  selectedRooms,
  setSelectedRooms,
  selectedBaths,
  setSelectedBaths,
}) {

  return (
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
                <AdvancedSearchOptions 
                    selectedRooms={selectedRooms}
                    setSelectedRooms={setSelectedRooms}
                    selectedBaths={selectedBaths}
                    setSelectedBaths={setSelectedBaths}
                />
            )}
        </div>
      </section>
  );
}

HeroSearch.propTypes = {
  showAdvanced: PropTypes.bool.isRequired,
  setShowAdvanced: PropTypes.func.isRequired,
  selectedRooms: PropTypes.array.isRequired,
  setSelectedRooms: PropTypes.func.isRequired,
  selectedBaths: PropTypes.array.isRequired,
  setSelectedBaths: PropTypes.func.isRequired,
};
