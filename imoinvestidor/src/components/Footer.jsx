export default function Footer() {
  return (
    <footer className="bg-[#3A3A3A] text-white p-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-bold text-[#CFAF5E]">Procurando imóvel?</h4>
            <ul className="text-sm">
              <li>Casas à venda</li>
              <li>Apartamentos para alugar</li>
              <li>Imóveis de luxo</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#CFAF5E]">Anunciar um imóvel</h4>
            <ul className="text-sm">
              <li>Publicar anúncio</li>
              <li>Melhores práticas</li>
              <li>Contato com imobiliárias</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#CFAF5E]">Redes Sociais</h4>
            <p className="text-sm">Siga-nos nas redes sociais para novidades.</p>
          </div>
        </div>
      </footer>
  );
}