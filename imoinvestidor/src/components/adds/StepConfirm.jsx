import { ChevronLeft, Eye, Building, Calendar, CheckCircle } from 'lucide-react';
import { PropertyCard } from '@properties/PropertyCard';

export default function StepConfirm({ form, prev, onCreate, existingAds, loading, success }) {
  const property = form.property;
  const price = parseFloat(form.price) || 0;
  const minPrice = property?.preco_minimo || 0;
  const maxPrice = property?.preco_maximo || 0;
  
  const getPricePosition = () => {
    if (!price || !minPrice || !maxPrice) return 0;
    return Math.max(0, Math.min(100, ((price - minPrice) / (maxPrice - minPrice)) * 100));
  };

  const pricePosition = getPricePosition();

  const getImageUrl = (property) => {
    if (!property?.media || !Array.isArray(property.media) || property.media.length === 0) {
      return null;
    }

    const mediaItem = property.media[0];
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
            tipologia={property.tipologia ?? "T?"}
            casasBanho={property.numero_casas_banho ?? "0"}
            areaUtil={property.area_util}
            street={property.street}
            district={String(property.district)}
            imageUrl={getImageUrl(property)}
            className="shadow-lg"
            showView={false}
            showEdit={false}
            hidePrice={true}
            preco_minimo={property.preco_minimo}
            preco_maximo={property.preco_maximo}
          />
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-[#0A2647] mb-2">
            €{price.toLocaleString()}
          </div>
          {property?.area_util && (
            <div className="text-lg text-gray-600">
              €{Math.round(price / property.area_util)}/m²
            </div>
          )}
        </div>

        {minPrice && maxPrice && (
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-amber-500 to-orange-600"></div>
              <div 
                className="absolute top-0 right-0 h-full bg-gray-200"
                style={{ width: `${100 - pricePosition}%` }}
              ></div>
              {price && (
                <div 
                  className="absolute top-0 w-1 h-full bg-[#0A2647] shadow-lg transform -translate-x-0.5"
                  style={{ left: `${pricePosition}%` }}
                ></div>
              )}
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>€{minPrice.toLocaleString()}</span>
              <span>€{maxPrice.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>

      {existingAds.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <h4 className="font-semibold text-[#0A2647] mb-4 flex items-center gap-2">
            <Calendar size={18} />
            Anúncios Existentes ({existingAds.length})
          </h4>
          <div className="space-y-3">
            {existingAds.map(ad => (
              <div key={ad.id} className="flex items-center justify-between p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  <div>
                    <div className="text-[#0A2647] font-semibold">
                      €{(ad.price || 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      {property?.area_util && ad.price ? 
                        `€${Math.round(ad.price / property.area_util)}/m²` : 
                        'Preço por m² não disponível'
                      }
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">
                    {ad.listed_date ? new Date(ad.listed_date).toLocaleDateString('pt-PT') : 'Data não disponível'}
                  </div>
                  <div className="text-xs text-amber-600 font-medium">Ativo</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border-2 border-green-200">
          <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
          <span className="text-green-700 font-medium">Anúncio criado com sucesso!</span>
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
              A criar...
            </>
          ) : success ? (
            <>
              <CheckCircle size={18} />
              Criado!
            </>
          ) : (
            <>
              Criar Anúncio
              <Building size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
