import PropTypes from 'prop-types';
import { Eye, Edit3 } from 'lucide-react';
import placeholderImg from '@images/placeholder.jpg';
import { BaseCard } from '@common/BaseCard';
import { PriceBlock } from '@common/PriceBlock';
import { SelectorBadge } from '@common/SelectorBadge';

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
  // Add property object to access media if needed
  property = null,
}) {
  const hasPriceRange = min_price || max_price;

  const handleCardClick = (e) => {
    // Prevent default to avoid any form submission or navigation
    e.preventDefault();
    e.stopPropagation();
    
    if (selectionMode && onSelect) {
      onSelect();
    }
  };

  // Function to get the property image URL
  const getImageUrl = () => {
    // If imageUrl is provided directly, use it
    if (imageUrl && imageUrl !== placeholderImg) {
      return imageUrl;
    }
    
    // If property object has images array (from PropertiesList), use the first image
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
    
    // If property object has media, use the first image
    if (property?.media && property.media.length > 0) {
      const firstImage = property.media.find(media => media.media_type === 'image');
      if (firstImage?.file) {
        return firstImage.file;
      }
    }
    
    // If property has a direct image field
    if (property?.image) {
      return property.image;
    }
    
    // Fall back to placeholder
    return placeholderImg;
  };

  return (
    <div
      className={`bg-white rounded-xl border-2 shadow-sm overflow-hidden transition-all duration-200 ${
        selectionMode
          ? 'hover:shadow-md transform hover:scale-[1.02] cursor-pointer'
          : ''
      } ${
        isSelected
          ? 'border-[#CFAF5E] ring-2 ring-[#CFAF5E]/20 shadow-lg'
          : 'border-gray-200'
      } ${className}`}
      onClick={selectionMode ? handleCardClick : undefined}
    >
      <SelectorBadge isSelected={isSelected} />

      {actions && <div className="absolute top-2 right-2 z-10">{actions}</div>}

      <BaseCard
        title={title}
        tipologia={typology}
        casasBanho={num_wc}
        areaUtil={net_area}
        street={street}
        district={district}
        imageUrl={getImageUrl()}
      />

      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-2">
          <div />
          {showView && onView && !selectionMode && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onView();
              }}
              className="text-[#CFAF5E] hover:bg-[#CFAF5E]/10 p-1 rounded-lg transition-colors flex-shrink-0 group"
              title="Ver detalhes"
              type="button"
            >
              <Eye size={18} className="group-hover:scale-110 transition-transform" />
            </button>
          )}
        </div>

        <PriceBlock
          hasRange={!!hasPriceRange}
          min={min_price}
          max={max_price}
          price={price}
          hidePrice={hidePrice}
          selectionMode={selectionMode}
        />

        {selectionMode && onSelect && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelect();
            }}
            className={`w-full py-2.5 px-4 rounded-xl font-medium transition-all duration-200 ${
              isSelected
                ? 'bg-[#CFAF5E] text-white shadow-md'
                : 'bg-gray-100 text-[#0A2647] hover:bg-[#CFAF5E]/10 hover:text-[#CFAF5E]'
            }`}
            type="button"
          >
            {isSelected ? 'Selecionado' : 'Selecionar'}
          </button>
        )}

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
  typology: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  num_wc: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
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