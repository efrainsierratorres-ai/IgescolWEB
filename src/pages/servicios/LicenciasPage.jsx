import React from 'react';
import { Link } from 'react-router-dom';
import IgescolNavbar from '../../components/IgescolNavbar';
import IgescolFooter from '../../components/IgescolFooter';
import '../../styles/stitch.css';

const S = { primary: '#00B4D8', secondary: '#0C2340', container: { maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' } };
const heroImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuBNeK6SabqCY59offW43brxO2yTUPjg78ptftcZJxMQ1RCAQ7Oa2Z5maWj1cRCm2UbFWcr8kfsZNtG85oMrHVJzd7kNAJRwqRMKJ21wCiV-tjz-FP9oEn2xFoGA8Rg-HkZW2uWTQcJSbIfcoAeN7sJZ2PbntBLHrdawZXFPiquzMtipIrbQa99SFzZOid1ul5V0v4rv6ADha5_0hYnV3Bh5HjIag5elC4tgb2Kyal83iS1gRIIf5oGuigU5GoyClzx-Wb84V7TbLtKs";

function ServicePageTemplate({ title, subtitle, heroImage, services }) {
    return (
        <div style={{ fontFamily: "'Montserrat', sans-serif", background: '#f6f7f8', color: '#1e293b' }}>
            <IgescolNavbar />
            <div style={{ paddingTop: '10rem' }}>
                <div style={S.container}>
                    <nav style={{ display: 'flex', fontSize: '0.875rem', fontWeight: 500, color: '#64748b', padding: '2rem 0 0' }}>
                        <Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>Inicio</Link>
                        <span className="material-symbols-outlined" style={{ fontSize: '14px', margin: '0 4px' }}>chevron_right</span>
                        <span>Servicios</span>
                        <span className="material-symbols-outlined" style={{ fontSize: '14px', margin: '0 4px' }}>chevron_right</span>
                        <span style={{ color: S.primary, fontWeight: 700 }}>{title}</span>
                    </nav>
                </div>
            </div>
            <section style={{ ...S.container, padding: '2rem 1.5rem 3rem' }}>
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '24px', background: '#0f172a', aspectRatio: '21/9', display: 'flex', alignItems: 'flex-end', minHeight: '280px' }}>
                    <img src={heroImage} alt={title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f172a, rgba(15,23,42,0.4), transparent)' }} />
                    <div style={{ position: 'relative', zIndex: 1, padding: '2rem 4rem', maxWidth: '48rem' }}>
                        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, color: 'white', marginBottom: '1rem', lineHeight: 1.1 }}>{title}</h1>
                        <p style={{ color: '#cbd5e1', fontSize: '1.1rem', fontWeight: 300, marginBottom: '2rem' }}>{subtitle}</p>
                        <Link to="/cotizacion" style={{ background: S.primary, color: 'white', padding: '1rem 2rem', borderRadius: '12px', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                            Consultar Servicio <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>
            <section style={{ background: 'white', padding: '6rem 0' }}>
                <div style={S.container}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 3rem)', fontWeight: 900, color: '#0f172a' }}>Nuestras Especialidades</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {services.map((item, i) => (
                            <div key={i} style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', transition: 'all 0.3s' }}
                                onMouseOver={e => { e.currentTarget.style.borderColor = S.primary; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)'; }}
                                onMouseOut={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                <span className="material-symbols-outlined" style={{ color: S.primary, fontSize: '2.5rem', marginBottom: '1rem', display: 'block' }}>{item.icon}</span>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#0f172a' }}>{item.title}</h4>
                                <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section style={{ background: S.secondary, padding: '5rem 0', textAlign: 'center' }}>
                <div style={{ maxWidth: '40rem', margin: '0 auto', padding: '0 1.5rem' }}>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 900, color: 'white', marginBottom: '1.5rem' }}>¿Tiene un proyecto en mente?</h2>
                    <p style={{ color: '#d1d5db', marginBottom: '2.5rem' }}>Nuestro equipo de ingenieros especializados está listo para asesorarle.</p>
                    <Link to="/cotizacion" style={{ background: S.primary, color: 'white', padding: '1rem 2.5rem', borderRadius: '12px', textDecoration: 'none', fontWeight: 700, fontSize: '0.875rem', display: 'inline-block' }}>
                        SOLICITAR COTIZACIÓN
                    </Link>
                </div>
            </section>
            <IgescolFooter />
        </div>
    );
}

export default function LicenciasPage() {
    return <ServicePageTemplate
        title="Gestión Integral de Licencias de Construcción"
        subtitle="Garantizamos cumplimiento legal y precisión técnica absoluta en sus proyectos."
        heroImage={heroImg}
        services={[
            { icon: 'location_city', title: 'Licencias de Urbanismo', desc: 'Trámites para el desarrollo y adecuación de terrenos, garantizando la infraestructura vial y de servicios.' },
            { icon: 'foundation', title: 'Licencias de Construcción', desc: 'Obra nueva, ampliación, adecuación, modificación, restauración y reforzamiento estructural.' },
            { icon: 'history_edu', title: 'Reconocimientos', desc: 'Legalización de construcciones existentes para dar cumplimiento a las normas urbanísticas.' },
        ]}
    />;
}
