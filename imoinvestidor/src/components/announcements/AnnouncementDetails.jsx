import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { X, Home, MapPin, BedDouble, Bath, Ruler, Calendar, Building, Car, Waves, TreePine, ArrowUpDown } from 'lucide-react';
import { fetchAnnouncementById } from '@services/announcementService';

const AnnouncementDetails = ({ 
  announcement, 
  isOpen, 
  onClose 
}) => {
  const [announcementData, setAnnouncementData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Reset state when dialog closes
    if (!isOpen) {
      setAnnouncementData(null);
      setError(null);
      setLoading(false);
      setCurrentImageIndex(0);
      return;
    }

    // If we already have complete announcement data, use it
    if (announcement && announcement.property) {
      setAnnouncementData(announcement);
      return;
    }

    // If we have an announcement with ID but incomplete data, fetch full details
    if (announcement?.id) {
      loadAnnouncementById(announcement.id);
      return;
    }

    // If no announcement data is provided, show error
    setError('Dados do anúncio não disponíveis');
  }, [announcement, isOpen]);

  const loadAnnouncementById = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchAnnouncementById(id);
      setAnnouncementData(data);
    } catch (err) {
      setError('Erro ao carregar detalhes do anúncio');
    } finally {
      setLoading(false);
    }
  };

  // Handle body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center lg:p-4">
        <div className="absolute inset-0 bg-black opacity-50 hidden lg:block" onClick={handleBackdropClick} />
        <div className="relative bg-white lg:rounded-2xl p-6 max-w-md mx-4 shadow-2xl">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#CFAF5E]"></div>
            <span className="text-gray-700">A carregar detalhes...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center lg:p-4">
        <div className="absolute inset-0 bg-black opacity-50 hidden lg:block" onClick={handleBackdropClick} />
        <div className="relative bg-white lg:rounded-2xl p-6 max-w-md mx-4 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-red-600">Erro</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full  bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Fechar"
            >
              <X size={20}/>
            </button>
          </div>
          <p className="text-gray-700 mb-4">{error}</p>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#CFAF5E] text-white rounded-lg hover:bg-[#CFAF5E]/90 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!announcementData) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center lg:p-4">
        <div className="absolute inset-0 bg-black opacity-50 hidden lg:block" onClick={handleBackdropClick} />
        <div className="relative bg-white lg:rounded-2xl p-6 max-w-md mx-4 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-600">Aviso</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-gray-700 mb-4">Dados do anúncio não disponíveis</p>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#CFAF5E] text-white rounded-lg hover:bg-[#CFAF5E]/90 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { property = {}, price, is_active, created_at } = announcementData;
  const images = property.imagens || property.media || [];
  const hasImages = images.length > 0;

  // Format price safely
  const formatPrice = (priceValue) => {
    if (priceValue == null || priceValue === '') return 'Preço não disponível';
    const numPrice = parseFloat(priceValue);
    if (isNaN(numPrice)) return 'Preço não disponível';
    return `€${numPrice.toLocaleString('pt-PT')}`;
  };

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return 'Data não disponível';
    try {
      return new Date(dateString).toLocaleDateString('pt-PT');
    } catch {
      return 'Data não disponível';
    }
  };

  // Image navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center lg:p-4">
      <div
        className="absolute inset-0 bg-black opacity-50 hidden lg:block"
        onClick={handleBackdropClick}
      />

      <div className="relative bg-white lg:rounded-3xl shadow-2xl w-full max-w-5xl h-full lg:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0A2647] to-[#0d2f52] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-all duration-200"
            aria-label="Fechar"
          >
            <X className="w-5 h-5 text-black" />
          </button>

          <h2 className="text-2xl md:text-3xl font-bold mb-2 pr-12">
            {property.name || property.title || 'Detalhes do Anúncio'}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base opacity-90">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>
                {property.municipio || property.municipality}, {property.district || property.districtName}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {(property.tipo || property.property_type) && (
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#CFAF5E] text-[#0A2647]">
                  {property.tipo || property.property_type}
                </span>
              )}
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  is_active
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {is_active ? 'Ativo' : 'Inativo'}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100vh-100px)] lg:max-h-[calc(90vh-100px)] scrollbar-hide">
          {/* Image Section */}
          <div className="bg-gray-100">
            {hasImages ? (
              <div className="relative">
                <div className="relative h-[60vh] sm:h-[55vh] md:h-[400px] lg:h-[480px] bg-gray-100 flex items-center justify-center">
                  <img
                    src={images[currentImageIndex]?.file || images[currentImageIndex]?.url}
                    alt={`Imagem ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuw6NvIGRpc3BvbsOtdmVsPC90ZXh0Pjwvc3ZnPg==';
                    }}
                  />
                  
                  {/* Navigation buttons */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all"
                      >
                        &#8249;
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all"
                      >
                        &#8250;
                      </button>
                    </>
                  )}
                </div>
                
                {/* Image counter */}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>

                {/* Image thumbnails */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-4 flex space-x-2 max-w-[60%] overflow-x-auto">
                    {images.slice(0, 5).map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex 
                            ? 'border-[#CFAF5E]' 
                            : 'border-white border-opacity-60'
                        }`}
                      >
                        <img
                          src={img.file || img.url}
                          alt={`Miniatura ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                    {images.length > 5 && (
                      <div className="w-12 h-12 rounded-lg bg-black bg-opacity-50 flex items-center justify-center text-white text-xs font-semibold">
                        +{images.length - 5}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 md:h-64 text-gray-500">
                <div className="text-center">
                  <Home className="w-16 h-16 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Imagens em breve</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 md:p-8">
            {/* Price Section */}
            <div className="bg-white border-2 border-[#CFAF5E] rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Preço</h3>
              <div className="flex items-baseline justify-between">
                <p className="text-2xl md:text-3xl font-bold text-[#CFAF5E] leading-tight">
                  {formatPrice(price)}
                </p>
                {created_at && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Publicado em {formatDate(created_at)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <FeatureCard
                icon={<BedDouble className="text-white" />}
                label="Quartos"
                value={property.tipologia || 'N/A'}
              />
              <FeatureCard
                icon={<Bath className="text-white" />}
                label="Casas de banho"
                value={property.numero_casas_banho || 'N/A'}
              />
              <FeatureCard
                icon={<Ruler className="text-white" />}
                label="m² úteis"
                value={property.area_util ? `${property.area_util} m²` : 'N/A'}
              />
            </div>

            {/* Property Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-[#0A2647] mb-4 border-b border-gray-200 pb-2">
                  Detalhes do Imóvel
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.area_util && (
                    <DetailItem label="Área Útil" value={`${property.area_util} m²`} />
                  )}
                  {property.area_bruta && (
                    <DetailItem label="Área Bruta" value={`${property.area_bruta} m²`} />
                  )}
                  {(property.district || property.districtName) && (
                    <DetailItem label="Distrito" value={property.district || property.districtName} />
                  )}
                  {(property.municipio || property.municipality || property.municipalityName) && (
                    <DetailItem label="Município" value={property.municipio || property.municipality || property.municipalityName} />
                  )}
                  {(property.codigo_postal || property.postal_code) && (
                    <DetailItem label="Código Postal" value={property.codigo_postal || property.postal_code} />
                  )}
                  {property.street && (
                    <DetailItem label="Rua" value={property.street} className="md:col-span-2" />
                  )}
                  {property.nova_construcao !== undefined && (
                    <DetailItem 
                      label="Nova Construção" 
                      value={property.nova_construcao ? 'Sim' : 'Não'} 
                    />
                  )}
                  {property.certificado_energetico && (
                    <DetailItem 
                      label="Certificado Energético" 
                      value={property.certificado_energetico} 
                    />
                  )}
                  {property.andar && (
                    <DetailItem label="Andar" value={property.andar} />
                  )}
                  {property.orientacao && (
                    <DetailItem label="Orientação" value={property.orientacao} />
                  )}
                </div>
              </div>

              {/* Additional Features */}
              {(property.varanda || property.piscina || property.elevador || property.jardim || property.estacionamento || property.ar_condicionado || property.aquecimento || property.mobilado) && (
                <div>
                  <h3 className="text-xl font-semibold text-[#0A2647] mb-4 border-b border-gray-200 pb-2">
                    Características Adicionais
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {property.varanda && (
                      <FeatureTag icon={<Building size={14} />} text="Varanda" />
                    )}
                    {property.piscina && (
                      <FeatureTag icon={<Waves size={14} />} text="Piscina" />
                    )}
                    {property.elevador && (
                      <FeatureTag icon={<ArrowUpDown size={14} />} text="Elevador" />
                    )}
                    {property.jardim && (
                      <FeatureTag icon={<TreePine size={14} />} text="Jardim" />
                    )}
                    {property.estacionamento && (
                      <FeatureTag icon={<Car size={14} />} text="Estacionamento" />
                    )}
                    {property.ar_condicionado && (
                      <FeatureTag text="Ar Condicionado" />
                    )}
                    {property.aquecimento && (
                      <FeatureTag text="Aquecimento" />
                    )}
                    {property.mobilado && (
                      <FeatureTag text="Mobilado" />
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              {property.descricao && (
                <div>
                  <h3 className="text-xl font-semibold text-[#0A2647] mb-4 border-b border-gray-200 pb-2">
                    Descrição
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {property.descricao}
                  </p>
                </div>
              )}

              {/* Contact Information */}
              {(property.contacto_telefone || property.contacto_email) && (
                <div>
                  <h3 className="text-xl font-semibold text-[#0A2647] mb-4 border-b border-gray-200 pb-2">
                    Contacto
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.contacto_telefone && (
                      <DetailItem label="Telefone" value={property.contacto_telefone} />
                    )}
                    {property.contacto_email && (
                      <DetailItem label="Email" value={property.contacto_email} />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function FeatureCard({ icon, label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 text-center">
      <div className="w-12 h-12 bg-[#0A2647] rounded-full flex items-center justify-center mx-auto mb-3">
        {icon}
      </div>
      <p className="text-2xl font-bold text-[#0A2647] mb-1">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
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

function FeatureTag({ icon, text }) {
  return (
    <span className="px-3 py-1 bg-[#CFAF5E] bg-opacity-20 text-[#0A2647] rounded-full text-sm font-medium flex items-center space-x-1">
      {icon}
      <span>{text}</span>
    </span>
  );
}

AnnouncementDetails.propTypes = {
  announcement: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      property: PropTypes.object,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      is_active: PropTypes.bool,
      created_at: PropTypes.string,
    })
  ]),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AnnouncementDetails;