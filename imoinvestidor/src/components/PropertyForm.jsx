import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import InputField from "./common/InputField";
import SelectField from "./common/SelectField";
import TextAreaField from "./common/TextAreaField";
import CheckboxGroup from "./common/CheckboxGroup";
import PriceRangeSlider from "./common/PriceRangeSlider";

const steps = [
  {
    title: "Informações do Imóvel",
    fields: [
      { label: 'Nome do Imóvel', name: 'nome', type: 'input' },
      { label: 'Tipo de Imóvel', name: 'tipo', type: 'select', options: ['Apartamento', 'Casa'] },
      { label: 'Tipologia', name: 'tipologia', type: 'select', options: [...Array(10)].map((_, i) => (i < 9 ? `T${i}` : 'T9+')) },
      { label: 'Nº Casas de Banho', name: 'casasBanho', type: 'select', options: ['1', '2', '3', '4+'] },
      { label: 'Área Útil (m²)', name: 'areaUtil', type: 'input', inputType: 'number' },
      { label: 'Área Bruta (m²)', name: 'areaBruta', type: 'input', inputType: 'number' },
    ],
    includePriceSlider: true,
  },
  {
    title: "Localização",
    fields: [
      { label: 'Código Postal', name: 'codigoPostal', type: 'input' },
      { label: 'Distrito', name: 'distrito', type: 'input' },
      { label: 'Município', name: 'municipio', type: 'input' },
      { label: 'Rua', name: 'rua', type: 'input' },
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
  'jardim', 'terraço'
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (info) => {
    setFormData(prev => ({
      ...prev,
      [`extra_${info}`]: !prev[`extra_${info}`],
    }));
  };

  const renderFields = (currentStep) => (
    <div className="space-y-6 mb-8">
      {currentStep.fields.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentStep.fields.map((field, idx) => {
            if (field.type === 'select') {
              return (
                <SelectField
                  key={idx}
                  label={field.label}
                  name={field.name}
                  options={field.options}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                />
              );
            }
            return (
              <InputField
                key={idx}
                label={field.label}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleInputChange}
                type={field.inputType || 'text'}
              />
            );
          })}
        </div>
      )}

      {currentStep.includePriceSlider && (
        <div className="mt-8">
          <PriceRangeSlider priceRange={priceRange} setPriceRange={setPriceRange} />
        </div>
      )}

      {step === 2 && (
        <>
          <TextAreaField
            label="Descrição"
            name="descricao"
            value={formData.descricao || ''}
            onChange={handleInputChange}
          />

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

          <CheckboxGroup
            label="Informações Adicionais"
            options={extraInfos}
            selectedOptions={Object.keys(formData).filter(key => formData[key])}
            onChange={handleCheckboxChange}
          />
        </>
      )}
    </div>
  );

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
          {steps.map((stepData, idx) => (
            <div key={idx}>
              <h3 className="text-xl font-semibold text-[#0A2647] mb-4 border-b pb-2">{stepData.title}</h3>
              {renderFields(stepData)}
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
          {renderFields(steps[step])}
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