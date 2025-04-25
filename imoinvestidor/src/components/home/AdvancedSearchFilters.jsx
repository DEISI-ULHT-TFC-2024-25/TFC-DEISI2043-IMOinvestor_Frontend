import PropTypes from "prop-types";

export default function AdvancedSearchFilters({
  selectedRooms,
  setSelectedRooms,
  selectedBaths,
  setSelectedBaths,
}) {
  const toggleSelection = (item, setSelected, selected) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  return (
    <div className="mt-4 border-t pt-6 space-y-4 text-left text-sm text-[#0A2647]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <input type="number" placeholder="Preço Mínimo (€)" className="..." />
        <input type="number" placeholder="Preço Máximo (€)" className="..." />
        <input type="number" placeholder="Rentabilidade mínima (ROI %)" className="..." />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select className="...">
          <option>Tipo de Casa</option>
        </select>
        <select className="...">
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
                className={`... ${selectedRooms.includes(tipo) ? 'bg-[#CFAF5E] text-white' : 'bg-gray-100'}`}
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
                className={`... ${selectedBaths.includes(tipo) ? 'bg-[#CFAF5E] text-white' : 'bg-gray-100'}`}
              >
                {tipo}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

AdvancedSearchFilters.propTypes = {
  selectedRooms: PropTypes.array.isRequired,
  setSelectedRooms: PropTypes.func.isRequired,
  selectedBaths: PropTypes.array.isRequired,
  setSelectedBaths: PropTypes.func.isRequired,
};
