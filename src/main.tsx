import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext';
import Protected from './components/Protected';
import "../src/styles/global.css";
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
import Category from './pages/Category';
import FinancialRecord from './pages/FinancialRecord';
import Profile from './pages/Profile';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <Protected>
                <AppLayout />
              </Protected>
            }>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard/>} />
              <Route path="categorias" element={<Category/>} />
              <Route path="registros-financeiros" element={<FinancialRecord/>} />
              <Route path="perfil" element={<Profile/>} />

          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
