import PropTypes from 'prop-types';
import { Eye, Edit3 } from 'lucide-react';
import placeholderImg from '@images/placeholder.jpg';

import { BaseCard } from '@common/BaseCard';
import { PriceBlock } from '@common/PriceBlock';
import { SelectorBadge } from '@common/SelectorBadge';

export const AnnouncementCard = ({
  announcement,
  onView,
  onEdit,
  className = '',
  imageClassName = 'h-48 sm:h-56',
  actions = null,
  showView = true,
  showEdit = true,
  isSelected = false,
  onSelect,
  selectionMode = false,
}) => {
  const {
    property: {
      title,
      tipologia,
      numero_casas_banho: casasBanho,
      area_util: areaUtil,
      street,
      district,
      imageUrl,
      media = [],
    } = {},
    preco_definitivo,
  } = announcement || {};

  const imgSrc =
    imageUrl ||
    (media.length > 0 ? (media[0].file || media[0].url) : null) ||
    placeholderImg;

  const handleCardClick = () => {
    if (selectionMode && onSelect) onSelect();
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

      <div className={`overflow-hidden relative ${imageClassName}`}> 
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.src = placeholderImg; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-[#0A2647] text-lg flex-1 pr-2 leading-tight">
            {title}
          </h4>
          {showView && onView && !selectionMode && (
            <button
              onClick={(e) => { e.stopPropagation(); onView(); }}
              className="text-[#CFAF5E] hover:bg-[#CFAF5E]/10 p-1 rounded-lg transition-colors flex-shrink-0 group"
              title="Ver detalhes"
            >
              <Eye size={18} className="group-hover:scale-110 transition-transform" />
            </button>
          )}
        </div>

        {(district || street) && (
          <p className="text-sm text-gray-600 mb-3">
            {street ? `${street}, ${district}` : district}
          </p>
        )}

        <BaseCard
          title={title}
          tipologia={tipologia}
          casasBanho={casasBanho}
          areaUtil={areaUtil}
        />

        <PriceBlock
          hasRange={false}
          price={preco_definitivo != null ? `€${preco_definitivo.toLocaleString()}` : '-'}
          hidePrice={false}
          selectionMode={selectionMode}
        />

        {selectionMode && onSelect && (
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(); }}
            className={`w-full py-2.5 px-4 rounded-xl font-medium transition-all duration-200 ${
              isSelected
                ? 'bg-[#CFAF5E] text-white shadow-md'
                : 'bg-gray-100 text-[#0A2647] hover:bg-[#CFAF5E]/10 hover:text-[#CFAF5E]'
            }`}
          >
            {isSelected ? 'Selecionado' : 'Selecionar'}
          </button>
        )}

        {!selectionMode && showEdit && onEdit && (
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#CFAF5E] to-[#d4b565] text-[#0A2647] font-semibold rounded-xl shadow hover:shadow-lg transform hover:scale-105 transition-all text-sm mt-4"
          >
            <Edit3 size={16} />
            Editar
          </button>
        )}
      </div>
    </div>
  );
};

AnnouncementCard.propTypes = {
  announcement: PropTypes.shape({
    property: PropTypes.shape({
      title: PropTypes.string.isRequired,
      tipologia: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      numero_casas_banho: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      area_util: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      street: PropTypes.string,
      district: PropTypes.string,
      imageUrl: PropTypes.string,
      media: PropTypes.array,
    }).isRequired,
    preco_definitivo: PropTypes.number,
  }).isRequired,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  className: PropTypes.string,
  imageClassName: PropTypes.string,
  actions: PropTypes.node,
  showView: PropTypes.bool,
  showEdit: PropTypes.bool,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
  selectionMode: PropTypes.bool,
};