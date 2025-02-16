import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Health from "./pages/Health";
import Layout from "./components/Layout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="health" element={<Health />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;