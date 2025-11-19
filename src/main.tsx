import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext';
import Protected from './components/Protected';
import "../src/styles/global.css";
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
import CategoryList from './pages/CategoryList';
import Profile from './pages/Profile';
import CategoryForm from './pages/CategoryForm';
import FinancialRecordList from './pages/FinancialRecordList';
import FinancialRecordForm from './pages/FinancialRecordForm';
import ProfileForm from './pages/ProfileForm';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/perfil/criar' element={<ProfileForm />} />

          <Route
            path="/"
            element={
              <Protected>
                <AppLayout />
              </Protected>
            }>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard/>} />
              <Route path="categorias" element={<CategoryList/>} />
              <Route path="/categorias/:id" element={<CategoryForm mode='view'/>} />
              <Route path="/categorias/:id/editar" element={<CategoryForm mode='edit'/>} />
              <Route path="/categorias/nova" element={<CategoryForm mode='create'/>} />
              <Route path="registros-financeiros" element={<FinancialRecordList/>} />
              <Route path="/registros-financeiros/:id" element={<FinancialRecordForm mode='view'/>} />
              <Route path="/registros-financeiros/:id/editar" element={<FinancialRecordForm mode='edit'/>} />
              <Route path="/registros-financeiros/novo" element={<FinancialRecordForm mode='create'/>} />
              <Route path="perfil" element={<Profile/>} />

          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
