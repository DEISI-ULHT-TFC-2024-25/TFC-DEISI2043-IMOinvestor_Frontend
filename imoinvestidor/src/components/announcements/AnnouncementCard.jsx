import PropTypes from 'prop-types';
import { Eye, Edit3 } from 'lucide-react';
import placeholderImg from '@images/placeholder.jpg';
import { BaseCard } from '@common/BaseCard';
import { PriceBlock } from '@common/PriceBlock';
import { SelectorBadge } from '@common/SelectorBadge';

export function AnnouncementCard({
  announcement,
  onView,
  onEdit,
  actions = null,
  showView = true,
  showEdit = true,
  selectionMode = false,
  onSelect,
  isSelected,
  className = '',
}) {
  const { property, preco_definitivo, is_active } = announcement;
  const {
    title,
    tipologia = '',
    numero_casas_banho: casasBanho = 0,
    area_util: areaUtil = 0,
    street,
    district,
    imageUrl,
    media = [],
  } = property || {};

  const imgSrc =
    imageUrl ||
    (media.length > 0 ? (media[0].file || media[0].url) : null) ||
    placeholderImg;

  return (
    <div
      className={`relative bg-white rounded-xl border-2 shadow-sm overflow-hidden transition-all ${
        selectionMode ? 'cursor-pointer hover:shadow-md scale-102' : ''
      } ${
        isSelected
          ? 'border-[#CFAF5E] ring-2 ring-[#CFAF5E]/20'
          : 'border-gray-200'
      } ${className}`}
      onClick={selectionMode ? onSelect : undefined}
    >
      <SelectorBadge isSelected={isSelected} />

      <div
        className={`absolute top-2 left-2 px-2 py-0.5 text-xs font-semibold rounded ${
          is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}
      >
        {is_active ? 'Ativo' : 'Inativo'}
      </div>

      {actions && <div className="absolute top-2 right-2 z-10">{actions}</div>}

      <BaseCard
        title={title}
        tipologia={tipologia}
        casasBanho={casasBanho}
        areaUtil={areaUtil}
        imageUrl={imgSrc}
      />

      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-lg font-semibold flex-1 leading-tight text-[#0A2647]">
            {title}
          </h4>
          {showView && onView && !selectionMode && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView();
              }}
              className="p-1 rounded-lg text-[#CFAF5E] hover:bg-[#CFAF5E]/10 transition"
              title="Ver detalhes"
            >
              <Eye size={18} />
            </button>
          )}
        </div>

        {(street || district) && (
          <p className="text-sm text-gray-600 mb-3">
            {street ? `${street}, ${district}` : district}
          </p>
        )}

        <PriceBlock
          hasRange={false}
          price={
            preco_definitivo != null
              ? `€${preco_definitivo.toLocaleString()}`
              : '-'
          }
        />

        {!selectionMode && showEdit && onEdit && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#CFAF5E] to-[#d4b565] text-[#0A2647] font-semibold rounded-xl shadow hover:shadow-lg transition"
          >
            <Edit3 size={16} /> Editar
          </button>
        )}
      </div>
    </div>
  );
}

AnnouncementCard.propTypes = {
  announcement:  PropTypes.object.isRequired,
  onView:        PropTypes.func,
  onEdit:        PropTypes.func,
  actions:       PropTypes.node,
  showView:      PropTypes.bool,
  showEdit:      PropTypes.bool,
  selectionMode: PropTypes.bool,
  onSelect:      PropTypes.func,
  isSelected:    PropTypes.bool,
  className:     PropTypes.string,
};