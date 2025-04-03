export const TeamSection = () => (
    <section className="p-6 bg-[#F0F0F0] text-center text-[#0A2647]">
      <h3 className="text-xl font-semibold mb-4">Conheça a Nossa Equipa</h3>
      <div className="flex justify-center flex-wrap gap-6">
        {["Joana Silva", "Carlos Mendes", "Rita Lopes"].map((name, i) => (
          <div key={i} className="bg-white p-4 rounded shadow w-60">
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-2"></div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-gray-600">Cargo</p>
          </div>
        ))}
      </div>
    </section>
  );
  