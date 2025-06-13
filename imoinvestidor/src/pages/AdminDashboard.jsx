import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../services/userService';
import { fetchProperties } from '../services/propertyService';
import { fetchAnnouncements } from '../services/announcementService';
import ROLES from '../constants/roles';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeAdmins: 0,
    totalProperties: 0,
    totalAnnouncements: 0,
    loading: true,
    error: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function loadStats() {
      try {
        const users = await fetchUsers();
        const properties = await fetchProperties();
        const announcements = await fetchAnnouncements();
        const admins = users.filter(u => u.role === ROLES.SYS_ADMIN).length;
        setStats({
          totalUsers: users.length,
          activeAdmins: admins,
          totalProperties: properties.length,
          totalAnnouncements: announcements.length,
          loading: false,
          error: null,
        });
      } catch (err) {
        setStats(s => ({ ...s, loading: false, error: /*'Erro ao carregar estatísticas'*/ err.message || 'Erro ao carregar estatísticas' }));
      }
    }
    loadStats();
  }, []);

  if (stats.loading) return <div className="container mx-auto p-4">A carregar o dashboard...</div>;
  if (stats.error) return <div className="container mx-auto p-4 text-red-600">{stats.error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Dashboard de Administração</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
          <p className="mt-2 text-gray-600">Utilizadores</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-2xl font-bold">{stats.activeAdmins}</p>
          <p className="mt-2 text-gray-600">Admins Ativos</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-2xl font-bold">{stats.totalProperties}</p>
          <p className="mt-2 text-gray-600">Propriedades</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-2xl font-bold">{stats.totalAnnouncements}</p>
          <p className="mt-2 text-gray-600">Anúncios</p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-medium mb-4">Atalhos Rápidos</h2>
        <div className="flex flex-wrap gap-4">
          <button
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded"
            onClick={() => navigate('/admin/users')}
          >
            Gerir Utilizadores
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded"
            onClick={() => navigate('/admin/properties')}
          >
            Gerir Propriedades
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded"
            onClick={() => navigate('/admin/announcements')}
          >
            Gerir Anúncios
          </button>
        </div>
      </section>
    </div>
  );
}
