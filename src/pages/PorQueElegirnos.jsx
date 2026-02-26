import React from 'react';
import { Link } from 'react-router-dom';
import IgescolNavbar from '../components/IgescolNavbar';
import IgescolFooter from '../components/IgescolFooter';
import '../styles/stitch.css';

const S = { primary: '#00B4D8', secondary: '#0C2340', container: { maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' } };

const reasons = [
    { id: 'diagnostico', icon: 'analytics', title: 'Diagnóstico Técnico', desc: 'Evaluación exhaustiva del estado actual de su proyecto utilizando herramientas de medición de precisión y software de modelado.', checks: ['Auditoría de pre-factibilidad técnica.', 'Levantamiento topográfico y estructural detallado.', 'Análisis de normatividad vigente aplicable.'] },
    { id: 'propuesta', icon: 'account_balance_wallet', title: 'Propuesta Estructurada', desc: 'Desarrollamos una estructura financiera y técnica robusta. Desglosamos cada fase del proyecto para ofrecer transparencia total.', checks: ['Desglose detallado de mano de obra y materiales.', 'Cronograma de ejecución optimizado.', 'Análisis de riesgos financieros.'] },
    { id: 'soluciones', icon: 'construction', title: 'Soluciones a la Medida', desc: 'Personalizamos cada aspecto de la ingeniería para que el resultado refleje su visión y necesidades operativas.', checks: ['100% adaptabilidad a requerimientos específicos.', 'Modelado BIM personalizado.', 'Integración de sistemas sostenibles.'] },
    { id: 'acompanamiento', icon: 'support_agent', title: 'Acompañamiento Profesional', desc: 'Ofrecemos acompañamiento continuo durante la ejecución y post-entrega. Nuestro equipo está siempre disponible.', checks: ['Canales de comunicación abiertos 24/7.', 'Garantía técnica sobre todas las recomendaciones.', 'Soporte post-entrega incluido.'] },
];

export default function PorQueElegirnos() {
    return (
        <div style={{ fontFamily: "'Montserrat', sans-serif", background: '#fff', color: '#475569' }}>
            <IgescolNavbar />
            <header className="topo-bg" style={{ paddingTop: '12rem', paddingBottom: '5rem', background: 'white', borderBottom: '1px solid #f1f5f9', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', top: '5rem', right: '5rem', width: '24rem', height: '24rem', background: 'rgba(0,180,216,0.05)', borderRadius: '50%', filter: 'blur(48px)' }} />
                </div>
                <div style={{ ...S.container, position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <div style={{ display: 'inline-block', padding: '4px 16px', borderRadius: '9999px', background: 'rgba(0,180,216,0.1)', color: S.primary, fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Excelencia &amp; Compromiso</div>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, color: S.secondary, lineHeight: 1.1, marginBottom: '2rem' }}>
                        POR QUÉ ELEGIR <br />
                        <span style={{ background: `linear-gradient(to right, ${S.primary}, ${S.secondary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>IGESCOL</span>
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: '#475569', maxWidth: '40rem', margin: '0 auto', fontWeight: 300 }}>
                        Más que una consultora de ingeniería, somos su aliado estratégico para materializar proyectos con rigor técnico.
                    </p>
                </div>
            </header>
            {reasons.map((reason, idx) => (
                <section key={idx} id={reason.id} style={{ padding: '6rem 0', background: idx % 2 === 0 ? 'white' : '#f8fafc', scrollMarginTop: '120px' }}>
                    <div style={S.container}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'flex-start' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: S.secondary, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(12,35,64,0.3)' }}>
                                        <span className="material-symbols-outlined">{reason.icon}</span>
                                    </div>
                                    <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: S.secondary, margin: 0 }}>{reason.title}</h2>
                                </div>
                                <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>{reason.desc}</p>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                                    {reason.checks.map((c, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                            <span className="material-symbols-outlined" style={{ color: S.primary, marginTop: '2px', flexShrink: 0 }}>check_circle</span>
                                            <span style={{ color: '#475569' }}>{c}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/cotizacion" style={{ color: S.secondary, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                                    SOLICITAR CONSULTA <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_forward</span>
                                </Link>
                            </div>
                            <div style={{ background: idx % 2 === 0 ? '#f8fafc' : 'white', borderRadius: '24px', padding: '2.5rem', border: '1px solid #f1f5f9' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                        <div style={{ width: '56px', height: '56px', background: S.primary, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '1.875rem' }}>{reason.icon}</span>
                                        </div>
                                        <div>
                                            <h3 style={{ fontWeight: 700, color: S.secondary, marginBottom: '0.5rem' }}>{reason.title}</h3>
                                            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Nuestro equipo aplica las mejores prácticas de la industria en cada etapa del proyecto.</p>
                                        </div>
                                    </div>
                                    <div style={{ height: '1px', background: '#f1f5f9' }} />
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        {[{ val: '98%', label: 'Satisfacción cliente' }, { val: '+150', label: 'Proyectos entregados' }].map((stat, i) => (
                                            <div key={i} style={{ textAlign: 'center', padding: '1rem', background: 'rgba(0,180,216,0.05)', borderRadius: '12px' }}>
                                                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: S.primary }}>{stat.val}</div>
                                                <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 500 }}>{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
            <section style={{ padding: '5rem 0', background: S.secondary, textAlign: 'center' }}>
                <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 1.5rem' }}>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 900, color: 'white', marginBottom: '1.5rem' }}>¿Listo para comenzar con el pie derecho?</h2>
                    <p style={{ color: '#d1d5db', fontSize: '1.1rem', marginBottom: '2.5rem' }}>Únase a la lista de clientes satisfechos que han confiado en IGESCOL.</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link to="/cotizacion" style={{ background: S.primary, color: 'white', fontWeight: 700, padding: '1rem 2rem', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 8px 20px rgba(0,180,216,0.3)', fontSize: '0.875rem' }}>
                            SOLICITAR COTIZACIÓN
                        </Link>
                        <Link to="/" style={{ background: 'transparent', border: `2px solid ${S.primary}`, color: S.primary, fontWeight: 700, padding: '1rem 2rem', borderRadius: '12px', textDecoration: 'none', fontSize: '0.875rem' }}>
                            VER PORTAFOLIO
                        </Link>
                    </div>
                </div>
            </section>
            <IgescolFooter />
        </div>
    );
}
