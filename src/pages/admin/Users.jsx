import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Check, X, User, Shield, Briefcase, Building2, UserCircle2, Mail, Phone, Calendar } from 'lucide-react';

export default function AdminUsers({ initialRole = 'all', readOnly = false }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(initialRole);

    useEffect(() => {
        setFilter(initialRole);
    }, [initialRole]);

    useEffect(() => {
        fetchUsers();
    }, [filter]);

    async function fetchUsers() {
        setLoading(true);
        let query = supabase.from('profiles').select('*');

        if (filter === 'pending') {
            query = query.eq('approval_status', 'pending');
        } else if (filter === 'directory_providers_clients') {
            // Special filter for normal users
            query = query.in('role', ['provider', 'client']);
        } else if (filter !== 'all') {
            query = query.eq('role', filter);
        }

        const { data, error } = await query.order('created_at', { ascending: false });
        if (!error) setUsers(data);
        setLoading(false);
    }

    const handleApproval = async (id, status) => {
        if (readOnly) return;
        const { error } = await supabase
            .from('profiles')
            .update({ approval_status: status })
            .eq('id', id);

        if (!error) {
            alert(status === 'approved' ? 'Usuario aprobado' : 'Usuario rechazado');
            fetchUsers();
        }
    }

    const getRoleIcon = (role) => {
        switch (role) {
            case 'admin': return <Shield size={16} />;
            case 'collaborator': return <Briefcase size={16} />;
            case 'client': return <Building2 size={16} />;
            case 'provider': return <Check size={16} />;
            default: return <UserCircle2 size={16} />;
        }
    };

    return (
        <div style={{ padding: 'w-full' }}>
            {initialRole === 'all' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        <FilterTab active={filter === 'all'} label="Todos" onClick={() => setFilter('all')} />
                        <FilterTab active={filter === 'pending'} label="Pendientes" onClick={() => setFilter('pending')} />
                        <FilterTab active={filter === 'collaborator'} label="Colaboradores" onClick={() => setFilter('collaborator')} />
                        <FilterTab active={filter === 'client'} label="Clientes" onClick={() => setFilter('client')} />
                        <FilterTab active={filter === 'provider'} label="Proveedores" onClick={() => setFilter('provider')} />
                    </div>
                </div>
            )}

            <div style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                                <th style={{ padding: '20px', fontSize: '0.75rem', color: '#64748b', fontWeight: 800 }}>NOMBRE / ID</th>
                                <th style={{ padding: '20px', fontSize: '0.75rem', color: '#64748b', fontWeight: 800 }}>PROFESIÓN / ROL</th>
                                <th style={{ padding: '20px', fontSize: '0.75rem', color: '#64748b', fontWeight: 800 }}>CONTACTO</th>
                                <th style={{ padding: '20px', fontSize: '0.75rem', color: '#64748b', fontWeight: 800 }}>REGISTRO</th>
                                <th style={{ padding: '20px', fontSize: '0.75rem', color: '#64748b', fontWeight: 800 }}>ESTADO / ACCIÓN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9', whiteSpace: 'nowrap' }}>
                                    <td style={{ padding: '20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{ width: 40, height: 40, background: '#F1F5F9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.9rem' }}>{u.full_name || 'Sin nombre'}</div>
                                                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>ID: {u.id.slice(0, 8)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '20px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                            <div style={{ fontWeight: 600, color: '#334155', fontSize: '0.85rem' }}>
                                                {u.professional_data?.specialty || (u.role === 'user' ? 'Interesado' : 'No especificada')}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                {getRoleIcon(u.role)} {u.role}
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '20px' }}>
                                        <div style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 4 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={14} color="#0089A7" /> {u.email}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Phone size={14} color="#0089A7" /> {u.phone || 'N/A'}</div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '20px' }}>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={14} /> {new Date(u.created_at).toLocaleDateString()}</div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                                            <span style={{
                                                padding: '4px 10px',
                                                borderRadius: 8,
                                                fontSize: '0.7rem',
                                                fontWeight: 800,
                                                background: u.approval_status === 'approved' ? '#dcfce7' : (u.approval_status === 'pending' ? '#fef9c3' : '#fee2e2'),
                                                color: u.approval_status === 'approved' ? '#166534' : (u.approval_status === 'pending' ? '#854d0e' : '#991b1b')
                                            }}>
                                                {u.approval_status?.toUpperCase()}
                                            </span>

                                            <div style={{ display: 'flex', gap: 8 }}>
                                                {u.approval_status === 'pending' && !readOnly && (
                                                    <>
                                                        <button onClick={() => handleApproval(u.id, 'approved')} title="Aprobar" style={{ background: '#10B981', color: 'white', border: 'none', width: 32, height: 32, borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <Check size={18} />
                                                        </button>
                                                        <button onClick={() => handleApproval(u.id, 'rejected')} title="Rechazar" style={{ background: '#EF4444', color: 'white', border: 'none', width: 32, height: 32, borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <X size={18} />
                                                        </button>
                                                    </>
                                                )}
                                                <button
                                                    onClick={() => alert('Próximamente: Ficha detallada de ' + u.full_name)}
                                                    style={{
                                                        background: 'white',
                                                        color: '#0089A7',
                                                        border: '1px solid #0089A7',
                                                        padding: '6px 12px',
                                                        borderRadius: 8,
                                                        fontSize: '0.75rem',
                                                        fontWeight: 700,
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    onMouseOver={(e) => { e.target.style.background = '#0089A7'; e.target.style.color = 'white'; }}
                                                    onMouseOut={(e) => { e.target.style.background = 'white'; e.target.style.color = '#0089A7'; }}
                                                >
                                                    VER MÁS
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function FilterTab({ active, label, onClick, count }) {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '10px 20px',
                borderRadius: '12px',
                border: 'none',
                background: active ? '#0F172A' : 'transparent',
                color: active ? 'white' : '#64748b',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.2s'
            }}
        >
            {label} {count !== undefined && <span style={{ background: active ? '#4089A7' : '#e2e8f0', color: active ? 'white' : '#64748b', padding: '1px 6px', borderRadius: 6, fontSize: '0.7rem' }}>{count}</span>}
        </button>
    );
}
