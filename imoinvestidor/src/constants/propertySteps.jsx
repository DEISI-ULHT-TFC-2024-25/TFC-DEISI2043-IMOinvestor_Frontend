export const steps = [
  {
    title: "Informações do Imóvel",
    fields: [
      { 
        label: 'Nome do Imóvel', 
        name: 'nome', 
        type: 'input',
        required: true,
        placeholder: 'Ex: Apartamento T2 no centro'
      },
      { 
        label: 'Tipo de Imóvel', 
        name: 'tipo', 
        type: 'select', 
        options: [
          { label: 'Apartamento', value: 'Apartamento' },
          { label: 'Casa', value: 'Casa' },
          { label: 'Terreno', value: 'Terreno' }
        ],
        required: true
      },
      { 
        label: 'Tipologia', 
        name: 'tipologia', 
        type: 'select', 
        options: [...Array(10)].map((_, i) => ({
          label: i < 9 ? `T${i}` : 'T9+',
          value: i < 9 ? `T${i}` : 'T9+'
        })),
        required: true
      },
      { 
        label: 'Nº Casas de Banho', 
        name: 'casasBanho', 
        type: 'select', 
        options: [
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '4+', value: '4+' }
        ],
        required: true
      },
      { 
        label: 'Área Útil (m²)', 
        name: 'areaUtil', 
        type: 'input', 
        inputType: 'number',
        preventNegative: true,
        min: '0',
        placeholder: 'Ex: 85 m²',
        required: true
      },
      { 
        label: 'Área Bruta (m²)', 
        name: 'areaBruta', 
        type: 'input', 
        inputType: 'number',
        preventNegative: true,
        min: '0',
        placeholder: 'Ex: 100 m²',
        required: true
      },
    ],
    includePriceSlider: true,
  },
  {
    title: "Localização",
    fields: [
      { 
        label: 'Distrito', 
        name: 'distrito', 
        type: 'dynamic-select', 
        dynamicOptionsKey: 'districts',
        required: true
      },
      { 
        label: 'Município', 
        name: 'municipio', 
        type: 'dynamic-select', 
        dynamicOptionsKey: 'municipalities',
        required: true
      },
      { 
        label: 'Código Postal', 
        name: 'codigoPostal', 
        type: 'input',
        placeholder: 'Ex: 1000-001',
        required: true
      },
      { 
        label: 'Rua', 
        name: 'rua', 
        type: 'input',
        placeholder: 'Ex: Rua das Flores, 123',
        required: false
      },
      { 
        label: 'Nova Construção?', 
        name: 'novaConstrucao', 
        type: 'select', 
        options: [
          { label: 'Sim', value: 'Sim' },
          { label: 'Não', value: 'Não' }
        ],
        required: true
      },
      { 
        label: 'Certificado Energético', 
        name: 'certificado', 
        type: 'select', 
        options: [
          { label: 'A+', value: 'A+' },
          { label: 'A', value: 'A' },
          { label: 'B', value: 'B' },
          { label: 'B-', value: 'B-' },
          { label: 'C', value: 'C' },
          { label: 'D', value: 'D' },
          { label: 'E', value: 'E' },
          { label: 'F', value: 'F' }
        ],
        required: true
      },
    ],
  },
  {
    title: "Imagens e Comodidades",
    fields: [],
  },
];