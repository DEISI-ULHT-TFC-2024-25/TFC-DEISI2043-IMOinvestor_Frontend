import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAnnouncementById, updateAnnouncement } from '@services/announcementService';
import InputField from '@common/InputField';
import CheckboxField from '@common/CheckboxField';
import { Check, X } from 'lucide-react';

export default function EditAnnouncement() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading]   = useState(true);
  const [saving,  setSaving]    = useState(false);
  const [error,   setError]     = useState(null);
  const [form,    setForm]      = useState({
    price:     '',
    is_active: false,
  });

  useEffect(() => {
    fetchAnnouncementById(id)
      .then(ann => {
        setForm({
          price:     ann.price,
          is_active: ann.is_active,
        });
      })
      .catch(() => setError('Erro ao carregar anúncio.'))
      .finally(() => setLoading(false));
  }, [id]);

  const onChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updateAnnouncement(id, {
        price:     form.price,
        is_active: form.is_active,
      });
      navigate('/my-announcements');
    } catch {
      setError('Erro ao atualizar anúncio.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6 text-center text-gray-600">A carregar…</p>;
  if (error)   return <p className="p-6 text-center text-red-600">{error}</p>;

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Editar Anúncio #{id}</h2>

      <InputField
        label="Preço Definitivo"
        name="price"
        type="number"
        required
        value={form.price}
        onChange={onChange}
        prefix="€"
        preventNegative
      />

      <div className="mt-4">
        <CheckboxField
          label="Anúncio ativo"
          name="is_active"
          checked={form.is_active}
          onChange={onChange}
        />
      </div>

      {error && (
        <p className="text-red-600 mt-2">{error}</p>
      )}

      <div className="mt-6 flex gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
        >
          <X size={16} className="mr-1" /> Cancelar
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center px-4 py-2 bg-[#CFAF5E] text-white rounded hover:opacity-90 disabled:opacity-50"
        >
          {saving ? 'Gravando…' : (
            <>
              <Check size={16} className="mr-1" />
              Salvar
            </>
          )}
        </button>
      </div>
    </form>
  );
}