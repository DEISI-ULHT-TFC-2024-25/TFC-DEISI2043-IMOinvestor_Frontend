import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PriceRangeSlider from "./PriceRangeSlider";

const inputStyle = "border border-gray-300 rounded w-full p-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0A2647]";

const steps = [
  {
    title: "Informações do Imóvel",
    fields: [
      { label: 'Nome do Imóvel', name: 'nome', type: 'text' },
      { label: 'Tipo de Imóvel', name: 'tipo', type: 'select', options: ['Apartamento', 'Casa'] },
      { label: 'Tipologia', name: 'tipologia', type: 'select', options: [...Array(10)].map((_, i) => (i < 9 ? `T${i}` : 'T9+')) },
      { label: 'Nº Casas de Banho', name: 'casasBanho', type: 'select', options: ['1', '2', '3', '4+'] },
      { label: 'Área Útil (m²)', name: 'areaUtil', type: 'number' },
      { label: 'Área Bruta (m²)', name: 'areaBruta', type: 'number' },
    ],
    includePriceSlider: true,
  },
  {
    title: "Localização",
    fields: [
      { label: 'Código Postal', name: 'codigoPostal', type: 'text' },
      { label: 'Distrito', name: 'distrito', type: 'text' },
      { label: 'Município', name: 'municipio', type: 'text' },
      { label: 'Rua', name: 'rua', type: 'text' },
      { label: 'Nova Construção?', name: 'novaConstrucao', type: 'select', options: ['Sim', 'Não'] },
      { label: 'Certificado Energético', name: 'certificado', type: 'select', options: ['A+', 'A', 'B', 'B-', 'C', 'D', 'E', 'F'] },
    ],
  },
  {
    title: "Imagens e Comodidades",
    fields: [],
  },
];

const extraInfos = [
  'varanda', 'duplex', 'piscina', 'elevador',
  'garagem', 'acessibilidade para pessoas com mobilidade reduzida',
  'jardim', 'terraço',
];

export default function PropertyForm({ onSubmit, submitLabel }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [priceRange, setPriceRange] = useState([50000, 500000]);
  const [isDesktop, setIsDesktop] = useState(false);


  useEffect(() => {
    const checkIfDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkIfDesktop();
    window.addEventListener('resize', checkIfDesktop);
    return () => window.removeEventListener('resize', checkIfDesktop);
  }, []);

  const nextStep = () => setStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, priceMin: priceRange[0], priceMax: priceRange[1] });
  };

  const renderFormFields = (stepIndex) => {
    const currentStep = steps[stepIndex];
    return (
      <div className="space-y-6 mb-8">
        {currentStep.fields.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentStep.fields.map((field, idx) => (
              <div key={idx} className="relative">
                <label className="block mb-2 text-sm font-semibold text-[#0A2647]">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    className={inputStyle}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  >
                    <option value="">Selecione</option>
                    {field.options.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    className={inputStyle}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {currentStep.includePriceSlider && (
          <div className="mt-8">
            <label className="block mb-4 text-sm font-semibold text-[#0A2647]">Preço Estimado (€)</label>
            <PriceRangeSlider priceRange={priceRange} setPriceRange={setPriceRange} />
          </div>
        )}

        {stepIndex === 2 && (
          <>
            <div>
              <label className="block mb-2 text-sm font-semibold text-[#0A2647]">Descrição</label>
              <textarea
                rows="5"
                name="descricao"
                className={inputStyle}
                value={formData.descricao || ''}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              />
            </div>

            <div>
              <h4 className="text-lg font-semibold text-[#0A2647] mb-4">Fotografias</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="border-2 border-dashed border-gray-300 rounded flex items-center justify-center h-24 cursor-pointer hover:border-[#CFAF5E]">
                    <span className="text-[#CFAF5E] text-2xl font-bold">+</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-[#0A2647] mb-4">Informações Adicionais</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {extraInfos.map((info, idx) => (
                  <label key={idx} className="flex items-center gap-2 text-[#0A2647]">
                    <input
                      type="checkbox"
                      className="accent-[#0A2647]"
                      name={`extra_${info}`}
                      checked={formData[`extra_${info}`] || false}
                      onChange={(e) => setFormData({ ...formData, [`extra_${info}`]: e.target.checked })}
                    /> {info}
                  </label>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const isLastStep = step === steps.length - 1;

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#0A2647]">{isDesktop ? "Cadastrar Imóvel" : steps[step].title}</h2>
        {!isDesktop && (
          <p className="text-sm text-gray-500">Passo {step + 1} de {steps.length}</p>
        )}
      </div>

      {isDesktop ? (
        <div className="space-y-12">
          {steps.map((_, idx) => (
            <div key={idx}>
              <h3 className="text-xl font-semibold text-[#0A2647] mb-4 border-b pb-2">{steps[idx].title}</h3>
              {renderFormFields(idx)}
            </div>
          ))}
          <div className="flex justify-end mt-8 pt-4 border-t">
            <button
              type="submit"
              className="bg-[#CFAF5E] hover:bg-[#b89a4e] text-[#0A2647] font-semibold px-8 py-3 rounded-md shadow-md transition"
            >
              {submitLabel}
            </button>
          </div>
        </div>
      ) : (
        <>
          {renderFormFields(step)}
          <div className="flex justify-between mt-8">
            {step > 0 ? (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-[#0A2647] rounded hover:bg-gray-300"
              >
                <ChevronLeft size={20} /> Anterior
              </button>
            ) : <div></div>}

            {isLastStep ? (
              <button
                type="submit"
                className="bg-[#CFAF5E] hover:bg-[#b89a4e] text-[#0A2647] font-semibold px-8 py-3 rounded-md shadow-md"
              >
                {submitLabel}
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-2 bg-[#CFAF5E] text-[#0A2647] rounded hover:bg-[#b89a4e]"
              >
                Seguinte <ChevronRight size={20} />
              </button>
            )}
          </div>
        </>
      )}
    </form>
  );
}

PropertyForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
};