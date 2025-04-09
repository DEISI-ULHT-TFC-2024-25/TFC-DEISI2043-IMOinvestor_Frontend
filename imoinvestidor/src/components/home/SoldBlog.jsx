export const SoldBlog = () => (
  <section className="px-6 pt-10 pb-16 bg-white text-[#0A2647] text-center">
        <h3 className="text-2xl font-bold mb-2">Imóveis Vendidos Recentemente</h3>
        <p className="max-w-2xl mx-auto text-sm text-gray-600 mb-10">
          Veja alguns dos imóveis que ajudámos a vender — resultados concretos, clientes satisfeitos e histórias de sucesso.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Apartamento T2 em Lisboa",
              date: "Vendido em 15/03/2024",
              summary: "Imóvel renovado vendido em apenas 10 dias com 15% acima do valor inicial.",
              highlights: ["Venda rápida", "Acima do valor pedido"],
              image: true,
            },
            {
              title: "Moradia com Jardim em Cascais",
              date: "Vendido em 08/02/2024",
              summary: "Imóvel remodelado com potencial de valorização vendido em 5 dias, garantindo retorno de 18% ao investidor.",
              highlights: ["Ideal para famílias", "Processo eficiente"],
              image: true,
            }
          ].map((sale, i) => (
            <div key={i} className="bg-white shadow rounded overflow-hidden text-left flex flex-col justify-between">
              <div>
                <div className="h-48 bg-gray-300 w-full"></div>
                <div className="p-4">
                  <h4 className="text-md font-semibold mb-1">{sale.title}</h4>
                  <p className="text-xs text-gray-500 mb-2">{sale.date}</p>
                  <p className="text-sm text-gray-700 mb-2">{sale.summary}</p>
                  <div className="text-xs text-gray-500">
                    {sale.highlights.map((c, idx) => (
                      <p key={idx} className="italic">&ldquo;{c}&rdquo;</p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button className="mt-2 w-full text-sm text-white bg-[#0A2647] hover:bg-[#133c7b] px-4 py-2 rounded">
                  Ver detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
);