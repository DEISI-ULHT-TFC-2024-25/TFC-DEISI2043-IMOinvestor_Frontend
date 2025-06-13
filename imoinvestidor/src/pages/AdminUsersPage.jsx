import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, deleteUser } from '../services/userService';
import ROLES from '../constants/roles';
import { Eye, Edit2, Trash2, Plus } from 'lucide-react';
import UserDetailsModal from '../components/users/UserDetailsModal';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detailsUser, setDetailsUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const list = await fetchUsers();
        setUsers(list);
      } catch {
        setError('Não consegui carregar os utilizadores.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Eliminar este utilizador?')) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      alert('Erro ao eliminar.');
    }
  };

  const openCreate = () => {
    navigate('/admin/users/create');
  };

  const openEdit = (id) => {
    navigate(`/admin/users/${id}/edit`);
  };

  const openDetails = (u) => {
    setDetailsUser(u);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setDetailsUser(null);
    setShowDetails(false);
  };

  if (loading)
    return <div className='container mx-auto p-4'>Carregando usuários…</div>;
  if (error)
    return <div className='container mx-auto p-4 text-red-600'>{error}</div>;

  return (
    <div className='container mx-auto p-4'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-semibold'>
          Administração de Utilizadores
        </h2>
        <button
          className='flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded'
          onClick={openCreate}
        >
          <Plus className='w-5 h-5' />
          <span>Novo Utilizador</span>
        </button>
      </div>

      <div className='overflow-x-auto bg-white rounded shadow'>
        <table className='min-w-full table-auto'>
          <thead className='bg-gray-100'>
            <tr>
              {['ID', 'Username', 'Email', 'Role', 'Ações'].map((header) => (
                <th
                  key={header}
                  className='px-4 py-2 text-left text-gray-700 font-medium'
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className='border-t'>
                <td className='px-4 py-2'>{u.id}</td>
                <td className='px-4 py-2'>{u.userName}</td>
                <td className='px-4 py-2'>{u.email}</td>
                <td className='px-4 py-2'>{u.role || '—'}</td>
                <td className='px-4 py-2 flex items-center'>
                  <button
                    onClick={() => openDetails(u)}
                    className='mr-4 text-gray-600 hover:text-gray-500 flex items-center justify-center'
                    title='Ver detalhes'
                  >
                    <Eye className='w-5 h-5' />
                  </button>

                  <button
                    className='mr-4 text-blue-600 hover:text-blue-500'
                    onClick={() => openEdit(u.id)}
                  >
                    <Edit2 className='w-5 h-5' />
                  </button>

                  <button
                    className='text-red-600 hover:text-red-500'
                    onClick={() => handleDelete(u.id)}
                  >
                    <Trash2 className='w-5 h-5' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showDetails && (
          <UserDetailsModal user={detailsUser} onClose={closeDetails} />
        )}
      </div>
    </div>
  );
}
