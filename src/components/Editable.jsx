import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCMS } from '../hooks/useCMS';
import { useAuth } from '../hooks/useAuth';
import { Save, Edit2, X } from 'lucide-react';

export default function EditableText({ section, field, children, style = {} }) {
    const [searchParams] = useSearchParams();
    const { content, updateContent } = useCMS();
    const { profile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(children);

    const isEditorMode = searchParams.get('edit') === 'true' && profile?.role === 'admin';

    useEffect(() => {
        if (content[section]?.[field]) {
            setValue(content[section][field]);
        }
    }, [content, section, field]);

    const handleSave = async () => {
        const newSectionContent = { ...(content[section] || {}), [field]: value };
        const result = await updateContent(section, newSectionContent);
        if (result.success) {
            setIsEditing(false);
        } else {
            alert('Error al guardar: ' + result.error.message);
        }
    };

    if (!isEditorMode) {
        return <span style={style}>{content[section]?.[field] || children}</span>;
    }

    if (isEditing) {
        return (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, width: '100%' }}>
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    style={{
                        ...style,
                        width: '100%',
                        padding: '5px',
                        border: '2px solid #0089A7',
                        borderRadius: '4px',
                        background: 'white',
                        color: 'black',
                        fontFamily: 'inherit',
                        fontSize: 'inherit',
                        fontWeight: 'inherit'
                    }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <button onClick={handleSave} style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: 4, padding: 4, cursor: 'pointer' }}><Save size={14} /></button>
                    <button onClick={() => setIsEditing(false)} style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: 4, padding: 4, cursor: 'pointer' }}><X size={14} /></button>
                </div>
            </div>
        );
    }

    return (
        <span
            style={{
                ...style,
                position: 'relative',
                border: '1px dashed #0089A7',
                padding: '2px 4px',
                borderRadius: '4px',
                cursor: 'pointer'
            }}
            onClick={() => setIsEditing(true)}
            title="Haz clic para editar"
        >
            {content[section]?.[field] || children}
            <Edit2 size={10} style={{ position: 'absolute', top: -5, right: -5, background: '#0089A7', color: 'white', borderRadius: '50%', padding: 2 }} />
        </span>
    );
}
