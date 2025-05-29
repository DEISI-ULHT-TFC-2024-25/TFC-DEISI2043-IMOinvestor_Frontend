import PropTypes from 'prop-types';
import { BedDouble, Bath, Ruler, Eye, Edit3, CheckCircle } from 'lucide-react';
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
  imageClassName = 'h-48 sm:h-56',
  actions = null,
  street,
  district,
  showView = true,
  showEdit = true,
  imageUrl,
  isSelected = false,
  onSelect,
  selectionMode = false,
  preco_minimo,
  preco_maximo,
}) => {
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
      {isSelected && (
        <div className="absolute top-3 left-3 z-10 w-6 h-6 bg-[#CFAF5E] rounded-full flex items-center justify-center shadow-md">
          <CheckCircle size={16} className="text-white" />
        </div>
      )}

      {/* Top right actions - Custom actions only */}
      {actions && (
        <div className="absolute top-2 right-2 z-10">
          {actions}
        </div>
      )}

      <div className={`overflow-hidden relative ${imageClassName}`}>
        <img
          src={imageUrl || placeholderImg}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = placeholderImg;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      
      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-[#0A2647] text-lg flex-1 pr-2 leading-tight">{title}</h4>
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
        
        {(district || street) && (
          <p className="text-sm text-gray-600 mb-3">
            {street ? `${street}, ${district}` : district}
          </p>
        )}
        
        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
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

        {(preco_minimo || preco_maximo) && (
          <div className="bg-gradient-to-r from-[#CFAF5E]/10 to-[#CFAF5E]/5 p-3 rounded-lg mb-4">
            <div className="text-xs text-gray-600 mb-1">Faixa de mercado estimada</div>
            <div className="font-semibold text-[#0A2647]">
              €{(preco_minimo || 0).toLocaleString()} - €{(preco_maximo || 0).toLocaleString()}
            </div>
          </div>
        )}

        {!hidePrice && price && (
          <div className="bg-gradient-to-r from-[#CFAF5E]/10 to-[#CFAF5E]/5 p-3 rounded-lg mb-4">
            <div className="text-xs text-gray-600 mb-1">Preço</div>
            <div className="text-[#CFAF5E] font-bold text-lg leading-tight">
              {price}
            </div>
          </div>
        )}

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
  actions: PropTypes.node,
  street: PropTypes.string,
  district: PropTypes.string,
  showView: PropTypes.bool,
  showEdit: PropTypes.bool,
  imageUrl: PropTypes.string,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
  selectionMode: PropTypes.bool,
  preco_minimo: PropTypes.number,
  preco_maximo: PropTypes.number,
};