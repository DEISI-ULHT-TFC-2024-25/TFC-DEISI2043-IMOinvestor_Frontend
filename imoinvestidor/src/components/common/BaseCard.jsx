import { Bed, Bath, Ruler } from 'lucide-react';

export function BaseCard({
    title,
    tipologia,
    casasBanho,
    areaUtil,
    street,
    district,
    imageUrl,
    imageClassName = 'h-48 sm:h-56',
}) {
  return (
    <div className="relative">
      <img
        src={imageUrl}
        alt={title}
        className={`w-full object-cover ${imageClassName}`}
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold leading-snug text-[#0A2647]">
          {title}
        </h2>
        {(street || district) && (
          <p className="text-sm text-gray-500 mt-1">
            {[street, district].filter(Boolean).join(', ')}
          </p>
        )}

        <div className="mt-3 flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Bed size={16} />
            <span>{tipologia || '–'}</span>
          </div>

          <div className="flex items-center space-x-1">
            <Bath size={16} />
            <span>{casasBanho != null ? casasBanho : '0'}</span>
          </div>

          <div className="flex items-center space-x-1">
            <Ruler size={16} />
            <span>{areaUtil != null ? `${areaUtil} m²` : '–'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}