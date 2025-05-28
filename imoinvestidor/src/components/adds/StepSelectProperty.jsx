import { ChevronRight } from 'lucide-react';
import PropertiesManager from '@properties/PropertiesManager';

export default function StepSelectProperty({ form, setForm, next, properties }) {
  return (
    <div className="space-y-6">
      <PropertiesManager
        fetchProperties={() => Promise.resolve(properties)}
        title="Selecione a propriedade para criar anúncio"
        showView={true}
        showEdit={false}
        showDelete={false}
        selectionMode={true}
        onPropertySelect={p => setForm(f => ({ ...f, property: p }))}
        selectedProperty={form.property}
        emptyStateMessage="Nenhuma propriedade disponível para criar anúncio."
      />

      <div className="flex justify-end">
        <button
          onClick={next}
          disabled={!form.property}
          className="flex items-center gap-2 px-6 py-3 bg-[#CFAF5E] text-[#0A2647] rounded-lg disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
        >
          Próximo <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}