import React from 'react';
import { Link } from 'react-router-dom';
import IgescolNavbar from '../components/IgescolNavbar';
import IgescolFooter from '../components/IgescolFooter';
import EditableText from '../components/Editable';
import { useCMS } from '../hooks/useCMS';
import '../styles/stitch.css';

const S = { primary: '#00B4D8', secondary: '#0C2340', container: { maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' } };

const heroImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuAUZVsa1Ibf5TuLWoc9hQ0i1RmadaJDw4cwVrPpo_Vyg0sMe2D8JV_f5FZaaFAH2JLjqfTXgi_2cAYwab5gSYu85LsjdexqjDo9zkQ3s5_wX-zUau8SjqbSoy0J9cViybYiR3FQny91Dt_aSfBg_zhBxQtAiOkIb7cm4UL3sb_9frB5sMgP03YHfuk_FWl09Trk4al4st_8y7-5Ox20rCfCqmo_TK5ArmrxZT0bbjIRGvw2a24j9rCeBBye03mXp6d8QUMFTGjqwBHy";
const presentImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuDmIVsyLcJEFOw4vk39n6t9-4_bY29KAejA1DGO-D5RY29qowzFjPIORayk_oKgAKYpGUYFTVprCr5OwcZEzB6MzHdDjULPYe7O_Ze1rb72pAHcUjMBIE8gzhE5B5hkHD_VucyFy1kc3o7liMZ2h1DsnDbYSqz98hJddWsB-8KKAAjuahdDnGLYf5R5BW9rBMgAOO1qebIHbodaMvGBk1SSZFhxsACnTResOxTXs28lailauapdFZznJTiGdqOe-39MyDTdNmjNweZZ";

export default function NosotrosPage() {
    const { content } = useCMS();

    return (
        <div style={{ fontFamily: "'Montserrat', sans-serif", background: '#f6f7f8', color: '#1e293b' }}>
            <IgescolNavbar />
            <section style={{ position: 'relative', height: '400px', display: 'flex', alignItems: 'center', overflow: 'hidden', background: S.secondary, marginTop: '160px' }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
                    <img src={heroImg} alt="Nosotros" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${S.secondary}, rgba(12,35,64,0.6), transparent)` }} />
                <div style={{ ...S.container, position: 'relative', zIndex: 1, width: '100%' }}>
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1rem' }}>
                        <Link to="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Inicio</Link>
                        <span style={{ color: S.primary, margin: '0 4px' }}>/</span>
                        <span style={{ color: 'white' }}>Nosotros</span>
                    </nav>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, color: 'white', lineHeight: 1.1 }}>
                        <EditableText section="about" field="history_title">{content.about?.history_title || "Nuestra Historia"}</EditableText>
                    </h1>
                    <p style={{ marginTop: '1rem', fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', maxWidth: '40rem' }}>
                        <EditableText section="about" field="history_subtitle">{content.about?.history_subtitle || "Lideramos la transformación técnica de la construcción en la región."}</EditableText>
                    </p>
                </div>
            </section>
            <section style={{ padding: '6rem 0', background: 'white' }}>
                <div style={S.container}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <span style={{ color: S.primary, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem' }}>Presentación Institucional</span>
                            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 900, color: S.secondary, marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                                <EditableText section="about" field="about_title_1">{content.about?.about_title_1 || "Excelencia técnica con visión de futuro"}</EditableText>
                            </h2>
                            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                                <EditableText section="about" field="about_text_1">{content.about?.about_text_1 || "En IGESCOL nos especializamos en la gestión integral de proyectos de infraestructura. Nuestra trayectoria se define por el compromiso con la calidad constructiva y el cumplimiento riguroso de los estándares internacionales."}</EditableText>
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                                {[{ val: '+150', label: 'Proyectos Finalizados' }, { val: '100%', label: 'Cumplimiento BIM' }].map((stat, i) => (
                                    <div key={i} style={{ padding: '1.5rem', background: '#f6f7f8', borderRadius: '12px', borderLeft: `4px solid ${S.primary}` }}>
                                        <div style={{ fontSize: '1.875rem', fontWeight: 900, color: S.secondary }}>{stat.val}</div>
                                        <div style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 500 }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}>
                                <img src={presentImg} alt="IGESCOL" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem', background: `linear-gradient(to top, ${S.secondary}, transparent)` }}>
                                    <p style={{ color: 'white', fontWeight: 500, fontStyle: 'italic', margin: 0 }}>"Transformamos planos en realidades tangibles y sostenibles."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section style={{ padding: '6rem 0', background: '#f6f7f8' }}>
                <div style={S.container}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 900, color: S.secondary }}>Nuestros Pilares Estratégicos</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {[
                            { icon: 'precision_manufacturing', title: 'Constructibilidad', desc: 'Análisis riguroso desde la etapa de diseño para optimizar procesos constructivos.' },
                            { icon: 'eco', title: 'Sostenibilidad', desc: 'Integración de prácticas eco-eficientes y certificaciones internacionales.' },
                            { icon: 'layers', title: 'Coordinación BIM', desc: 'Digitalización total del ciclo de vida del proyecto mediante BIM 7D.' },
                        ].map((item, i) => (
                            <div key={i} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(12,35,64,0.05)', transition: 'all 0.3s' }}
                                onMouseOver={e => { e.currentTarget.style.borderColor = S.primary; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)'; }}
                                onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(12,35,64,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                <div style={{ width: '56px', height: '56px', background: 'rgba(0,180,216,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: S.primary, marginBottom: '1.5rem' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.875rem' }}>{item.icon}</span>
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: S.secondary }}>{item.title}</h3>
                                <p style={{ color: '#64748b', lineHeight: 1.7 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section style={{ padding: '6rem 0', background: 'white' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 900, color: S.secondary }}>Nuestra Trayectoria</h2>
                        <div style={{ width: '6rem', height: '4px', background: S.primary, margin: '1rem auto 0' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        {[
                            { year: '2010', title: 'Fundación', desc: 'Iniciamos operaciones con el firme propósito de profesionalizar la gestión de obras.' },
                            { year: '2016', title: 'Estandarización BIM', desc: 'Migración total de nuestros procesos a entornos colaborativos digitales BIM.' },
                            { year: 'Hoy', title: 'Referente Regional', desc: 'Consolidados como líderes en coordinación técnica y constructibilidad.' },
                        ].map((m, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                <div style={{ textAlign: 'right', width: '80px', flexShrink: 0 }}>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 900, color: S.primary }}>{m.year}</span>
                                </div>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: S.primary, border: '4px solid white', boxShadow: '0 4px 15px rgba(0,0,0,0.15)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }} />
                                </div>
                                <div style={{ background: '#f6f7f8', padding: '1.5rem', borderRadius: '16px', flex: 1 }}>
                                    <h4 style={{ fontWeight: 700, color: S.secondary, marginBottom: '0.5rem' }}>{m.title}</h4>
                                    <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>{m.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section style={{ background: S.primary, padding: '4rem 0', textAlign: 'center' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: 'white', marginBottom: '1.5rem' }}>¿Listo para elevar el estándar técnico de su próximo proyecto?</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link to="/cotizacion" style={{ background: S.secondary, color: 'white', padding: '1rem 2.5rem', borderRadius: '12px', textDecoration: 'none', fontWeight: 700, fontSize: '0.875rem' }}>
                            Hablar con un experto
                        </Link>
                        <Link to="/" style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '1rem 2.5rem', borderRadius: '12px', textDecoration: 'none', fontWeight: 700, fontSize: '0.875rem' }}>
                            Ver Portafolio
                        </Link>
                    </div>
                </div>
            </section>
            <IgescolFooter />
        </div>
    );
}
