import { ChevronLeft, ChevronRight, DollarSign, AlertTriangle, CheckCircle, Building, BedDouble, Bath, Ruler, TrendingUp, Target, BarChart3 } from 'lucide-react';
import placeholderImg from '@images/placeholder.jpg';

const PropertyCard = ({
  title,
  tipologia,
  casasBanho,
  areaUtil,
  street,
  district,
  imageUrl,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      <div className="h-32 sm:h-40 overflow-hidden">
        <img
          src={imageUrl || placeholderImg}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = placeholderImg;
          }}
        />
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-[#0A2647] text-lg mb-1">{title}</h4>
        {(district || street) && (
          <p className="text-sm text-gray-600 mb-3">
            {street ? `${street}, ${district}` : district}
          </p>
        )}
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <BedDouble size={16} /> 
            <span>{tipologia}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={16} /> 
            <span>{casasBanho}</span>
          </div>
          <div className="flex items-center gap-1">
            <Ruler size={16} /> 
            <span>{areaUtil} m²</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function StepSetPrice({ form, setForm, error, prev, next }) {
  const property = form.property;
  const minPrice = property?.preco_minimo || 0;
  const maxPrice = property?.preco_maximo || 0;
  const currentPrice = parseFloat(form.price) || 0;
  const midPrice = (minPrice + maxPrice) / 2;
  
  const getPriceValidation = () => {
    if (!currentPrice) return null;
    
    const percentageOfRange = ((currentPrice - minPrice) / (maxPrice - minPrice)) * 100;
    
    if (currentPrice < minPrice) {
      const belowBy = ((minPrice - currentPrice) / minPrice * 100).toFixed(0);
      return { 
        type: 'low', 
        message: `${belowBy}% abaixo do mínimo recomendado`, 
        color: 'red',
        percentage: Math.max(0, percentageOfRange)
      };
    }
    if (currentPrice > maxPrice) {
      const aboveBy = ((currentPrice - maxPrice) / maxPrice * 100).toFixed(0);
      return { 
        type: 'high', 
        message: `${aboveBy}% acima do máximo recomendado`, 
        color: 'red',
        percentage: Math.min(100, percentageOfRange)
      };
    }
    
    const position = percentageOfRange.toFixed(0);
    return { 
      type: 'good', 
      message: `Posicionado em ${position}% da faixa de mercado`, 
      color: 'green',
      percentage: percentageOfRange
    };
  };

  const validation = getPriceValidation();

  const getSuggestions = () => {
    if (!minPrice || !maxPrice) return [];
    const range = maxPrice - minPrice;
    return [
      { 
        label: '10%', 
        value: Math.round(minPrice + range * 0.10),
      },
      { 
        label: '25%', 
        value: Math.round(minPrice + range * 0.25),
      },
      { 
        label: '50%', 
        value: Math.round(minPrice + range * 0.50),
      },
      { 
        label: '75%', 
        value: Math.round(minPrice + range * 0.75),
      },
      { 
        label: '90%', 
        value: Math.round(minPrice + range * 0.90),
      }
    ];
  };

  const suggestions = getSuggestions();

  const getPricePosition = () => {
    if (!currentPrice || !minPrice || !maxPrice) return 0;
    return Math.max(0, Math.min(100, ((currentPrice - minPrice) / (maxPrice - minPrice)) * 100));
  };

  const pricePosition = getPricePosition();

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#CFAF5E] to-[#b89a4e] rounded-full mb-4">
          <DollarSign size={32} className="text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2647] mb-2">Defina o Preço</h2>
      </div>

      <div className="bg-gradient-to-br from-[#0A2647] to-[#1a3a5f] rounded-2xl p-6 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Building size={18} />
              Propriedade
            </h3>
            <div className="space-y-2 text-sm">
              <p className="font-medium">{property?.name}</p>
              <p className="text-blue-200">{property?.street}, {property?.district}</p>
              <div className="flex gap-4 text-blue-200">
                <span>{property?.tipologia}</span>
                <span>{property?.casasBanho} WC</span>
                <span>{property?.area_util} m²</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <BarChart3 size={18} />
              Análise de Mercado
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm text-blue-200">Mínimo Recomendado</p>
                <p className="text-xl font-bold text-green-400">€{minPrice.toLocaleString()}</p>
                <p className="text-xs text-blue-200">€{Math.round(minPrice / property?.area_util)}/m²</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm text-blue-200">Máximo Recomendado</p>
                <p className="text-xl font-bold text-yellow-400">€{maxPrice.toLocaleString()}</p>
                <p className="text-xs text-blue-200">€{Math.round(maxPrice / property?.area_util)}/m²</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <div className="space-y-6">
          <div className="text-center">
            <label className="block text-xl font-semibold text-[#0A2647] mb-4">
              Preço de Venda
            </label>
            
            <div className="relative max-w-md mx-auto">
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl font-medium">
                €
              </div>
              <input
                type="number"
                min="0"
                step="1000"
                value={form.price}
                onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                className="w-full pl-16 pr-6 py-4 text-3xl font-bold text-center border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#CFAF5E] focus:border-[#CFAF5E] transition-all duration-200 bg-gray-50"
                placeholder="0"
              />
            </div>

            {property?.area_util && (
              <p className="mt-2 text-lg text-gray-600">
                {currentPrice 
                  ? `€${Math.round(currentPrice / property.area_util).toLocaleString()}/m²`
                  : '€0/m²'
                }
              </p>
            )}
          </div>

          {minPrice && maxPrice && (
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Posição na Faixa de Mercado</span>
                <span className="text-sm font-bold text-[#0A2647]">
                  {currentPrice ? `${pricePosition.toFixed(0)}%` : '—'}
                </span>
              </div>
              <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-amber-500 to-orange-600"></div>
                <div 
                  className="absolute top-0 right-0 h-full bg-gray-200"
                  style={{ width: `${100 - Math.max(0, pricePosition)}%` }}
                ></div>
                {currentPrice && (
                  <div 
                    className="absolute top-0 w-1 h-full bg-[#0A2647] shadow-lg transform -translate-x-0.5"
                    style={{ left: `${Math.max(0, Math.min(100, pricePosition))}%` }}
                  ></div>
                )}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>€{minPrice.toLocaleString()}</span>
                <span>€{maxPrice.toLocaleString()}</span>
              </div>
              {!currentPrice && (
                <p className="text-xs text-gray-400 text-center mt-2">
                  Digite um preço para ver a posição no mercado
                </p>
              )}
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-semibold text-[#0A2647] flex items-center gap-2">
                <Target size={18} />
                Sugestões de Posicionamento
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {suggestions.map((suggestion, index) => {
                  const isSelected = parseFloat(form.price) === suggestion.value;
                  return (
                    <button
                      key={index}
                      onClick={() => setForm(f => ({ ...f, price: suggestion.value.toString() }))}
                      className={`p-3 text-center border-2 rounded-lg transition-all duration-200 ${
                        isSelected 
                          ? 'border-slate-600 bg-slate-50 shadow-md' 
                          : 'border-gray-300 hover:border-slate-400 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className={`text-lg font-bold mb-1 ${
                        isSelected ? 'text-slate-700' : 'text-[#0A2647]'
                      }`}>
                        {suggestion.label}
                      </div>
                      <div className="text-sm font-semibold text-gray-700 mb-1">
                        €{suggestion.value.toLocaleString()}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {validation && (
            <div className={`flex items-center gap-3 p-4 rounded-xl border-2 ${
              validation.color === 'green' 
                ? 'bg-green-50 border-green-200' 
                : validation.color === 'red'
                ? 'bg-red-50 border-red-200'
                : 'bg-amber-50 border-amber-200'
            }`}>
              {validation.color === 'green' ? (
                <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
              ) : (
                <AlertTriangle size={20} className={`${validation.color === 'red' ? 'text-red-600' : 'text-amber-600'} flex-shrink-0`} />
              )}
              <span className={`font-medium ${
                validation.color === 'green' ? 'text-green-700' : 
                validation.color === 'red' ? 'text-red-700' : 'text-amber-700'
              }`}>
                {validation.message}
              </span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border-2 border-red-200">
              <AlertTriangle size={20} className="text-red-600 flex-shrink-0" />
              <span className="text-red-600 font-medium">{error}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
        <button 
          onClick={prev} 
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-[#0A2647] hover:text-[#CFAF5E] hover:bg-[#CFAF5E]/10 rounded-xl transition-all duration-200 font-medium order-2 sm:order-1"
        >
          <ChevronLeft size={18} /> Voltar
        </button>
        <button 
          onClick={next} 
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#CFAF5E] to-[#b89a4e] text-white px-8 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium order-1 sm:order-2"
        >
          Próximo <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}