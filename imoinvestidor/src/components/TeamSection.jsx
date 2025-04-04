export const TeamSection = () => (
  <section className="p-6 bg-[#F0F0F0] text-[#0A2647] text-center">
    <h3 className="text-2xl font-bold mb-2">Quem Somos</h3>
    <p className="max-w-2xl mx-auto text-sm text-gray-700 mb-8">
      Somos uma equipa apaixonada por conectar pessoas aos seus lares ideais. Acreditamos que encontrar casa é mais do que uma compra — é uma etapa de vida. Trabalhamos com dedicação, transparência e um toque humano.
    </p>

    <h4 className="text-xl font-semibold mb-4">A Nossa Equipa</h4>
    <div className="flex justify-center flex-wrap gap-6">
      {[{ nome: "Joana Silva", cargo: "CEO" }, { nome: "Carlos Mendes", cargo: "Consultor" }, { nome: "Rita Lopes", cargo: "Marketing" }].map((pessoa, i) => (
        <div key={i} className="bg-white p-4 rounded shadow w-60">
          <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-2"></div>
          <p className="font-medium">{pessoa.nome}</p>
          <p className="text-sm text-gray-600">{pessoa.cargo}</p>
        </div>
      ))}
    </div>
  </section>
);