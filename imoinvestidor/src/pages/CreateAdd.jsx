import React, { useState, useEffect } from 'react';
import { Check, Building, DollarSign, Eye } from 'lucide-react';
import PropertyDetails from '@properties/PropertyDetails';
import { fetchAnnouncements, createAnnouncement } from '@services/announcementService';
import { fetchProperties } from '@services/propertyService';

import StepSelectProperty from '@adds/StepSelectProperty';
import StepSetPrice from '@adds/StepSetPrice';
import StepReviewConfirm from '@adds/StepConfirm';

const steps = [
  { id: 1, label: 'Propriedade', icon: Building },
  { id: 2, label: 'Preço', icon: DollarSign },
  { id: 3, label: 'Confirmação', icon: Eye },
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
  <div className="flex items-center justify-center mb-8">
    {steps.map(({ id, label, icon: Icon }, index) => {
      const isActive = id === step;
      const isDone = id < step;
      return (
        <React.Fragment key={id}>
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${isDone ? 'bg-[#CFAF5E] border-[#CFAF5E] text-white' : isActive ? 'border-[#CFAF5E] text-[#CFAF5E]' : 'border-gray-300 text-gray-400'}`}>
              {isDone ? <Check size={16} /> : <Icon size={16} />}
            </div>
            <span className={`mt-2 text-sm font-medium ${isActive || isDone ? 'text-[#0A2647]' : 'text-gray-400'}`}>{label}</span>
          </div>
          {index < steps.length - 1 && (
            <div className="w-24 h-px bg-gray-200 mx-4" />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A2647]10 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-6xl">
        {renderStepper()}

        {step === 1 && (
          <StepSelectProperty
            form={form}
            setForm={setForm}
            next={next}
            properties={properties}
          />
        )}

        {step === 2 && (
          <StepSetPrice
            form={form}
            setForm={setForm}
            error={error}
            prev={prev}
            next={next}
          />
        )}

        {step === 3 && (
          <StepReviewConfirm
            form={form}
            prev={prev}
            onCreate={onCreate}
            existingAds={existingAds}
            loading={loading}
            success={success}
          />
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