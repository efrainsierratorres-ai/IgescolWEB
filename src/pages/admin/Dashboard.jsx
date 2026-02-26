import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AdminCMS from './CMS';
import AdminLeads from './Leads';
import AdminUsers from './Users';
import AdminProjects from './Projects';
import {
    LayoutDashboard,
    FileEdit,
    Users,
    Briefcase,
    LogOut,
    User,
    Bell,
    TrendingUp,
    MessageSquare,
    CheckCircle,
    Building2,
    Shield
} from 'lucide-react';
import '../../styles/Admin.css';
import { supabase } from '../../lib/supabase';

// Helper component for badges
const Badge = ({ count }) => (
    <span style={{
        position: 'absolute',
        top: '50%',
        right: 15,
        transform: 'translateY(-50%)',
        background: '#EF4444',
        color: 'white',
        fontSize: '0.7rem',
        padding: '2px 8px',
        borderRadius: '12px',
        fontWeight: 700,
        minWidth: '24px',
        textAlign: 'center',
        boxShadow: '0 2px 5px rgba(239, 68, 68, 0.4)'
    }}>
        {count}
    </span>
);

export default function AdminDashboard() {
    const { signOut, user, profile } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [stats, setStats] = useState({
        leadsCount: 0,
        projectsCount: 0,
        usersCount: 0,
        pendingCollaborators: 0,
        pendingClients: 0,
        pendingProviders: 0,
        pendingUsers: 0,
        pendingAdmins: 0,
        totalPending: 0
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
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        const { data } = await supabase
            .from('admin_notifications')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);
        if (data) setNotifications(data);
    };

    const fetchStats = async () => {
        const [leads, projects, profiles, pColl, pCli, pPro, pUse, pAdm] = await Promise.all([
            supabase.from('leads').select('*', { count: 'exact', head: true }),
            supabase.from('projects').select('*', { count: 'exact', head: true }),
            supabase.from('profiles').select('*', { count: 'exact', head: true }),
            supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'collaborator').eq('approval_status', 'pending'),
            supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'client').eq('approval_status', 'pending'),
            supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'provider').eq('approval_status', 'pending'),
            supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'user').eq('approval_status', 'pending'),
            supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'admin').eq('approval_status', 'pending'),
        ]);

        setStats({
            leadsCount: leads.count || 0,
            projectsCount: projects.count || 0,
            usersCount: profiles.count || 0,
            pendingCollaborators: pColl.count || 0,
            pendingClients: pCli.count || 0,
            pendingProviders: pPro.count || 0,
            pendingUsers: pUse.count || 0,
            pendingAdmins: pAdm.count || 0,
            totalPending: (pColl.count || 0) + (pCli.count || 0) + (pPro.count || 0) + (pUse.count || 0) + (pAdm.count || 0)
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
                        <span style={{ fontWeight: 800 }}>ADMIN</span>
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
                        className={`admin-nav-item ${activeTab === 'cms' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('cms'); setIsSidebarOpen(false); }}
                    >
                        <FileEdit size={20} /> Contenido Web
                    </div>
                    <div
                        className={`admin-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('projects'); setIsSidebarOpen(false); }}
                    >
                        <Briefcase size={20} /> Proyectos
                    </div>
                    <div
                        className={`admin-nav-item ${activeTab === 'leads' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('leads'); setIsSidebarOpen(false); }}
                    >
                        <MessageSquare size={20} /> Leads / Contactos
                    </div>

                    <div style={{ padding: '20px 20px 10px', fontSize: '0.7rem', fontWeight: 800, color: '#4089A7', textTransform: 'uppercase', letterSpacing: 1 }}>Gestión de Personas</div>

                    <div
                        className={`admin-nav-item ${activeTab === 'collaborators' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('collaborators'); setIsSidebarOpen(false); }}
                        style={{ position: 'relative' }}
                    >
                        <Briefcase size={20} /> Colaboradores
                        {stats.pendingCollaborators > 0 && <Badge count={stats.pendingCollaborators} />}
                    </div>

                    <div
                        className={`admin-nav-item ${activeTab === 'clients' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('clients'); setIsSidebarOpen(false); }}
                        style={{ position: 'relative' }}
                    >
                        <Building2 size={20} /> Clientes
                        {stats.pendingClients > 0 && <Badge count={stats.pendingClients} />}
                    </div>

                    <div
                        className={`admin-nav-item ${activeTab === 'providers' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('providers'); setIsSidebarOpen(false); }}
                        style={{ position: 'relative' }}
                    >
                        <TrendingUp size={20} /> Proveedores
                        {stats.pendingProviders > 0 && <Badge count={stats.pendingProviders} />}
                    </div>

                    <div
                        className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('users'); setIsSidebarOpen(false); }}
                        style={{ position: 'relative' }}
                    >
                        <Users size={20} /> Usuarios
                        {stats.pendingUsers > 0 && <Badge count={stats.pendingUsers} />}
                    </div>

                    <div
                        className={`admin-nav-item ${activeTab === 'administrators' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('administrators'); setIsSidebarOpen(false); }}
                        style={{ position: 'relative' }}
                    >
                        <Shield size={20} /> Administradores
                        {stats.pendingAdmins > 0 && <Badge count={stats.pendingAdmins} />}
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
                            {activeTab === 'dashboard' && 'Panel de Control'}
                            {activeTab === 'cms' && 'Editor de Contenido'}
                            {activeTab === 'projects' && 'Gestión de Proyectos'}
                            {activeTab === 'leads' && 'Leads y Contactos'}
                            {activeTab === 'collaborators' && 'Listado de Colaboradores'}
                            {activeTab === 'clients' && 'Listado de Clientes'}
                            {activeTab === 'providers' && 'Listado de Proveedores'}
                            {activeTab === 'users' && 'Gestión de Usuarios'}
                            {activeTab === 'administrators' && 'Gestión de Administradores'}
                        </h1>
                        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                            Hola {profile?.full_name?.split(' ')[0] || 'Admin'}, bienvenido de nuevo.
                        </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <div
                            style={{ position: 'relative', background: 'white', padding: 8, borderRadius: '50%', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', cursor: 'pointer' }}
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <Bell size={20} color={stats.totalPending > 0 ? '#0089A7' : '#64748b'} />
                            {stats.totalPending > 0 && (
                                <span style={{ position: 'absolute', top: -5, right: -5, background: '#EF4444', color: 'white', fontSize: '0.65rem', padding: '2px 5px', borderRadius: '50%', fontWeight: 800 }}>
                                    {stats.totalPending}
                                </span>
                            )}

                            {showNotifications && (
                                <div style={{
                                    position: 'absolute',
                                    top: 45,
                                    right: 0,
                                    width: 300,
                                    background: 'white',
                                    borderRadius: 16,
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                                    zIndex: 1000,
                                    padding: '15px'
                                }}>
                                    <h4 style={{ margin: '0 0 15px', color: '#0F172A', borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>Novedades Recientes</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        {notifications.map(n => (
                                            <div key={n.id} style={{ fontSize: '0.8rem', borderBottom: '1px solid #f8fafc', paddingBottom: 8 }}>
                                                <div style={{ fontWeight: 700, color: '#0089A7' }}>{n.title}</div>
                                                <div style={{ color: '#64748b', marginTop: 2 }}>{n.message}</div>
                                            </div>
                                        ))}
                                        {notifications.length === 0 && <div style={{ color: '#94a3b8', fontSize: '0.8rem', textAlign: 'center' }}>No hay novedades pendientes</div>}
                                    </div>
                                    {stats.totalPending > 0 && (
                                        <button
                                            onClick={() => setActiveTab('users')}
                                            style={{ width: '100%', marginTop: 15, background: '#F1F5F9', border: 'none', padding: '8px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 700, color: '#0089A7', cursor: 'pointer' }}
                                        >
                                            VER TODAS LAS PENDIENTES
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                        <div style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: 12, background: 'white', padding: '6px 15px', borderRadius: 30, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                            <div style={{ background: '#0089A7', color: 'white', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>
                                {profile?.full_name?.charAt(0) || 'A'}
                            </div>
                            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0A2540' }}>{profile?.full_name || 'Administrador'}</span>
                        </div>
                        {isMobile && (
                            <div style={{ background: '#0089A7', color: 'white', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <User size={18} />
                            </div>
                        )}
                    </div>
                </header>

                {/* Dashboard Tab Content */}
                {
                    activeTab === 'dashboard' && (
                        <div className="dashboard-view">
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-icon" style={{ background: '#E5F6F9', color: '#0089A7' }}><MessageSquare size={24} /></div>
                                    <div className="stat-info">
                                        <h3>Leads Totales</h3>
                                        <div className="value">{stats.leadsCount}</div>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon" style={{ background: '#fef9c3', color: '#854d0e' }}><Briefcase size={24} /></div>
                                    <div className="stat-info">
                                        <h3>Proyectos</h3>
                                        <div className="value">{stats.projectsCount}</div>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon" style={{ background: '#dcfce7', color: '#166534' }}><Users size={24} /></div>
                                    <div className="stat-info">
                                        <h3>Usuarios</h3>
                                        <div className="value">{stats.usersCount}</div>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon" style={{ background: '#ede9fe', color: '#5b21b6' }}><TrendingUp size={24} /></div>
                                    <div className="stat-info">
                                        <h3>Nuevas Visitas</h3>
                                        <div className="value">124</div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 30 }}>
                                <div className="admin-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 }}>
                                        <h2 style={{ fontSize: '1.2rem', color: '#0A2540' }}>Acciones Rápidas</h2>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
                                        <button
                                            onClick={() => navigate('/Editpage')}
                                            style={{ padding: '20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, textAlign: 'left', cursor: 'pointer' }}
                                        >
                                            <div style={{ color: '#0089A7', marginBottom: 10 }}><FileEdit size={24} /></div>
                                            <div style={{ fontWeight: 700, color: '#0A2540' }}>Editor Experto</div>
                                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Edita la landing page visualmente</div>
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('leads')}
                                            style={{ padding: '20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, textAlign: 'left', cursor: 'pointer' }}
                                        >
                                            <div style={{ color: '#166534', marginBottom: 10 }}><Users size={24} /></div>
                                            <div style={{ fontWeight: 700, color: '#0A2540' }}>Ver Leads</div>
                                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Gestiona tus nuevos contactos</div>
                                        </button>
                                    </div>
                                </div>

                                <div className="admin-card">
                                    <h2 style={{ fontSize: '1.2rem', color: '#0A2540', marginBottom: 20 }}>Estado del Sistema</h2>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <CheckCircle size={18} color="#166534" />
                                            <span style={{ fontSize: '0.9rem', color: '#475569' }}>Supabase Conectado</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <CheckCircle size={18} color="#166534" />
                                            <span style={{ fontSize: '0.9rem', color: '#475569' }}>CMS Activo</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <CheckCircle size={18} color="#166534" />
                                            <span style={{ fontSize: '0.9rem', color: '#475569' }}>Bucket de Imágenes OK</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Other Tabs Content */}
                {activeTab === 'cms' && <AdminCMS />}
                {activeTab === 'leads' && <AdminLeads />}
                {activeTab === 'projects' && <AdminProjects />}
                {activeTab === 'collaborators' && <AdminUsers initialRole="collaborator" />}
                {activeTab === 'clients' && <AdminUsers initialRole="client" />}
                {activeTab === 'providers' && <AdminUsers initialRole="provider" />}
                {activeTab === 'users' && <AdminUsers initialRole="user" />}
                {activeTab === 'administrators' && <AdminUsers initialRole="admin" />}
            </main >
        </div >
    );
}

