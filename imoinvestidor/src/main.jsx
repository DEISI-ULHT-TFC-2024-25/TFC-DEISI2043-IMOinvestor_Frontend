import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/styles.css";
import AppRoutes from "./routes";
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById("root")).render(
  <StrictMode>  
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);