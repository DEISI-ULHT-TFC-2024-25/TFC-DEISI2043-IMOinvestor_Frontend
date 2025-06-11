import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser, createUser, updateUser } from '../services/userService';
import ROLES from '../constants/roles';
//import UserFormModal from '../components/UserFormModal';
import { Eye, Edit2, Trash2, Plus, X } from 'lucide-react';

// Modal para mostrar detalhes de utilizador
function UserDetailsModal({ user, onClose }) {
  if (!user) return null;
  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-semibold mb-4">Detalhes do Utilizador</h3>
        <div className="space-y-2">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Username:</strong> {user.userName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Nome:</strong> {user.firstName || '—'} {user.lastName || ''}</p>
          <p><strong>Telefone:</strong> {user.phone || '—'}</p>
          <p><strong>Data de Nascimento:</strong> {user.dateOfBirth || '—'}</p>
          <p><strong>Role:</strong> {user.role || '—'}</p>
          <p><strong>Ativado:</strong> {user.activated ? 'Sim' : 'Não'}</p>
          <p><strong>Último Login:</strong> {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : '—'}</p>
          <p><strong>Criado Por:</strong> {user.createdBy || '—'}</p>
          <p><strong>Data de Criação:</strong> {user.createdDate ? new Date(user.createdDate).toLocaleString() : '—'}</p>
          <p><strong>Última Alteração:</strong> {user.lastModifiedBy || '—'} em {user.lastModifiedDate ? new Date(user.lastModifiedDate).toLocaleString() : '—'}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [detailsUser, setDetailsUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

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

  const handleDelete = async id => {
    if (!window.confirm('Eliminar este utilizador?')) return;
    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch {
      alert('Erro ao eliminar.');
    }
  };

  const openEdit = user => {
    setEditing(user);
    setShowForm(true);
  };

  const openCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const openDetails = user => {
    setDetailsUser(user);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setDetailsUser(null);
  };

  const handleSave = async formData => {
    try {
      let saved;
      if (formData.id) {
        saved = await updateUser(formData);
        setUsers(prev => prev.map(u => u.id === saved.id ? saved : u));
      } else {
        saved = await createUser(formData);
        setUsers(prev => [...prev, saved]);
      }
      setShowForm(false);
    } catch {
      alert('Erro ao guardar.');
    }
  };

  if (loading) return <div className="container mx-auto p-4">Carregando usuários…</div>;
  if (error) return <div className="container mx-auto p-4 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Administração de Utilizadores</h2>
        <button
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded"
          onClick={openCreate}
        >
          <Plus className="w-5 h-5" />
          <span>Novo Utilizador</span>
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              {['ID', 'Username', 'Email', 'Role', 'Ações'].map(header => (
                <th
                  key={header}
                  className="px-4 py-2 text-left text-gray-700 font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map(u => {
              const roleLabel = u.role || '—';
              return (
                <tr key={u.id} className="border-t">
                  <td className="px-4 py-2">{u.id}</td>
                  <td className="px-4 py-2">{u.userName}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">{roleLabel}</td>
                  <td className="px-4 py-2 flex items-center">
                    <button
                      className="mr-4 text-gray-700 hover:text-gray-900 flex items-center justify-center"
                      onClick={() => openDetails(u)}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      className="mr-4 text-blue-600 hover:text-blue-500 flex items-center justify-center"
                      onClick={() => openEdit(u)}
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-500 flex items-center justify-center"
                      onClick={() => handleDelete(u.id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showForm && (
        <UserFormModal
          user={editing}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

      {showDetails && (
        <UserDetailsModal
          user={detailsUser}
          onClose={closeDetails}
        />
      )}
    </div>
  );
}
