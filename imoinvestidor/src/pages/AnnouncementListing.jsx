import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Car, Home, Calendar, ChevronLeft, Heart, Loader2, Phone, Mail, Square, Maximize, TreePine, Droplets, Zap, CheckCircle, Share, MapIcon, Ruler, BedDouble } from 'lucide-react';
import { fetchAnnouncementById } from '@services/announcementService';
import placeholderImg from '@images/placeholder.jpg';

const AnnouncementListing = () => {
  const { id: announcementId } = useParams();
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const loadAnnouncement = async () => {
      if (!announcementId) {
        setError('No announcement ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchAnnouncementById(announcementId);
        setAnnouncement(data);
        setError(null);
      } catch (err) {
        setError('Failed to load announcement');
        console.error('Error fetching announcement:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAnnouncement();
  }, [announcementId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  // Get images using the same logic as the popup
  const getImages = () => {
    if (!announcement?.property) return [];
    
    const property = announcement.property;
    
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin text-[#0A2647]" />
          <span className="text-[#0A2647]">A carregar detalhes...</span>
        </div>
      </div>
    );
  }

  if (error || !announcement) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Anúncio não encontrado'}</p>
          <button 
            onClick={handleGoBack}
            className="bg-[#0A2647] text-white px-4 py-2 rounded-lg hover:bg-[#0A2647]/90"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const { property = {}, price, is_active, created_at } = announcement;
  const images = getImages();
  const imageUrls = images.map(img => img.file || img.url);

  const nextImage = () => {
    if (imageUrls.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
    }
  };

  const prevImage = () => {
    if (imageUrls.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
    }
  };

  const getPropertyAddress = () => {
    const parts = [];
    if (property.street) parts.push(property.street);
    if (property.municipality_name) parts.push(property.municipality_name);
    if (property.district_name) parts.push(property.district_name);
    return parts.join(', ') || 'Morada não disponível';
  };

  const getMainFeatures = () => {
    const features = [];
    
    if (property.typology) {
      features.push({ icon: BedDouble, label: `${property.typology}`, value: property.typology });
    }
    
    if (property.num_wc) {
      features.push({ icon: Bath, label: 'Casas de banho', value: property.num_wc });
    }
    
    if (property.net_area) {
      features.push({ icon: Ruler, label: 'm² úteis', value: `${property.net_area} m²` });
    }
    
    if (property.gross_area) {
      features.push({ icon: Square, label: 'm² brutos', value: `${property.gross_area} m²` });
    }

    return features.slice(0, 4);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white">
        {/* Image Gallery */}
        <div className="relative">
          {imageUrls.length > 0 ? (
            <>
              <div className="aspect-video bg-gray-200 relative overflow-hidden">
                <img 
                  src={imageUrls[currentImageIndex]} 
                  alt="Property" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = placeholderImg;
                  }}
                />
                
                {/* Navigation arrows */}
                {imageUrls.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                    >
                      <ChevronLeft className="w-5 h-5 rotate-180 text-gray-700" />
                    </button>

                    {/* Image counter */}
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {currentImageIndex + 1} / {imageUrls.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              {imageUrls.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {imageUrls.slice(0, 6).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index ? 'border-[#CFAF5E] ring-2 ring-[#CFAF5E]/20' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = placeholderImg;
                        }}
                      />
                    </button>
                  ))}
                  {imageUrls.length > 6 && (
                    <div className="flex-shrink-0 w-20 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-sm font-medium text-gray-600 border-2 border-gray-200">
                      +{imageUrls.length - 6}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <Home className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Imagens em breve</p>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Title and Price */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-gray-900">
                {property.name || property.title || 'Detalhes do Anúncio'}
              </h1>
                {property.property_type && (
                    <span className="bg-[#CFAF5E] bg-opacity-20 text-[#0A2647] text-xs font-medium px-3 py-1 rounded-full">
                    {property.property_type}
                    </span>
                )}
            </div>
            <p className="text-3xl font-bold text-[#CFAF5E] mb-2">{formatPrice(price)}</p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{property.municipality_name}, {property.district_name}</span>
              </div>
              {created_at && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Publicado em {formatDate(created_at)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {getMainFeatures().map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="w-12 h-12 bg-[#0A2647] rounded-full flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="text-white w-6 h-6" />
                </div>
                <p className="text-2xl font-bold text-[#0A2647] mb-1">{feature.value}</p>
                <p className="text-sm text-gray-600">{feature.label}</p>
              </div>
            ))}
          </div>

          {/* Location */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#0A2647] mb-4 border-b border-gray-200 pb-2 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Localização
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-start text-gray-700">
                  <MapPin className="w-5 h-5 mr-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{getPropertyAddress()}</p>
                    {property.postal_code && (
                      <p className="text-sm text-gray-600 mt-1">{property.postal_code}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-sm text-gray-600">
                    {property.municipality_name}, {property.district_name}
                  </span>
                  <button 
                    onClick={() => setShowMap(!showMap)}
                    className="text-[#0A2647] text-sm font-medium hover:text-[#0A2647]/80 flex items-center"
                  >
                    <MapIcon className="w-4 h-4 mr-1" />
                    {showMap ? 'Ocultar Mapa' : 'Ver Mapa'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#0A2647] mb-4 border-b border-gray-200 pb-2">
              Detalhes do Imóvel
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {property.net_area && (
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-sm text-gray-600 mb-1">Área Útil</p>
                  <p className="font-semibold text-[#0A2647]">{property.net_area} m²</p>
                </div>
              )}
              {property.gross_area && (
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-sm text-gray-600 mb-1">Área Bruta</p>
                  <p className="font-semibold text-[#0A2647]">{property.gross_area} m²</p>
                </div>
              )}
              {property.district_name && (
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-sm text-gray-600 mb-1">Distrito</p>
                  <p className="font-semibold text-[#0A2647]">{property.district_name}</p>
                </div>
              )}
              {property.municipality_name && (
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-sm text-gray-600 mb-1">Município</p>
                  <p className="font-semibold text-[#0A2647]">{property.municipality_name}</p>
                </div>
              )}
              {property.postal_code && (
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-sm text-gray-600 mb-1">Código Postal</p>
                  <p className="font-semibold text-[#0A2647]">{property.postal_code}</p>
                </div>
              )}
              {property.street && (
                <div className="bg-white border border-gray-200 rounded-lg p-3 md:col-span-2">
                  <p className="text-sm text-gray-600 mb-1">Rua</p>
                  <p className="font-semibold text-[#0A2647]">{property.street}</p>
                </div>
              )}
              {property.new_construction !== undefined && (
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-sm text-gray-600 mb-1">Nova Construção</p>
                  <p className="font-semibold text-[#0A2647]">{property.new_construction ? 'Sim' : 'Não'}</p>
                </div>
              )}
              {property.energy_certf && (
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-sm text-gray-600 mb-1">Certificado Energético</p>
                  <p className="font-semibold text-[#0A2647]">{property.energy_certf}</p>
                </div>
              )}
              {property.floor && (
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-sm text-gray-600 mb-1">Andar</p>
                  <p className="font-semibold text-[#0A2647]">{property.floor}</p>
                </div>
              )}
              {property.orientation && (
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-sm text-gray-600 mb-1">Orientação</p>
                  <p className="font-semibold text-[#0A2647]">{property.orientation}</p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Features */}
          {property.informacoes_adicionais?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#0A2647] mb-4 border-b border-gray-200 pb-2">
                Características Adicionais
              </h2>
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

          {/* Description */}
          {property.description && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#0A2647] mb-4 border-b border-gray-200 pb-2">Descrição</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{property.description}</p>
              </div>
            </div>
          )}

          {/* Contact Information */}
          {(property.phone_contact || property.email_contact) && (
            <div className="mb-6 bg-gradient-to-r from-[#0A2647] to-[#0d2f52] p-6 rounded-lg text-white">
              <h3 className="text-xl font-semibold mb-4">Contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.phone_contact && (
                  <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors">
                    <Phone className="w-5 h-5 mr-2" />
                    {property.phone_contact}
                  </button>
                )}
                {property.email_contact && (
                  <button className="bg-[#CFAF5E] hover:bg-[#CFAF5E]/90 text-[#0A2647] py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors">
                    <Mail className="w-5 h-5 mr-2" />
                    {property.email_contact}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementListing;