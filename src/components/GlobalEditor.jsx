import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import EditorSidebar from './EditorSidebar';
import { Palette } from 'lucide-react';

export default function GlobalEditor() {
    const [searchParams] = useSearchParams();
    const { profile, loading } = useAuth();
    const [isEditorOpen, setIsEditorOpen] = useState(false);

    const isProfileAdmin = profile?.role === 'admin';
    const wantsEdit = searchParams.get('edit') === 'true';

    useEffect(() => {
        if (wantsEdit && isProfileAdmin) {
            setIsEditorOpen(true);
        }
    }, [wantsEdit, isProfileAdmin]);

    // If the user is an admin, always show the floating button (or the sidebar if open)
    // Avoid showing it inside the admin dashboard itself if possible, but it's okay if global.
    // To restrict to public pages, we could check location, but keeping it global is fine.

    if (loading) return null; // Wait for profile to load

    if (!isProfileAdmin) {
        // Only warn if they explicitly tried to access via URL param
        if (wantsEdit) {
            return (
                <div style={{ position: 'fixed', bottom: 30, right: 30, zIndex: 9999, background: '#fee2e2', color: '#991b1b', padding: '12px 20px', borderRadius: '12px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', border: '1px solid #fecaca', fontSize: '0.8rem', fontWeight: 600 }}>
                    ⚠️ Debes ser admin para editar el sitio.
                </div>
            );
        }
        return null;
    }

    return (
        <>
            {isEditorOpen ? (
                <EditorSidebar onClose={() => setIsEditorOpen(false)} />
            ) : (
                <button
                    onClick={() => setIsEditorOpen(true)}
                    style={{
                        position: 'fixed',
                        bottom: 30,
                        right: 30,
                        zIndex: 9000,
                        background: '#0089A7',
                        color: 'white',
                        border: 'none',
                        padding: '15px',
                        borderRadius: '50%',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s'
                    }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    title="Abrir Editor Visual"
                >
                    <Palette size={24} />
                </button>
            )}
        </>
    );
}
