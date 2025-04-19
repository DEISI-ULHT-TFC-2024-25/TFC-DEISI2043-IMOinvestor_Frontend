import PropTypes from 'prop-types';

const inputStyle = "border border-gray-300 rounded w-full p-3 bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#0A2647]";

const fields = [
  { label: 'Nome do Imóvel', name: 'nome', type: 'text' },
  { label: 'Tipo de Imóvel', name: 'tipo', type: 'select', options: ['Apartamento', 'Casa'] },
  { label: 'Tipologia', name: 'tipologia', type: 'select', options: [...Array(10)].map((_, i) => (i < 9 ? `T${i}` : 'T9+')) },
  { label: 'Nº Casas de Banho', name: 'casasBanho', type: 'select', options: ['1', '2', '3', '4+'] },
  { label: 'Área (m²)', name: 'area', type: 'number' },
  { label: 'Preço (€)', name: 'preco', type: 'number', isPrice: true },
  { label: 'Código Postal', name: 'codigoPostal', type: 'text' },
  { label: 'Distrito', name: 'distrito', type: 'text' },
  { label: 'Município', name: 'municipio', type: 'text' },
  { label: 'Rua', name: 'rua', type: 'text' },
  { label: 'Nova Construção?', name: 'novaConstrucao', type: 'select', options: ['Sim', 'Não'] },
  { label: 'Certificado Energético', name: 'certificado', type: 'select', options: ['A+', 'A', 'B', 'B-', 'C', 'D', 'E', 'F'] },
];

const extraInfos = [
  'varanda', 'duplex', 'piscina', 'elevador',
  'garagem', 'acessibilidade para pessoas com mobilidade reduzida',
  'jardim', 'terraço',
];

export default function PropertyForm({ onSubmit, submitLabel }) {
  return (
    <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-7xl mx-auto w-full">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {fields.map((field, idx) => (
          <div key={idx} className="relative">
            <label className="block mb-2 text-sm font-semibold text-[#0A2647]">{field.label}</label>
            {field.type === 'select' ? (
              <select className={inputStyle}>
                <option value="">Selecione</option>
                {field.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input 
                type={field.type}
                className={`${inputStyle} ${field.isPrice ? 'pr-12' : ''}`}
              />
            )}
            {field.isPrice && <span className="absolute right-3 top-10 text-[#CFAF5E] font-semibold">€</span>}
          </div>
        ))}
      </div>

      <div className="mb-8">
        <label className="block mb-2 text-sm font-semibold text-[#0A2647]">Descrição</label>
        <textarea rows="5" className={inputStyle}></textarea>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-semibold text-[#0A2647] mb-4">Fotografias do Imóvel</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="border-2 border-dashed border-gray-300 rounded flex items-center justify-center h-24 cursor-pointer hover:border-[#CFAF5E]">
              <span className="text-[#CFAF5E] text-2xl font-bold">+</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-semibold text-[#0A2647] mb-4">Informações Adicionais</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {extraInfos.map((info, i) => (
            <label key={i} className="flex items-center gap-2 text-[#0A2647]">
              <input type="checkbox" className="accent-[#0A2647]" /> {info}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          type="submit" 
          className="bg-[#CFAF5E] hover:bg-[#b89a4e] text-[#0A2647] font-semibold px-8 py-3 rounded-md shadow-md transition"
        >
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
