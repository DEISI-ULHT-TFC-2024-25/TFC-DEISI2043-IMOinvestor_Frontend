import PropTypes from 'prop-types';
import { Eye, Edit3 } from 'lucide-react';
import placeholderImg from '@images/placeholder.jpg';
import { BaseCard } from '@common/BaseCard';
import { PriceBlock } from '@common/PriceBlock';
import { SelectorBadge } from '@common/SelectorBadge';

export function PropertyCard({
  title,
  tipologia,
  casasBanho,
  areaUtil,
  street,
  district,
  imageUrl,
  preco_minimo,
  preco_maximo,
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
}) {
  const hasPriceRange = preco_minimo || preco_maximo;

  const handleCardClick = () => {
    if (selectionMode && onSelect) {
      onSelect();
    }
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
        tipologia={tipologia}
        casasBanho={casasBanho}
        areaUtil={areaUtil}
        street={street}
        district={district}
        imageUrl={imageUrl || placeholderImg}
      />

      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-2">
          <div />
            {showView && onView && !selectionMode && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onView();
                }}
                className="text-[#CFAF5E] hover:bg-[#CFAF5E]/10 p-1 rounded-lg transition-colors flex-shrink-0 group"
                title="Ver detalhes"
              >
                <Eye size={18} className="group-hover:scale-110 transition-transform" />
              </button>
            )}
          </div>

        <PriceBlock
          hasRange={!!hasPriceRange}
          min={preco_minimo}
          max={preco_maximo}
          price={price}
          hidePrice={hidePrice}
          selectionMode={selectionMode}
        />

        {selectionMode && onSelect && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
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
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#CFAF5E] to-[#d4b565] text-[#0A2647] font-semibold rounded-xl shadow hover:shadow-lg transform hover:scale-105 transition-all text-sm mt-4"
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
  tipologia: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  casasBanho: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  areaUtil: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  street: PropTypes.string,
  district: PropTypes.string,
  imageUrl: PropTypes.string,

  preco_minimo: PropTypes.number,
  preco_maximo: PropTypes.number,

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
};