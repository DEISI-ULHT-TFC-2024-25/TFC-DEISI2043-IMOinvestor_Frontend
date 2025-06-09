import PropTypes from 'prop-types';

export function PriceBlock({
    hasRange,
    min = 0,
    max = 0,
    price = '',
    hidePrice = false,
    selectionMode = false,
}) {

    const shouldCollapse =
        hidePrice ||
        (!hasRange && !price) ||
        selectionMode;

    let labelText = 'Placeholder';
    let valueText = '–';

    if (!shouldCollapse) {
        if (hasRange) {
            labelText = 'Faixa de mercado estimada';
            const formattedMin = (min || 0).toLocaleString();
            const formattedMax = (max || 0).toLocaleString();
            valueText = `€${formattedMin} – €${formattedMax}`;
        } else {
            labelText = 'Preço';
            valueText = price;
        }
    }

  return (
    <div
        className={`bg-gradient-to-r from-[#CFAF5E]/10 to-[#CFAF5E]/5 p-3 rounded-lg mb-4 ${
            shouldCollapse ? 'opacity-0 pointer-events-none' : ''
            }`}
        >
        <div className="text-xs text-gray-600 mb-1">{labelText}</div>
        <div className="font-semibold text-[#0A2647] h-6 flex items-center">
            {valueText}
        </div>
    </div>
  );
}

PriceBlock.propTypes = {
    hasRange: PropTypes.bool.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    price: PropTypes.string,
    hidePrice: PropTypes.bool,
    selectionMode: PropTypes.bool,
};
