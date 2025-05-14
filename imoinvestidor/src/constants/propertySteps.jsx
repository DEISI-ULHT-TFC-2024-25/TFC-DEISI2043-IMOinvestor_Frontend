export const steps = [
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
      { label: 'Distrito', name: 'distrito', type: 'dynamic-select', dynamicOptionsKey: 'districts' },
      { label: 'Município', name: 'municipio', type: 'dynamic-select', dynamicOptionsKey: 'municipalities' },
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
