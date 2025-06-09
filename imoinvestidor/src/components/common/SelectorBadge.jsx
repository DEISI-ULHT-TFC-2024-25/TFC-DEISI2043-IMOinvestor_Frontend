import PropTypes from 'prop-types';
import { CheckCircle } from 'lucide-react';

export function SelectorBadge({ isSelected }) {
    if (!isSelected) return null;
    return (
        <div className="absolute top-3 left-3 z-10 w-6 h-6 bg-[#CFAF5E] rounded-full flex items-center justify-center shadow-md">
            <CheckCircle size={16} className="text-white" />
        </div>
    );
}

SelectorBadge.propTypes = {
    isSelected: PropTypes.bool.isRequired,
};
