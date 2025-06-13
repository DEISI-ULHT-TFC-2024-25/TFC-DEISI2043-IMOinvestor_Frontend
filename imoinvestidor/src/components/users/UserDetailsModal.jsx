import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Edit2 } from 'lucide-react';

export default function UserDetailsModal({ user, onClose }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    onClose();
    navigate(`/admin/users/${user.id}/edit`);
  };

  // montamos um array de todos os campos e valores
  const fields = [
    { label: 'ID',                value: user.id },
    { label: 'Username',          value: user.userName },
    { label: 'Nome Completo',     value: `${user.firstName || '—'} ${user.lastName || ''}`.trim() },
    { label: 'Email',             value: user.email },
    { label: 'Telefone',          value: user.phone || '—' },
    { label: 'Data Nascimento',   value: user.dateOfBirth
                                      ? new Date(user.dateOfBirth).toLocaleDateString()
                                      : '—' },
    { label: 'Idioma',            value: user.langKey },
    { label: 'Ativado',           value: user.activated ? 'Sim' : 'Não' },
    { label: 'Último Login',      value: user.lastLogin
                                      ? new Date(user.lastLogin).toLocaleString()
                                      : '—' },
    { label: 'Criado Por',        value: user.createdBy || '—' },
    { label: 'Data Criação',      value: user.createdDate
                                      ? new Date(user.createdDate).toLocaleDateString()
                                      : '—' },
    { label: 'Últ. Alteração Por',value: user.lastModifiedBy || '—' },
    { label: 'Data Últ. Alteração',value: user.lastModifiedDate
                                      ? new Date(user.lastModifiedDate).toLocaleDateString()
                                      : '—' },
    { label: 'Instituições',      value: Array.isArray(user.institutionIds) && user.institutionIds.length
                                      ? user.institutionIds.join(', ')
                                      : '—' },
    { label: 'Role',              value: user.role || '—' },
  ];

  // dividimos ao meio para duas colunas
  const half = Math.ceil(fields.length / 2);
  const leftFields  = fields.slice(0, half);
  const rightFields = fields.slice(half);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-transparent backdrop-blur-md overflow-auto">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        {/* fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Fechar"
        >
          <X className="w-6 h-6" />
        </button>

        {/* cabeçalho com título + editar ao lado */}
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-semibold">Detalhes do Utilizador</h2>
          <button
            onClick={handleEdit}
            className="ml-4 flex items-center space-x-2 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded focus:outline-none"
            title="Editar utilizador"
          >
            <Edit2 className="w-5 h-5" />
            <span className="text-sm">Editar</span>
          </button>
        </div>

        {/* duas colunas alinhadas, sem gap de uma coluna afetar a outra */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-gray-700">
          <div className="space-y-4">
            {leftFields.map(({ label, value }) => (
              <div key={label}>
                <dt className="font-medium">{label}</dt>
                <dd className="mt-1">{value}</dd>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {rightFields.map(({ label, value }) => (
              <div key={label}>
                <dt className="font-medium">{label}</dt>
                <dd className="mt-1">{value}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
