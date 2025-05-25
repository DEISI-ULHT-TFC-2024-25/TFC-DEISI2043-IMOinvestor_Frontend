import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { MapPin, Home, Bed, Bath, Ruler, X } from 'lucide-react';

export default function PropertyDetails({ property, isOpen, onClose }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || !property) return null;

  const formatPrice = (min, max) => {
    if (min && max) {
      return `${min.toLocaleString()} € – ${max.toLocaleString()} €`;
    }
    return 'Preço sob consulta';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-[#0A2647] to-[#0d2f52] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
            aria-label="Fechar"
          >
            <X className="w-5 h-5 text-black" />
          </button>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-2 pr-12">
            {property.name}
          </h2>
          
          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base opacity-90">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{property.municipalityName || property.municipality}, {property.districtName || property.district}</span>
            </div>
            
            <div className="px-3 py-1 bg-[#CFAF5E] text-[#0A2647] rounded-full text-xs font-semibold">
              {property.property_type}
            </div>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="bg-gray-100 h-48 md:h-64 flex items-center justify-center border-b">
            <div className="text-center text-gray-500">
              <Home className="w-16 h-16 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Imagens em breve</p>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="bg-white border-2 border-[#CFAF5E] rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Preço</h3>
              <p className="text-2xl md:text-3xl font-bold text-[#CFAF5E]">
                {formatPrice(property.preco_minimo, property.preco_maximo)}
              </p>
              {property.roi && (
                <p className="text-sm mt-2 text-gray-600">ROI: {property.roi}%</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="w-12 h-12 bg-[#0A2647] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bed className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-[#0A2647] mb-1">{property.tipologia}</p>
                <p className="text-sm text-gray-600">Quartos</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="w-12 h-12 bg-[#0A2647] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bath className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-[#0A2647] mb-1">{property.numero_casas_banho}</p>
                <p className="text-sm text-gray-600">Casas de banho</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="w-12 h-12 bg-[#0A2647] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Ruler className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-[#0A2647] mb-1">{property.area_util} m²</p>
                <p className="text-sm text-gray-600">m² úteis</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-[#0A2647] mb-4 border-b border-gray-200 pb-2">
                  Detalhes do Imóvel
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DetailItem label="Área Útil" value={`${property.area_util} m²`} />
                  <DetailItem label="Área Bruta" value={`${property.area_bruta} m²`} />
                  <DetailItem label="Distrito" value={`${property.districtName || property.district}`} />
                  <DetailItem label="Município" value={`${property.municipalityName || property.municipality}`} />
                  <DetailItem label="Código Postal" value={property.postal_code} />
                  {property.street && (
                    <DetailItem label="Rua" value={property.street} className="md:col-span-2" />
                  )}
                  <DetailItem 
                    label="Nova Construção" 
                    value={property.nova_construcao ? 'Sim' : 'Não'} 
                  />
                  <DetailItem 
                    label="Certificado Energético" 
                    value={property.certificado_energetico} 
                  />
                </div>
              </div>

              {property.descricao && (
                <div>
                  <h3 className="text-xl font-semibold text-[#0A2647] mb-4 border-b border-gray-200 pb-2">
                    Descrição
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{property.descricao}</p>
                </div>
              )}

              {property.informacoes_adicionais?.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-[#0A2647] mb-4 border-b border-gray-200 pb-2">
                    Características Adicionais
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {property.informacoes_adicionais.map((info, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-[#CFAF5E] bg-opacity-20 text-[#0A2647] rounded-full text-sm font-medium"
                      >
                        {info}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value, className = "" }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-3 ${className}`}>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="font-semibold text-[#0A2647]">{value}</p>
    </div>
  );
}

PropertyDetails.propTypes = {
  property: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};