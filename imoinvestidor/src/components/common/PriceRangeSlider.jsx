import { Range } from 'react-range';
import PropTypes from 'prop-types';
import { useState, useCallback, useMemo } from 'react';

const MIN = 50000;
const MAX = 2000000;
const STEP = 10000;

export default function PriceRangeSlider({ priceRange, setPriceRange }) {
  const [activeThumb, setActiveThumb] = useState(null);

  // Memoize format function to prevent unnecessary re-renders
  const formatPrice = useCallback((value) => `${value.toLocaleString()} €`, []);

  // Calculate percentages once per render
  const leftPercent = useMemo(() => 
    ((priceRange[0] - MIN) / (MAX - MIN)) * 100, 
    [priceRange]
  );
  
  const widthPercent = useMemo(() => 
    ((priceRange[1] - priceRange[0]) / (MAX - MIN)) * 100, 
    [priceRange]
  );

  const handlePriceChange = useCallback((values) => {
    setPriceRange(values);
  }, [setPriceRange]);

  const handleFinalChange = useCallback(() => {
    setActiveThumb(null);
  }, []);

  const handleThumbActivation = useCallback((index) => {
    setActiveThumb(index);
  }, []);

  const handleMinInputChange = useCallback((e) => {
    const val = Math.max(MIN, Math.min(Number(e.target.value), priceRange[1]));
    setPriceRange([val, priceRange[1]]);
  }, [priceRange, setPriceRange]);

  const handleMaxInputChange = useCallback((e) => {
    const val = Math.min(MAX, Math.max(Number(e.target.value), priceRange[0]));
    setPriceRange([priceRange[0], val]);
  }, [priceRange, setPriceRange]);

  const renderTrack = useCallback(({ props, children }) => {
    // eslint-disable-next-line react/prop-types
    const { key, ref, style, ...restProps } = props;
    return (
      <div
        key={key}
        ref={ref}
        style={style}
        {...restProps}
        className="h-2 w-full bg-gray-300 rounded-full relative"
      >
        <div
          className="h-full bg-[#CFAF5E] rounded-full absolute"
          style={{
            left: `${leftPercent}%`,
            width: `${widthPercent}%`,
            top: 0,
            bottom: 0,
          }}
        />
        {children}
      </div>
    );
  }, [leftPercent, widthPercent]);

  const renderThumb = useCallback(({ props, index }) => {
    // eslint-disable-next-line react/prop-types
    const { key, ref, style, ...restProps } = props;
    return (
      <div
        key={key}
        ref={ref}
        style={style}
        {...restProps}
        className="h-6 w-6 bg-[#0A2647] rounded-full shadow-md cursor-pointer flex items-center justify-center relative"
        onMouseDown={() => handleThumbActivation(index)}
        onTouchStart={() => handleThumbActivation(index)}
      >
        {activeThumb === index && (
          <div className="absolute -top-10 text-xs bg-[#CFAF5E] text-[#0A2647] font-semibold rounded px-2 py-1 shadow-md whitespace-nowrap">
            {formatPrice(priceRange[index])}
          </div>
        )}
      </div>
    );
  }, [activeThumb, formatPrice, handleThumbActivation, priceRange]);

  return (
    <div className="w-full">
      <Range
        values={priceRange}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={handlePriceChange}
        onFinalChange={handleFinalChange}
        renderTrack={renderTrack}
        renderThumb={renderThumb}
      />

      <div className="flex gap-4 mt-4">
        <div className="flex-1">
          <label htmlFor="min-price" className="block text-sm font-medium text-[#0A2647] mb-1">
            Preço Mínimo
          </label>
          <input
            id="min-price"
            type="number"
            value={priceRange[0]}
            min={MIN}
            max={priceRange[1]}
            step={STEP}
            onChange={handleMinInputChange}
            className="w-full p-3 rounded border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#CFAF5E]"
          />
        </div>

        <div className="flex-1">
          <label htmlFor="max-price" className="block text-sm font-medium text-[#0A2647] mb-1">
            Preço Máximo
          </label>
          <input
            id="max-price"
            type="number"
            value={priceRange[1]}
            min={priceRange[0]}
            max={MAX}
            step={STEP}
            onChange={handleMaxInputChange}
            className="w-full p-3 rounded border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#CFAF5E]"
          />
        </div>
      </div>

      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>{formatPrice(MIN)}</span>
        <span>{formatPrice(MAX)}</span>
      </div>
    </div>
  );
}

PriceRangeSlider.propTypes = {
  priceRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  setPriceRange: PropTypes.func.isRequired,
};