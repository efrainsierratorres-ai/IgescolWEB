import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

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

    if (loading) return <div>Cargando leads...</div>;

    return (
        <div className="admin-leads">
            <h2>Gestión de Leads / Contactos</h2>
            <div style={{ marginTop: '20px', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'var(--gray-100)', textAlign: 'left' }}>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Nombre</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Email</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Teléfono</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Estado</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#888' }}>No hay leads registrados aún.</td>
                            </tr>
                        ) : (
                            leads.map((lead) => (
                                <tr key={lead.id}>
                                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{lead.name}</td>
                                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{lead.email}</td>
                                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{lead.phone}</td>
                                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                        <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', backgroundColor: lead.status === 'nuevo' ? '#e1f5fe' : '#f5f5f5' }}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{new Date(lead.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
