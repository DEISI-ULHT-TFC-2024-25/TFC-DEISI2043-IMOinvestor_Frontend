import { ChevronLeft, ChevronRight, DollarSign } from 'lucide-react';

export default function StepSetPrice({ form, setForm, error, prev, next }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <DollarSign size={32} className="text-[#CFAF5E] mx-auto" />
        <h3 className="text-xl font-semibold text-[#0A2647]">Defina o preço de venda</h3>
      </div>
      <div className="p-4 bg-[#0A2647]05 rounded-lg">
        <p><strong className="text-[#0A2647]">{form.property?.name}</strong></p>
        <p className="text-sm text-gray-500">{form.property?.street}</p>
        <p className="text-sm text-[#CFAF5E]">
          Faixa: €{(form.property?.preco_minimo || 0).toLocaleString()} – €{(form.property?.preco_maximo || 0).toLocaleString()}
        </p>
      </div>
      <div>
        <label className="block mb-1 text-[#0A2647]">Preço (€)</label>
        <input
          type="number"
          min="0"
          step="1000"
          value={form.price}
          onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
          className="w-full px-4 py-2 border rounded-lg focus:ring-[#CFAF5E] focus:border-[#CFAF5E]"
          placeholder="Insira o preço de venda"
        />
        {error && <p className="text-red-600 mt-1">{error}</p>}
      </div>
      <div className="flex justify-between">
        <button onClick={prev} className="flex items-center gap-2 text-[#0A2647] hover:text-[#CFAF5E] transition-colors">
          <ChevronLeft size={16} /> Voltar
        </button>
        <button onClick={next} className="flex items-center gap-2 bg-[#CFAF5E] text-[#0A2647] px-6 py-2 rounded-lg hover:bg-[#b89a4e] transition-colors">
          Próximo <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}