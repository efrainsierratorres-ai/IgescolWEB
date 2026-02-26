import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Mail, Phone, Calendar, User } from 'lucide-react';

export default function AdminLeads() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeads();
    }, []);

    async function fetchLeads() {
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) setLeads(data);
        setLoading(false);
    }

    if (loading) return (
        <div className="admin-card" style={{ textAlign: 'center', padding: '50px' }}>
            <div className="loading-spinner"></div>
            <p>Cargando leads...</p>
        </div>
    );

    return (
        <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.2rem', color: '#0A2540' }}>Listado de Prospectos</h2>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Total: {leads.length} registros</div>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Prospecto</th>
                            <th>Contacto</th>
                            <th>Estado</th>
                            <th>Fecha de Registro</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                                    No hay leads registrados aún.
                                </td>
                            </tr>
                        ) : (
                            leads.map((lead) => (
                                <tr key={lead.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{ width: 35, height: 35, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                                                <User size={18} />
                                            </div>
                                            <span style={{ fontWeight: 600 }}>{lead.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', color: '#64748b' }}>
                                                <Mail size={14} /> {lead.email}
                                            </div>
                                            {lead.phone && (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', color: '#64748b' }}>
                                                    <Phone size={14} /> {lead.phone}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${lead.status === 'nuevo' ? 'status-new' : 'status-pending'}`}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem', color: '#64748b' }}>
                                            <Calendar size={14} /> {new Date(lead.created_at).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td>
                                        <button style={{ background: 'transparent', color: '#0089A7', fontWeight: 600, fontSize: '0.85rem' }}>Ver detalles</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

