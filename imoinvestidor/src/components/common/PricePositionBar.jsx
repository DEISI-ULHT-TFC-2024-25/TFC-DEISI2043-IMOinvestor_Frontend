import React from 'react';

export default function PricePositionBar({ 
  currentPrice, 
  minPrice, 
  maxPrice, 
  showLabel = true,
  showPriceRange = true,
  showPlaceholder = true,
  className = ""
}) {
  const getPricePosition = () => {
    if (!currentPrice || !minPrice || !maxPrice) return 0;
    return Math.max(0, Math.min(100, ((currentPrice - minPrice) / (maxPrice - minPrice)) * 100));
  };

  const pricePosition = getPricePosition();

  if (!minPrice || !maxPrice) {
    return null;
  }

  return (
    <div className={`bg-gray-50 rounded-xl p-4 ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Posição na Faixa de Mercado</span>
          <span className="text-sm font-bold text-[#0A2647]">
            {currentPrice ? `${pricePosition.toFixed(0)}%` : '—'}
          </span>
        </div>
      )}
      
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
      
      {showPriceRange && (
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>€{minPrice.toLocaleString()}</span>
          <span>€{maxPrice.toLocaleString()}</span>
        </div>
      )}
      
      {!currentPrice && showPlaceholder && (
        <p className="text-xs text-gray-400 text-center mt-2">
          Digite um preço para ver a posição no mercado
        </p>
      )}
    </div>
  );
}