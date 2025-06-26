import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { fetchAnnouncementById, updateAnnouncement } from '@services/announcementService';
import InputField from '@common/InputField';
import CheckboxField from '@common/CheckboxField';
import { PropertyCard } from '@properties/PropertyCard';
import PropertyDetails from '@properties/PropertyDetails';
import { Check, X } from 'lucide-react';
import placeholderImg from '@images/placeholder.jpg';

export default function EditAnnouncement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const [announcement, setAnnouncement] = useState(null);
  const [property, setProperty] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const [form, setForm] = useState({
    price: '',
    is_active: false, // Initialize with default value
  });

  // Determine return path based on where user came from
  const getReturnPath = () => {
    // Check if we have a return path in location state
    if (location.state?.returnTo) {
      return location.state.returnTo;
    }
    
    // Check URL search params
    const urlParams = new URLSearchParams(location.search);
    const returnParam = urlParams.get('return');
    
    if (returnParam) {
      return decodeURIComponent(returnParam);
    }
    
    // Default fallback
    return '/my-announcements';
  };

  const returnPath = getReturnPath();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setFetchError(null);
        const ann = await fetchAnnouncementById(id);
        setAnnouncement(ann);
        
        const propertyData = ann.property || null;
        if (propertyData) {
          if (!propertyData.district_name && propertyData.district) {
            propertyData.district_name = typeof propertyData.district === 'object' 
              ? propertyData.district.name || propertyData.district.nome || String(propertyData.district)
              : String(propertyData.district);
          }
        }
        
        setProperty(propertyData);
        setForm({
          price: ann.price ?? '',
          is_active: ann.is_active ?? false, // Set from announcement data
        });
      } catch (err) {
        console.error('Error loading announcement:', err);
        setFetchError('Erro ao carregar dados do anúncio.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const onChange = e => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setForm(f => ({ ...f, [name]: fieldValue }));
    // Clear errors when user starts typing
    if (updateError) setUpdateError(null);
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (!property) {
      return setUpdateError('Imóvel associado em falta.');
    }

    // Ensure we have a valid price
    const price = parseFloat(form.price);
    if (isNaN(price) || price < 0) {
      return setUpdateError('Por favor, insira um preço válido.');
    }

    const payload = {
      price: price.toString(),
      property_id: property.id,
      is_active: form.is_active, // Include is_active in payload
    };

    try {
      setSaving(true);
      setUpdateError(null);
      
      const result = await updateAnnouncement(id, payload);
      if (result) {
        navigate(returnPath);
      }
    } catch (error) {
      console.error('Submit error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      let errorMessage = 'Erro ao atualizar anúncio';
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        } else if (error.response.data.price) {
          errorMessage = Array.isArray(error.response.data.price) 
            ? error.response.data.price[0] 
            : error.response.data.price;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setUpdateError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(returnPath);
  };

  const handlePropertyEdit = () => {
    // Pass current location info to property edit page
    navigate(`/edit-property/${property.id}`, {
      state: {
        returnTo: `/edit-announcement/${id}`,
        originalReturn: returnPath, // So property edit knows where to ultimately return
      }
    });
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#CFAF5E] mx-auto mb-4" />
        A carregar...
      </div>
    );
  }

  if (fetchError && !announcement) {
    return <p className="p-6 text-center text-red-600">{fetchError}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0A2647] mb-2">
            Editar Anúncio
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Altere os detalhes do seu anúncio ou edite as informações do imóvel associado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="md:col-span-2 order-2 md:order-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-[#0A2647]">
                  Detalhes do Anúncio
                </h2>
              </div>

              <form onSubmit={onSubmit} className="p-6 space-y-6">
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

                {(fetchError || updateError) && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {typeof (fetchError || updateError) === 'string' 
                      ? (fetchError || updateError)
                      : 'Erro ao processar pedido'
                    }
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-8 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium order-2 md:order-1"
                    disabled={saving}
                  >
                    <X size={16} className="mr-2" />
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center justify-center px-8 py-3 bg-[#CFAF5E] text-white rounded-lg transform transition-all duration-200 hover:scale-[1.03] hover:shadow-lg active:scale-95 disabled:opacity-50 font-medium order-1 md:order-2"
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
                  typology={property.typology}
                  num_wc={property.num_wc}
                  net_area={property.net_area}
                  street={property.street}
                  district={property.district_name || (property.district ? String(property.district) : '')}
                  imageUrl={
                    Array.isArray(property.media) && property.media.length > 0
                      ? property.media[0].file || property.media[0].url
                      : placeholderImg
                  }
                  min_price={property.preco_minimo || property.min_price}
                  max_price={property.preco_maximo || property.max_price}
                  showView
                  showEdit
                  onView={() => setShowDetails(true)}
                  onEdit={handlePropertyEdit}
                  className="shadow-lg hover:shadow-xl transition-shadow rounded-xl"
                  property={property}
                />
              </div>
            </div>
          )}
        </div>
      </div>

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