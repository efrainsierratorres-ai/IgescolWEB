import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AdminProjects from '../admin/Projects';
import AdminUsers from '../admin/Users';
import {
    LayoutDashboard,
    Briefcase,
    Users,
    LogOut,
    Shield,
    Clock
} from 'lucide-react';
import '../../styles/Admin.css';
import { supabase } from '../../lib/supabase';

export default function ProviderDashboard() {
    const { signOut, user, profile } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState({
        projectsCount: 0,
        contactCount: 0
    });
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        const [projects, contacts] = await Promise.all([
            // Providers can see projects marked as public or basic info projects
            supabase.from('projects').select('*', { count: 'exact', head: true }),
            supabase.from('profiles').select('*', { count: 'exact', head: true }).in('role', ['admin', 'collaborator'])
        ]);

        setStats({
            projectsCount: projects.count || 0,
            contactCount: contacts.count || 0
        });
    };

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <div className="admin-layout" style={{ flexDirection: isMobile ? 'column' : 'row' }}>
            {/* Mobile Header */}
            {isMobile && (
                <div style={{ background: '#0A2540', color: 'white', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 1100 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <img src="/logo-igescol.png" alt="Logo" style={{ height: 30, filter: 'brightness(0) invert(1)' }} />
                        <span style={{ fontWeight: 800 }}>PROVEEDOR</span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                        <LayoutDashboard size={24} />
                    </button>
                </div>
            )}

            {/* Sidebar */}
            <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="admin-sidebar-logo" style={{ display: 'flex', justifyContent: 'center', padding: '30px 20px' }}>
                    <img src="/logo-igescol.png" alt="IGESCOL" style={{ height: 60, width: 'auto' }} />
                </div>

                <nav className="admin-nav-list">
                    <div
                        className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}
                    >
                        <LayoutDashboard size={20} /> Dashboard
                    </div>
                    <div
                        className={`admin-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('projects'); setIsSidebarOpen(false); }}
                    >
                        <Briefcase size={20} /> Proyectos (Básico)
                    </div>
                    <div
                        className={`admin-nav-item ${activeTab === 'contacts' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('contacts'); setIsSidebarOpen(false); }}
                    >
                        <Shield size={20} /> Contactos Internos
                    </div>
                </nav>

                <div className="admin-sidebar-footer">
                    <button
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            background: 'transparent',
                            color: '#f87171',
                            border: 'none',
                            padding: '10px 0',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                        }}
                    >
                        <LogOut size={18} /> CERRAR SESIÓN
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            {activeTab === 'dashboard' && 'Panel de Proveedores'}
                            {activeTab === 'projects' && 'Vista de Proyectos'}
                            {activeTab === 'contacts' && 'Directorio de Expertos'}
                        </h1>
                        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                            Hola {profile?.full_name?.split(' ')[0] || 'Proveedor'}, consulte la información de proyectos.
                        </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <div style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: 12, background: 'white', padding: '6px 15px', borderRadius: 30, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                            <div style={{ background: '#0089A7', color: 'white', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>
                                {profile?.full_name?.charAt(0) || 'P'}
                            </div>
                            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0A2540' }}>{profile?.full_name || 'Proveedor'}</span>
                        </div>
                    </div>
                </header>

                {profile?.approval_status === 'pending' ? (
                    <div className="admin-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <Clock size={48} color="#f59e0b" style={{ margin: '0 auto 20px' }} />
                        <h2 style={{ color: '#0A2540' }}>Contrato en Proceso de Verificación</h2>
                        <p style={{ color: '#64748b', maxWidth: 400, margin: '10px auto' }}>Su acceso como proveedor oficial está pendiente de habilitación técnica.</p>
                    </div>
                ) : (
                    <>
                        {activeTab === 'dashboard' && (
                            <div className="dashboard-view">
                                <div className="stats-grid">
                                    <div className="stat-card">
                                        <div className="stat-icon" style={{ background: '#eef2ff', color: '#4338ca' }}><Briefcase size={24} /></div>
                                        <div className="stat-info">
                                            <h3>Proyectos Visibles</h3>
                                            <div className="value">{stats.projectsCount}</div>
                                        </div>
                                    </div>
                                    <div className="stat-card">
                                        <div className="stat-icon" style={{ background: '#ecfdf5', color: '#047857' }}><Shield size={24} /></div>
                                        <div className="stat-info">
                                            <h3>Expertos IGESCOL</h3>
                                            <div className="value">{stats.contactCount}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="admin-card">
                                    <h2 style={{ fontSize: '1.2rem', color: '#0A2540', marginBottom: 20 }}>Información para Proveedores</h2>
                                    <p style={{ color: '#64748b', marginBottom: 20 }}>Acceda a la información técnica básica de los proyectos vigentes para coordinar suministros y servicios.</p>
                                    <button onClick={() => setActiveTab('projects')} style={{ padding: '12px 20px', background: '#0089A7', color: 'white', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>VISUALIZAR PROYECTOS</button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'projects' && <AdminProjects readOnly={true} />}
                        {activeTab === 'contacts' && <AdminUsers initialRole="collaborator" readOnly={true} />}
                    </>
                )}
            </main>
        </div>
    );
}
