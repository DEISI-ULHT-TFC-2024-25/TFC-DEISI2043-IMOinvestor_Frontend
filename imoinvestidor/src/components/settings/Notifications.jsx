export default function Notifications() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A2647] mb-10">Notificações</h2>

      <div className="space-y-8">
        <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
          <p className="font-medium text-[#0A2647] mb-2">Receber emails sobre novos anúncios</p>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked />
            <span className="text-sm text-gray-700">Ativado</span>
          </label>
        </div>

        <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
          <p className="font-medium text-[#0A2647] mb-2">Alertas Personalizados</p>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            <span className="text-sm text-gray-700">Desativado</span>
          </label>
        </div>
      </div>
    </div>
  );
}