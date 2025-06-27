import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { MapPin, Home, Bed, Bath, Ruler, X } from 'lucide-react';
import placeholderImg from '@images/placeholder.jpg';

export default function PropertyDetails({ property, isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getImages = () => {
    if (!property) return [];
    
    // Check if property has images array
    if (property?.images && Array.isArray(property.images) && property.images.length > 0) {
      return property.images.map(imageItem => ({
        file: imageItem.file || imageItem.url || imageItem.image || imageItem.file_url || imageItem.media_url,
        url: imageItem.file || imageItem.url || imageItem.image || imageItem.file_url || imageItem.media_url
      })).filter(img => img.file);
    }
    
    // Check for media array
    if (property?.media && property.media.length > 0) {
      return property.media
        .filter(media => media.media_type === 'image')
        .map(media => ({
          file: media.file,
          url: media.file
        }));
    }
    
    // Check for single image property
    if (property?.image) {
      return [{
        file: property.image,
        url: property.image
      }];
    }
    
    // Check if there's a direct imageUrl prop
    if (property?.imageUrl && property.imageUrl !== placeholderImg) {
      return [{
        file: property.imageUrl,
        url: property.imageUrl
      }];
    }
    
    return [];
  };

  const images = getImages();
  const hasImages = images.length > 0;

  const processedImages = useMemo(() => {
    return images.map((item) => {
      // Handle File objects
      if (item?.file instanceof File) {
        return URL.createObjectURL(item.file);
      }
      // Handle URL strings
      return item?.file || item?.url || placeholderImg;
    });
  }, [images]);

  useEffect(() => {
    return () => {
      processedImages.forEach(src => {
        if (src.startsWith('blob:')) URL.revokeObjectURL(src);
      });
    };
  }, [processedImages]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  // Image navigation functions
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % processedImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + processedImages.length) % processedImages.length);
  };

  if (!isOpen || !property) return null;

  const formatPrice = (min, max) => {
    const numMin = Number(min) || 0;
    const numMax = Number(max) || 0;

    if (numMax > 0) {
      return {
        range: `${numMin.toLocaleString()} € – ${numMax.toLocaleString()} €`,
        minPrice: `${numMin.toLocaleString()} €`,
        maxPrice: `${numMax.toLocaleString()} €`
      };
    }

    return {
      range: 'Preço sob consulta',
      minPrice: null,
      maxPrice: null
    };
  };

  const priceData = formatPrice(property.min_price, property.max_price);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center lg:p-4">
      <div
        className="absolute inset-0 bg-black opacity-50 hidden lg:block"
        onClick={onClose}
      />

      <div className="relative bg-white lg:rounded-3xl shadow-2xl w-full max-w-4xl h-full lg:max-h-[90vh] overflow-hidden">
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
              <span>
                {property.municipality_name},{" "}
                {property.district_name}
              </span>
            </div>
            <div className="px-3 py-1 bg-[#CFAF5E] text-[#0A2647] rounded-full text-xs font-semibold">
              {property.property_type}
            </div>
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-140px)] lg:max-h-[calc(90vh-140px)] scrollbar-hide">
          <div className="bg-gray-100">
            {hasImages ? (
              <div className="relative">
                <div className="relative h-[60vh] sm:h-[55vh] md:h-[400px] lg:h-[480px] bg-gray-100 flex items-center justify-center">
                  <img
                    src={processedImages[currentImageIndex]}
                    alt={`Imagem ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = placeholderImg;
                    }}
                  />
                  
                  {/* Navigation buttons */}
                  {processedImages.length > 1 && (
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
                  {currentImageIndex + 1} / {processedImages.length}
                </div>

                {/* Image thumbnails */}
                {processedImages.length > 1 && (
                  <div className="absolute bottom-4 left-4 flex space-x-2 max-w-[60%] overflow-x-auto">
                    {processedImages.slice(0, 5).map((src, index) => (
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
                          src={src}
                          alt={`Miniatura ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = placeholderImg;
                          }}
                        />
                      </button>
                    ))}
                    {processedImages.length > 5 && (
                      <div className="w-12 h-12 rounded-lg bg-black bg-opacity-50 flex items-center justify-center text-white text-xs font-semibold">
                        +{processedImages.length - 5}
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
            <div className="bg-white border-2 border-[#CFAF5E] rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Preço</h3>

              <div className="block sm:hidden">
                {priceData.minPrice && priceData.maxPrice ? (
                  <div className="space-y-1">
                    <div className="text-xl font-bold text-[#CFAF5E] leading-tight">
                      {priceData.minPrice}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">até</div>
                    <div className="text-xl font-bold text-[#CFAF5E] leading-tight">
                      {priceData.maxPrice}
                    </div>
                  </div>
                ) : (
                  <div className="text-xl font-bold text-[#CFAF5E] leading-tight break-words">
                    {priceData.range}
                  </div>
                )}
              </div>

              <div className="hidden sm:block">
                {priceData.minPrice && priceData.maxPrice ? (
                  <div className="space-y-1">
                    <div className="text-2xl md:text-3xl font-bold text-[#CFAF5E] leading-tight">
                      {priceData.minPrice}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">até</div>
                    <div className="text-2xl md:text-3xl font-bold text-[#CFAF5E] leading-tight">
                      {priceData.maxPrice}
                    </div>
                  </div>
                ) : (
                  <p className="text-2xl md:text-3xl font-bold text-[#CFAF5E] leading-tight">
                    {priceData.range}
                  </p>
                )}
              </div>

              {property.roi && (
                <p className="text-sm mt-2 text-gray-600">ROI: {property.roi}%</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <FeatureCard
                icon={<Bed className="text-white" />}
                label="Quartos"
                value={property.typology}
              />
              <FeatureCard
                icon={<Bath className="text-white" />}
                label="Casas de banho"
                value={property.num_wc}
              />
              <FeatureCard
                icon={<Ruler className="text-white" />}
                label="m² úteis"
                value={`${property.net_area} m²`}
              />
            </div>

            <div className="space-y-6">
              <DetailsSection property={property} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 text-center">
      <div className="w-12 h-12 bg-[#0A2647] rounded-full flex items-center justify-center mx-auto mb-3 text-white">
        {icon}
      </div>
      <p className="text-2xl font-bold text-[#0A2647] mb-1">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}

function DetailsSection({ property }) {
  return (
    <>
      <div>
        <h3 className="text-xl font-semibold text-[#0A2647] mb-4 border-b border-gray-200 pb-2">
          Detalhes do Imóvel
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailItem label="Área Útil" value={`${property.net_area} m²`} />
          <DetailItem label="Área Bruta" value={`${property.gross_area} m²`} />
          <DetailItem
            label="Distrito"
            value={`${property.district_name}`}
          />
          <DetailItem
            label="Município"
            value={`${property.municipality_name}`}
          />
          <DetailItem label="Código Postal" value={property.postal_code} />
          {property.street && (
            <DetailItem
              label="Rua"
              value={property.street}
              className="md:col-span-2"
            />
          )}
          <DetailItem
            label="Nova Construção"
            value={property.new_construction ? 'Sim' : 'Não'}
          />
          <DetailItem
            label="Certificado Energético"
            value={property.energy_certf}
          />
        </div>
      </div>

      {property.description && (
        <div>
          <h3 className="text-xl font-semibold text-[#0A2647] mb-4 border-b border-gray-200 pb-2">
            Descrição
          </h3>
          <p className="text-gray-700 leading-relaxed">{property.description}</p>
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
    </>
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
