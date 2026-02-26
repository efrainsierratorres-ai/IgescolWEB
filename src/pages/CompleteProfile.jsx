import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { User, Briefcase, Building2, UserCircle2, Save, CheckCircle } from 'lucide-react';

export default function CompleteProfile() {
    const { user, profile, refreshProfile } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        role: 'user',
        professional_data: {
            specialty: '',
            experience_years: '',
            company: '', // for providers or clients
            services_offered: '' // for providers
        },
        skills: [],
        experience: []
    });

    useEffect(() => {
        if (profile) {
            setFormData(prev => ({
                ...prev,
                full_name: profile.full_name || '',
                phone: profile.phone || '',
                role: profile.role || 'user'
            }));

            if (profile.onboarding_completed) {
                navigate(`/${profile.role}`);
            }
        }
    }, [profile, navigate]);

    const handleRoleSelect = (role) => {
        setFormData(prev => ({ ...prev, role }));
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: formData.full_name,
                    phone: formData.phone,
                    role: formData.role,
                    professional_data: formData.professional_data,
                    onboarding_completed: true,
                    approval_status: formData.role === 'user' ? 'approved' : 'pending'
                })
                .eq('id', user.id);

            if (error) throw error;

            // Notify Admin
            await supabase.from('admin_notifications').insert({
                title: 'Nuevo Registro',
                message: `El usuario ${formData.full_name} se ha registrado como ${formData.role}.`,
                user_id: user.id,
                type: 'new_registration'
            });

            alert('Perfil completado con éxito. Si seleccionaste un rol profesional (Colaborador/Cliente/Proveedor), el administrador revisará tu solicitud.');

            // Refresh local profile
            if (refreshProfile) await refreshProfile();

            navigate(`/${formData.role}`);
        } catch (err) {
            alert('Error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: isMobile ? '20px 10px' : '40px 20px' }}>
            <div style={{ maxWidth: '600px', width: '100%', background: 'white', padding: isMobile ? '30px 20px' : '50px', borderRadius: isMobile ? '20px' : '30px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>

                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: '20px', background: '#E0F2FE', color: '#0369A1', marginBottom: 20 }}>
                        <User size={30} />
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: 10 }}>Completa tu Perfil</h1>
                    <p style={{ color: '#64748b' }}>Cuéntanos quién eres para ofrecerte la mejor experiencia.</p>
                </div>

                {step === 1 ? (
                    <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 25, textAlign: 'center' }}>¿Cuál es tu rol?</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 15 }}>
                            <RoleButton
                                icon={<Briefcase />}
                                title="Colaborador"
                                desc="Quiero trabajar en proyectos"
                                onClick={() => handleRoleSelect('collaborator')}
                            />
                            <RoleButton
                                icon={<Building2 />}
                                title="Cliente"
                                desc="Tengo proyectos en mente"
                                onClick={() => handleRoleSelect('client')}
                            />
                            <RoleButton
                                icon={<CheckCircle />}
                                title="Proveedor"
                                desc="Ofrezco servicios/insumos"
                                onClick={() => handleRoleSelect('provider')}
                            />
                            <RoleButton
                                icon={<UserCircle2 />}
                                title="Usuario"
                                desc="Quiero ver novedades"
                                onClick={() => handleRoleSelect('user')}
                            />
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.85rem', fontWeight: 700, color: '#64748b' }}>NOMBRE COMPLETO</label>
                            <input
                                type="text"
                                required
                                value={formData.full_name}
                                onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                                style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
                            />
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.85rem', fontWeight: 700, color: '#64748b' }}>TELÉFONO DE CONTACTO</label>
                            <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
                            />
                        </div>

                        {formData.role === 'collaborator' && (
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: 8, fontSize: '0.85rem', fontWeight: 700, color: '#64748b' }}>ESPECIALIDAD TÉCNICA</label>
                                <input
                                    type="text"
                                    placeholder="Ej: Ingeniero Civil, Arquitecto..."
                                    value={formData.professional_data.specialty}
                                    onChange={e => setFormData({ ...formData, professional_data: { ...formData.professional_data, specialty: e.target.value } })}
                                    style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
                                />
                            </div>
                        )}

                        {formData.role === 'provider' && (
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: 8, fontSize: '0.85rem', fontWeight: 700, color: '#64748b' }}>¿QUÉ OFRECES?</label>
                                <textarea
                                    placeholder="Describe brevemente tus servicios o insumos..."
                                    value={formData.professional_data.services_offered}
                                    onChange={e => setFormData({ ...formData, professional_data: { ...formData.professional_data, services_offered: e.target.value } })}
                                    style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', minHeight: '100px' }}
                                />
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: 15, marginTop: 20 }}>
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                style={{ flex: 1, padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', fontWeight: 700, cursor: 'pointer' }}
                            >
                                VOLVER
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                style={{ flex: 2, padding: '15px', borderRadius: '12px', border: 'none', background: '#0F172A', color: 'white', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
                            >
                                <Save size={18} /> {loading ? 'Guardando...' : 'GUARDAR Y TERMINAR'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

function RoleButton({ icon, title, desc, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            style={{
                padding: '25px 15px',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                background: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12
            }}
            onMouseOver={e => e.currentTarget.style.borderColor = '#0089A7'}
            onMouseOut={e => e.currentTarget.style.borderColor = '#e2e8f0'}
        >
            <div style={{ color: '#0089A7' }}>{icon}</div>
            <div>
                <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.9rem' }}>{title}</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: 4 }}>{desc}</div>
            </div>
        </button>
    );
}
