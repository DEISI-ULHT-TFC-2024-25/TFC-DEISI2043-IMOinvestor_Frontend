import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function PropertyDetails({ property, isOpen, onClose }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {property.name}
        </h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Tipologia:</strong> {property.tipologia}</p>
          <p><strong>Casas de banho:</strong> {property.numero_casas_banho}</p>
          <p><strong>Área útil:</strong> {property.area_util} m²</p>
          <p><strong>Preço:</strong> {property.preco_minimo?.toLocaleString()} € – {property.preco_maximo?.toLocaleString()} €</p>
          <p><strong>Distrito:</strong> {property.districtName || property.district}</p>
          <p><strong>Município:</strong> {property.municipalityName || property.municipality}</p>
          {property.street && <p><strong>Rua:</strong> {property.street}</p>}
          {property.roi && <p><strong>ROI:</strong> {property.roi}%</p>}
          <p><strong>Tipo de Imóvel:</strong> {property.property_type}</p>
          <p><strong>Área Bruta:</strong> {property.area_bruta} m²</p>
          <p><strong>Código Postal:</strong> {property.postal_code}</p>
          <p><strong>Nova Construção:</strong> {property.nova_construcao ? 'Sim' : 'Não'}</p>
          <p><strong>Certificado Energético:</strong> {property.certificado_energetico}</p>
          <p><strong>Descrição:</strong> {property.descricao}</p>
          {property.informacoes_adicionais?.length > 0 && (
            <div>
              <strong>Informações Adicionais:</strong>
              <ul className="list-disc list-inside">
                {property.informacoes_adicionais.map(info => (
                  <li key={info}>{info}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#CFAF5E] text-white rounded hover:bg-[#b89a4e]"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

PropertyDetails.propTypes = {
  property: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};