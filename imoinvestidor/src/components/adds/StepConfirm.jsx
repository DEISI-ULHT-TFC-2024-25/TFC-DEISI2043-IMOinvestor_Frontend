import { ChevronLeft, Eye } from 'lucide-react';

export default function StepReviewConfirm({ form, prev, onCreate, existingAds, loading, success }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <Eye size={32} className="text-[#0A2647] mx-auto" />
        <h3 className="text-xl font-semibold text-[#0A2647]">Confirmação</h3>
      </div>
      <div className="p-6 bg-[#CFAF5E]10 rounded-2xl">
        <p><strong className="text-[#0A2647]">{form.property?.name}</strong></p>
        <p className="text-sm text-[#0A2647]">{form.property?.street}</p>
        <p className="text-sm text-[#0A2647]">{form.property?.tipologia || form.property?.type} • {form.property?.area_util}m²</p>
        <p className="mt-2 text-2xl font-semibold text-[#0A2647]">€{(parseFloat(form.price) || 0).toLocaleString()}</p>
        <p className="text-sm text-gray-500">Faixa de mercado: €{(form.property?.preco_minimo || 0).toLocaleString()} – €{(form.property?.preco_maximo || 0).toLocaleString()}</p>
      </div>
      {existingAds.length > 0 && (
        <div className="space-y-2">
          <h5 className="font-medium text-[#0A2647]">Anúncios existentes para esta propriedade:</h5>
          {existingAds.map(ad => (
            <div key={ad.id} className="p-4 border rounded-lg flex justify-between bg-yellow-50 border-yellow-200">
              <span className="text-[#0A2647] font-medium">€{(ad.price || 0).toLocaleString()}</span>
              <span className="text-sm text-gray-500">{ad.listed_date ? new Date(ad.listed_date).toLocaleDateString() : '-'}</span>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center">
        <button onClick={prev} className="flex items-center gap-2 text-[#0A2647] hover:text-[#CFAF5E] transition-colors">
          <ChevronLeft size={16} /> Voltar
        </button>
        <button
          onClick={onCreate}
          disabled={loading || success}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#CFAF5E] to-[#b89a4e] text-white px-8 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium order-1 sm:order-2"
        >
          {loading ? 'A criar...' : success ? 'Criado!' : 'Criar Anúncio'}
        </button>
      </div>
    </div>
  );
}
