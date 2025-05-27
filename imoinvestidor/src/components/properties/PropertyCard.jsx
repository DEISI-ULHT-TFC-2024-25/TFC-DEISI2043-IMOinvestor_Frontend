import PropTypes from 'prop-types';
import { BedDouble, Bath, Ruler, Heart, HeartOff } from 'lucide-react';
import placeholderImg from '@images/placeholder.jpg';

export const PropertyCard = ({
  title,
  tipologia,
  casasBanho,
  areaUtil,
  price,
  roi,
  onView,
  onEdit,
  hidePrice,
  className = '',
  imageClassName = 'h-40',
  isFavorited = false,
  onToggleFavorite,
  actions = null,
  street,
  district,
  showView = true,
  showEdit = true,
  imageUrl,
}) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-300 shadow-sm p-4 flex flex-col justify-between w-full h-full relative ${className}`}>
      {actions && (
        <div className="absolute top-2 right-2 z-10">
          {actions}
        </div>
      )}

      <div className="flex-1">
        <div className={`rounded mb-3 overflow-hidden ${imageClassName}`}>
          <img
            src={imageUrl || placeholderImg}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = placeholderImg;
            }}
          />
        </div>

        <div className="flex justify-between items-start">
          <h4 className="font-semibold text-[#0A2647]">{title}</h4>
          {onToggleFavorite && (
            <button onClick={onToggleFavorite} title="Favorito" className="text-[#CFAF5E] cursor-pointer">
              {isFavorited ? <Heart fill="#CFAF5E" size={20} /> : <HeartOff size={20} />}
            </button>
          )}
        </div>

        {(district || street) && (
          <p className="text-sm text-gray-600 mt-1">
            {street ? `${street}, ${district}` : district}
          </p>
        )}

        <div className="text-sm text-gray-600 flex gap-4 mt-2">
          <div className="flex items-center gap-1"><BedDouble size={16} /> {tipologia}</div>
          <div className="flex items-center gap-1"><Bath size={16} /> {casasBanho}</div>
          <div className="flex items-center gap-1"><Ruler size={16} /> {areaUtil} m²</div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {!hidePrice && price && (
          <div className="text-[#CFAF5E] font-bold text-sm sm:text-base leading-tight">
            {price}
          </div>
        )}
        {(showView || showEdit) && (
          <div className="flex justify-end items-center gap-2">
            {showEdit && (
              <button onClick={onEdit} className="px-4 py-2 bg-gradient-to-r from-[#CFAF5E] to-[#d4b565] text-[#0A2647] font-semibold rounded-xl shadow hover:shadow-lg transform hover:scale-105 transition-all text-sm">
                Editar
              </button>
            )}
            {showView && (
              <button onClick={onView} className="px-4 py-2 bg-gradient-to-r from-[#CFAF5E] to-[#d4b565] text-[#0A2647] font-semibold rounded-xl shadow hover:shadow-lg transform hover:scale-105 transition-all text-sm">
                Ver
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

PropertyCard.propTypes = {
  title: PropTypes.string.isRequired,
  tipologia: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  casasBanho: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  areaUtil: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  price: PropTypes.string,
  roi: PropTypes.string,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  hidePrice: PropTypes.bool,
  className: PropTypes.string,
  imageClassName: PropTypes.string,
  isFavorited: PropTypes.bool,
  onToggleFavorite: PropTypes.func,
  actions: PropTypes.node,
  street: PropTypes.string,
  district: PropTypes.string,
  showView: PropTypes.bool,
  showEdit: PropTypes.bool,
  imageUrl: PropTypes.string,
};