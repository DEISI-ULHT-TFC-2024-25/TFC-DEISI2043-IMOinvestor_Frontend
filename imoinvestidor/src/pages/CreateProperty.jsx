import PropertyForm from '../components/PropertyForm';
import { useNavigate } from 'react-router-dom';

export default function CreateProperty() {
    const navigate = useNavigate();

    const handleCreate = (e) => {
        e.preventDefault();
        console.log("Imóvel criado!");
        navigate('/my-properties');
      };

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded shadow mt-8 mb-8">
      <h2 className="text-2xl font-bold text-[#0A2647] mb-6">Criar Novo Imóvel</h2>
      <PropertyForm 
        onSubmit={handleCreate} 
        submitLabel="Criar Imóvel" 
      />
    </div>
  );
}
