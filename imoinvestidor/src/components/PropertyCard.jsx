import PropTypes from 'prop-types';

export const PropertyCard = ({
  title,
  description,
  price,
  onClick,
  hidePrice,
  className = '',
  imageClassName = 'h-40'
}) => (
  <div className={`bg-white rounded shadow p-4 flex flex-col justify-between w-full h-full ${className}`}>
    <div>
      <div className={`bg-gray-300 rounded mb-3 ${imageClassName}`}></div>
      <h4 className="font-semibold text-[#0A2647]">{title}</h4>
      <p className="text-sm">{description}</p>
    </div>

    <div className="flex justify-between items-center mt-4">
      <span className="font-bold text-[#CFAF5E]">
        {hidePrice ? 'Inicie sessão para ver o preço' : price}
      </span>
      <button
        className="bg-[#CFAF5E] text-[#0A2647] px-4 py-2 rounded shadow-lg cursor-pointer"
        onClick={onClick}
      >
        Ver Listagem
      </button>
    </div>
  </div>
);

PropertyCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  hidePrice: PropTypes.bool,
  className: PropTypes.string,
  imageClassName: PropTypes.string,
};
