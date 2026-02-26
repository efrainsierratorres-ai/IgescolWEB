import React, { useState } from 'react';
import { useCMS } from '../hooks/useCMS';
import {
    Save, X, ChevronRight, ChevronDown,
    Palette, Layout, Image as ImageIcon, Briefcase,
    Activity, Users, CheckSquare, Folder, Cpu, MapPin, Square
} from 'lucide-react';

const sectionLabels = {
    header: { label: "Encabezado", icon: Layout },
    hero: { label: "Hero Banner", icon: ImageIcon },
    services: { label: "Servicios", icon: Briefcase },
    process: { label: "Proceso", icon: Activity },
    about: { label: "Nosotros", icon: Users },
    whyus: { label: "Elegirnos", icon: CheckSquare },
    projects: { label: "Proyectos", icon: Folder },
    tech: { label: "Tecnología", icon: Cpu },
    contact: { label: "Contacto", icon: MapPin },
    footer: { label: "Pie de Página", icon: Square }
};

export default function EditorSidebar({ onClose }) {
    const { content, updateContent, refresh } = useCMS();
    const [expandedSection, setExpandedSection] = useState(null);
    const [saving, setSaving] = useState(false);
    const [localContent, setLocalContent] = useState({});

    // Sync localContent with CMS content when a section is expanded
    const handleToggle = (sectionName) => {
        if (expandedSection === sectionName) {
            setExpandedSection(null);
        } else {
            setExpandedSection(sectionName);
            setLocalContent({ ...content[sectionName] });
        }
    };

    const handleFieldChange = (field, value) => {
        setLocalContent(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async (sectionName) => {
        setSaving(true);
        const result = await updateContent(sectionName, localContent);
        if (result.success) {
            setExpandedSection(null);
        } else {
            alert('Error al guardar: ' + result.error.message);
        }
        setSaving(false);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '350px',
            height: '100vh',
            background: 'white',
            boxShadow: '-5px 0 25px rgba(0,0,0,0.15)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Inter, sans-serif',
            animation: 'slideIn 0.3s ease-out'
        }}>
            <div style={{
                padding: '20px',
                borderBottom: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#0A2540',
                color: 'white'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Palette size={20} color="#00B4D8" />
                    <h2 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>Editor Visual</h2>
                </div>
                <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                    <X size={20} />
                </button>
            </div>

            <div style={{ flexGrow: 1, overflowY: 'auto', padding: '10px' }}>
                <p style={{ fontSize: '0.8rem', color: '#64748b', padding: '10px' }}>
                    Selecciona una sección para editar su contenido directamente.
                </p>

                {Object.entries(sectionLabels).map(([key, info]) => {
                    const Icon = info.icon;
                    const isExpanded = expandedSection === key;

                    return (
                        <div key={key} style={{ marginBottom: '5px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
                            <div
                                onClick={() => handleToggle(key)}
                                style={{
                                    padding: '12px 15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    cursor: 'pointer',
                                    background: isExpanded ? '#f8fafc' : 'white',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Icon size={18} color={isExpanded ? "#0089A7" : "#94a3b8"} />
                                <span style={{ flexGrow: 1, fontSize: '0.9rem', fontWeight: 600, color: isExpanded ? "#0A2540" : "#475569" }}>{info.label}</span>
                                {isExpanded ? <ChevronDown size={16} color="#94a3b8" /> : <ChevronRight size={16} color="#94a3b8" />}
                            </div>

                            {isExpanded && (
                                <div style={{ padding: '15px', background: '#f8fafc', borderTop: '1px solid #eee' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        {Object.entries(localContent).map(([field, value]) => (
                                            <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                                                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>{field.replace(/_/g, ' ')}</label>
                                                {typeof value === 'string' && value.length > 50 ? (
                                                    <textarea
                                                        value={value}
                                                        onChange={(e) => handleFieldChange(field, e.target.value)}
                                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '0.85rem', width: '100%', minHeight: '80px', resize: 'vertical' }}
                                                    />
                                                ) : (
                                                    <input
                                                        type="text"
                                                        value={value}
                                                        onChange={(e) => handleFieldChange(field, e.target.value)}
                                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '0.85rem', width: '100%' }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => handleSave(key)}
                                            disabled={saving}
                                            style={{
                                                marginTop: '10px',
                                                background: '#0089A7',
                                                color: 'white',
                                                border: 'none',
                                                padding: '10px',
                                                borderRadius: '6px',
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 8
                                            }}
                                        >
                                            <Save size={16} /> {saving ? 'Guardando...' : 'Guardar Cambios'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
            `}</style>
        </div>
    );
}
