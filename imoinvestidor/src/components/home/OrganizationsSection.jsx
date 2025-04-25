import SliderWrapper from '@components/SliderWrapper';

export const OrganizationsSection = () => {
  const items = [
    { nome: "Imobiliária X", descricao: "Especialistas em imóveis de luxo no centro da cidade." },
    { nome: "Imobiliária Y", descricao: "Foco em apartamentos modernos e acessíveis." },
    { nome: "Imobiliária Z", descricao: "Consultoria em imóveis para investimento a longo prazo." },
    { nome: "Corretor X", descricao: "Serviço personalizado com foco em famílias." },
    { nome: "Corretor Y", descricao: "Conhecimento profundo do mercado local de Lisboa." },
    { nome: "Corretor Z", descricao: "Apoio total durante todo o processo de compra." },
    { nome: "Consultoria X", descricao: "Especialistas em contratos e legalização de imóveis." },
    { nome: "Consultoria Y", descricao: "Orientação financeira para novos compradores." },
    { nome: "Consultoria Z", descricao: "Apoio jurídico em transações de grande escala." },
  ];

  return (
    <section className="p-6 bg-[#FAEBC8] text-[#0A2647] text-center">
      <h3 className="text-xl font-semibold mb-4">Organizações e Parceiros</h3>
      <p className="max-w-xl mx-auto text-sm text-gray-700 mb-6">
        Trabalhamos com parceiros de confiança para garantir que cada processo ocorra com profissionalismo.
      </p>

      <SliderWrapper itemWidth="w-full max-w-xs" itemHeight="h-full max-h-xs">
        {items.map((org, i) => (
          <div key={i} className="bg-white p-4 rounded shadow mx-auto h-full">
            <div className="w-16 h-16 bg-[#D9CBA5] rounded-full mx-auto mb-3"></div>
            <h4 className="font-semibold text-md">{org.nome}</h4>
            <p className="text-sm text-gray-600">{org.descricao}</p>
          </div>
        ))}
      </SliderWrapper>

    </section>
  );
};