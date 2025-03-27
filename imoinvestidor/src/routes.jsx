import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Health from "./pages/Health";
import Register from "./pages/Register";
import Layout from "./components/Layout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="health" element={<Health />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}