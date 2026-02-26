import React from 'react';
import { Link } from 'react-router-dom';
import IgescolNavbar from '../../components/IgescolNavbar';
import IgescolFooter from '../../components/IgescolFooter';
import '../../styles/stitch.css';

const S = { primary: '#00B4D8', secondary: '#0C2340', container: { maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' } };
const heroImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuBRdy5lRwiivqf5Lemm05sSBV0YccwiXJOIbGtsk4crLCYx5AA1KQYVK_1g3AJlKKj1Ag2C6oSIYMGsStwvETHh9-tNoubC2AlGPy8D77AgyaVpw7uowR0aZ8N_jk20iCuPvFsdAZWm3NOjWj_23BrA-PbrkhOAX0SkMSIbqqsqCp_fK1a2sng92jeEK__SLwZufowtZJzmr-hA095FbUS6KGXWwK_AdGJ6qJZGAqQeHyVVk0m35ytpArY-ztLr3H-KUJA2o9Di9X99";

export default function DomoticaPage() {
    const services = [
        { icon: 'lightbulb', title: 'Iluminación Inteligente', desc: 'Control automatizado de iluminación con sensores de presencia y horarios programables.' },
        { icon: 'thermostat', title: 'Climatización', desc: 'Sistemas HVAC inteligentes que reducen el consumo energético hasta un 40%.' },
        { icon: 'security', title: 'Seguridad Integrada', desc: 'Cámaras IP, alarmas, control de acceso y monitoreo remoto.' },
        { icon: 'power', title: 'Gestión Energética', desc: 'Monitoreo y control del consumo eléctrico con integración solar.' },
        { icon: 'curtains', title: 'Persianas y Cortinas', desc: 'Automatización de sombreado para optimizar luz natural.' },
        { icon: 'speaker', title: 'Audio y Entretenimiento', desc: 'Sistemas de audio multizona controlados por voz o app.' },
    ];
    return (
        <div style={{ fontFamily: "'Montserrat', sans-serif", background: '#f6f7f8', color: '#1e293b' }}>
            <IgescolNavbar />
            <div style={{ paddingTop: '10rem' }}>
                <div style={S.container}>
                    <nav style={{ display: 'flex', fontSize: '0.875rem', color: '#64748b', padding: '2rem 0 0' }}>
                        <Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>Inicio</Link>
                        <span className="material-symbols-outlined" style={{ fontSize: '14px', margin: '0 4px' }}>chevron_right</span>
                        <span>Servicios</span>
                        <span className="material-symbols-outlined" style={{ fontSize: '14px', margin: '0 4px' }}>chevron_right</span>
                        <span style={{ color: S.primary, fontWeight: 700 }}>Domótica Residencial</span>
                    </nav>
                </div>
            </div>
            <section style={{ ...S.container, padding: '2rem 1.5rem 3rem' }}>
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '24px', background: '#0f172a', aspectRatio: '21/9', display: 'flex', alignItems: 'flex-end', minHeight: '280px' }}>
                    <img src={heroImg} alt="Domótica" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f172a, rgba(15,23,42,0.4), transparent)' }} />
                    <div style={{ position: 'relative', zIndex: 1, padding: '2rem 4rem', maxWidth: '48rem' }}>
                        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, color: 'white', marginBottom: '1rem' }}>Domótica Residencial</h1>
                        <p style={{ color: '#cbd5e1', fontSize: '1.1rem', fontWeight: 300, marginBottom: '2rem' }}>Sistemas de automatización del hogar para mayor confort y eficiencia.</p>
                        <Link to="/cotizacion" style={{ background: S.primary, color: 'white', padding: '1rem 2rem', borderRadius: '12px', textDecoration: 'none', fontWeight: 700, fontSize: '0.875rem' }}>Consultar Servicio</Link>
                    </div>
                </div>
            </section>
            <section style={{ background: 'white', padding: '6rem 0' }}>
                <div style={S.container}>
                    <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.75rem, 3vw, 3rem)', fontWeight: 900, color: '#0f172a', marginBottom: '4rem' }}>Soluciones Smart Home</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {services.map((item, i) => (
                            <div key={i} style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', transition: 'all 0.3s' }}
                                onMouseOver={e => { e.currentTarget.style.borderColor = S.primary; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                                onMouseOut={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                                <span className="material-symbols-outlined" style={{ color: S.primary, fontSize: '2.5rem', marginBottom: '1rem', display: 'block' }}>{item.icon}</span>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#0f172a' }}>{item.title}</h4>
                                <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section style={{ background: S.secondary, padding: '5rem 0', textAlign: 'center' }}>
                <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 900, color: 'white', marginBottom: '1.5rem' }}>Convierta su hogar en un Smart Home</h2>
                <Link to="/cotizacion" style={{ background: S.primary, color: 'white', padding: '1rem 2.5rem', borderRadius: '12px', textDecoration: 'none', fontWeight: 700, fontSize: '0.875rem' }}>SOLICITAR COTIZACIÓN</Link>
            </section>
            <IgescolFooter />
        </div>
    );
}
