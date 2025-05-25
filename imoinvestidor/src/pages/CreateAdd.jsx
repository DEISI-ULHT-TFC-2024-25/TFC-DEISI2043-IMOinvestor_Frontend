import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Building,
  DollarSign,
  Eye,
  Check,
} from 'lucide-react';
import PropertiesManager from '@properties/PropertiesManager';
import PropertyDetails from '@properties/PropertyDetails';
import { fetchAnnouncements, createAnnouncement } from '@services/announcementService';
import { fetchProperties } from '@services/propertyService';

const steps = [
  { id: 1, label: 'Select Property', icon: Building },
  { id: 2, label: 'Set Price', icon: DollarSign },
  { id: 3, label: 'Review & Confirm', icon: Eye },
];

export default function CreateAdScreen() {
  const [step, setStep] = useState(1);
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({ property: null, price: '' });
  const [existingAds, setExistingAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [viewProperty, setViewProperty] = useState(null);

  useEffect(() => {
    fetchProperties()
      .then(data => setProperties(data))
      .catch(() => setError('Não foi possível carregar propriedades'));
  }, []);

  useEffect(() => {
    if (!form.property) return;
    setLoading(true);
    fetchAnnouncements({ property: form.property.id })
      .then(setExistingAds)
      .catch(() => setError('Falha ao carregar anúncios existentes'))
      .finally(() => setLoading(false));
  }, [form.property]);

  const next = () => {
    if (step === 2) {
      const p = parseFloat(form.price);
      if (!p || p <= 0) {
        setError('Preço inválido');
        return;
      }
    }
    setError('');
    setStep(s => Math.min(3, s + 1));
  };
  const prev = () => setStep(s => Math.max(1, s - 1));

  const onCreate = () => {
    setLoading(true);
    createAnnouncement({
      property: form.property.id,
      price: parseFloat(form.price),
      organization: form.property.organization ?? 1,
      created_by: 'current_user',
      last_modified_by: 'current_user',
    })
      .then(() => {
        setSuccess(true);
        setTimeout(() => reset(), 1500);
      })
      .catch(() => setError('Erro ao criar anúncio'))
      .finally(() => setLoading(false));
  };

  const reset = () => {
    setForm({ property: null, price: '' });
    setExistingAds([]);
    setStep(1);
    setSuccess(false);
    setError('');
  };

  const renderStepper = () => (
    <div className="flex items-center space-x-4 mb-8">
      {steps.map(({ id, label, icon: Icon }) => {
        const isActive = id === step;
        const isDone = id < step;
        return (
          <div key={id} className="flex-1 flex items-center">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${isDone ? 'bg-[#CFAF5E] border-[#CFAF5E] text-white' : isActive ? 'border-[#CFAF5E] text-[#CFAF5E]' : 'border-gray-300 text-gray-400'}`}>
              {isDone ? <Check size={16} /> : <Icon size={16} />}
            </div>
            <span className={`ml-2 text-sm font-medium ${isActive || isDone ? 'text-[#0A2647]' : 'text-gray-400'}`}>{label}</span>
            {id < steps.length && <div className="flex-1 h-px bg-gray-200 mx-4" />}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A2647]10 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-6xl">
        {renderStepper()}

        {step === 1 && (
          <div className="space-y-6">
            <PropertiesManager
              fetchProperties={() => Promise.resolve(properties)}
              title="Selecione a propriedade para criar anúncio"
              showView={true}
              showEdit={false} // Remove edit button for selection mode
              showDelete={false}
              selectionMode={true} // Enable selection mode
              onPropertySelect={p => setForm(f => ({ ...f, property: p }))}
              onView={p => setViewProperty(p)}
              selectedProperty={form.property} // Pass the currently selected property
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
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <DollarSign size={32} className="text-[#CFAF5E] mx-auto" />
              <h3 className="text-xl font-semibold text-[#0A2647]">Defina o preço de venda</h3>
            </div>
            <div className="p-4 bg-[#0A2647]05 rounded-lg">
              <p><strong className="text-[#0A2647]">{form.property?.name}</strong></p>
              <p className="text-sm text-gray-500">{form.property?.street}</p>
              <p className="text-sm text-[#CFAF5E]">Faixa: €{(form.property?.preco_minimo || 0).toLocaleString()} – €{(form.property?.preco_maximo || 0).toLocaleString()}</p>
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
        )}

        {step === 3 && (
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
                className="flex items-center gap-2 bg-[#CFAF5E] text-[#0A2647] px-6 py-2 rounded-lg disabled:opacity-50 hover:bg-[#b89a4e] transition-colors"
              >
                {loading ? 'A criar...' : success ? 'Criado!' : 'Criar Anúncio'}
              </button>
            </div>
          </div>
        )}
      </div>

      <PropertyDetails
        property={viewProperty}
        isOpen={!!viewProperty}
        onClose={() => setViewProperty(null)}
      />
    </div>
  );
}