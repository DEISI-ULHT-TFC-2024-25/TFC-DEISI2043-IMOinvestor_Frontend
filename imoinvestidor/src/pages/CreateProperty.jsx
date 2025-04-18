import { useState } from 'react';

export default function CreateProperty() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
    tipo: '',
    area: '',
    preco: '',
    tipologia: '',
    casasBanho: '',
    rua: '',
    codigoPostal: '',
    distrito: '',
    municipio: '',
    novaConstrucao: '',
    certificado: '',
    descricao: '',
    extras: [],
    fotos: [],
  });

  const extrasOptions = [
    'varanda', 'elevador', 'jardim', 'duplex', 'garagem', 'terraço', 'piscina', 
    'Acessibilidade para pessoas com mobilidade reduzida'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleExtra = (extra) => {
    setFormData((prev) => ({
      ...prev,
      extras: prev.extras.includes(extra)
        ? prev.extras.filter((e) => e !== extra)
        : [...prev.extras, extra],
    }));
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);
  const handleFinish = () => {
    console.log('Formulário enviado:', formData);
    alert('Propriedade criada (simulação)');
  };

  const inputClasses = "border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#CFAF5E] text-[#0A2647]";

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow">
      {step === 1 && (
        <>
          <h2 className="text-2xl font-bold text-[#0A2647] mb-6">Criar Novo Imóvel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="nome" placeholder="Nome do Imóvel" onChange={handleChange} className={inputClasses} />
            <input type="text" name="tipo" placeholder="Tipo de Imóvel" onChange={handleChange} className={inputClasses} />
            <input type="text" name="area" placeholder="Área (m²)" onChange={handleChange} className={inputClasses} />
            <input type="text" name="preco" placeholder="Preço (€)" onChange={handleChange} className={inputClasses} />
            <input type="text" name="tipologia" placeholder="Tipologia (ex: T2)" onChange={handleChange} className={inputClasses} />
            <input type="text" name="casasBanho" placeholder="Nº Casas de Banho" onChange={handleChange} className={inputClasses} />
            <input type="text" name="rua" placeholder="Rua" onChange={handleChange} className={inputClasses} />
            <input type="text" name="codigoPostal" placeholder="Código Postal" onChange={handleChange} className={inputClasses} />
            <input type="text" name="distrito" placeholder="Distrito (ID)" onChange={handleChange} className={inputClasses} />
            <input type="text" name="municipio" placeholder="Município (ID)" onChange={handleChange} className={inputClasses} />
            <input type="text" name="novaConstrucao" placeholder="Nova Construção? (sim/não)" onChange={handleChange} className={inputClasses} />
            <input type="text" name="certificado" placeholder="Certificado Energético" onChange={handleChange} className={inputClasses} />
          </div>

          <textarea
            name="descricao"
            placeholder="Descrição"
            onChange={handleChange}
            className={`${inputClasses} mt-4 h-32 resize-none`}
          />

          <div className="flex justify-end mt-6">
            <button onClick={handleNext} className="px-6 py-2 bg-[#0A2647] text-white rounded-lg hover:bg-[#133c7b] transition">
              Próximo
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-2xl font-bold text-[#0A2647] mb-6">Fotografias e Informações Adicionais</h2>

          {/* Upload de fotos */}
          <div>
            <h3 className="text-lg font-semibold text-[#0A2647] mb-2">Fotografias do Imóvel</h3>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[...Array(16)].map((_, idx) => (
                <div key={idx} className="border-2 border-dashed rounded-lg flex justify-center items-center h-24 text-2xl text-gray-400 cursor-pointer hover:border-[#0A2647] hover:text-[#0A2647]">
                  +
                </div>
              ))}
            </div>
          </div>

          {/* Extras */}
          <div>
            <h3 className="text-lg font-semibold text-[#0A2647] mb-4">Informações Adicionais</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {extrasOptions.map((extra) => (
                <label key={extra} className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={formData.extras.includes(extra)}
                    onChange={() => toggleExtra(extra)}
                  />
                  {extra}
                </label>
              ))}
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-between mt-6">
            <button onClick={handleBack} className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">
              Voltar
            </button>
            <button onClick={handleFinish} className="px-6 py-2 bg-[#0A2647] text-white rounded-lg hover:bg-[#133c7b] transition">
              Finalizar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
