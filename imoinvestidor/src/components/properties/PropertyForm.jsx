import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  ChevronLeft,
  ChevronRight,
  Trash2,
  Building,
  MapPin,
  Image as ImageIcon,
} from "lucide-react";
import InputField from "@common/InputField";
import SelectField from "@common/SelectField";
import TextAreaField from "@common/TextAreaField";
import CheckboxGroup from "@common/CheckboxGroup";
import PriceRangeSlider from "@common/PriceRangeSlider";
import { steps } from "@constants/propertySteps";
import useDistricts from "@hooks/useDistricts";
import useMunicipalities from "@hooks/useMunicipalities";
import { handleDistrictChange } from "@utils/locationUtils";
import {
  createPropertyMedia,
  getPropertyMediasByProperty,
  updatePropertyMedia,
  deletePropertyMedia,
} from "@services/propertyMediaService";

const extraInfos = [
  "varanda", "duplex", "piscina", "elevador",
  "garagem", "terraço", "jardim", "acessibilidade para pessoas com mobilidade reduzida",
];

const icons = [Building, MapPin, ImageIcon];

export default function PropertyForm({ title, initialData = {}, onSubmit, submitLabel }) {
  const [step, setStep] = useState(0);
  
  // Initialize formData with default values to prevent undefined issues
  const [formData, setFormData] = useState({
    nome: '',
    tipo: '',
    tipologia: '',
    casasBanho: '',
    areaUtil: '',
    areaBruta: '',
    codigoPostal: '',
    distrito: '',
    municipio: '',
    rua: '',
    novaConstrucao: false,
    certificado: '',
    descricao: '',
  });
  
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const { districts } = useDistricts();
  const { municipalities, loadByDistrict, setMunicipalities } = useMunicipalities();
  const [isDesktop, setIsDesktop] = useState(false);
  const [formError, setFormError] = useState(null);

  const MAX_IMAGES = 8;
  const [images, setImages] = useState(Array(MAX_IMAGES).fill(null));
  const [initialSlots, setInitialSlots] = useState(Array(MAX_IMAGES).fill(null));

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (initialData.name) {
      setFormData({
        nome: initialData.name || '',
        tipo: initialData.property_type || '',
        tipologia: initialData.tipology || '',
        casasBanho: String(initialData.num_wc || ''),
        areaUtil: String(initialData.net_area || ''),
        areaBruta: String(initialData.gross_area || ''),
        codigoPostal: initialData.postal_code || '',
        distrito: String(initialData.district || ''),
        municipio: String(initialData.municipality || ''),
        rua: initialData.street || '',
        novaConstrucao: initialData.new_construction || false,
        certificado: initialData.energy_certf || '',
        descricao: initialData.description || '',
        ...(initialData.informacoes_adicionais || []).reduce((acc, info) => {
          acc[`extra_${info}`] = true;
          return acc;
        }, {}),
      });

      setPriceRange([
        initialData.min_price || 0, 
        initialData.max_price || 2000000
      ]);
      
      loadByDistrict(initialData.district).then(setMunicipalities).catch(console.error);

      if (initialData.id) {
        getPropertyMediasByProperty(initialData.id)
          .then((mediaList) => {
            const slots = Array(MAX_IMAGES).fill(null);
            mediaList.slice(0, MAX_IMAGES).forEach((m, i) => {
              slots[i] = { id: m.id, file: null, url: m.file };
            });
            setImages(slots);
            setInitialSlots(slots);
          })
          .catch(console.error);
      }
    } else {
      loadByDistrict(null).then(setMunicipalities).catch(console.error);
    }
  }, [initialData, loadByDistrict, setMunicipalities]);

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

  // Fixed handleInputChange - no unnecessary String conversion
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    
    if (name === "distrito") {
      await handleDistrictChange({
        newDistrict: String(value),
        currentMunicipality: formData.municipio,
        loadByDistrict,
        setDistrict: (v) => setFormData(f => ({ ...f, distrito: v })),
        setMunicipality: (v) => setFormData(f => ({ ...f, municipio: v })),
        setMunicipalities,
      });
    } else {
      // Don't convert all values to String - let them remain as they are
      setFormData(f => ({ ...f, [name]: value }));
    }
  };

  const handleCheckboxChange = (info) => {
    setFormData((f) => ({ ...f, [`extra_${info}`]: !f[`extra_${info}`] }));
  };

  const handleFileChange = (i) => (e) => {
    const file = e.target.files?.[0] || null;
    setImages((imgs) => {
      const c = [...imgs];
      c[i] = file ? { id: null, file, url: null } : null;
      return c;
    });
  };

  const handleRemoveImage = (i) => () => setImages((imgs) => { 
    const c = [...imgs]; 
    c[i] = null; 
    return c; 
  });

  // Updated handleFormSubmit with correct field mapping
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    try {
      const payload = {
        name: formData.nome,
        property_type: formData.tipo,
        tipology: formData.tipologia,           // Updated field name
        num_wc: String(formData.casasBanho),    // Updated field name
        net_area: Number(formData.areaUtil),    // Updated field name
        gross_area: Number(formData.areaBruta), // Updated field name
        min_price: priceRange[0],               // Updated field name
        max_price: priceRange[1],               // Updated field name
        postal_code: formData.codigoPostal,
        district: Number(formData.distrito),
        municipality: Number(formData.municipio),
        street: formData.rua,
        new_construction: formData.novaConstrucao,  // Updated field name
        energy_certf: formData.certificado,         // Updated field name
        description: formData.descricao,            // Updated field name
        informacoes_adicionais: Object.keys(formData)
          .filter((k) => k.startsWith("extra_") && formData[k])
          .map((k) => k.replace("extra_", "")),
      };

      const property = await onSubmit(payload);

      if (property?.id) {
        await Promise.all(images.map(async (slot, idx) => {
          const init = initialSlots[idx];
          if (!slot && init?.id) return deletePropertyMedia(init.id);
          if (slot?.file) {
            const data = { file: slot.file, mediaType: "image", propertyId: property.id };
            return init?.id ? updatePropertyMedia(init.id, data) : createPropertyMedia(data);
          }
        }));
      }
    } catch (err) {
      console.error("Error during form submission:", err);
      setFormError(err.message || "Erro ao guardar imóvel.");
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
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imagens do Imóvel
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((slot, i) => (
            <div key={i} className="relative border-2 border-dashed border-gray-300 rounded h-24 overflow-hidden">
              {slot ? (
                <>
                  <img 
                    src={slot.file ? URL.createObjectURL(slot.file) : slot.url} 
                    alt={`Imagem ${i + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                  <button 
                    type="button" 
                    onClick={handleRemoveImage(i)} 
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <Trash2 size={12} />
                  </button>
                </>
              ) : (
                <label className="flex h-full w-full items-center justify-center cursor-pointer hover:border-[#CFAF5E]">
                  <span className="text-[#CFAF5E] text-2xl font-bold">+</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFileChange(i)} 
                  />
                </label>
              )}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Pode adicionar até {MAX_IMAGES} imagens.
        </p>
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
            const options = f.dynamicOptionsKey === "districts" 
              ? districts.map(d => ({ label: d.name, value: d.id })) 
              : f.dynamicOptionsKey === "municipalities" 
              ? municipalities.map(m => ({ label: m.name, value: m.id })) 
              : f.options;
            
            if (f.type === "select" || f.type === "dynamic-select") {
              return (
                <SelectField 
                  key={i} 
                  label={f.label} 
                  name={f.name} 
                  options={options} 
                  value={val} 
                  onChange={handleInputChange} 
                />
              );
            } else {
              return (
                <InputField 
                  key={i} 
                  label={f.label} 
                  name={f.name} 
                  type={f.inputType || "text"} 
                  value={val} 
                  onChange={handleInputChange}
                  required={f.required}
                  placeholder={f.placeholder}
                  preventNegative={f.inputType === "number"}
                  min={f.min}
                />
              );
            }
          })}
        </div>
      )}
      {stepDef.includePriceSlider && (
        <PriceRangeSlider 
          priceRange={priceRange} 
          setPriceRange={setPriceRange} 
        />
      )}
      {!isDesktop && step === steps.length - 1 && renderLastStep()}
    </div>
  );

  const renderMobileStepper = () => {
    const { title } = steps[step];
    const Icon = icons[step];

    return (
      <div className="flex flex-col items-center mb-6 md:hidden">
        <div className="w-12 h-12 mb-2 flex items-center justify-center rounded-full border-2 bg-[#CFAF5E] border-[#CFAF5E] text-white">
          <Icon size={24} />
        </div>
        <p className="text-sm text-gray-500">Passo {step + 1} de {steps.length}</p>
        <h3 className="text-base font-medium text-[#0A2647]">{title}</h3>
      </div>
    );
  };

  const isLast = step === steps.length - 1;

  return (
    <form onSubmit={handleFormSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      {formError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {formError}
        </div>
      )}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#0A2647]">{title}</h2>
        {!isDesktop && <p className="text-sm text-gray-500">Passo {step + 1} de {steps.length}</p>}
      </div>
      {!isDesktop && renderMobileStepper()}
      {isDesktop ? (
        <>
          {steps.map((s, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 bg-[#CFAF5E] border-[#CFAF5E] text-white">
                    <Icon size={16} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#0A2647]">{s.title}</h3>
                </div>
                {renderFields(s)}
                {i === steps.length - 1 && renderLastStep()}
              </div>
            );
          })}
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="px-8 py-3 bg-[#CFAF5E] text-white rounded shadow hover:bg-opacity-90"
            >
              {submitLabel}
            </button>
          </div>
        </>
      ) : (
        <>
          {renderFields(steps[step])}
          <div className="flex justify-between mt-6">
            {step > 0 ? (
              <button 
                type="button" 
                onClick={prevStep} 
                className="flex items-center px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                <ChevronLeft size={16} className="mr-1" /> Anterior
              </button>
            ) : <div />}
            {isLast ? (
              <button 
                type="submit" 
                className="px-6 py-2 bg-[#CFAF5E] text-white rounded hover:bg-opacity-90"
              >
                {submitLabel}
              </button>
            ) : (
              <button 
                type="button" 
                onClick={nextStep} 
                className="flex items-center px-6 py-2 bg-[#CFAF5E] text-white rounded hover:bg-opacity-90"
              >
                Seguinte <ChevronRight size={16} className="ml-1" />
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