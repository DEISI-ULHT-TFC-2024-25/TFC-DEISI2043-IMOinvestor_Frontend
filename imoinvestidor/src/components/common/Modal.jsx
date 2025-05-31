import PropTypes from 'prop-types';
import { X } from 'lucide-react';

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = true,
  size = 'default', // 'small', 'default', 'large', 'fullscreen-mobile'
  className = '',
  backdropClassName = '',
  closeOnBackdrop = true,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnBackdrop) {
      onClose();
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'max-w-sm w-full mx-4';
      case 'large':
        return 'max-w-4xl w-full mx-4';
      case 'fullscreen-mobile':
        return 'fixed inset-x-2 top-16 bottom-16 md:relative md:inset-auto md:max-w-2xl md:w-full md:mx-4';
      default:
        return 'max-w-2xl w-full mx-4';
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${backdropClassName}`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-lg shadow-xl ${getSizeClasses()} ${
          size === 'fullscreen-mobile' 
            ? 'flex flex-col overflow-hidden' 
            : ''
        } ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-lg">
            {title && (
              <h3 className="text-lg font-semibold text-[#0A2647]">
                {title}
              </h3>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors ml-auto"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        <div className={size === 'fullscreen-mobile' ? 'flex-1 overflow-y-auto' : ''}>
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  showCloseButton: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'default', 'large', 'fullscreen-mobile']),
  className: PropTypes.string,
  backdropClassName: PropTypes.string,
  closeOnBackdrop: PropTypes.bool,
};

export default Modal;