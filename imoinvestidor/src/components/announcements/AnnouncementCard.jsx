// components/AnnouncementCard.jsx
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
  isSelected = false,
  className = '',
}) {
  const { property = {}, price } = announcement;

  // try multiple keys for the property name
  const propTitle = property.title || '';
  const propName  = property.name  || property.nome || property.titulo || '';

  const displayTitle =
    propTitle ||
    propName ||
    `Propriedade ${announcement.id}` ||
    'Sem título';

  const {
    tipologia = '',
    numero_casas_banho: casasBanho = 0,
    area_util: areaUtil = 0,
    street,
    district,
    imageUrl,
    media = [],
  } = property;

  const imgSrc =
    imageUrl ||
    (media.length > 0 ? (media[0].file || media[0].url) : null) ||
    placeholderImg;

  // debug — uncomment to inspect the live object
  // console.log('AnnouncementCard property payload:', property);

  return (
    <div
      className={`relative bg-white rounded-xl border-2 shadow-sm overflow-hidden ${
        isSelected
          ? 'border-[#CFAF5E] ring-2 ring-[#CFAF5E]/20 shadow-lg'
          : 'border-gray-200'
      } ${className}`}
      onClick={selectionMode ? onSelect : undefined}
    >
      <SelectorBadge isSelected={isSelected} />
      {actions && <div className="absolute top-2 right-2 z-10">{actions}</div>}

      <BaseCard
        title={displayTitle}
        tipologia={tipologia}
        casasBanho={casasBanho}
        areaUtil={areaUtil}
        street={street}
        district={district}
        imageUrl={imgSrc}
        imageClassName="h-48 sm:h-56"
      />

      <div className="p-4 sm:p-5 space-y-4">
        <div className="flex justify-between items-start">
          <div />
          {showView && onView && !selectionMode && (
            <button
              onClick={e => {
                e.stopPropagation();
                onView(announcement);
              }}
              className="p-1 rounded-lg text-[#CFAF5E] hover:bg-[#CFAF5E]/10 transition"
              title="Ver anúncio"
            >
              <Eye size={18} />
            </button>
          )}
        </div>

        <PriceBlock
          hasRange={false}
          price={
            price != null
              ? `€${parseFloat(price).toLocaleString('pt-PT')}`
              : '-'
          }
        />

        {!selectionMode && showEdit && onEdit && (
          <button
            onClick={e => {
              e.stopPropagation();
              onEdit(announcement);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#CFAF5E] to-[#d4b565] text-[#0A2647] font-semibold rounded-xl shadow hover:scale-105 transition-all text-sm"
          >
            <Edit3 size={16} />
            Editar
          </button>
        )}

        {selectionMode && onSelect && (
          <button
            onClick={e => {
              e.stopPropagation();
              onSelect();
            }}
            className={`w-full py-2.5 px-4 rounded-xl font-medium ${
              isSelected
                ? 'bg-[#CFAF5E] text-white shadow-md'
                : 'bg-gray-100 text-[#0A2647] hover:bg-[#CFAF5E]/10'
            }`}
          >
            {isSelected ? 'Selecionado' : 'Selecionar'}
          </button>
        )}
      </div>
    </div>
  );
}

AnnouncementCard.propTypes = {
  announcement: PropTypes.shape({
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    property: PropTypes.shape({
      title: PropTypes.string,
      name: PropTypes.string,
      nome: PropTypes.string,
      titulo: PropTypes.string,
      tipologia: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      numero_casas_banho: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      area_util: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      street: PropTypes.string,
      district: PropTypes.string,
      imageUrl: PropTypes.string,
      media: PropTypes.array,
    }),
  }).isRequired,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  actions: PropTypes.node,
  showView: PropTypes.bool,
  showEdit: PropTypes.bool,
  selectionMode: PropTypes.bool,
  onSelect: PropTypes.func,
  isSelected: PropTypes.bool,
  className: PropTypes.string,
};