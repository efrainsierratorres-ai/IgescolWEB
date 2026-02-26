import React from 'react';
import { Link } from 'react-router-dom';
import IgescolNavbar from '../components/IgescolNavbar';
import IgescolFooter from '../components/IgescolFooter';
import '../styles/stitch.css';

const S = { primary: '#00B4D8', secondary: '#0C2340', container: { maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' } };

const IMGS = {
    d1: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_v7gpM-ptf5ZVypXKi0czzsE_9cGfedcckqAkGf4LCiDgDuwT9ska7dRvbeE7nh9XBxzGQScF7bT8t_LpaftNfFXS_Z36GZiLaQMgsVyrfp-BgMubZt5W_OnNOoo110H6X_9kd8sb7E4RtvRgXwNe_N4PMLEwfF0RTofQNqAVEcUuBE7pzSFOmGGxCOvmqwreQbdMFpnX7ztVqepvQtKOh2V319J5J53ExtxHoi6e1ILW0rQup_JeSE0awQJfkbGTB8WyFkwtDTUi",
    d2: "https://lh3.googleusercontent.com/aida-public/AB6AXuBR69zX6bHFBE-1W3_MANz_Am8eqE-HAVIZQDlgHLcDrjAIqeRtltq4-rjTHYOzz8uZfCFIaegnZTLxN7dM0EST8dRmFZiYgaOBNep61C76XT-Z9UzT3SFLPVAm-4HpzZobCkDqW3agsCuewRWy9mxUUnFaLG5vP0L_iAbgsZV2nPBWYx0maYArpk9QkQRuuu4r9s4fnFCwp4QcqwrzDDDFel50MYjYDvbA2KC6vOzDW6PZnIGas4KCm_a0RVYkVREDHvijvt8UqjAG",
    d3: "https://lh3.googleusercontent.com/aida-public/AB6AXuCp6p9OUxuBloFa8ilPCOYL5t3HwSecAAzn0ZHnvmMUlIPaYpLe_ilWiv1qCmYMJluysKsEGL823hXXrk6pCdJG5AZMRPRusbQ_-euEkENsWlv2SDppYrGzx3dcMuZC9bubaGFbsBWQ5XQ5Y5jwI0JSZpFqfC6txYvO3yedlmXxQkHiefUDhxyXwrnTV1udSJPg6VMS5qGqZbkiMuoXvRV3W-UGtV16uxjLO3tDfWCmmFsmw7mbieusZpI18w59ljpRwuntWHxsXTi5",
};

const steps = [
    { num: '01', icon: 'search', title: 'DIAGNÓSTICO', desc: 'Análisis exhaustivo de las condiciones existentes, normativa aplicable y viabilidad técnica.', deliverables: ['Informe de pre-factibilidad técnica', 'Levantamiento topográfico preliminar', 'Análisis de normativa urbanística'], articles: ['Importancia de la topografía inicial', 'Normativa urbana 2024', 'Estudios de suelos'], img: IMGS.d1 },
    { num: '02', icon: 'edit_note', title: 'PROPUESTA', desc: 'Solución técnica integrando metodología BIM para coordinación interdisciplinaria y optimización de recursos.', deliverables: ['Anteproyecto arquitectónico', 'Modelo BIM 3D coordinado', 'Presupuesto detallado'], articles: ['Coordinación BIM en estructuras', 'Optimización energética', 'Ingeniería de valor'], img: IMGS.d2 },
    { num: '03', icon: 'settings', title: 'EJECUCIÓN', desc: 'Implementación rigurosa bajo estricta supervisión técnica, asegurando calidad y cumplimiento de cronogramas.', deliverables: ['Supervisión técnica continua', 'Informes de avance semanales', 'Control de calidad en obra'], articles: ['Seguridad industrial en obra', 'Bitácora de obra', 'Eficiencia logística'], img: IMGS.d3 },
    { num: '04', icon: 'inventory_2', title: 'ENTREGA', desc: 'Cierre formal con garantía de calidad, entrega de dossier técnico completo y manuales de operación.', deliverables: ['Control de calidad final', 'Dossier técnico As-Built', 'Manuales de operación'], articles: ['Mantenimiento preventivo', 'Ciclo de vida', 'Documentación As-Built'], img: IMGS.d1 },
];

export default function NuestroProcesoPage() {
    return (
        <div style={{ fontFamily: "'Montserrat', sans-serif", background: '#fff', color: '#475569' }}>
            <IgescolNavbar />
            <header className="topo-bg" style={{ paddingTop: '12rem', paddingBottom: '5rem', background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ ...S.container, textAlign: 'center' }}>
                    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b', marginBottom: '2rem' }}>
                        <Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px', verticalAlign: 'middle' }}>home</span> Inicio
                        </Link>
                        <span className="material-symbols-outlined" style={{ color: '#94a3b8', fontSize: '16px' }}>chevron_right</span>
                        <span style={{ color: S.primary, fontWeight: 700 }}>Proceso</span>
                    </nav>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: S.secondary, marginBottom: '1.5rem' }}>Nuestro Proceso de Trabajo</h1>
                    <p style={{ fontSize: '1.25rem', color: '#475569', maxWidth: '48rem', margin: '0 auto', fontWeight: 300 }}>Metodología estructurada orientada a resultados técnicos y constructibilidad</p>
                </div>
            </header>
            {steps.map((step, idx) => (
                <section key={idx} style={{ padding: '6rem 0', background: idx % 2 === 0 ? 'white' : '#f8fafc', borderTop: idx > 0 ? '1px solid #f1f5f9' : 'none' }}>
                    <div style={S.container}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'flex-start' }}>
                            <div style={{ position: 'relative' }}>
                                <div style={{ fontSize: '10rem', fontWeight: 900, color: 'rgba(0,0,0,0.03)', position: 'absolute', top: '-4rem', left: '-1rem', lineHeight: 1, userSelect: 'none' }}>{step.num}</div>
                                <div style={{ position: 'relative', zIndex: 1 }}>
                                    <div style={{ width: '80px', height: '80px', background: 'rgba(0,180,216,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', color: S.primary }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '2.5rem' }}>{step.icon}</span>
                                    </div>
                                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: S.secondary, marginBottom: '1.5rem' }}>{step.title}</h2>
                                    <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>{step.desc}</p>
                                    <h3 style={{ fontWeight: 700, color: S.secondary, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span className="material-symbols-outlined" style={{ color: S.primary }}>inventory_2</span> Entregables:
                                    </h3>
                                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {step.deliverables.map((d, i) => (
                                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <span className="material-symbols-outlined" style={{ color: S.primary, fontSize: '14px' }}>check_circle</span>
                                                <span>{d}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '2rem', height: '18rem' }}>
                                    <img src={step.img} alt={step.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Artículos Relacionados</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {step.articles.map((a, i) => (
                                        <div key={i} style={{ padding: '1rem', background: idx % 2 === 0 ? '#f8fafc' : 'white', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                                            onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)'}
                                            onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}>
                                            <span style={{ fontWeight: 600, color: S.secondary, fontSize: '0.9rem' }}>{a}</span>
                                            <span className="material-symbols-outlined" style={{ color: S.primary, fontSize: '18px' }}>arrow_forward</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
            <section style={{ padding: '6rem 0', background: S.secondary, textAlign: 'center' }}>
                <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 1.5rem' }}>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 900, color: 'white', marginBottom: '2rem' }}>¿Listo para iniciar su próximo proyecto?</h2>
                    <p style={{ color: '#d1d5db', fontSize: '1.25rem', marginBottom: '3rem' }}>Nuestro equipo de expertos está preparado para llevar su visión a la realidad.</p>
                    <Link to="/cotizacion" style={{ background: S.primary, color: 'white', fontWeight: 900, padding: '1.25rem 3rem', borderRadius: '9999px', textDecoration: 'none', fontSize: '1.1rem', boxShadow: '0 20px 40px rgba(0,180,216,0.3)', display: 'inline-block' }}>
                        SOLICITAR COTIZACIÓN
                    </Link>
                </div>
            </section>
            <IgescolFooter />
        </div>
    );
}
