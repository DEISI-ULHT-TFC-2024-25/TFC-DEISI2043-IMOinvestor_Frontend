import { useEffect, useRef, useState } from 'react';

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

  const containerRef = useRef();
  const itemRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const itemWidth = itemRef.current?.offsetWidth || 0;

    const interval = setInterval(() => {
      const next = (activeIndex + 1) % items.length;
      setActiveIndex(next);

      container?.scrollTo({
        left: next * (itemWidth + 16), // 16px = gap-4
        behavior: 'smooth',
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex, items.length]);

  useEffect(() => {
    const container = containerRef.current;
    const itemWidth = itemRef.current?.offsetWidth || 0;

    const handleScroll = () => {
      const index = Math.round(container.scrollLeft / (itemWidth + 16));
      setActiveIndex(index);
    };

    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-10 px-4 bg-[#FAEBC8] text-[#0A2647] text-center">
      <h3 className="text-xl font-semibold mb-4">Organizações e Parceiros</h3>
      <p className="max-w-xl mx-auto text-sm text-gray-700 mb-6">
        Trabalhamos com parceiros de confiança para garantir que cada processo ocorra com profissionalismo.
      </p>

      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x pb-2 scrollbar-hide max-w-screen-xl mx-auto flex-nowrap"
      >
        {items.map((org, i) => (
          <div
            key={i}
            ref={i === 0 ? itemRef : null}
            className="snap-start bg-white p-4 rounded shadow w-60 min-w-[240px] max-w-[240px] flex-shrink-0"
          >
            <div className="w-16 h-16 bg-[#D9CBA5] rounded-full mx-auto mb-3"></div>
            <h4 className="font-semibold text-md">{org.nome}</h4>
            <p className="text-sm text-gray-600">{org.descricao}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === activeIndex ? 'bg-[#0A2647]' : 'bg-gray-400'
            } transition`}
          />
        ))}
      </div>
    </section>
  );
};
