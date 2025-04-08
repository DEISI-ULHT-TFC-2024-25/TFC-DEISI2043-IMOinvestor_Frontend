import {Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Health from "./pages/Health";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Map from "./pages/Map";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="health" element={<Health />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="map" element={<Map />} />
      </Route>
    </Routes>
  );
}