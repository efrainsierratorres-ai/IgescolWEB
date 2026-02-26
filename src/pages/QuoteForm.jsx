import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Mail, Phone, MapPin, Send, User, Building, FileText } from 'lucide-react';

export default function QuoteForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate sending
        setTimeout(() => {
            setLoading(false);
            setSent(true);
        }, 1500);
    };

    if (sent) {
        return (
            <div className="quote-success" style={{
                minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: '#f8fbff', textAlign: 'center', padding: '20px'
            }}>
                <div style={{ background: '#10b981', color: 'white', width: 80, height: 80, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
                    <CheckCircle size={40} />
                </div>
                <h1 style={{ color: '#0B2540', fontSize: '2.5rem', fontWeight: 800, marginBottom: 20 }}>¡Solicitud Enviada!</h1>
                <p style={{ color: '#4a5568', fontSize: '1.2rem', maxWidth: 600, marginBottom: 40 }}>
                    Hemos recibido la información de tu proyecto. Un consultor técnico se pondrá en contacto contigo en las próximas 24 horas.
                </p>
                <button
                    onClick={() => navigate('/')}
                    style={{ background: '#0B2540', color: 'white', border: 'none', padding: '15px 40px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}
                >
                    VOLVER AL INICIO
                </button>
            </div>
        );
    }

    return (
        <div className="quote-page" style={{ background: '#f8fbff', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
            {/* Minimal Header */}
            <div style={{ background: 'white', padding: '15px 0', borderBottom: '1px solid #eef2f6', position: 'sticky', top: 0, zIndex: 1000 }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <img src="/igescol-logoH.jpg" alt="Logo" style={{ height: 35 }} />
                        <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0B2540' }}>IGESCOL<span style={{ color: '#4089A7' }}>SAS</span></span>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        style={{ background: '#f0f4f8', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: '#0B2540' }}
                    >
                        <ArrowLeft size={16} /> CANCELAR
                    </button>
                </div>
            </div>

            <div className="container" style={{ padding: '60px 20px', maxWidth: 1000 }}>
                <div style={{ textAlign: 'center', marginBottom: 60 }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B2540', marginBottom: 20 }}>Cotiza tu Proyecto</h1>
                    <p style={{ fontSize: '1.1rem', color: '#4a5568', maxWidth: 700, margin: '0 auto' }}>
                        Completa el siguiente formulario con los detalles técnicos de tu proyecto. Analizaremos tu requerimiento para brindarte una propuesta ajustada a tus necesidades.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'start' }}>
                    {/* Form Side */}
                    <div style={{ background: 'white', padding: 40, borderRadius: 30, boxShadow: '0 20px 60px rgba(0,0,0,0.05)' }}>
                        <form onSubmit={handleSubmit}>
                            <h3 style={{ marginBottom: 30, fontSize: '1.4rem', color: '#0B2540', display: 'flex', alignItems: 'center', gap: 10 }}>
                                <User size={20} color="#4089A7" /> Información del Solicitante
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 30 }}>
                                <div className="form-group-quote">
                                    <label style={{ display: 'block', paddingBottom: 8, fontSize: '0.8rem', fontWeight: 700, color: '#666' }}>NOMBRE COMPLETO</label>
                                    <input type="text" required style={{ width: '100%', padding: '12px', borderRadius: 10, border: '1px solid #eef2f6', background: '#fcfdfe' }} />
                                </div>
                                <div className="form-group-quote">
                                    <label style={{ display: 'block', paddingBottom: 8, fontSize: '0.8rem', fontWeight: 700, color: '#666' }}>EMPRESA (OPCIONAL)</label>
                                    <input type="text" style={{ width: '100%', padding: '12px', borderRadius: 10, border: '1px solid #eef2f6', background: '#fcfdfe' }} />
                                </div>
                                <div className="form-group-quote">
                                    <label style={{ display: 'block', paddingBottom: 8, fontSize: '0.8rem', fontWeight: 700, color: '#666' }}>CORREO ELECTRÓNICO</label>
                                    <input type="email" required style={{ width: '100%', padding: '12px', borderRadius: 10, border: '1px solid #eef2f6', background: '#fcfdfe' }} />
                                </div>
                                <div className="form-group-quote">
                                    <label style={{ display: 'block', paddingBottom: 8, fontSize: '0.8rem', fontWeight: 700, color: '#666' }}>TELÉFONO / WHATSAPP</label>
                                    <input type="tel" required style={{ width: '100%', padding: '12px', borderRadius: 10, border: '1px solid #eef2f6', background: '#fcfdfe' }} />
                                </div>
                            </div>

                            <h3 style={{ marginBottom: 30, fontSize: '1.4rem', color: '#0B2540', display: 'flex', alignItems: 'center', gap: 10, marginTop: 40 }}>
                                <Building size={20} color="#4089A7" /> Detalles del Proyecto
                            </h3>
                            <div className="form-group-quote" style={{ marginBottom: 20 }}>
                                <label style={{ display: 'block', paddingBottom: 8, fontSize: '0.8rem', fontWeight: 700, color: '#666' }}>TIPO DE SERVICIO</label>
                                <select required style={{ width: '100%', padding: '12px', borderRadius: 10, border: '1px solid #eef2f6', background: '#fcfdfe' }}>
                                    <option value="">Seleccione un servicio...</option>
                                    <option value="licencias">Licencias de Construcción</option>
                                    <option value="vias">Infraestructura Vial</option>
                                    <option value="domotica">Domótica Residencial</option>
                                    <option value="consultoria">Consultoría Técnica BIM</option>
                                    <option value="otro">Otro Requerimiento</option>
                                </select>
                            </div>
                            <div className="form-group-quote" style={{ marginBottom: 20 }}>
                                <label style={{ display: 'block', paddingBottom: 8, fontSize: '0.8rem', fontWeight: 700, color: '#666' }}>UBICACIÓN DEL PROYECTO</label>
                                <input type="text" required placeholder="Ciudad, Barrio o Predio" style={{ width: '100%', padding: '12px', borderRadius: 10, border: '1px solid #eef2f6', background: '#fcfdfe' }} />
                            </div>
                            <div className="form-group-quote" style={{ marginBottom: 30 }}>
                                <label style={{ display: 'block', paddingBottom: 8, fontSize: '0.8rem', fontWeight: 700, color: '#666' }}>BREVE DESCRIPCIÓN DEL REQUERIMIENTO</label>
                                <textarea rows="4" required placeholder="Cuéntanos más sobre el área, objetivos y tiempos del proyecto..." style={{ width: '100%', padding: '12px', borderRadius: 10, border: '1px solid #eef2f6', background: '#fcfdfe', fontFamily: 'inherit' }}></textarea>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
                                <label style={{ display: 'flex', gap: 12, fontSize: '0.85rem', color: '#4a5568', cursor: 'pointer' }}>
                                    <input type="checkbox" required style={{ width: 18, height: 18 }} />
                                    <span>Acepto los <b>Términos y Condiciones</b> de servicio.</span>
                                </label>
                                <label style={{ display: 'flex', gap: 12, fontSize: '0.85rem', color: '#4a5568', cursor: 'pointer' }}>
                                    <input type="checkbox" required style={{ width: 18, height: 18 }} />
                                    <span>Consiento el <b>Tratamiento de mis Datos Personales</b> conforme a la política de Habeas Data de IGESCOL SAS.</span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '100%', background: '#0B2540', color: 'white', border: 'none', padding: '20px', borderRadius: '15px',
                                    fontWeight: 700, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                                    transition: 'all 0.3s'
                                }}
                            >
                                {loading ? 'PROCESANDO...' : 'ENVIAR COTIZACIÓN'} <Send size={18} />
                            </button>
                        </form>
                    </div>

                    {/* Info Side */}
                    <div style={{ padding: '20px' }}>
                        <div style={{ background: '#f0f4f8', padding: 40, borderRadius: 30, marginBottom: 30 }}>
                            <h4 style={{ color: '#0B2540', fontSize: '1.2rem', marginBottom: 20 }}>¿Por qué cotizar con nosotros?</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                <div style={{ display: 'flex', gap: 15 }}>
                                    <div style={{ background: 'white', color: '#4089A7', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800 }}>1</div>
                                    <p style={{ fontSize: '0.9rem', color: '#4a5568' }}><b>Análisis Riguroso:</b> Cada cotización es evaluada por nuestro equipo directivo técnico.</p>
                                </div>
                                <div style={{ display: 'flex', gap: 15 }}>
                                    <div style={{ background: 'white', color: '#4089A7', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800 }}>2</div>
                                    <p style={{ fontSize: '0.9rem', color: '#4a5568' }}><b>Claridad Progresiva:</b> Alcances detallados sin sorpresas ni costos ocultos posteriores.</p>
                                </div>
                                <div style={{ display: 'flex', gap: 15 }}>
                                    <div style={{ background: 'white', color: '#4089A7', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800 }}>3</div>
                                    <p style={{ fontSize: '0.9rem', color: '#4a5568' }}><b>Tecnología BIM:</b> Cotizaciones basadas en modelos de datos para mayor precisión.</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '0 20px' }}>
                            <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: 25 }}>También puedes contactarnos directamente:</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#0B2540', fontWeight: 600 }}><Phone size={18} color="#4089A7" /> +57 (311) 758 05 56</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#0B2540', fontWeight: 600 }}><Mail size={18} color="#4089A7" /> contacto@igescol.com</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
