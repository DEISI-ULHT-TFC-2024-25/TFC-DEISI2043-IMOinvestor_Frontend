import PropTypes from 'prop-types';
import { BedDouble, Bath, Ruler } from 'lucide-react';
import placeholderImg from '@images/placeholder.jpg';

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
    <>
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
            <h4 className="font-semibold text-[#0A2647] text-lg flex-1 pr-2 leading-tight">
                {title}
            </h4>
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
        </div>
    </>
  );
}

BaseCard.propTypes = {
    title: PropTypes.string.isRequired,
    tipologia: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    casasBanho: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    areaUtil: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    street: PropTypes.string,
    district: PropTypes.string,
    imageUrl: PropTypes.string,
    imageClassName: PropTypes.string,
};
