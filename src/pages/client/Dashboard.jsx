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
    PlusCircle,
    Bell,
    Clock
} from 'lucide-react';
import '../../styles/Admin.css';
import { supabase } from '../../lib/supabase';

export default function ClientDashboard() {
    const { signOut, user, profile } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState({
        myProjects: 0,
        teamCount: 0
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
        if (!profile?.id) return;
        const [projects, team] = await Promise.all([
            supabase.from('projects').select('*', { count: 'exact', head: true }).eq('client_id', profile.id),
            supabase.from('profiles').select('*', { count: 'exact', head: true }).in('role', ['admin', 'collaborator', 'provider'])
        ]);

        setStats({
            myProjects: projects.count || 0,
            teamCount: team.count || 0
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
                        <span style={{ fontWeight: 800 }}>CLIENTE</span>
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
                        <LayoutDashboard size={20} /> Mi Panel
                    </div>
                    <div
                        className={`admin-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('projects'); setIsSidebarOpen(false); }}
                    >
                        <Briefcase size={20} /> Mis Proyectos
                    </div>
                    <div
                        className={`admin-nav-item ${activeTab === 'team' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('team'); setIsSidebarOpen(false); }}
                    >
                        <Users size={20} /> Directorio Equipo
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
                            {activeTab === 'dashboard' && 'Portal de Clientes'}
                            {activeTab === 'projects' && 'Seguimiento de Proyectos'}
                            {activeTab === 'team' && 'Contactos del Proyecto'}
                        </h1>
                        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                            Hola {profile?.full_name?.split(' ')[0] || 'Cliente'}, bienvenido a su panel de gestión.
                        </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <div style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: 12, background: 'white', padding: '6px 15px', borderRadius: 30, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                            <div style={{ background: '#0089A7', color: 'white', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>
                                {profile?.full_name?.charAt(0) || 'C'}
                            </div>
                            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0A2540' }}>{profile?.full_name || 'Cliente'}</span>
                        </div>
                    </div>
                </header>

                {profile?.approval_status === 'pending' ? (
                    <div className="admin-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <Clock size={48} color="#f59e0b" style={{ margin: '0 auto 20px' }} />
                        <h2 style={{ color: '#0A2540' }}>Cuenta Pendiente de Aprobación</h2>
                        <p style={{ color: '#64748b', maxWidth: 400, margin: '10px auto' }}>Su cuenta está siendo revisada por un administrador. Una vez aprobada, podrá gestionar sus proyectos aquí.</p>
                    </div>
                ) : (
                    <>
                        {activeTab === 'dashboard' && (
                            <div className="dashboard-view">
                                <div className="stats-grid">
                                    <div className="stat-card">
                                        <div className="stat-icon" style={{ background: '#e0f2fe', color: '#0369a1' }}><Briefcase size={24} /></div>
                                        <div className="stat-info">
                                            <h3>Mis Proyectos</h3>
                                            <div className="value">{stats.myProjects}</div>
                                        </div>
                                    </div>
                                    <div className="stat-card">
                                        <div className="stat-icon" style={{ background: '#f5f3ff', color: '#6d28d9' }}><Users size={24} /></div>
                                        <div className="stat-info">
                                            <h3>Expertos Asignados</h3>
                                            <div className="value">{stats.teamCount}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="admin-card">
                                    <h2 style={{ fontSize: '1.2rem', color: '#0A2540', marginBottom: 20 }}>Acciones Rápidas</h2>
                                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 15 }}>
                                        <button onClick={() => setActiveTab('projects')} style={{ padding: '20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, textAlign: 'left', cursor: 'pointer' }}>
                                            <div style={{ color: '#0089A7', marginBottom: 10 }}><PlusCircle size={24} /></div>
                                            <div style={{ fontWeight: 700, color: '#0A2540' }}>Proponer Proyecto</div>
                                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Inicie una nueva solicitud técnica</div>
                                        </button>
                                        <button onClick={() => setActiveTab('team')} style={{ padding: '20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, textAlign: 'left', cursor: 'pointer' }}>
                                            <div style={{ color: '#166534', marginBottom: 10 }}><Users size={24} /></div>
                                            <div style={{ fontWeight: 700, color: '#0A2540' }}>Contactar Equipo</div>
                                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Hable con sus especialistas</div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'projects' && <AdminProjects clientId={profile?.id} readOnly={false} />}
                        {activeTab === 'team' && <AdminUsers initialRole="all" readOnly={true} />}
                    </>
                )}
            </main>
        </div>
    );
}
