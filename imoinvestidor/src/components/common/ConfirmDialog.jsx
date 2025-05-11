import PropTypes from 'prop-types';

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-[#F9F9F9] border-2 border-[#0A2647] rounded-xl p-6 shadow-xl max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-[#0A2647] mb-6 text-center">
          {message}
        </h2>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded border border-[#0A2647] text-[#0A2647] hover:bg-[#e5e9ef] transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded border border-red-700 text-white font-semibold bg-red-600 hover:bg-red-700 transition"
          >
            Apagar
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmDialog.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmDialog;
