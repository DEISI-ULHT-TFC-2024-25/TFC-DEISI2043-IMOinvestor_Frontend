import { Range } from 'react-range';
import PropTypes from 'prop-types';
import { useState, useCallback, useMemo } from 'react';

const MIN = 0;
const MAX = 2000000;
const STEP = 100;

export default function PriceRangeSlider({ priceRange, setPriceRange }) {
  const [activeThumb, setActiveThumb] = useState(null);
  const [inputValues, setInputValues] = useState(priceRange);

  const formatPrice = useCallback((value) => `${value.toLocaleString()} €`, []);

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
    setInputValues(values);
  }, [setPriceRange]);

  const handleFinalChange = useCallback(() => {
    setActiveThumb(null);
  }, []);

  const handleThumbActivation = useCallback((index) => {
    setActiveThumb(index);
  }, []);

  const handleMinInputChange = useCallback((e) => {
    const newValue = e.target.value === '' ? '' : Number(e.target.value);
    setInputValues([newValue, inputValues[1]]);
  }, [inputValues]);

  const handleMaxInputChange = useCallback((e) => {
    const newValue = e.target.value === '' ? '' : Number(e.target.value);
    setInputValues([inputValues[0], newValue]);
  }, [inputValues]);

  const applyMinInput = useCallback(() => {
    const validValue = Math.max(MIN, Math.min(Number(inputValues[0]) || 0, inputValues[1]));

    setInputValues([validValue, inputValues[1]]);
    setPriceRange([validValue, priceRange[1]]);
  }, [inputValues, priceRange, setPriceRange]);

  const applyMaxInput = useCallback(() => {
    const validValue = Math.min(MAX, Math.max(Number(inputValues[1]) || 0, inputValues[0]));

    setInputValues([inputValues[0], validValue]);
    setPriceRange([priceRange[0], validValue]);
  }, [inputValues, priceRange, setPriceRange]);

  const handleInputKeyDown = useCallback((e, isMin) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      isMin ? applyMinInput() : applyMaxInput();
    }
  }, [applyMinInput, applyMaxInput]);

  const renderTrack = useCallback(({ props, children }) => {
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
            value={inputValues[0]}
            onChange={handleMinInputChange}
            onBlur={applyMinInput}
            onKeyDown={(e) => handleInputKeyDown(e, true)}
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
            value={inputValues[1]}
            onChange={handleMaxInputChange}
            onBlur={applyMaxInput}
            onKeyDown={(e) => handleInputKeyDown(e, false)}
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