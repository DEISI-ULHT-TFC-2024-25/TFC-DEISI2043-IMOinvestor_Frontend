import PropTypes from 'prop-types';

export const PropertyCard = ({ title, description, price, onClick, hidePrice }) => (
  <div className="bg-white p-4 rounded shadow w-72 flex-shrink-0 sm:w-full">
    <div className="h-40 bg-gray-300 rounded"></div>
    <h4 className="mt-2 font-semibold text-[#0A2647]">{title}</h4>
    <p className="text-sm">{description}</p>
    <div className="flex justify-between items-center mt-2">
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
};
