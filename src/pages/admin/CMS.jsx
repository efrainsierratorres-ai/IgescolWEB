import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminCMS() {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchSections();
    }, []);

    async function fetchSections() {
        const { data, error } = await supabase.from('cms_content').select('*').order('section_name');
        if (!error) setSections(data);
        setLoading(false);
    }

    const handleUpdate = async (id, newContent) => {
        setSaving(true);
        const { error } = await supabase
            .from('cms_content')
            .update({ content: newContent, updated_at: new Date() })
            .eq('id', id);

        if (error) setMessage({ type: 'error', text: error.message });
        else setMessage({ type: 'success', text: 'Sección actualizada correctamente' });

        setSaving(false);
        setTimeout(() => setMessage(null), 3000);
        fetchSections(); // Refresh to show current state
    };

    const updateSectionField = (sectionId, fieldPath, value) => {
        setSections(prev => prev.map(s => {
            if (s.id !== sectionId) return s;

            const newContent = { ...s.content };
            const paths = fieldPath.split('.');
            let current = newContent;

            for (let i = 0; i < paths.length - 1; i++) {
                if (paths[i].includes('[')) {
                    const [name, index] = paths[i].replace(']', '').split('[');
                    current = current[name][parseInt(index)];
                } else {
                    current = current[paths[i]];
                }
            }

            const lastPath = paths[paths.length - 1];
            if (lastPath.includes('[')) {
                const [name, index] = lastPath.replace(']', '').split('[');
                current[name][parseInt(index)] = value;
            } else {
                current[lastPath] = value;
            }

            return { ...s, content: newContent };
        }));
    };

    if (loading) return <div className="loading-screen">Cargando editor visual...</div>;

    return (
        <div className="admin-cms">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2>Editor Visual de Contenido (CMS)</h2>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>Edita los textos e imágenes de la Landing Page</p>
            </div>

            {message && (
                <div style={{
                    padding: '15px 20px',
                    backgroundColor: message.type === 'error' ? '#fee2e2' : '#dcfce7',
                    color: message.type === 'error' ? '#991b1b' : '#166534',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    fontWeight: '600'
                }}>
                    {message.text}
                </div>
            )}

            <div className="sections-list" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {sections.map(section => (
                    <div key={section.id} className="section-form-card" style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', padding: '30px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
                            <h3 style={{ textTransform: 'uppercase', color: 'var(--secondary)', margin: 0 }}>Sección: {section.section_name}</h3>
                            <button
                                className="btn-primary"
                                disabled={saving}
                                onClick={() => handleUpdate(section.id, section.content)}
                            >
                                {saving ? 'Guardando...' : 'Aplicar Cambios'}
                            </button>
                        </div>

                        {/* Render dynamic fields based on section name */}
                        <div className="form-grid" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                            {/* Hero Section Form */}
                            {section.section_name === 'hero' && (
                                <>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Título Principal</label>
                                        <input
                                            type="text"
                                            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                                            value={section.content.title || ''}
                                            onChange={(e) => updateSectionField(section.id, 'title', e.target.value)}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', gap: '20px' }}>
                                        <div className="form-group" style={{ flex: 1 }}>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Texto Botón 1</label>
                                            <input
                                                type="text"
                                                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                                                value={section.content.button_info || ''}
                                                onChange={(e) => updateSectionField(section.id, 'button_info', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group" style={{ flex: 1 }}>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Texto Botón 2</label>
                                            <input
                                                type="text"
                                                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                                                value={section.content.button_contact || ''}
                                                onChange={(e) => updateSectionField(section.id, 'button_contact', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* About Section Form */}
                            {section.section_name === 'about' && (
                                <>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Título de Sección</label>
                                        <input
                                            type="text"
                                            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                                            value={section.content.title || ''}
                                            onChange={(e) => updateSectionField(section.id, 'title', e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Contenido Principal</label>
                                        <textarea
                                            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', minHeight: '100px' }}
                                            value={section.content.content || ''}
                                            onChange={(e) => updateSectionField(section.id, 'content', e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Sub-contenido</label>
                                        <textarea
                                            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', minHeight: '80px' }}
                                            value={section.content.sub_content || ''}
                                            onChange={(e) => updateSectionField(section.id, 'sub_content', e.target.value)}
                                        />
                                    </div>
                                </>
                            )}

                            {/* Services Section Form */}
                            {section.section_name === 'services' && (
                                <>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Título de Sección</label>
                                        <input
                                            type="text"
                                            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                                            value={section.content.title || ''}
                                            onChange={(e) => updateSectionField(section.id, 'title', e.target.value)}
                                        />
                                    </div>
                                    <div className="services-editor" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <label style={{ fontWeight: '600' }}>Gestión de Servicios</label>
                                        {section.content.items?.map((item, index) => (
                                            <div key={item.id} style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                                <div style={{ display: 'flex', gap: '20px' }}>
                                                    <div style={{ flex: 1 }}>
                                                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.8rem' }}>Título Servicio</label>
                                                        <input
                                                            type="text"
                                                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                                                            value={item.title}
                                                            onChange={(e) => updateSectionField(section.id, `items[${index}].title`, e.target.value)}
                                                        />
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.8rem' }}>URL Imagen</label>
                                                        <input
                                                            type="text"
                                                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                                                            value={item.image}
                                                            onChange={(e) => updateSectionField(section.id, `items[${index}].image`, e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: '10px' }}>
                                                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.8rem' }}>Descripción</label>
                                                    <textarea
                                                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', minHeight: '60px' }}
                                                        value={item.description}
                                                        onChange={(e) => updateSectionField(section.id, `items[${index}].description`, e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Process Section Form */}
                            {section.section_name === 'process' && (
                                <>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Título de Sección</label>
                                        <input
                                            type="text"
                                            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                                            value={section.content.title || ''}
                                            onChange={(e) => updateSectionField(section.id, 'title', e.target.value)}
                                        />
                                    </div>
                                    <div className="process-steps-editor" style={{ display: 'flex', gap: '15px' }}>
                                        {section.content.steps?.map((step, index) => (
                                            <div key={step.id} style={{ flex: 1, padding: '15px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.8rem' }}>Paso {step.id}</label>
                                                <input
                                                    type="text"
                                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                                                    value={step.name}
                                                    onChange={(e) => updateSectionField(section.id, `steps[${index}].name`, e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
