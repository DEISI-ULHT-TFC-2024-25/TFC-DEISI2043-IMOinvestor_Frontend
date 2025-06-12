import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAnnouncementById, updateAnnouncement } from '@services/announcementService';
import { getPropertyById } from '@services/propertyService';
import InputField from '@common/InputField';
import CheckboxField from '@common/CheckboxField';
import { PropertyCard } from '@properties/PropertyCard';
import PropertyDetails from '@properties/PropertyDetails';
import { Check, X } from 'lucide-react';

export default function EditAnnouncement() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [announcement, setAnnouncement] = useState(null);
  const [property, setProperty] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const [form, setForm] = useState({
    price: '',
    is_active: false,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const ann = await fetchAnnouncementById(id);
        setAnnouncement(ann);

        if (ann.property) {
          const prop = await getPropertyById(ann.property);
          setProperty(prop);
        }

        setForm({
          price: ann.price ?? '',
          is_active: ann.is_active ?? false,
        });
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar dados do anúncio.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const onChange = e => {
    const { name, type, checked, value } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updateAnnouncement(id, {
        price: parseFloat(form.price),
        is_active: form.is_active,
      });
      navigate('/my-announcements');
    } catch (err) {
      console.error(err);
      setError('Erro ao atualizar anúncio. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#CFAF5E] mx-auto mb-4" />
        A carregar...
      </div>
    );
  }

  if (error && !announcement) {
    return <p className="p-6 text-center text-red-600">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0A2647] mb-2">
            Editar Anúncio #{id}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Altere os detalhes do seu anúncio ou edite as informações do imóvel associado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="md:col-span-2 order-2 md:order-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-[#0A2647]">
                  Detalhes do Anúncio
                </h2>
              </div>

              <form onSubmit={onSubmit} className="p-6">
                <div className="space-y-6">
                  <InputField
                    label="Preço Definitivo"
                    name="price"
                    type="number"
                    required
                    value={form.price}
                    onChange={onChange}
                    prefix="€"
                    preventNegative
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full"
                  />

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <CheckboxField
                      label="Anúncio ativo"
                      name="is_active"
                      checked={form.is_active}
                      onChange={onChange}
                    />
                    <p className="text-sm text-gray-500 mt-2 ml-6">
                      {form.is_active
                        ? 'O anúncio está visível e pode receber propostas.'
                        : 'O anúncio está oculto e não receberá propostas.'}
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      {error}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-8 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => navigate('/my-announcements')}
                    className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium order-2 md:order-1"
                  >
                    <X size={16} className="mr-2" />
                    Cancelar
                  </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="
                        flex items-center justify-center
                        px-8 py-3
                        bg-[#CFAF5E] text-white rounded-lg
                        transform transition-all duration-200
                        hover:scale-[1.03] hover:shadow-lg
                        active:scale-95
                        disabled:opacity-50
                        font-medium
                        order-1 md:order-2
                      "
                    >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Gravando...
                      </>
                    ) : (
                      <>
                        <Check size={16} className="mr-2" />
                        Guardar Alterações
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Property Sidebar */}
          {property && (
            <div className="md:col-span-1 order-1 md:order-2">
              <div className="sticky top-20 space-y-4">
                <h3 className="text-lg font-semibold text-[#0A2647]">
                  Imóvel Associado
                </h3>

                <PropertyCard
                  title={property.name}
                  tipologia={property.tipologia}
                  casasBanho={property.numero_casas_banho}
                  areaUtil={property.area_util}
                  street={property.street}
                  district={property.district ? String(property.district) : undefined}
                  imageUrl={
                    property.imagens && property.imagens.length > 0
                      ? property.imagens[0].file || property.imagens[0].url
                      : null
                  }
                  preco_minimo={property.preco_minimo}
                  preco_maximo={property.preco_maximo}
                  price={form.price && `€${parseFloat(form.price).toLocaleString('pt-PT')}`}
                  showView
                  showEdit
                  onView={() => setShowDetails(true)}
                  onEdit={() => navigate(`/edit-property/${property.id}`)}
                  className="shadow-lg hover:shadow-xl transition-shadow rounded-xl"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* full-screen property details modal */}
      {property && (
        <PropertyDetails
          property={property}
          isOpen={showDetails}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
}