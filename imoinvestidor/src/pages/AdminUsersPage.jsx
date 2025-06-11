import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser, createUser, updateUser } from '../services/userService';
import ROLES from '../constants/roles';
//import UserFormModal from '../components/UserFormModal';

// Mapa de ID numérico para string de role
const ID_TO_ROLE = {
  1: ROLES.SYS_ADMIN,
  2: ROLES.USER,
  3: ROLES.INVESTOR,
  4: ROLES.AGENT,
  5: ROLES.PROMOTOR,
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded"
          onClick={openCreate}
        >
          ➕ Novo Utilizador
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
            {users.map(u => (
              <tr key={u.id} className="border-t">
                <td className="px-4 py-2">{u.id}</td>
                <td className="px-4 py-2">{u.userName}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">
                  {ID_TO_ROLE[Number(u.roleId)] || u.role || '—'}
                </td>
                <td className="px-4 py-2">
                  <button
                    className="mr-2 text-blue-600 hover:text-blue-500"
                    onClick={() => openEdit(u)}
                  >
                    ✏️
                  </button>
                  <button
                    className="text-red-600 hover:text-red-500"
                    onClick={() => handleDelete(u.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
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
    </div>
  );
}
