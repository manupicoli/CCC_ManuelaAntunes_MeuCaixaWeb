import { StrictMode, type JSX } from 'react'
import { createRoot } from 'react-dom/client'
import "../src/styles/global.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { isAuthenticated } from './services/auth'

function Protected({ children }: { children: JSX.Element }) {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  return children;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={
          <Protected>
            <Home />
          </Protected>
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
