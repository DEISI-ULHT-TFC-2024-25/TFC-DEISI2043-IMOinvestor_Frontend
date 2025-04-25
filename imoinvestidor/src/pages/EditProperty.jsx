import PropertyForm from '@components/PropertyForm';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();

    console.log(`Imóvel ${id} atualizado!`);
    navigate('/my-properties');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#0A2647] mb-6">Editar Imóvel</h2>
      <PropertyForm 
        onSubmit={handleEdit} 
        submitLabel="Guardar Alterações" 
      />
    </div>
  );
}
