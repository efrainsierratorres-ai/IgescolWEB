import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Briefcase, Calendar, Users, Building2, Save, Trash2, X } from 'lucide-react';

export default function AdminProjects({ readOnly = false, clientId = null }) {
    const [projects, setProjects] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newProject, setNewProject] = useState({
        name: '',
        description: '',
        client_id: clientId || '',
        status: 'activo',
        start_date: '',
        end_date: '',
        business_line: ''
    });

    useEffect(() => {
        fetchData();
    }, [clientId]);

    async function fetchData() {
        setLoading(true);
        let query = supabase.from('projects').select('*, profiles(full_name)');

        if (clientId) {
            query = query.eq('client_id', clientId);
        }

        const [projRes, clientRes] = await Promise.all([
            query.order('created_at', { ascending: false }),
            supabase.from('profiles').select('*').eq('role', 'client')
        ]);

        if (!projRes.error) setProjects(projRes.data);
        if (!clientRes.error) setClients(clientRes.data);
        setLoading(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const projectToInsert = { ...newProject };
        if (clientId) projectToInsert.client_id = clientId;

        const { error } = await supabase.from('projects').insert([projectToInsert]);
        if (error) alert(error.message);
        else {
            alert('Proyecto creado con éxito');
            setShowForm(false);
            fetchData();
        }
    };

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>
                    {clientId ? 'Mis Proyectos' : 'Gestión de Proyectos'}
                </h2>
                {!readOnly && (
                    <button
                        onClick={() => setShowForm(true)}
                        style={{ background: '#0F172A', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
                    >
                        <Plus size={20} /> NUEVO PROYECTO
                    </button>
                )}
            </div>

            {showForm && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                    <div style={{ background: 'white', padding: 40, borderRadius: 24, maxWidth: 600, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Crear Nuevo Proyecto</h3>
                            <button onClick={() => setShowForm(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><X /></button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <FormInput label="NOMBRE DEL PROYECTO" value={newProject.name} onChange={v => setNewProject({ ...newProject, name: v })} required />

                            <div style={{ display: 'flex', gap: 20 }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', display: 'block', marginBottom: 8 }}>CLIENTE</label>
                                    <select
                                        required
                                        value={newProject.client_id}
                                        onChange={e => setNewProject({ ...newProject, client_id: e.target.value })}
                                        style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
                                    >
                                        <option value="">Seleccionar cliente...</option>
                                        {clients.map(c => <option key={c.id} value={c.id}>{c.full_name}</option>)}
                                    </select>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <FormInput label="ESTADO" type="select" value={newProject.status} onChange={v => setNewProject({ ...newProject, status: v })} options={['activo', 'finalizado', 'pausado']} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: 20 }}>
                                <FormInput label="FECHA INICIO" type="date" value={newProject.start_date} onChange={v => setNewProject({ ...newProject, start_date: v })} required />
                                <FormInput label="FECHA ESTIMADA FIN" type="date" value={newProject.end_date} onChange={v => setNewProject({ ...newProject, end_date: v })} />
                            </div>

                            <div>
                                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', display: 'block', marginBottom: 8 }}>DESCRIPCIÓN DEL PROYECTO</label>
                                <textarea
                                    value={newProject.description}
                                    onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', minHeight: '100px' }}
                                />
                            </div>

                            <button type="submit" style={{ marginTop: 10, background: '#0089A7', color: 'white', padding: '15px', borderRadius: '12px', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
                                CREAR PROYECTO
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                            <th style={{ padding: '20px', fontSize: '0.8rem', color: '#94a3b8', fontWeight: 800 }}>PROYECTO</th>
                            <th style={{ padding: '20px', fontSize: '0.8rem', color: '#94a3b8', fontWeight: 800 }}>CLIENTE</th>
                            <th style={{ padding: '20px', fontSize: '0.8rem', color: '#94a3b8', fontWeight: 800 }}>ESTADO</th>
                            <th style={{ padding: '20px', fontSize: '0.8rem', color: '#94a3b8', fontWeight: 800 }}>DURACIÓN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(p => (
                            <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '20px' }}>
                                    <div style={{ fontWeight: 700, color: '#0F172A' }}>{p.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.description?.slice(0, 50)}...</div>
                                </td>
                                <td style={{ padding: '20px', color: '#475569', fontWeight: 600 }}>
                                    {p.profiles?.full_name || 'Sin cliente asignado'}
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <span style={{ padding: '4px 10px', borderRadius: 20, background: '#F0F9FF', color: '#0089A7', fontSize: '0.8rem', fontWeight: 800 }}>
                                        {p.status?.toUpperCase()}
                                    </span>
                                </td>
                                <td style={{ padding: '20px', color: '#64748b', fontSize: '0.85rem' }}>
                                    {p.start_date} - {p.end_date || 'En curso'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function FormInput({ label, value, onChange, type = 'text', required = false, options = [] }) {
    return (
        <div style={{ flex: 1 }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', display: 'block', marginBottom: 8 }}>{label}</label>
            {type === 'select' ? (
                <select value={value} onChange={e => onChange(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    {options.map(o => <option key={o} value={o}>{o.toUpperCase()}</option>)}
                </select>
            ) : (
                <input
                    type={type}
                    required={required}
                    value={value || ''}
                    onChange={e => onChange(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
                />
            )}
        </div>
    );
}
