import PropTypes from "prop-types";

export default function Region({ langKey, onChange }) {
  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A2647] mb-6">Preferências Regionais</h2>
      <div className="bg-gray-100 rounded-lg p-4 border border-gray-200 mt-4">
        <p className="font-medium text-[#0A2647] mb-2">Área Geográfica de Interesse</p>
        <p className="text-sm text-gray-600">
          Em breve poderá selecionar uma área no mapa para receber notificações personalizadas
          de novos anúncios. Esta funcionalidade ainda está em desenvolvimento.
        </p>
        <div className="mt-4 h-64 bg-white border border-dashed border-gray-400 flex items-center justify-center text-sm text-gray-500">
          [ Placeholder do mapa de seleção geográfica ]
        </div>
      </div>
    </div>
  );
}

Region.propTypes = {
  langKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};