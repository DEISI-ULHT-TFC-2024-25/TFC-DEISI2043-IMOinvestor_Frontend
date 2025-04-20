import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "lucide-react";

const inputStyle = "border border-gray-300 rounded w-full p-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0A2647]";

const steps = [
  {
    title: "Informações Básicas",
    fields: [
      { label: 'Nome do Imóvel', name: 'nome', type: 'text' },
      { label: 'Tipo de Imóvel', name: 'tipo', type: 'select', options: ['Apartamento', 'Casa'] },
      { label: 'Tipologia', name: 'tipologia', type: 'select', options: [...Array(10)].map((_, i) => (i < 9 ? `T${i}` : 'T9+')) },
      { label: 'Nº Casas de Banho', name: 'casasBanho', type: 'select', options: ['1', '2', '3', '4+'] },
      { label: 'Área (m²)', name: 'area', type: 'number' },
      { label: 'Preço (€)', name: 'preco', type: 'number', isPrice: true },
    ],
  },
  {
    title: "Localização e Detalhes",
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
    title: "Extras e Fotografias",
    fields: [],  // Custom fields for step 3
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
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if we're on desktop
  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint in Tailwind
    };
    
    checkIfDesktop();
    window.addEventListener('resize', checkIfDesktop);
    
    return () => window.removeEventListener('resize', checkIfDesktop);
  }, []);

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Determine if we're on the last step
  const isLastStep = step === steps.length - 1;

  const renderFormFields = (stepIndex) => {
    const currentStep = steps[stepIndex];
    
    if (currentStep.fields.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {currentStep.fields.map((field, idx) => (
            <div key={idx} className="relative">
              <label className="block mb-2 text-sm font-semibold text-[#0A2647]">{field.label}</label>
              {field.type === 'select' ? (
                <select 
                  className={inputStyle}
                  name={field.name}
                  onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                  value={formData[field.name] || ''}
                >
                  <option value="">Selecione</option>
                  {field.options.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input 
                  type={field.type}
                  className={`${inputStyle} ${field.isPrice ? 'pr-12' : ''}`}
                  name={field.name}
                  onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                  value={formData[field.name] || ''}
                />
              )}
              {field.isPrice && <span className="absolute right-3 top-10 text-[#CFAF5E] font-semibold">€</span>}
            </div>
          ))}
        </div>
      );
    } else {
      // Third step - Extras and Photos
      return (
        <div className="space-y-8">
          <div>
            <label className="block mb-2 text-sm font-semibold text-[#0A2647]">Descrição</label>
            <textarea 
              rows="5" 
              className={inputStyle}
              name="descricao"
              onChange={(e) => setFormData({...formData, descricao: e.target.value})}
              value={formData.descricao || ''}
            ></textarea>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[#0A2647] mb-4">Fotografias</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="border-2 border-dashed border-gray-300 rounded flex items-center justify-center h-20 cursor-pointer hover:border-[#CFAF5E]">
                  <span className="text-[#CFAF5E] text-2xl font-bold">+</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[#0A2647] mb-4">Informações Adicionais</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {extraInfos.map((info, i) => (
                <label key={i} className="flex items-center gap-2 text-[#0A2647]">
                  <input 
                    type="checkbox" 
                    className="accent-[#0A2647]"
                    name={`extra_${info}`}
                    onChange={(e) => setFormData({...formData, [`extra_${info}`]: e.target.checked})}
                    checked={formData[`extra_${info}`] || false}
                  /> {info}
                </label>
              ))}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 md:p-8 rounded-lg shadow-lg max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#0A2647]">
          {isDesktop ? "Cadastrar Imóvel" : steps[step].title}
        </h2>
        {!isDesktop && (
          <p className="text-sm text-gray-500">Passo {step + 1} de {steps.length}</p>
        )}
      </div>

      {isDesktop ? (
        // Desktop version - all steps visible without borders
        <div className="space-y-12">
          {steps.map((stepData, idx) => (
            <div key={idx} className="pb-8">
              <h3 className="text-xl font-semibold text-[#0A2647] mb-6 pb-2 border-b border-gray-200">{stepData.title}</h3>
              {renderFormFields(idx)}
            </div>
          ))}
          
          <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
            <button 
              type="submit" 
              className="px-8 py-3 bg-[#CFAF5E] text-[#0A2647] font-semibold rounded-md shadow-md hover:bg-[#b89a4e]"
            >
              {submitLabel}
            </button>
          </div>
        </div>
      ) : (
        // Mobile version - stepped approach
        <>
          {/* Step Content */}
          {renderFormFields(step)}

          {/* Navigation Buttons */}
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
                className="px-8 py-3 bg-[#CFAF5E] text-[#0A2647] font-semibold rounded-md shadow-md hover:bg-[#b89a4e]"
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