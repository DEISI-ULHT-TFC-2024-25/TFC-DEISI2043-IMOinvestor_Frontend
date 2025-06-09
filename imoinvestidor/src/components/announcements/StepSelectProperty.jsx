import { ChevronRight, Building } from 'lucide-react';
import ItemsManager from '@common/ItemsManager';

export default function StepSelectProperty({ form, setForm, next, properties }) {
  return (
    <div className="space-y-6">

      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#CFAF5E] to-[#b89a4e] rounded-full mb-4">
          <Building size={32} className="text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2647] mb-2">
          Selecione a Propriedade
        </h2>
      </div>

      <ItemsManager
        listType="property"
        fetchItems={() => Promise.resolve(properties)}
        showView={true}
        showEdit={false}
        showDelete={false}
        selectionMode={true}
        onItemSelect={p => setForm(f => ({ ...f, property: p }))}
        selectedItem={form.property}
        emptyStateMessage="Nenhuma propriedade disponível para criar anúncio."
      />

      <div className="flex justify-end">
        <button
          onClick={next}
          disabled={!form.property}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#CFAF5E] to-[#b89a4e] text-white px-8 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium order-1 sm:order-2"
        >
          Próximo <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}