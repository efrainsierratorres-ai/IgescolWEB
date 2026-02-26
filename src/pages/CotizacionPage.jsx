import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IgescolNavbar from '../components/IgescolNavbar';
import IgescolFooter from '../components/IgescolFooter';
import '../styles/stitch.css';

const S = { primary: '#00B4D8', secondary: '#0C2340', container: { maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' } };

export default function CotizacionPage() {
    const [form, setForm] = useState({ servicio: '', proyecto: '', descripcion: '', ciudad: '', presupuesto: '', nombre: '', empresa: '', email: '', telefono: '', acepto: false });
    const [enviado, setEnviado] = useState(false);
    const inputStyle = { width: '100%', height: '56px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0 1rem', fontFamily: 'Montserrat, sans-serif', fontSize: '0.9rem', color: '#1e293b', outline: 'none', boxSizing: 'border-box' };

    return (
        <div style={{ fontFamily: "'Montserrat', sans-serif", background: '#f6f7f8', color: '#1e293b' }}>
            <IgescolNavbar />
            <div style={{ background: '#f1f5f9', borderBottom: '1px solid #e2e8f0', paddingTop: '8rem', paddingBottom: '4rem' }}>
                <div style={S.container}>
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b', marginBottom: '1.5rem' }}>
                        <Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>Inicio</Link>
                        <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>chevron_right</span>
                        <span style={{ color: '#1e293b', fontWeight: 600 }}>Cotización</span>
                    </nav>
                    <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#1e293b', marginBottom: '1rem' }}>
                        Solicitar Cotización <span style={{ color: S.primary }}>Técnica</span>
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: '#475569', maxWidth: '40rem', lineHeight: 1.7 }}>
                        Complete los campos a continuación para iniciar el proceso de evaluación.
                    </p>
                </div>
            </div>
            <div style={{ ...S.container, marginTop: '-2rem', position: 'relative', zIndex: 10, paddingBottom: '6rem' }}>
                {enviado ? (
                    <div style={{ background: 'white', borderRadius: '16px', padding: '4rem', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '4rem', color: S.primary, display: 'block', marginBottom: '1.5rem' }}>check_circle</span>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: S.secondary, marginBottom: '1rem' }}>¡Solicitud Enviada!</h2>
                        <p style={{ color: '#475569', marginBottom: '2rem' }}>Nuestro equipo se pondrá en contacto con usted en las próximas 24 horas.</p>
                        <Link to="/" style={{ background: S.primary, color: 'white', padding: '1rem 2rem', borderRadius: '12px', textDecoration: 'none', fontWeight: 700 }}>Volver al Inicio</Link>
                    </div>
                ) : (
                    <form onSubmit={e => { e.preventDefault(); setEnviado(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderLeft: `4px solid ${S.primary}`, paddingLeft: '1rem' }}>
                                <span className="material-symbols-outlined" style={{ color: S.primary }}>settings_suggest</span>
                                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>1. Tipo de Servicio</h2>
                            </div>
                            <select value={form.servicio} onChange={e => setForm({ ...form, servicio: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>
                                <option value="">Seleccione una opción...</option>
                                <option value="licencias">Licencias de Construcción</option>
                                <option value="infraestructura">Infraestructura Vial</option>
                                <option value="domotica">Domótica Residencial</option>
                                <option value="estructural">Diseño Estructural</option>
                            </select>
                        </div>
                        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderLeft: `4px solid ${S.primary}`, paddingLeft: '1rem' }}>
                                <span className="material-symbols-outlined" style={{ color: S.primary }}>description</span>
                                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>2. Información del Proyecto</h2>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input value={form.proyecto} onChange={e => setForm({ ...form, proyecto: e.target.value })} placeholder="Nombre del Proyecto" style={inputStyle} />
                                <textarea value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} rows={4} placeholder="Descripción técnica y objetivos..." style={{ ...inputStyle, height: 'auto', padding: '1rem' }} />
                            </div>
                        </div>
                        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderLeft: `4px solid ${S.primary}`, paddingLeft: '1rem' }}>
                                <span className="material-symbols-outlined" style={{ color: S.primary }}>badge</span>
                                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>3. Información de Contacto</h2>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} placeholder="Nombre Completo" style={inputStyle} />
                                <input value={form.empresa} onChange={e => setForm({ ...form, empresa: e.target.value })} placeholder="Empresa" style={inputStyle} />
                                <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} type="email" placeholder="Correo Electrónico" style={inputStyle} />
                                <input value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} placeholder="Teléfono" style={inputStyle} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                            <input type="checkbox" checked={form.acepto} onChange={e => setForm({ ...form, acepto: e.target.checked })} style={{ marginTop: '4px', accentColor: S.primary }} />
                            <label style={{ fontSize: '0.8rem', color: '#64748b' }}>Acepto el tratamiento de mis datos personales.</label>
                        </div>
                        <button type="submit" disabled={!form.acepto} style={{ background: form.acepto ? S.primary : '#94a3b8', color: 'white', padding: '1.25rem', borderRadius: '12px', border: 'none', cursor: form.acepto ? 'pointer' : 'not-allowed', fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            Enviar Solicitud
                        </button>
                    </form>
                )}
            </div>
            <IgescolFooter />
        </div>
    );
}
