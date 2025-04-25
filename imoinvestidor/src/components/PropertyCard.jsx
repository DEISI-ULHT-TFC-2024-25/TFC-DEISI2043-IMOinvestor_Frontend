import PropTypes from 'prop-types';
import { BedDouble, Bath, Ruler, Heart, HeartOff } from 'lucide-react';

export const PropertyCard = ({
  title,
  tipologia,
  casasBanho,
  areaUtil,
  price,
  roi,
  onClick,
  hidePrice,
  className = '',
  imageClassName = 'h-40',
  isFavorited = false,
  onToggleFavorite
}) => (
  <div className={`bg-white rounded shadow p-4 flex flex-col justify-between w-full h-full ${className}`}>
    <div>
      <div className={`bg-gray-300 rounded mb-3 ${imageClassName}`}></div>

      <div className="flex justify-between items-start">
        <h4 className="font-semibold text-[#0A2647]">{title}</h4>
        {onToggleFavorite && (
          <button onClick={onToggleFavorite} title="Favorito" className="text-[#CFAF5E]">
            {isFavorited ? <Heart fill="#CFAF5E" size={20} /> : <HeartOff size={20} />}
          </button>
        )}
      </div>

      <div className="text-sm text-gray-600 flex gap-4 mt-2">
        <div className="flex items-center gap-1">
          <BedDouble size={16} /> {tipologia}
        </div>
        <div className="flex items-center gap-1">
          <Bath size={16} /> {casasBanho}
        </div>
        <div className="flex items-center gap-1">
          <Ruler size={16} /> {areaUtil} m²
        </div>
      </div>
    </div>

    <div className="flex justify-between items-center mt-4">
      <div className="flex items-baseline gap-3">
        <span className="font-bold text-[#CFAF5E]">
          {hidePrice ? 'Inicie sessão para ver o preço' : price}
        </span>
        {roi && !hidePrice && (
          <span className="text-sm text-green-600 font-medium">
            {roi}% ROI
          </span>
        )}
      </div>
      <button
        className="bg-[#CFAF5E] text-[#0A2647] px-4 py-2 rounded shadow-lg cursor-pointer"
        onClick={onClick}
      >
        Ver
      </button>
    </div>
  </div>
);

PropertyCard.propTypes = {
  title: PropTypes.string.isRequired,
  tipologia: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  casasBanho: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  areaUtil: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  price: PropTypes.string,
  roi: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  hidePrice: PropTypes.bool,
  className: PropTypes.string,
  imageClassName: PropTypes.string,
  isFavorited: PropTypes.bool,
  onToggleFavorite: PropTypes.func,
};
