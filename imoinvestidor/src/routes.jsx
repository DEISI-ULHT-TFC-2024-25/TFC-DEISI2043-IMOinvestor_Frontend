import {Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Health from "./pages/Health";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Map from "./pages/Map";
import MyProperties from "./pages/MyProperties";
import CreateProperty from "./pages/CreateProperty";
import PublicRoute from "./components/routes/PublicRoute";
import ROLES from "./constants/roles";
import RoleRoute from "./components/routes/RoleRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="health" element={
          <RoleRoute allowedRoles={[ROLES.SYS_ADMIN]}>
            <Health />
          </RoleRoute>
        } />

        <Route path="register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />

        <Route path="login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="map" element={<Map />} />
        <Route path="my-properties" element={<MyProperties />} />
        <Route path="create-property" element={<CreateProperty />} />
      </Route>
    </Routes>
  );
}