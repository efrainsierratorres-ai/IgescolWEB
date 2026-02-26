import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import {
    Save, RefreshCw, AlertCircle, CheckCircle2,
    Palette, Layout, Image as ImageIcon, Briefcase,
    Activity, Users, CheckSquare, Folder, Cpu, MapPin, Square,
    ExternalLink, ChevronRight, ChevronDown, Lock
} from 'lucide-react';

const sectionLabels = {
    header: { label: "Encabezado y Barra Superior", icon: Layout },
    hero: { label: "Banner Principal (Hero)", icon: ImageIcon },
    services: { label: "Nuestros Servicios", icon: Briefcase },
    process: { label: "Proceso de Trabajo", icon: Activity },
    about: { label: "Sección Quiénes Somos", icon: Users },
    whyus: { label: "Por Qué Elegirnos", icon: CheckSquare },
    projects: { label: "Nuestros Proyectos", icon: Folder },
    tech: { label: "Tecnología y Sostenibilidad", icon: Cpu },
    contact: { label: "Contacto y Ubicación", icon: MapPin },
    footer: { label: "Pie de Página", icon: Square },
    login_page: { label: "Página de Login", icon: Lock },
    dashboards_general: { label: "Textos de Paneles / Dashboards", icon: Activity }
};

const fieldLabels = {
    // Header
    logo: "URL del Logo",
    phone_main: "Teléfono Principal",
    phone_label: "Etiqueta de Llamada",
    hours: "Horarios de Atención",
    link_about: "Texto 'Nosotros'",
    link_blog: "Texto 'Blog'",
    phone_top: "Teléfono Superior",

    // About
    about_title_1: "Título Nosotros (Parte 1)",
    about_title_2: "Título Nosotros (Parte 2)",
    about_text_1: "Párrafo Principal (Nosotros)",
    about_text_2: "Párrafo Secundario (Nosotros)",
    about_btn_text: "Texto Botón 'Conócenos'",

    // Services
    services_title_1: "Título Servicios (Parte 1)",
    services_title_2: "Título Servicios (Parte 2)",

    // Process
    process_title_1: "Título Proceso (Parte 1)",
    process_title_2: "Título Proceso (Parte 2)",

    // Why Us
    why_title_1: "Título Elegirnos (Parte 1)",
    why_title_2: "Título Elegirnos (Parte 2)",

    // Projects
    projects_title_1: "Título Proyectos (Parte 1)",
    projects_title_2: "Título Proyectos (Parte 2)",

    // Hero
    title_line1: "Título Principal (Línea 1)",
    title_line2: "Título Principal (Línea 2)",
    btn_text: "Texto Botón Principal",
    btn_link: "Enlace Botón Principal",

    // Generic
    title: "Título de la Sección",
    subtitle: "Descripción / Bajada de Título",
    btn_quote: "Texto Botón 'Cotizar'",
    btn_client: "Texto Botón 'Clientes'",
    nav_btn_text: "Texto Botón Acceso (Menú)",

    // Footer
    footer_year: "Año en Copyright",
    footer_copy: "Texto de Derechos Reservados"
};

const getFieldLabel = (key) => {
    if (fieldLabels[key]) return fieldLabels[key];
    // fallback to readable capitalize
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export default function AdminCMS() {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);
    const [expandedSections, setExpandedSections] = useState({});

    useEffect(() => {
        fetchSections();
    }, []);

    async function fetchSections() {
        const { data, error } = await supabase.from('cms_content').select('*').order('section_name');
        if (!error) setSections(data);
        setLoading(false);
    }

    const toggleSection = (name) => {
        setExpandedSections(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const handleUpdate = async (id, newContent) => {
        setSaving(true);
        const { error } = await supabase
            .from('cms_content')
            .update({ content: newContent, updated_at: new Date() })
            .eq('id', id);

        if (error) setMessage({ type: 'error', text: 'Error: ' + error.message });
        else setMessage({ type: 'success', text: '¡Cambios guardados con éxito!' });

        setSaving(false);
        setTimeout(() => setMessage(null), 3000);
        fetchSections();
    };

    const updateSectionField = (sectionId, fieldPath, value) => {
        setSections(prev => prev.map(s => {
            if (s.id !== sectionId) return s;
            const newContent = { ...s.content };
            newContent[fieldPath] = value;
            return { ...s, content: newContent };
        }));
    };

    if (loading) return (
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <div className="loading-spinner" style={{ margin: '0 auto 20px' }}></div>
            <p style={{ color: '#64748b', fontWeight: 500 }}>Cargando administrador de contenido...</p>
        </div>
    );

    return (
        <div className="admin-cms-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>

            {/* Header and Visual Editor Button */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '40px',
                background: 'white',
                padding: '25px',
                borderRadius: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', color: '#0A2540', marginBottom: 5, fontWeight: 800 }}>Gestión de Contenido</h2>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Modifica los textos e imágenes de tu web de forma segura.</p>
                </div>
                <div style={{ display: 'flex', gap: 15 }}>
                    <div style={{ textAlign: 'right' }}>
                        <button
                            onClick={() => window.open('/?edit=true', '_blank')}
                            style={{
                                background: '#F0F9FF',
                                color: '#0089A7',
                                border: '1px solid #BAE6FD',
                                padding: '12px 20px',
                                borderRadius: '12px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                transition: 'all 0.2s',
                                width: '100%',
                                justifyContent: 'center'
                            }}
                        >
                            <Palette size={18} /> ABRIR EDITOR VISUAL
                        </button>
                        <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: 8, maxWidth: 200 }}>
                            * Usa el Editor Visual para ajustes de diseño precisos o corregir textos largos.
                        </p>
                    </div>
                    <button
                        onClick={fetchSections}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                        title="Refrescar datos"
                    >
                        <RefreshCw size={20} />
                    </button>
                </div>
            </div>

            {message && (
                <div style={{
                    padding: '15px 25px',
                    backgroundColor: message.type === 'error' ? '#fee2e2' : '#dcfce7',
                    color: message.type === 'error' ? '#991b1b' : '#166534',
                    borderRadius: '15px',
                    marginBottom: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                    animation: 'fadeInUp 0.3s ease-out'
                }}>
                    {message.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                    <span style={{ fontWeight: 600 }}>{message.text}</span>
                </div>
            )}

            <div className="sections-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {sections.map(section => {
                    const info = sectionLabels[section.section_name] || { label: section.section_name, icon: Square };
                    const Icon = info.icon;
                    const isExpanded = expandedSections[section.section_name];

                    return (
                        <div key={section.id} style={{
                            background: 'white',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                            border: '1px solid #f1f5f9'
                        }}>
                            {/* Section Header */}
                            <div
                                onClick={() => toggleSection(section.section_name)}
                                style={{
                                    padding: '20px 25px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    background: isExpanded ? '#f8fafc' : 'white',
                                    transition: 'background 0.2s'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                                    <div style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: '10px',
                                        background: '#E0F2FE',
                                        color: '#0369A1',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Icon size={20} />
                                    </div>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>
                                            {info.label}
                                        </h3>
                                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                            ID: {section.section_name}
                                        </span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                                    {isExpanded ? <ChevronDown size={20} color="#94a3b8" /> : <ChevronRight size={20} color="#94a3b8" />}
                                </div>
                            </div>

                            {/* Section Content */}
                            {isExpanded && (
                                <div style={{ padding: '25px', borderTop: '1px solid #f1f5f9' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginBottom: '30px' }}>
                                        {Object.keys(section.content).map(key => {
                                            // Only show simple strings for now, objects/arrays need special editors
                                            if (typeof section.content[key] !== 'string') return null;

                                            const isLong = section.content[key].length > 80;
                                            const isImage = key.toLowerCase().includes('logo') || key.toLowerCase().includes('img') || key.toLowerCase().includes('src');

                                            return (
                                                <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                        {getFieldLabel(key)}
                                                    </label>
                                                    {isLong ? (
                                                        <textarea
                                                            value={section.content[key]}
                                                            onChange={(e) => updateSectionField(section.id, key, e.target.value)}
                                                            style={{
                                                                width: '100%',
                                                                minHeight: '100px',
                                                                padding: '12px 15px',
                                                                borderRadius: '10px',
                                                                border: '1px solid #e2e8f0',
                                                                fontSize: '0.95rem',
                                                                fontFamily: 'inherit',
                                                                resize: 'vertical'
                                                            }}
                                                        />
                                                    ) : (
                                                        <div style={{ position: 'relative' }}>
                                                            <input
                                                                type="text"
                                                                value={section.content[key]}
                                                                onChange={(e) => updateSectionField(section.id, key, e.target.value)}
                                                                style={{
                                                                    width: '100%',
                                                                    padding: '12px 15px',
                                                                    borderRadius: '10px',
                                                                    border: '1px solid #e2e8f0',
                                                                    fontSize: '0.95rem'
                                                                }}
                                                            />
                                                            {isImage && (
                                                                <div style={{ marginTop: 10, width: 60, height: 40, borderRadius: 4, background: '#f1f5f9', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                                                                    <img src={section.content[key]} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => e.target.style.display = 'none'} />
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                                        <button
                                            className="btn-primary"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 8,
                                                padding: '12px 25px',
                                                borderRadius: '12px',
                                                background: '#0F172A',
                                                color: 'white',
                                                border: 'none',
                                                fontWeight: 600,
                                                cursor: 'pointer'
                                            }}
                                            disabled={saving}
                                            onClick={() => handleUpdate(section.id, section.content)}
                                        >
                                            <Save size={18} /> {saving ? 'Guardando...' : 'Guardar Sección'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
