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
    Building2,
    Shield,
    TrendingUp,
    MessageSquare
} from 'lucide-react';
import '../../styles/Admin.css';
import { supabase } from '../../lib/supabase';

export default function CollaboratorDashboard() {
    const { signOut, user, profile } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState({
        projectsCount: 0,
        clientsCount: 0,
        pendingApprovals: 0
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
        const [projects, clients, pending] = await Promise.all([
            supabase.from('projects').select('*', { count: 'exact', head: true }),
            supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'client'),
            supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('approval_status', 'pending')
        ]);

        setStats({
            projectsCount: projects.count || 0,
            clientsCount: clients.count || 0,
            pendingApprovals: pending.count || 0
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
                        <span style={{ fontWeight: 800 }}>COLABORADOR</span>
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
                        <Briefcase size={20} /> Proyectos
                    </div>

                    <div style={{ padding: '20px 20px 10px', fontSize: '0.7rem', fontWeight: 800, color: '#4089A7', textTransform: 'uppercase', letterSpacing: 1 }}>Gestión de Listados</div>

                    <div
                        className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('users'); setIsSidebarOpen(false); }}
                    >
                        <Users size={20} /> Todos los Usuarios
                        {stats.pendingApprovals > 0 && (
                            <span style={{ marginLeft: 'auto', background: '#EF4444', color: 'white', fontSize: '0.65rem', padding: '1px 6px', borderRadius: 10 }}>{stats.pendingApprovals}</span>
                        )}
                    </div>
                    <div
                        className={`admin-nav-item ${activeTab === 'clients' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('clients'); setIsSidebarOpen(false); }}
                    >
                        <Building2 size={20} /> Clientes
                    </div>
                    <div
                        className={`admin-nav-item ${activeTab === 'providers' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('providers'); setIsSidebarOpen(false); }}
                    >
                        <TrendingUp size={20} /> Proveedores
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
                            {activeTab === 'dashboard' && 'Panel Colaborador'}
                            {activeTab === 'projects' && 'Gestión de Proyectos'}
                            {activeTab === 'users' && 'Listado de Usuarios'}
                            {activeTab === 'clients' && 'Listado de Clientes'}
                            {activeTab === 'providers' && 'Listado de Proveedores'}
                        </h1>
                        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                            Hola {profile?.full_name?.split(' ')[0] || 'Colaborador'}, tienes {stats.pendingApprovals} solicitudes pendientes.
                        </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <div style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: 12, background: 'white', padding: '6px 15px', borderRadius: 30, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                            <div style={{ background: '#0089A7', color: 'white', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>
                                {profile?.full_name?.charAt(0) || 'Co'}
                            </div>
                            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0A2540' }}>{profile?.full_name || 'Colaborador'}</span>
                        </div>
                    </div>
                </header>

                {activeTab === 'dashboard' && (
                    <div className="dashboard-view">
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon" style={{ background: '#fef9c3', color: '#854d0e' }}><Briefcase size={24} /></div>
                                <div className="stat-info">
                                    <h3>Proyectos</h3>
                                    <div className="value">{stats.projectsCount}</div>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon" style={{ background: '#dcfce7', color: '#166534' }}><Building2 size={24} /></div>
                                <div className="stat-info">
                                    <h3>Clientes</h3>
                                    <div className="value">{stats.clientsCount}</div>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon" style={{ background: '#fee2e2', color: '#991b1b' }}><MessageSquare size={24} /></div>
                                <div className="stat-info">
                                    <h3>Pendientes</h3>
                                    <div className="value">{stats.pendingApprovals}</div>
                                </div>
                            </div>
                        </div>

                        <div className="admin-card">
                            <h2 style={{ fontSize: '1.2rem', color: '#0A2540', marginBottom: 20 }}>Acciones Rápidas</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 15 }}>
                                <button onClick={() => setActiveTab('projects')} style={{ padding: '20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, textAlign: 'left', cursor: 'pointer' }}>
                                    <div style={{ color: '#0089A7', marginBottom: 10 }}><Briefcase size={24} /></div>
                                    <div style={{ fontWeight: 700, color: '#0A2540' }}>Gestionar Proyectos</div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Cree o edite proyectos técnicos</div>
                                </button>
                                <button onClick={() => setActiveTab('users')} style={{ padding: '20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, textAlign: 'left', cursor: 'pointer' }}>
                                    <div style={{ color: '#166534', marginBottom: 10 }}><Users size={24} /></div>
                                    <div style={{ fontWeight: 700, color: '#0A2540' }}>Aprobar Usuarios</div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Revise nuevas solicitudes de registro</div>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'projects' && <AdminProjects readOnly={false} />}
                {activeTab === 'users' && <AdminUsers initialRole="all" readOnly={false} />}
                {activeTab === 'clients' && <AdminUsers initialRole="client" readOnly={false} />}
                {activeTab === 'providers' && <AdminUsers initialRole="provider" readOnly={false} />}
            </main>
        </div>
    );
}
