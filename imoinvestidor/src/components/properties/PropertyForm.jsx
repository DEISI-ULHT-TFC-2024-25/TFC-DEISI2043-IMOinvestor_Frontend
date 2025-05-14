import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import InputField from "@common/InputField";
import SelectField from "@common/SelectField";
import TextAreaField from "@common/TextAreaField";
import CheckboxGroup from "@common/CheckboxGroup";
import PriceRangeSlider from "@common/PriceRangeSlider";

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
      { label: 'Distrito', name: 'distrito', type: 'dynamic-select', dynamicOptionsKey: 'districts' },
      { label: 'Município', name: 'municipio', type: 'dynamic-select', dynamicOptionsKey: 'municipalities' },
      { label: 'Código Postal', name: 'codigoPostal', type: 'input' },
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
  "varanda",
  "duplex",
  "piscina",
  "elevador",
  "garagem",
  "terraço",
  "jardim",
  "acessibilidade para pessoas com mobilidade reduzida",
];

export default function PropertyForm({ title, initialData = {}, onSubmit, submitLabel }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [priceRange, setPriceRange] = useState([100, 2000000]);
  const [districts, setDistricts] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    const checkIfDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkIfDesktop();
    window.addEventListener("resize", checkIfDesktop);
    return () => window.removeEventListener("resize", checkIfDesktop);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/district/");
        const data = await res.json();
        setDistricts(data.sort((a, b) => a.name.localeCompare(b.name)));
      } catch {
        setFormError("Erro ao carregar distritos. Tente novamente mais tarde.");
      }
    })();
  }, []);

  useEffect(() => {
    if (initialData.name) {
      setFormData({
        nome: initialData.name,
        tipo: initialData.property_type,
        tipologia: initialData.tipologia,
        casasBanho: String(initialData.numero_casas_banho),
        areaUtil: String(initialData.area_util),
        areaBruta: String(initialData.area_bruta),
        codigoPostal: initialData.postal_code,
        distrito: String(initialData.district),
        municipio: String(initialData.municipality),
        rua: initialData.street,
        novaConstrucao: initialData.nova_construcao,
        certificado: initialData.certificado_energetico,
        descricao: initialData.descricao,
        ...initialData.informacoes_adicionais.reduce((acc, info) => {
          acc[`extra_${info}`] = true;
          return acc;
        }, {}),
      });
      setPriceRange([initialData.preco_minimo, initialData.preco_maximo]);
    }
  }, [initialData]);

  const nextStep = (e) => {
    e.preventDefault();
    setFormError(null);
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const prevStep = (e) => {
    e.preventDefault();
    setFormError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));

    if (name === "distrito") {
      try {
        const res = await fetch("/api/municipality/municipalityByDistrict/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ district_id: Number(value) }),
        });
        const data = await res.json();
        setMunicipalities(data.sort((a, b) => a.name.localeCompare(b.name)));
      } catch {}
    }
  };

  const handleCheckboxChange = (info) => {
    setFormData((f) => ({ ...f, [`extra_${info}`]: !f[`extra_${info}`] }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isDesktop || step === steps.length - 1) {
      const payload = {
        name: formData.nome,
        property_type: formData.tipo,
        tipologia: formData.tipologia,
        numero_casas_banho: String(formData.casasBanho),
        area_util: Number(formData.areaUtil),
        area_bruta: Number(formData.areaBruta),
        preco_minimo: priceRange[0],
        preco_maximo: priceRange[1],
        postal_code: formData.codigoPostal,
        district: Number(formData.distrito),
        municipality: Number(formData.municipio),
        street: formData.rua,
        nova_construcao: formData.novaConstrucao,
        certificado_energetico: formData.certificado,
        descricao: formData.descricao,
        imagens: [],
        informacoes_adicionais: Object.keys(formData)
          .filter((k) => k.startsWith("extra_") && formData[k])
          .map((k) => k.replace("extra_", "")),
      };
      onSubmit(payload);
    } else {
      nextStep(e);
    }
  };

  const renderLastStep = () => (
    <>
      <TextAreaField
        label="Descrição"
        name="descricao"
        value={formData.descricao || ""}
        onChange={handleInputChange}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="border-2 border-dashed border-gray-300 rounded h-24 flex items-center justify-center cursor-pointer hover:border-[#CFAF5E]"
          >
            <span className="text-[#CFAF5E] text-2xl font-bold">+</span>
          </div>
        ))}
      </div>

      <CheckboxGroup
        label="Informações Adicionais"
        options={extraInfos}
        selectedOptions={extraInfos.filter((info) => formData[`extra_${info}`])}
        onChange={handleCheckboxChange}
      />
    </>
  );

  const renderFields = (stepDef) => (
    <div className="space-y-6">
      {stepDef.fields.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stepDef.fields.map((f, i) => {
            const val = formData[f.name] || "";
            if (f.type === "select") {
              return (
                <SelectField
                  key={i}
                  label={f.label}
                  name={f.name}
                  options={f.options}
                  value={val}
                  onChange={handleInputChange}
                />
              );
            }
            if (f.type === "dynamic-select") {
              const opts =
                f.dynamicOptionsKey === "districts"
                  ? districts.map((d) => ({ label: d.name, value: d.id }))
                  : municipalities.map((m) => ({ label: m.name, value: m.id }));
              return (
                <SelectField
                  key={i}
                  label={f.label}
                  name={f.name}
                  options={opts}
                  value={val}
                  onChange={handleInputChange}
                />
              );
            }
            return (
              <InputField
                key={i}
                label={f.label}
                name={f.name}
                type={f.inputType || "text"}
                value={val}
                onChange={handleInputChange}
              />
            );
          })}
        </div>
      )}

      {stepDef.includePriceSlider && (
        <PriceRangeSlider priceRange={priceRange} setPriceRange={setPriceRange} />
      )}

      {!isDesktop && step === 2 && renderLastStep()}
    </div>
  );

  const isLast = step === steps.length - 1;

  return (
    <form onSubmit={handleFormSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      {formError && <div className="text-red-600 mb-4">{formError}</div>}

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#0A2647]">{title}</h2>
        {!isDesktop && <p className="text-sm text-gray-500">Passo {step + 1} de {steps.length}</p>}
      </div>

      {isDesktop ? (
        <>
          {steps.map((s, i) => (
            <div key={i} className="mb-8">
              <h3 className="text-xl font-semibold border-b pb-2 mb-4">{s.title}</h3>
              {renderFields(s)}
              {i === steps.length - 1 && renderLastStep()}
            </div>
          ))}
          <div className="flex justify-end">
            <button type="submit" className="px-8 py-3 bg-[#CFAF5E] rounded shadow">
              {submitLabel}
            </button>
          </div>
        </>
      ) : (
        <>
          {renderFields(steps[step])}
          <div className="flex justify-between mt-6">
            {step > 0 ? (
              <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-200 rounded">
                <ChevronLeft size={16} /> Anterior
              </button>
            ) : <div />}

            {isLast ? (
              <button type="submit" className="px-6 py-2 bg-[#CFAF5E] rounded">
                {submitLabel}
              </button>
            ) : (
              <button type="button" onClick={nextStep} className="px-6 py-2 bg-[#CFAF5E] rounded">
                Seguinte <ChevronRight size={16} />
              </button>
            )}
          </div>
        </>
      )}
    </form>
  );
}

PropertyForm.propTypes = {
  title: PropTypes.string.isRequired,
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
};