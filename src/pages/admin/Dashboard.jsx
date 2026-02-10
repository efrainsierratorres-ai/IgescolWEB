import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import AdminCMS from './CMS';
import AdminLeads from './Leads';

export default function AdminDashboard() {
    const { signOut } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className="admin-dashboard" style={{ display: 'flex' }}>
            <div className="sidebar" style={{ width: '250px', height: '100vh', backgroundColor: 'var(--secondary)', color: 'var(--white)', padding: '20px', position: 'fixed', display: 'flex', flexDirection: 'column' }}>
                <h2>IGESCOL Admin</h2>
                <ul style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '15px', flex: 1 }}>
                    <li onClick={() => setActiveTab('dashboard')} style={{ cursor: 'pointer', opacity: activeTab === 'dashboard' ? 1 : 0.7 }}>Dashboard</li>
                    <li onClick={() => setActiveTab('cms')} style={{ cursor: 'pointer', opacity: activeTab === 'cms' ? 1 : 0.7 }}>Contenido (CMS)</li>
                    <li onClick={() => setActiveTab('projects')} style={{ cursor: 'pointer', opacity: activeTab === 'projects' ? 1 : 0.7 }}>Proyectos</li>
                    <li onClick={() => setActiveTab('leads')} style={{ cursor: 'pointer', opacity: activeTab === 'leads' ? 1 : 0.7 }}>Leads / Contactos</li>
                </ul>
                <button onClick={signOut} className="btn-outline" style={{ borderColor: 'white', color: 'white' }}>Cerrar Sesión</button>
            </div>
            <div className="main-content" style={{ marginLeft: '250px', padding: '40px', width: '100%' }}>
                {activeTab === 'dashboard' && (
                    <>
                        <h1>Panel de Administración</h1>
                        <p>Bienvenido al centro de control de IGESCOL.</p>
                    </>
                )}
                {activeTab === 'cms' && <AdminCMS />}
                {activeTab === 'projects' && <div>Mantenimiento de Proyectos (Próximamente)</div>}
                {activeTab === 'leads' && <AdminLeads />}
            </div>
        </div>
    );
}
