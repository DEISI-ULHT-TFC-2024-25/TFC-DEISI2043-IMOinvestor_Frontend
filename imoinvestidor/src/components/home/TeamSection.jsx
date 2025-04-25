export const TeamSection = () => (
  <section className="p-8 bg-[#F0F0F0] text-[#0A2647]">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
      
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-4xl font-bold mb-6">Quem Somos</h3>
        <div className="space-y-6 text-base leading-relaxed text-gray-700">
          <p>
            Somos uma equipa apaixonada por conectar pessoas aos seus lares ideais. 
            Acreditamos que encontrar casa é mais do que uma compra — é uma etapa de vida.
          </p>
          <p>
            A nossa plataforma foi criada para facilitar a procura, personalizar a experiência e aproximar 
            agentes, investidores e promotores de forma transparente e eficaz.
          </p>
          <p>
            Com tecnologia moderna e um toque humano, tornamos o processo de investimento imobiliário mais simples, 
            seguro e acessível para todos.
          </p>
        </div>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-sm h-80 bg-gray-300 rounded-lg shadow-lg"></div>
      </div>

    </div>
  </section>
);