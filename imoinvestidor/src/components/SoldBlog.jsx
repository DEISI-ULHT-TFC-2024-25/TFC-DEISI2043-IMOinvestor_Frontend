export const SoldBlog = () => (
    <section className="p-6 bg-[#FFFBEA] text-[#0A2647]">
      <h3 className="text-xl font-semibold mb-4">Casas Vendidas / Renovadas</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Apartamento renovado em Lisboa", "Casa com jardim em Sintra"].map((title, i) => (
          <div key={i} className="bg-white p-4 rounded shadow">
            <div className="h-40 bg-gray-300 rounded mb-2"></div>
            <h4 className="font-semibold text-lg">{title}</h4>
            <p className="text-sm text-gray-700">Descrição breve do projeto.</p>
          </div>
        ))}
      </div>
    </section>
  );