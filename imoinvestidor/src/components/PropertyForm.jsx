import PropTypes from 'prop-types';

export default function PropertyForm({ onSubmit, submitLabel }) {
  return (
    <form className="bg-white p-8 rounded-lg shadow-md max-w-7xl mx-auto w-full" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        <div>
          <label className="block mb-2 text-sm font-semibold text-[#0A2647]">Nome do Imóvel</label>
          <input type="text" className="border border-gray-300 rounded w-full p-3" />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-[#0A2647]">Rua</label>
          <input type="text" className="border border-gray-300 rounded w-full p-3" />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-[#0A2647]">Código Postal</label>
          <input type="text" className="border border-gray-300 rounded w-full p-3" />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-[#0A2647]">Área (m²)</label>
          <input type="number" className="border border-gray-300 rounded w-full p-3" />
        </div>

        <div className="relative">
          <label className="block mb-2 text-sm font-semibold text-[#0A2647]">Preço</label>
          <input type="number" className="border border-gray-300 rounded w-full p-3 pr-12" />
          <div className="absolute right-3 top-10 text-gray-400 font-semibold">€</div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-[#0A2647]">Distrito (ID)</label>
          <input type="text" className="border border-gray-300 rounded w-full p-3" />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-[#0A2647]">Município (ID)</label>
          <input type="text" className="border border-gray-300 rounded w-full p-3" />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-[#0A2647]">Tipologia</label>
          <select className="border border-gray-300 rounded w-full p-3">
            <option value="">Selecione</option>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={`T${i}`}>{i < 9 ? `T${i}` : 'T9+'}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-[#0A2647]">Nº Casas de Banho</label>
          <select className="border border-gray-300 rounded w-full p-3">
            <option value="">Selecione</option>
            {['1', '2', '3', '4+'].map((bath, i) => (
              <option key={i} value={bath}>{bath}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-[#0A2647]">Tipo de Imóvel</label>
          <input type="text" className="border border-gray-300 rounded w-full p-3" />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-[#0A2647]">Nova Construção? (sim/não)</label>
          <input type="text" className="border border-gray-300 rounded w-full p-3" />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-[#0A2647]">Certificado Energético</label>
          <input type="text" className="border border-gray-300 rounded w-full p-3" />
        </div>
      </div>

      <div className="mb-8">
        <label className="block mb-2 text-sm font-semibold text-[#0A2647]">Descrição</label>
        <textarea className="border border-gray-300 rounded w-full p-3" rows="4"></textarea>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-semibold text-[#0A2647] mb-4">Fotografias do Imóvel</h4>
        <div className="grid grid-cols-5 gap-4">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="border-2 border-dashed border-gray-300 rounded flex items-center justify-center h-24 cursor-pointer">
              +
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-semibold text-[#0A2647] mb-4">Informações Adicionais</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {['varanda', 'duplex', 'piscina', 'elevador', 'garagem', 'acessibilidade para pessoas com mobilidade reduzida', 'jardim', 'terraço'].map((info, i) => (
            <label key={i} className="flex gap-2 items-center">
              <input type="checkbox" className="accent-[#CFAF5E]" /> {info}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="bg-[#0A2647] hover:bg-[#133c7b] text-white px-6 py-3 rounded-md">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

PropertyForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
};
