export const OrganizationsSection = () => (
    <section className="p-6 bg-[#FAEBC8] text-[#0A2647] text-center">
      <h3 className="text-xl font-semibold mb-4">Organizações e Parceiros</h3>
      <p className="max-w-xl mx-auto text-sm text-gray-700 mb-6">
        Trabalhamos com parceiros de confiança para garantir que cada processo de compra, venda ou arrendamento ocorra com o máximo profissionalismo.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {[{ nome: "Imobiliária X", descricao: "Especialistas em imóveis de luxo." }, { nome: "Corretor Y", descricao: "Atendimento personalizado e experiência local." }, { nome: "Consultoria Z", descricao: "Apoio jurídico e financeiro." }].map((org, index) => (
          <div key={index} className="bg-white p-4 rounded shadow w-60">
            <div className="w-16 h-16 bg-[#D9CBA5] rounded-full mx-auto mb-3"></div>
            <h4 className="font-semibold text-md">{org.nome}</h4>
            <p className="text-sm text-gray-600 mb-2">{org.descricao}</p>
          </div>
        ))}
      </div>
    </section>
  );
  