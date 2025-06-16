import { Routes, Route } from 'react-router-dom';

// Layouts e páginas públicas
import Layout from '@layout/Layout';
import Home from '@pages/Home';
import Login from '@pages/Login';
import Register from '@pages/Register';
import NotFound from '@pages/NotFound';

// Páginas protegidas
import Map from '@pages/Map';
import Health from '@pages/Health';
import MyProperties from '@pages/MyProperties';
import CreateProperty from '@pages/CreateProperty';
import EditProperty from '@pages/EditProperty';
import AdminProperties from '@pages/AdminPropertiesList';
import UserSettings from '@pages/UserSettings';
import CreateAdd from '@pages/CreateAdd';
import EditAnnouncement from '@pages/EditAnnouncement';
import MyAnnouncements from '@pages/MyAnnouncements';
import AllAnnouncements from '@pages/AllAnnouncementsList';
import AdminDashboard from '@pages/AdminDashboard';
import AdminUsersPage from '@pages/AdminUsersPage';
import EditUserPage from '@pages/EditUserPage';

// Rotas personalizadas
import PublicRoute from '@routes/PublicRoute';
import RoleRoute from '@routes/RoleRoute';

// Constantes
import ROLES from '@constants/roles';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Páginas públicas */}
        <Route index element={<Home />} />
        <Route
          path='login'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path='register'
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Acesso restrito a SYS_ADMIN */}
        <Route
          path='health'
          element={
            <RoleRoute allowedRoles={[ROLES.SYS_ADMIN]}>
              <Health />
            </RoleRoute>
          }
        />

        <Route
          path='admin'
          element={
            <RoleRoute allowedRoles={[ROLES.SYS_ADMIN]}>
              <AdminDashboard />
            </RoleRoute>
          }
        />

        <Route
          path='admin/users'
          element={
            <RoleRoute allowedRoles={[ROLES.SYS_ADMIN]}>
              <AdminUsersPage />
            </RoleRoute>
          }
        />

        {/* <Route
          path='admin/users/create'
          element={
            <RoleRoute allowedRoles={[ROLES.SYS_ADMIN]}>
              <CreateUserPage />
            </RoleRoute>
          }
        />

        <Route
          path='admin/users/:id'
          element={
            <RoleRoute allowedRoles={[ROLES.SYS_ADMIN]}>
              <UserDetailsPage />
            </RoleRoute>
          }
        />*/}

        <Route
          path='admin/users/:id/edit'
          element={
            <RoleRoute allowedRoles={[ROLES.SYS_ADMIN]}>
              <EditUserPage />
            </RoleRoute>
          }
        />

        <Route
          path='all-properties'
          element={
            <RoleRoute allowedRoles={[ROLES.SYS_ADMIN]}>
              <AdminProperties />
            </RoleRoute>
          }
        />

        {/* Acesso restrito a SYS_ADMIN, AGENT e PROMOTOR */}
        <Route
          path='my-properties'
          element={
            <RoleRoute
              allowedRoles={[ROLES.SYS_ADMIN, ROLES.AGENT, ROLES.PROMOTOR]}
            >
              <MyProperties />
            </RoleRoute>
          }
        />
        <Route
          path='create-property'
          element={
            <RoleRoute
              allowedRoles={[ROLES.SYS_ADMIN, ROLES.AGENT, ROLES.PROMOTOR]}
            >
              <CreateProperty />
            </RoleRoute>
          }
        />
        <Route
          path='edit-property/:id'
          element={
            <RoleRoute
              allowedRoles={[ROLES.SYS_ADMIN, ROLES.AGENT, ROLES.PROMOTOR]}
            >
              <EditProperty />
            </RoleRoute>
          }
        />
        <Route
          path='create-announcement'
          element={
            <RoleRoute
              allowedRoles={[ROLES.SYS_ADMIN, ROLES.AGENT, ROLES.PROMOTOR]}
            >
              <CreateAdd />
            </RoleRoute>
          }
        />
        <Route
          path='my-announcements'
          element={
            <RoleRoute
              allowedRoles={[ROLES.SYS_ADMIN, ROLES.AGENT, ROLES.PROMOTOR]}
            >
              <MyAnnouncements />
            </RoleRoute>
          }
        />

        <Route
          path='edit-announcement/:id'
          element={
            <RoleRoute
              allowedRoles={[ROLES.SYS_ADMIN, ROLES.AGENT, ROLES.PROMOTOR]}
            >
              <EditAnnouncement />
            </RoleRoute>
          }
        />

        {/* Acesso a investidores */}
        <Route
          path='announcements'
          element={
            <RoleRoute
              allowedRoles={[ROLES.INVESTOR]}
            >
              <AllAnnouncements />
            </RoleRoute>
          }
        />

        <Route
          path='map'
          element={
            <RoleRoute
              allowedRoles={[ROLES.INVESTOR]}
            >
              <Map />
            </RoleRoute>
          }
        />

        {/* Acesso a todos os utilizadores autenticados */}
        <Route path='profile' element={<UserSettings />} />

        {/* Página 404 */}
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}
