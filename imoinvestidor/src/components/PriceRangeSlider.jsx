import { Range } from 'react-range';
import PropTypes from 'prop-types';
import { useState } from 'react';

const MIN = 50000;
const MAX = 2000000;
const STEP = 10000;

export default function PriceRangeSlider({ priceRange, setPriceRange }) {
  const [activeThumb, setActiveThumb] = useState(null);

  return (
    <div className="w-full">
      <Range
        values={priceRange}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => setPriceRange(values)}
        onFinalChange={() => setActiveThumb(null)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="h-2 w-full bg-gray-300 rounded-full relative"
          >
            <div
              className="h-full bg-[#CFAF5E] rounded-full absolute"
              style={{
                left: `${((priceRange[0] - MIN) / (MAX - MIN)) * 100}%`,
                width: `${((priceRange[1] - priceRange[0]) / (MAX - MIN)) * 100}%`,
                top: 0,
                bottom: 0,
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props, index }) => (
          <div
            {...props}
            className="h-6 w-6 bg-[#0A2647] rounded-full shadow-md cursor-pointer flex items-center justify-center relative"
            onMouseDown={() => setActiveThumb(index)}
            onTouchStart={() => setActiveThumb(index)}
          >
            {activeThumb === index && (
              <div className="absolute -top-10 text-xs bg-[#CFAF5E] text-[#0A2647] font-semibold rounded px-2 py-1 shadow-md whitespace-nowrap">
                {priceRange[index].toLocaleString()} €
              </div>
            )}
          </div>
        )}
      />

      {/* Inputs manuais */}
      <div className="flex gap-4 mt-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-[#0A2647] mb-1">Preço Mínimo</label>
          <input
            type="number"
            value={priceRange[0]}
            min={MIN}
            max={priceRange[1]}
            step={STEP}
            onChange={(e) => {
              const val = Math.min(Number(e.target.value), priceRange[1]);
              setPriceRange([val, priceRange[1]]);
            }}
            className="w-full p-3 rounded border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#CFAF5E]"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-[#0A2647] mb-1">Preço Máximo</label>
          <input
            type="number"
            value={priceRange[1]}
            min={priceRange[0]}
            max={MAX}
            step={STEP}
            onChange={(e) => {
              const val = Math.max(Number(e.target.value), priceRange[0]);
              setPriceRange([priceRange[0], val]);
            }}
            className="w-full p-3 rounded border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#CFAF5E]"
          />
        </div>
      </div>
    </div>
  );
}

PriceRangeSlider.propTypes = {
  priceRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  setPriceRange: PropTypes.func.isRequired,
};
