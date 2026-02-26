import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import NosotrosPage from './pages/NosotrosPage';
import NuestroProcesoPage from './pages/NuestroProcesoPage';
import PorQueElegirnos from './pages/PorQueElegirnos';
import CotizacionPage from './pages/CotizacionPage';
import ProyectosPage from './pages/ProyectosPage';
import TecnologiaSostenibilidadPage from './pages/TecnologiaSostenibilidadPage';
import Register from './pages/Register';

// Service Pages
import LicenciasPage from './pages/servicios/LicenciasPage';
import InfraestructuraPage from './pages/servicios/InfraestructuraPage';
import DomoticaPage from './pages/servicios/DomoticaPage';
import DisenoEstructuralPage from './pages/servicios/DisenoEstructuralPage';

// Dashboard Pages
import AdminDashboard from './pages/admin/Dashboard';
import CollaboratorDashboard from './pages/collaborator/Dashboard';
import ClientDashboard from './pages/client/Dashboard';
import ProviderDashboard from './pages/provider/Dashboard';
import UserDashboard from './pages/user/Dashboard';
import CompleteProfile from './pages/CompleteProfile';

import ScrollToTop from './components/ScrollToTop';
import GlobalEditor from './components/GlobalEditor';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <GlobalEditor />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/proceso" element={<NuestroProcesoPage />} />
          <Route path="/por-que-elegirnos" element={<PorQueElegirnos />} />
          <Route path="/cotizacion" element={<CotizacionPage />} />
          <Route path="/contacto" element={<CotizacionPage />} />
          <Route path="/proyectos" element={<ProyectosPage />} />
          <Route path="/tecnologia-sostenibilidad" element={<TecnologiaSostenibilidadPage />} />
          <Route path="/register" element={<Register />} />

          {/* Service Routes */}
          <Route path="/servicios/licencias" element={<LicenciasPage />} />
          <Route path="/servicios/infraestructura" element={<InfraestructuraPage />} />
          <Route path="/servicios/domotica" element={<DomoticaPage />} />
          <Route path="/servicios/diseno-estructural" element={<DisenoEstructuralPage />} />

          {/* Legacy routes */}
          <Route path="/quote" element={<CotizacionPage />} />
          <Route path="/Editpage" element={<Home forceEdit={true} />} />

          {/* Protected Routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/collaborator/*" element={
            <ProtectedRoute allowedRoles={['collaborator']}>
              <CollaboratorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/client/*" element={
            <ProtectedRoute allowedRoles={['client']}>
              <ClientDashboard />
            </ProtectedRoute>
          } />
          <Route path="/provider/*" element={
            <ProtectedRoute allowedRoles={['provider']}>
              <ProviderDashboard />
            </ProtectedRoute>
          } />
          <Route path="/user/*" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="/complete-profile" element={
            <ProtectedRoute>
              <CompleteProfile />
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
