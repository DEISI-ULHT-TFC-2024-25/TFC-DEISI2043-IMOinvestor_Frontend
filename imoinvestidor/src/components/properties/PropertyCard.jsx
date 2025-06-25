import PropTypes from 'prop-types';
import { Eye, Edit3 } from 'lucide-react';
import placeholderImg from '@images/placeholder.jpg';
import { BaseCard } from '@common/BaseCard';
import { PriceBlock } from '@common/PriceBlock';

export function PropertyCard({
  title,
  typology,
  num_wc,
  net_area,
  street,
  district,
  imageUrl,
  min_price,
  max_price,
  price,
  hidePrice = false,
  onView,
  onEdit,
  selectionMode = false,
  onSelect,
  isSelected = false,
  showView = true,
  showEdit = true,
  actions = null,
  className = '',
  property = null,
}) {
  const hasPriceRange = min_price || max_price;

  const handleCardClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (selectionMode && onSelect) {
      onSelect();
    }
  };

  // Function to get the property image URL
  const getImageUrl = () => {
    if (imageUrl && imageUrl !== placeholderImg) {
      return imageUrl;
    }
    
    if (property?.images && Array.isArray(property.images) && property.images.length > 0) {
      const imageItem = property.images[0];
      const url = imageItem.file || 
                  imageItem.url || 
                  imageItem.image || 
                  imageItem.file_url ||
                  imageItem.media_url ||
                  null;
      if (url) return url;
    }
    
    if (property?.media && property.media.length > 0) {
      const firstImage = property.media.find(media => media.media_type === 'image');
      if (firstImage?.file) {
        return firstImage.file;
      }
    }
    
    if (property?.image) {
      return property.image;
    }
    
    return placeholderImg;
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 relative ${
        selectionMode
          ? 'cursor-pointer hover:shadow-md transform hover:scale-[1.02]'
          : ''
      } ${
        isSelected
          ? 'ring-4 ring-[#CFAF5E] ring-opacity-50 shadow-lg border-2 border-[#CFAF5E]'
          : 'border-2 border-gray-200 hover:border-gray-300'
      } ${className}`}
      onClick={selectionMode ? handleCardClick : undefined}
    >
      {/* Selection indicator */}
      {selectionMode && isSelected && (
        <div className="absolute top-3 right-3 z-10 bg-[#CFAF5E] text-white rounded-full w-6 h-6 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20,6 9,17 4,12"></polyline>
          </svg>
        </div>
      )}

      {/* Custom actions (if any) */}
      {actions && !selectionMode && (
        <div className="absolute top-2 right-2 z-10">{actions}</div>
      )}

      <BaseCard
        title={title}
        tipologia={typology}
        casasBanho={num_wc}
        areaUtil={net_area}
        street={street}
        district={String(property.district_name)}
        imageUrl={getImageUrl()}
      />

      <div className="p-4 sm:p-5">
        {/* View button */}
        {!selectionMode && showView && onView && (
          <div className="flex justify-end mb-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onView();
              }}
              className="text-[#CFAF5E] hover:bg-[#CFAF5E]/10 p-2 rounded-lg transition-colors group"
              title="Ver detalhes"
              type="button"
            >
              <Eye size={18} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        )}

        <PriceBlock
          hasRange={!!hasPriceRange}
          min={min_price}
          max={max_price}
          price={price}
          hidePrice={hidePrice}
          selectionMode={selectionMode}
        />

        {/* Selection mode: show selection status */}
        {selectionMode && (
          <div className="mt-4">
            <div className={`w-full py-3 px-4 rounded-xl text-center font-medium transition-all duration-200 ${
              isSelected
                ? 'bg-[#CFAF5E] text-white'
                : 'bg-gray-50 text-gray-600 border border-gray-200'
            }`}>
              {isSelected ? 'Propriedade Selecionada' : 'Clique para Selecionar'}
            </div>
          </div>
        )}

        {/* Edit button */}
        {!selectionMode && showEdit && onEdit && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#CFAF5E] to-[#d4b565] text-[#0A2647] font-semibold rounded-xl shadow hover:shadow-lg transform hover:scale-105 transition-all text-sm mt-4"
            type="button"
          >
            <Edit3 size={16} />
            Editar
          </button>
        )}
      </div>
    </div>
  );
}

PropertyCard.propTypes = {
  title: PropTypes.string.isRequired,
  typology: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  num_wc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  net_area: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  street: PropTypes.string,
  district: PropTypes.string,
  imageUrl: PropTypes.string,
  min_price: PropTypes.number,
  max_price: PropTypes.number,
  price: PropTypes.string,
  hidePrice: PropTypes.bool,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  selectionMode: PropTypes.bool,
  onSelect: PropTypes.func,
  isSelected: PropTypes.bool,
  showView: PropTypes.bool,
  showEdit: PropTypes.bool,
  actions: PropTypes.node,
  className: PropTypes.string,
  property: PropTypes.object,
};