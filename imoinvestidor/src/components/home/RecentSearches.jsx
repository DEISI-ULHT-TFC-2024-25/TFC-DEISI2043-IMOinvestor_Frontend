export const RecentSearchs = () => {
    return (
        <section className="p-6">
            <h3 className="text-xl font-semibold text-[#0A2647] mb-4">Suas Pesquisas Recentes</h3>
            <div className="flex gap-4">
            {["Apartamento em Lisboa", "Casa em Cascais", "Estudio em Parede"].map((search, index) => (
                <div key={index} className="bg-white p-4 rounded shadow text-center">
                <p className="text-sm font-medium text-[#0A2647]">{search}</p>
                </div>
            ))}
            </div>
        </section>
    )
}