import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../services/userService';


export default function EditUserPage() {
  const { id } = useParams(); // se quiseres usar o id para algo
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    date_of_birth: '',
    lang_key: 'PT',
  });
  const [original, setOriginal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({}); 

  // Carrega o utilizador e inicializa form/original
  useEffect(() => {
    async function load() {
      try {
        const user = await getUserById(id);
        const init = {
          first_name: user.firstName || '',
          last_name: user.lastName || '',
          email: user.email || '',
          date_of_birth: user.dateOfBirth ? user.dateOfBirth.slice(0, 10) : '',
          lang_key: user.langKey || 'PT',
        };
        setForm(init);
        setOriginal(init);
      } catch {
        setError('Não foi possível carregar o utilizador.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  // compara original vs atual
  const isChanged = (field) => original && original[field] !== form[field];

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setFormErrors({});

    // Monta o payload apenas com os campos alterados
    const payload = {};
    if (form.first_name !== original.first_name)
      payload.first_name = form.first_name;
    if (form.last_name !== original.last_name)
      payload.last_name = form.last_name;
    if (form.email !== original.email) payload.email = form.email;
    if (form.date_of_birth !== original.date_of_birth)
      payload.date_of_birth = form.date_of_birth || null;
    if (form.lang_key !== original.lang_key) payload.lang_key = form.lang_key;

    // Se não houver nada para atualizar…
    if (Object.keys(payload).length === 0) {
      alert('Nenhuma alteração detetada.');
      return;
    }

    try {
      await updateUser(payload);
      navigate('/admin/users');
    } catch (err) {
      if (err.response?.data && typeof err.response.data === 'object') {
        setFormErrors(err.response.data);
      } else {
        setError(err.message || 'Erro ao atualizar utilizador.');
      }
    }
  }

  if (loading) return <div className='container mx-auto p-4'>Carregando…</div>;
  if (error)
    return <div className='container mx-auto p-4 text-red-600'>{error}</div>;

  return (
    <div className='container mx-auto p-4 max-w-lg'>
      <h2 className='text-2xl font-semibold mb-6'>Editar Utilizador</h2>

      <form
        onSubmit={handleSubmit}
        className='space-y-6 bg-white p-6 rounded shadow'
      >
        {/* First name */}
        <div>
          <label className='block font-medium'>First Name</label>
          <input
            name='first_name'
            value={form.first_name}
            onChange={handleChange}
            required
            className='w-full mt-1 p-2 border rounded'
          />
          {isChanged('first_name') && (
            <p className='mt-1 text-yellow-600 text-sm'>First name alterado</p>
          )}
        </div>

        {/* Last name */}
        <div>
          <label className='block font-medium'>Last Name</label>
          <input
            name='last_name'
            value={form.last_name}
            onChange={handleChange}
            className='w-full mt-1 p-2 border rounded'
          />
          {isChanged('last_name') && (
            <p className='mt-1 text-yellow-600 text-sm'>Last name alterado</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className='block font-medium'>Email</label>
          <input
            name='email'
            type='email'
            value={form.email}
            onChange={handleChange}
            required
            className='w-full mt-1 p-2 border rounded'
          />
          {isChanged('email') && (
            <p className='mt-1 text-yellow-600 text-sm'>Email alterado</p>
          )}
        </div>

        {/* Date of birth */}
        <div>
          <label className='block font-medium'>Data de Nascimento</label>
          <input
            name='date_of_birth'
            type='date'
            value={form.date_of_birth}
            onChange={handleChange}
            className='w-full mt-1 p-2 border rounded'
          />
          {isChanged('date_of_birth') && (
            <p className='mt-1 text-yellow-600 text-sm'>
              Data de nascimento alterada
            </p>
          )}
        </div>

        {/* Lang key */}
        <div>
          <label className='block font-medium'>Idioma</label>
          <select
            name='lang_key'
            value={form.lang_key}
            onChange={handleChange}
            required
            className='w-full mt-1 p-2 border rounded'
          >
            <option value='PT'>PT</option>
            <option value='ENG'>ENG</option>
          </select>
          {isChanged('lang_key') && (
            <p className='mt-1 text-yellow-600 text-sm'>Idioma alterado</p>
          )}
        </div>

        {/* Botões */}
        <div className='flex justify-end space-x-2 pt-4 border-t'>
          <button
            type='button'
            onClick={() => navigate('/admin/users')}
            className='px-4 py-2 bg-gray-300 hover:bg-gray-200 rounded'
          >
            Cancelar
          </button>
          <button
            type='submit'
            className='px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded'
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
