export default function Footer() {
  return (
    <footer className="bg-[#3A3A3A] text-white py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div>
          <h4 className="font-bold text-[#CFAF5E] mb-3">Procurando imóvel?</h4>
          <ul className="text-sm space-y-1">
            <li>Casas à venda</li>
            <li>Apartamentos para alugar</li>
            <li>Imóveis de luxo</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-[#CFAF5E] mb-3">Anunciar um imóvel</h4>
          <ul className="text-sm space-y-1">
            <li>Publicar anúncio</li>
            <li>Melhores práticas</li>
            <li>Contato com imobiliárias</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-[#CFAF5E] mb-3">Redes Sociais</h4>
          <p className="text-sm">Siga-nos nas redes sociais para novidades.</p>
        </div>
      </div>
    </footer>
  );
}