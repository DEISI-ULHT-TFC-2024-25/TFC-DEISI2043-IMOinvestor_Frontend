import { ChevronLeft, Eye, Building, Calendar, CheckCircle } from 'lucide-react';
import { PropertyCard } from '@properties/PropertyCard';
import PricePositionBar from '@common/PricePositionBar';
import { useState, useEffect } from 'react';
import { getPropertiesWithAnnouncement } from '@services/propertyService';

export default function StepConfirm({ form, prev, onCreate, existingAds, loading, success }) {
  const [hasExistingAnnouncement, setHasExistingAnnouncement] = useState(false);
  const [loadingCheck, setLoadingCheck] = useState(false);
  
  const property = form.property;
  const price = parseFloat(form.price) || 0;
  const minPrice = property?.min_price || 0;
  const maxPrice = property?.max_price || 0;
  
  useEffect(() => {
    const checkForExistingAnnouncement = async () => {
      if (!property?.id) return;
      
      setLoadingCheck(true);
      try {
        const propertiesWithAds = await getPropertiesWithAnnouncement();
        const hasAd = propertiesWithAds.some(prop => prop.id === property.id);
        setHasExistingAnnouncement(hasAd);
      } catch (error) {
        console.error('Error checking for existing announcements:', error);
        setHasExistingAnnouncement(false);
      } finally {
        setLoadingCheck(false);
      }
    };

    checkForExistingAnnouncement();
  }, [property?.id]);
  
  const getPricePosition = () => {
    if (!price || !minPrice || !maxPrice) return 0;
    return Math.max(0, Math.min(100, ((price - minPrice) / (maxPrice - minPrice)) * 100));
  };

  const getImageUrl = (property) => {
    if (!property?.images || !Array.isArray(property.images) || property.images.length === 0) {
      return null;
    }

    const mediaItem = property.images[0];
    const imageUrl = mediaItem.file || 
                     mediaItem.url || 
                     mediaItem.image || 
                     mediaItem.file_url ||
                     mediaItem.media_url ||
                     null;

    return imageUrl;
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#CFAF5E] to-[#b89a4e] rounded-full mb-4">
          <Eye size={32} className="text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2647] mb-2">Confirmação</h2>
      </div>

      {property && (
        <div className="max-w-md mx-auto">
          <PropertyCard
            title={property.name}
            typology={property.typology ?? "T?"}
            num_wc={property.num_wc ?? "0"}
            net_area={property.net_area}
            street={property.street}
            district={String(property.district_name)}
            imageUrl={getImageUrl(property)}
            min_price={property.min_price}
            max_price={property.max_price}
            property={property}
            className="shadow-lg"
            showView={false}
            showEdit={false}
            hidePrice={true}
          />
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-[#0A2647] mb-2">€{price.toLocaleString()}</div>
          {property?.net_area && (
            <div className="text-lg text-gray-600">
              €{Math.round(price / property.net_area)}/m²
            </div>
          )}
        </div>
        <PricePositionBar
          currentPrice={price}
          minPrice={minPrice}
          maxPrice={maxPrice}
          showPlaceholder={false}
        />
      </div>

      {loadingCheck && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
            Verificando anúncios existentes...
          </div>
        </div>
      )}

      {!loadingCheck && hasExistingAnnouncement && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <h4 className="font-semibold text-[#0A2647] mb-4 flex items-center gap-2">
            <Calendar size={18} />
            Anúncio Existente
          </h4>
          <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
              <div>
                <div className="text-[#0A2647] font-semibold">
                  Esta propriedade já possui um anúncio ativo
                </div>
                <div className="text-sm text-gray-600">
                  O anúncio existente será substituído pelo novo
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Atenção:</strong> Criar um novo anúncio irá substituir o anúncio atual desta propriedade.
            </p>
          </div>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border-2 border-green-200">
          <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
          <span className="text-green-700 font-medium">
            {hasExistingAnnouncement ? 'Anúncio atualizado com sucesso!' : 'Anúncio criado com sucesso!'}
          </span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
        <button 
          onClick={prev} 
          disabled={loading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-[#0A2647] hover:text-[#CFAF5E] hover:bg-[#CFAF5E]/10 rounded-xl transition-all duration-200 font-medium order-2 sm:order-1 disabled:opacity-50"
        >
          <ChevronLeft size={18} /> Voltar
        </button>
        <button
          onClick={onCreate}
          disabled={loading || success}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#CFAF5E] to-[#b89a4e] text-white px-8 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium order-1 sm:order-2 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {hasExistingAnnouncement ? 'A atualizar...' : 'A criar...'}
            </>
          ) : success ? (
            <>
              <CheckCircle size={18} />
              {hasExistingAnnouncement ? 'Atualizado!' : 'Criado!'}
            </>
          ) : (
            <>
              {hasExistingAnnouncement ? 'Atualizar Anúncio' : 'Criar Anúncio'}
              <Building size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}