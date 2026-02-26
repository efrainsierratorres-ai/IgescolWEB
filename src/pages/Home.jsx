import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IgescolNavbar from '../components/IgescolNavbar';
import IgescolFooter from '../components/IgescolFooter';
import EditableText from '../components/Editable';
import { useCMS } from '../hooks/useCMS';
import { useAuth } from '../hooks/useAuth';
import '../styles/stitch.css';

const IMGS = {
    hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuAle6GYvgdcZon18_NbyhO5Mc-ROs2cxAEC6LcemPERVMU9bx3jB9TWsQhxC7uKw_aq0W7k3misyDgF3V2TFt7j3mPDS1yz1kIcSylxFOnek6FHDhXLncGSq__a6DkEgT-FNQqnQM0uCpHtldnEYOMgVF6qQQFcuvKUhOEsFPitwlAwr6yqa3yPKE9h0sDv3mfnp_oJum16N9N4Sy8HAGCrLYDX-fcr30Ty2XLA2QOvKSkYp4kC_M4s17X_K4NHTlAlZ35HDf70jhsD",
    licencias: "https://lh3.googleusercontent.com/aida-public/AB6AXuCu9N9RNkTMJ8gkcVD6t0jvSkXwOR0WCuIv0RCDYxOJg6IzLK5KoVdlP9Q6USJH2ndE6IcQsnJinXJadjsxKtSZ1K-367oMRZP1MkTG3OQlPZOU-kpKzFeJ-mH0l-_1qFWxM8ZMUXV4KttlBrk1k-HfaoukGNN-0vAYc3EUt7VA9bMm0dxZV8F2FzH7rJtWhVhStwcuai5kPYC5mIhnrYpaOOF3avRIPjxM1d--iZfnc-lTFLfHHsIP86XDHH727GmT68m81sL5K8X9",
    infraestructura: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSs18x3QPLS_d3576w9xgkqqRsgHAx-W5hnU7SvefsGtYjW_3T1o5zOFsttKagCJeSVkZCqEE_VmIBsF0QOO7VfmJ2g2WL-Y_SMH2SBaMQQi8lWg2KNodZIdKdM0pyDm2LlekYDqiY_j4yM0Uhwu4q1gMIsTiZMmCjuc71V1yHfKReGsiEXfiEuOPTmLSkQ7VRQ-223vTwzWC0MvBPBLcdGadkKvGaZv1YLVguuMJe6x05-Z2LwfgbmofdBRTvToZaakW5Wn-14s5N",
    domotica: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRdy5lRwiivqf5Lemm05sSBV0YccwiXJOIbGtsk4crLCYx5AA1KQYVK_1g3AJlKKj1Ag2C6oSIYMGsStwvETHh9-tNoubC2AlGPy8D77AgyaVpw7uowR0aZ8N_jk20iCuPvFsdAZWm3NOjWj_23BrA-PbrkhOAX0SkMSIbqqsqCp_fK1a2sng92jeEK__SLwZufowtZJzmr-hA095FbUS6KGXWwK_AdGJ6qJZGAqQeHyVVk0m35ytpArY-ztLr3H-KUJA2o9Di9X99",
    diseno: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_v7gpM-ptf5ZVypXKi0czzsE_9cGfedcckqAkGf4LCiDgDuwT9ska7dRvbeE7nh9XBxzGQScF7bT8t_LpaftNfFXS_Z36GZiLaQMgsVyrfp-BgMubZt5W_OnNOoo110H6X_9kd8sb7E4RtvRgXwNe_N4PMLEwfF0RTofQNqAVEcUuBE7pzSFOmGGxCOvmqwreQbdMFpnX7ztVqepvQtKOh2V319J5J53ExtxHoi6e1ILW0rQup_JeSE0awQJfkbGTB8WyFkwtDTUi",
    nosotros1: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_v7gpM-ptf5ZVypXKi0czzsE_9cGfedcckqAkGf4LCiDgDuwT9ska7dRvbeE7nh9XBxzGQScF7bT8t_LpaftNfFXS_Z36GZiLaQMgsVyrfp-BgMubZt5W_OnNOoo110H6X_9kd8sb7E4RtvRgXwNe_N4PMLEwfF0RTofQNqAVEcUuBE7pzSFOmGGxCOvmqwreQbdMFpnX7ztVqepvQtKOh2V319J5J53ExtxHoi6e1ILW0rQup_JeSE0awQJfkbGTB8WyFkwtDTUi",
    nosotros2: "https://lh3.googleusercontent.com/aida-public/AB6AXuCp6p9OUxuBloFa8ilPCOYL5t3HwSecAAzn0ZHnvmMUlIPaYpLe_ilWiv1qCmYMJluysKsEGL823hXXrk6pCdJG5AZMRPRusbQ_-euEkENsWlv2SDppYrGzx3dcMuZC9bubaGFbsBWQ5XQ5Y5jwI0JSZpFqfC6txYvO3yedlmXxQkHiefUDhxyXwrnTV1udSJPg6VMS5qGqZbkiMuoXvRV3W-UGtV16uxjLO3tDfWCmmFsmw7mbieusZpI18w59ljpRwuntWHxsXTi5",
    p1: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZf_3qTI-tUOmB7c42UvQ_kO4ID2lWPwE3yCLZI6oluHGi7T2z4mnlaRKRapSiTqIJ-fW-7n2TKYpUjccu3RLqcPleraFOHI_L7MEvPArK6XDqc9FTZKU4kiiXipc8wsQU3Q3SjgRUkhbWmMdq63WBxiXgDcnuGXceMb49q8nurW0xKONCUzovV78c8I6EkA8vpxFju5SPL2DtbGlZ4EpYrFjTf14sxShurxllsxYLRyNrJewQ7RxzFu90wCbO8NIUboW8LiVKS0dC",
    p2: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTMZZKZ888e0JdXK4ya0OBHK91PbwwmBS75ScynydsVuCzN9f5_f0bezp6LnsIGl5LWPDSvzXLYkdmJDjA4GMD9CR7hqNLNGGu0LICTcuoTNW3ne-6Cj8KZvSRFkOVy0JOE0qvVtasCc8Suichy2Vo2Zpw0j6XuHfL2HLC2wy9ocSavG7NmCBYwH2K8y2ZPCXjEEPrkBjXk7MmI-4uY8SWRCX4Fbqqpd6RKj45i6Ty1ya1A19yKr-Nx1hYsTdtzYLiEVejE--upX5n",
    p3: "https://lh3.googleusercontent.com/aida-public/AB6AXuBU1zqxvB3VuCDEOvjVfqTJqGl5KXVpLZ88sbzy7dX810nhzO9i2_JB8rWe8REAxPCRrOvdkZ4Z-LDq00wXTJXoFvD0aSD4F75YLphY2jfhFyY2GyBh0clWuV4Miq2Ibuv9HqtsHSbEGJ9bcpz0y6XgPEuVL5q7NIBRZXLVi6yf7AGC_kl9nY6DskQ1WXxo2YKN_BlnPrf9uOxxeI9njgU5lCZWVruOJG57LjGgJx9iwPKg4jrXbEqjGnBv8EKKxz57X4SVWpArKo0D",
    p4: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuSh4v_IrW-eOTbH590fDLQCQKAraXFYA3Oo8twwIyu2J0jd2WaU0HS9lR49kmK1czkv61M6p6-8hjRFlccxnU6KDsKYeg0HMIA6126Iq6sVL5Cp0PIRvVBfjcyDZa-aN2JjH4uxx5AYdk8AjxNLIXyr3Fs3Nb4d-DUa-tb1Nok80r_vTFjOSV9r6fCu1-HgG76Vejm0Fa51AOEazsI6tfOGwR7r8ElijRWMs4XmmjS67sH35cHB3HZbKmb-1IZeLFT8lWJ8kz82wI",
};

const S = {
    page: { fontFamily: "'Montserrat', sans-serif", background: '#fff', color: '#475569' },
    container: { maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' },
    primary: '#00B4D8',
    secondary: '#0C2340',
};

function ServiceCard({ img, title, desc, to, clipClass }) {
    return (
        <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9', transition: 'all 0.4s' }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ height: '16rem', overflow: 'hidden', position: 'relative' }} className={clipClass}>
                <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
                    onMouseOver={e => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={e => e.target.style.transform = 'scale(1)'} />
            </div>
            <div style={{ padding: '2.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0C2340', marginBottom: '1rem' }}>{title}</h3>
                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>{desc}</p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <Link to={to} style={{ background: S.primary, color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '0.75rem 1.5rem', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.2s' }}>SABER MÁS</Link>
                    <Link to="/cotizacion" style={{ background: 'transparent', border: `1px solid rgba(0,180,216,0.3)`, color: S.primary, fontSize: '0.75rem', fontWeight: 700, padding: '0.75rem 1.5rem', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.2s' }}>COTIZAR</Link>
                </div>
            </div>
        </div>
    );
}

function ProjectCard({ img, tag, title, desc, to }) {
    return (
        <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', transition: 'all 0.3s', display: 'flex', flexDirection: 'column' }}
            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.12)'; }}
            onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.06)'; }}>
            <div style={{ height: '16rem', overflow: 'hidden', position: 'relative' }}>
                <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
                    onMouseOver={e => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={e => e.target.style.transform = 'scale(1)'} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(12,35,64,0.1)', transition: 'background 0.3s' }} />
            </div>
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <span style={{ display: 'inline-block', background: 'rgba(0,180,216,0.1)', color: S.primary, fontSize: '0.7rem', fontWeight: 700, padding: '4px 12px', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>{tag}</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: S.secondary, marginBottom: '0.75rem' }}>{title}</h3>
                <p style={{ color: '#475569', fontSize: '0.875rem', marginBottom: '1.5rem', flexGrow: 1 }}>{desc}</p>
                <Link to={to} style={{ color: S.primary, fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Ver más <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </Link>
            </div>
        </div>
    );
}

export default function Home({ forceEdit = false }) {
    const { profile } = useAuth();
    const { content, loading } = useCMS();

    const [form, setForm] = useState({ nombre: '', asunto: '', email: '', mensaje: '' });

    const services = [
        { img: IMGS.licencias, title: content.services?.service1_title || 'Licencias de Construcción', desc: content.services?.service1_desc || 'Gestión integral de licencias de construcción, trámites y permisos para asegurar el cumplimiento normativo.', to: '/servicios/licencias', clipClass: 'clip-diagonal' },
        { img: IMGS.diseno, title: content.services?.service2_title || 'Diseño de Estructuras', desc: content.services?.service2_desc || 'Cálculo y diseño estructural avanzado utilizando metodología BIM para garantizar solidez y seguridad.', to: '/servicios/diseno-estructural', clipClass: 'clip-diagonal-reverse' },
        { img: IMGS.infraestructura, title: content.services?.service3_title || 'Infraestructura Vial', desc: content.services?.service3_desc || 'Diseño y planificación de infraestructura vial para optimizar la conectividad y el desarrollo urbano sostenible.', to: '/servicios/infraestructura', clipClass: 'clip-diagonal' },
        { img: IMGS.domotica, title: content.services?.service4_title || 'Domótica Residencial', desc: content.services?.service4_desc || 'Sistemas de automatización inteligente para el hogar, mejorando el confort y la eficiencia energética.', to: '/servicios/domotica', clipClass: 'clip-diagonal-reverse' },
    ];

    const projects = [
        { img: IMGS.p1, tag: 'Infraestructura Vial', title: 'Conexión Vial Región Sur', desc: 'Desarrollo y modernización de corredores viales para mejorar la conectividad regional.', to: '/servicios/infraestructura' },
        { img: IMGS.p2, tag: 'Licencias', title: 'Altos del Norte', desc: 'Gestión integral de licencias y permisos para complejo residencial de alta densidad.', to: '/servicios/licencias' },
        { img: IMGS.p3, tag: 'Domótica', title: 'Smart Home Systems', desc: 'Implementación de sistemas inteligentes de automatización para viviendas modernas.', to: '/servicios/domotica' },
        { img: IMGS.p4, tag: 'Infraestructura', title: 'Intersección 80', desc: 'Diseño y optimización de flujos vehiculares en intersecciones urbanas críticas.', to: '/servicios/infraestructura' },
        { img: IMGS.nosotros2, tag: 'Comercial', title: 'Centro Comercial Plaza', desc: 'Consultoría integral para el desarrollo de grandes superficies comerciales.', to: '/proyectos' },
        { img: IMGS.diseno, tag: 'Estructural', title: 'Seguridad Avanzada', desc: 'Implementación de protocolos y sistemas de seguridad electrónica de última generación.', to: '/servicios/diseno-estructural' },
    ];

    const whyCards = [
        { id: 'diagnostico', icon: 'plumbing', title: content.whyus?.card1_title || 'Diagnóstico Técnico', desc: content.whyus?.card1_desc || 'Evaluación precisa del estado actual para identificar necesidades reales.' },
        { id: 'propuesta', icon: 'assignment', title: content.whyus?.card2_title || 'Propuesta Estructurada', desc: content.whyus?.card2_desc || 'Planificación detallada optimizando recursos y tiempos de ejecución.' },
        { id: 'soluciones', icon: 'build_circle', title: content.whyus?.card3_title || 'Soluciones a Medida', desc: content.whyus?.card3_desc || 'Adaptamos cada proyecto a los requerimientos específicos del cliente.' },
        { id: 'acompanamiento', icon: 'support_agent', title: content.whyus?.card4_title || 'Acompañamiento', desc: content.whyus?.card4_desc || 'Asesoría profesional continua durante todas las etapas del proyecto.' },
    ];

    const processSteps = [
        { num: '01', icon: 'search', title: content.process?.step1_title || 'Diagnóstico', desc: content.process?.step1_desc || 'Análisis detallado de los requerimientos y condiciones iniciales del proyecto.', rotate: 'rotate(3deg)' },
        { num: '02', icon: 'edit_note', title: content.process?.step2_title || 'Propuesta', desc: content.process?.step2_desc || 'Diseño de la solución técnica y económica adaptada a las necesidades.', rotate: 'rotate(-3deg)' },
        { num: '03', icon: 'settings', title: content.process?.step3_title || 'Ejecución', desc: content.process?.step3_desc || 'Implementación rigurosa del plan establecido con altos estándares.', rotate: 'rotate(6deg)' },
        { num: '04', icon: 'inventory_2', title: content.process?.step4_title || 'Entrega', desc: content.process?.step4_desc || 'Finalización exitosa y entrega formal del proyecto al cliente.', rotate: 'rotate(-6deg)' },
    ];

    return (
        <div style={S.page}>
            <IgescolNavbar />

            {/* ===== HERO ===== */}
            <header className="topo-bg" style={{ paddingTop: '12rem', paddingBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', top: '5rem', right: '5rem', width: '24rem', height: '24rem', background: 'rgba(0,180,216,0.05)', borderRadius: '50%', filter: 'blur(48px)' }} />
                    <div style={{ position: 'absolute', bottom: '2.5rem', right: '10rem', width: '20rem', height: '20rem', background: 'rgba(12,35,64,0.05)', borderRadius: '50%', filter: 'blur(48px)' }} />
                </div>
                <div style={{ ...S.container, position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', alignItems: 'center' }} className="hero-flex">
                        <div style={{ textAlign: 'center' }} className="hero-text">
                            <div style={{ display: 'inline-block', padding: '4px 16px', borderRadius: '9999px', background: 'rgba(0,180,216,0.1)', color: S.primary, fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                                <EditableText section="hero" field="subtitle_top">{content.hero?.subtitle_top || "Innovación e Ingeniería"}</EditableText>
                            </div>
                            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, color: S.secondary, lineHeight: 1.1, marginBottom: '2rem' }}>
                                <EditableText section="hero" field="title_line1">{content.hero?.title_line1 || "CONSULTORÍA"}</EditableText> <br />
                                <span style={{ background: `linear-gradient(to right, ${S.primary}, ${S.secondary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                    <EditableText section="hero" field="title_line2">{content.hero?.title_line2 || "INTEGRAL EN"}</EditableText>
                                </span> <br />
                                <EditableText section="hero" field="title_line3">{content.hero?.title_line3 || "INGENIERÍA"}</EditableText>
                            </h1>
                            <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '2.5rem', maxWidth: '36rem', margin: '0 auto 2.5rem', lineHeight: 1.7, fontWeight: 300 }}>
                                <EditableText section="hero" field="description">{content.hero?.description || "Optimizamos sus proyectos de construcción con soluciones tecnológicas avanzadas y gestión de licencias experta."}</EditableText>
                            </p>
                            <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link to="/nosotros" style={{ background: S.primary, color: 'white', fontWeight: 700, padding: '1rem 2.5rem', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 10px 30px rgba(0,180,216,0.2)', transition: 'all 0.3s', fontSize: '0.875rem' }}
                                    onMouseOver={e => { e.currentTarget.style.background = S.secondary; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                    onMouseOut={e => { e.currentTarget.style.background = S.primary; e.currentTarget.style.transform = 'translateY(0)'; }}>
                                    MÁS INFORMACIÓN
                                </Link>
                                <Link to="/cotizacion" style={{ background: 'white', border: `2px solid ${S.primary}`, color: S.primary, fontWeight: 700, padding: '1rem 2.5rem', borderRadius: '12px', textDecoration: 'none', transition: 'all 0.3s', fontSize: '0.875rem' }}
                                    onMouseOver={e => { e.currentTarget.style.background = S.primary; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                    onMouseOut={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = S.primary; e.currentTarget.style.transform = 'translateY(0)'; }}>
                                    COTIZAR
                                </Link>
                            </div>
                        </div>
                        <div style={{ position: 'relative', maxWidth: '480px', width: '100%' }}>
                            <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.15)', transform: 'rotate(3deg)', transition: 'transform 0.7s' }}
                                onMouseOver={e => e.currentTarget.style.transform = 'rotate(0deg)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'rotate(3deg)'}>
                                <img src={IMGS.hero} alt="Ingeniería" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
                            </div>
                            <div style={{ position: 'absolute', bottom: '-1.25rem', left: '-1.25rem', width: '8rem', height: '8rem', background: S.secondary, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(12,35,64,0.3)', zIndex: 10 }}>
                                <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '3rem' }}>precision_manufacturing</span>
                            </div>
                        </div>
                    </div>
                </div>
                <style>{`.hero-flex { flex-direction: row !important; } @media(max-width:1024px){ .hero-flex { flex-direction: column !important; } .hero-text { text-align: center !important; } }`}</style>
            </header>

            {/* ===== SERVICIOS ===== */}
            <section className="topo-bg" style={{ padding: '3.5rem 0', background: 'white' }}>
                <div style={S.container}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', gap: '2rem', flexWrap: 'wrap' }}>
                        <div style={{ maxWidth: '36rem' }}>
                            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: S.secondary, marginBottom: '1rem' }}>
                                <EditableText section="services" field="title">{content.services?.title || "Estos son nuestros servicios"}</EditableText>
                            </h2>
                            <div style={{ width: '6rem', height: '8px', background: S.primary, borderRadius: '9999px' }} />
                        </div>
                        <p style={{ color: '#475569', fontWeight: 500 }}>
                            <EditableText section="services" field="subtitle">{content.services?.subtitle || "Elevando estándares técnicos en cada obra."}</EditableText>
                        </p>
                    </div>
                    <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                        {services.map((s, i) => <ServiceCard key={i} {...s} />)}
                    </div>
                </div>
            </section>
            <style>{`
                @media (max-width: 768px) {
                    .services-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>

            {/* ===== PROCESO ===== */}
            <section style={{ padding: '3.5rem 0', background: S.secondary, color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundSize: '20px 20px', backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', pointerEvents: 'none' }} />
                <div style={S.container}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '1rem' }}>
                            <EditableText section="process" field="title">{content.process?.title || "Nuestro proceso de trabajo"}</EditableText>
                        </h2>
                        <p style={{ color: 'rgba(0,180,216,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                            <EditableText section="process" field="subtitle">{content.process?.subtitle || "Metodología paso a paso"}</EditableText>
                        </p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem' }}>
                        {processSteps.map((step, i) => (
                            <div key={i} style={{ position: 'relative' }}
                                onMouseOver={e => e.currentTarget.querySelector('.step-icon').style.transform = 'rotate(0deg)'}
                                onMouseOut={e => e.currentTarget.querySelector('.step-icon').style.transform = step.rotate}>
                                <div style={{ fontSize: '7.5rem', fontWeight: 900, color: 'rgba(255,255,255,0.05)', position: 'absolute', top: '-5rem', left: 0, lineHeight: 1 }}>{step.num}</div>
                                <div className="step-icon" style={{ width: '80px', height: '80px', background: S.primary, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', transform: step.rotate, transition: 'transform 0.3s' }}>
                                    <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '2.5rem' }}>{step.icon}</span>
                                </div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>{step.title}</h3>
                                <p style={{ color: '#d1d5db', lineHeight: 1.7, fontWeight: 300 }}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <Link to="/proceso" style={{ background: S.primary, color: 'white', fontWeight: 700, padding: '1rem 2.5rem', borderRadius: '12px', textDecoration: 'none', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.3s' }}
                            onMouseOver={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = S.secondary; }}
                            onMouseOut={e => { e.currentTarget.style.background = S.primary; e.currentTarget.style.color = 'white'; }}>
                            VER PROCESO COMPLETO <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== QUIÉNES SOMOS ===== */}
            <section className="topo-bg" style={{ padding: '3.5rem 0', background: 'white' }}>
                <div style={S.container}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="about-grid">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <img src={IMGS.nosotros1} alt="Equipo" style={{ borderRadius: '24px', width: '100%', height: '20rem', objectFit: 'cover', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }} />
                                <div style={{ background: S.primary, padding: '2rem', borderRadius: '24px', color: 'white', boxShadow: '0 10px 30px rgba(0,180,216,0.3)' }}>
                                    <p style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0 }}>15+</p>
                                    <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Años de Excelencia</p>
                                </div>
                            </div>
                            <div style={{ paddingTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ background: S.secondary, padding: '2rem', borderRadius: '24px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '2.5rem' }}>verified</span>
                                </div>
                                <img src={IMGS.nosotros2} alt="Planos" style={{ borderRadius: '24px', width: '100%', height: '20rem', objectFit: 'cover', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }} />
                            </div>
                        </div>
                        <div>
                            <div style={{ display: 'inline-block', padding: '4px 16px', borderRadius: '9999px', background: 'rgba(0,180,216,0.1)', color: S.primary, fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                                <EditableText section="about" field="subtitle_top">{content.about?.subtitle_top || "Sobre Nosotros"}</EditableText>
                            </div>
                            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: S.secondary, marginBottom: '2rem' }}>
                                <EditableText section="about" field="about_title_1">{content.about?.about_title_1 || "Quiénes Somos"}</EditableText>
                            </h2>
                            <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '2rem', lineHeight: 1.7, fontWeight: 500 }}>
                                <EditableText section="about" field="about_text_1">{content.about?.about_text_1 || "Somos IGESCOL, una empresa de consultoría en ingeniería orientada a brindar soluciones técnicas confiables, eficientes y ajustadas a la normativa vigente."}</EditableText>
                            </p>
                            <p style={{ fontSize: '1rem', color: '#475569', marginBottom: '3rem', lineHeight: 1.7, fontWeight: 300 }}>
                                <EditableText section="about" field="about_text_2">{content.about?.about_text_2 || "Contamos con un equipo interdisciplinario altamente calificado comprometido con la excelencia y la innovación en cada proyecto que emprendemos."}</EditableText>
                            </p>
                            <Link to="/nosotros" style={{ background: S.secondary, color: 'white', fontWeight: 700, padding: '1rem 2.5rem', borderRadius: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.75rem', boxShadow: '0 10px 30px rgba(12,35,64,0.2)', transition: 'all 0.3s', fontSize: '0.875rem' }}
                                onMouseOver={e => { e.currentTarget.style.background = S.primary; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseOut={e => { e.currentTarget.style.background = S.secondary; e.currentTarget.style.transform = 'translateY(0)'; }}>
                                CONÓCENOS <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <style>{`@media(max-width:1024px){ .about-grid { grid-template-columns: 1fr !important; } }`}</style>
            </section>

            {/* ===== POR QUÉ ELEGIRNOS ===== */}
            <section style={{ padding: '3.5rem 0', background: '#f8fafc' }}>
                <div style={S.container}>
                    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: S.secondary, marginBottom: '1rem' }}>
                            <EditableText section="whyus" field="title">{content.whyus?.title || "Por Qué Elegirnos"}</EditableText>
                        </h2>
                        <p style={{ color: '#475569', maxWidth: '36rem', margin: '0 auto', fontWeight: 500 }}>
                            <EditableText section="whyus" field="subtitle">{content.whyus?.subtitle || "Nuestra experiencia y compromiso garantizan el éxito de su proyecto."}</EditableText>
                        </p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                        {whyCards.map((card, i) => (
                            <div key={i} style={{ background: 'white', padding: '2.5rem', borderRadius: '40px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', transition: 'all 0.3s', display: 'flex', flexDirection: 'column', height: '100%' }}
                                onMouseOver={e => { e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.querySelector('.why-icon').style.background = S.primary; e.currentTarget.querySelector('.why-icon').style.color = 'white'; }}
                                onMouseOut={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.querySelector('.why-icon').style.background = 'rgba(0,180,216,0.1)'; e.currentTarget.querySelector('.why-icon').style.color = S.primary; }}>
                                <div className="why-icon" style={{ width: '64px', height: '64px', background: 'rgba(0,180,216,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: S.primary, marginBottom: '2rem', transition: 'all 0.3s' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.875rem' }}>{card.icon}</span>
                                </div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: S.secondary, marginBottom: '1rem' }}>{card.title}</h3>
                                <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '2rem' }}>{card.desc}</p>
                                <Link to={`/por-que-elegirnos#${card.id}`} style={{ color: S.primary, fontWeight: 700, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', transition: 'gap 0.2s' }}>
                                    SABER MÁS <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>east</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PROYECTOS ===== */}
            <section className="topo-bg" style={{ padding: '3.5rem 0', background: 'white' }}>
                <div style={S.container}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div style={{ display: 'inline-block', padding: '4px 16px', borderRadius: '9999px', background: 'rgba(0,180,216,0.1)', color: S.primary, fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                            <EditableText section="projects" field="subtitle_top">{content.projects?.subtitle_top || "Portafolio"}</EditableText>
                        </div>
                        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, color: S.secondary, letterSpacing: '-0.05em', marginBottom: '1rem' }}>
                            <EditableText section="projects" field="title">{content.projects?.title || "Nuestros Proyectos"}</EditableText>
                        </h2>
                        <p style={{ color: '#475569', maxWidth: '36rem', margin: '0 auto', fontSize: '1.1rem' }}>
                            <EditableText section="projects" field="subtitle">{content.projects?.subtitle || "Soluciones de ingeniería de vanguardia aplicadas en proyectos de alta complejidad."}</EditableText>
                        </p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {projects.map((p, i) => <ProjectCard key={i} {...p} />)}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <Link to="/proyectos" style={{ background: S.secondary, color: 'white', fontWeight: 700, padding: '1rem 2.5rem', borderRadius: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 10px 30px rgba(12,35,64,0.2)', transition: 'all 0.3s', fontSize: '0.875rem' }}
                            onMouseOver={e => { e.currentTarget.style.background = S.primary; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseOut={e => { e.currentTarget.style.background = S.secondary; e.currentTarget.style.transform = 'translateY(0)'; }}>
                            VER TODOS LOS PROYECTOS <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>grid_view</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== TECNOLOGÍA Y SOSTENIBILIDAD ===== */}
            <section className="topo-bg" style={{ padding: '3.5rem 0', background: 'white' }}>
                <div style={S.container}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="tech-grid">
                        <div>
                            <div style={{ display: 'inline-block', padding: '4px 16px', borderRadius: '9999px', background: 'rgba(0,180,216,0.1)', color: S.primary, fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                                <EditableText section="tech" field="subtitle_top">{content.tech?.subtitle_top || "Innovación Continua"}</EditableText>
                            </div>
                            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: S.secondary, marginBottom: '1.5rem' }}>
                                <EditableText section="tech" field="title">{content.tech?.title || "Tecnología y Sostenibilidad"}</EditableText>
                            </h2>
                            <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '2rem', lineHeight: 1.7 }}>
                                <EditableText section="tech" field="description">{content.tech?.description || "Integramos las herramientas más avanzadas de ingeniería con un firme compromiso ambiental para crear infraestructuras que perduren."}</EditableText>
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                                {[
                                    { icon: 'account_tree', title: 'Coordinación BIM Integral', desc: 'Detección temprana de interferencias y optimización de flujos de trabajo constructivos.', color: 'rgba(12,35,64,0.05)', iconColor: S.secondary },
                                    { icon: 'eco', title: 'Optimización Técnica Sostenible', desc: 'Reducción de huella de carbono mediante el uso eficiente de materiales y procesos energéticos.', color: 'rgba(0,180,216,0.1)', iconColor: S.primary },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                                        <div style={{ flexShrink: 0, width: '48px', height: '48px', background: item.color, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.iconColor }}>
                                            <span className="material-symbols-outlined">{item.icon}</span>
                                        </div>
                                        <div>
                                            <h4 style={{ fontWeight: 700, color: S.secondary, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.title}</h4>
                                            <p style={{ color: '#475569', fontSize: '0.875rem' }}>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link to="/tecnologia-sostenibilidad" style={{ background: S.secondary, color: 'white', fontWeight: 700, padding: '1rem 2.5rem', borderRadius: '16px', textDecoration: 'none', display: 'inline-block', boxShadow: '0 10px 30px rgba(12,35,64,0.2)', transition: 'all 0.3s', fontSize: '0.875rem' }}
                                onMouseOver={e => { e.currentTarget.style.background = S.primary; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseOut={e => { e.currentTarget.style.background = S.secondary; e.currentTarget.style.transform = 'translateY(0)'; }}>
                                VER NUESTRO ENFOQUE
                            </Link>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ height: '16rem', background: 'rgba(12,35,64,0.05)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span className="material-symbols-outlined" style={{ color: S.secondary, fontSize: '4.5rem', opacity: 0.5 }}>model_training</span>
                                </div>
                                <div style={{ height: '12rem', background: S.primary, borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '3.75rem' }}>developer_board</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '3rem' }}>
                                <div style={{ height: '12rem', background: '#111827', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span className="material-symbols-outlined" style={{ color: S.primary, fontSize: '3.75rem' }}>query_stats</span>
                                </div>
                                <div style={{ height: '16rem', background: '#f1f5f9', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0' }}>
                                    <span className="material-symbols-outlined" style={{ color: S.secondary, fontSize: '4.5rem', opacity: 0.5 }}>architecture</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <style>{`@media(max-width:1024px){ .tech-grid { grid-template-columns: 1fr !important; } }`}</style>
            </section>

            {/* ===== CONTACTO ===== */}
            <section className="topo-bg" style={{ padding: '3.5rem 0', background: 'white' }} id="contacto">
                <div style={S.container}>
                    <div style={{ background: '#f8fafc', borderRadius: '4rem', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="contact-grid">
                            <div style={{ padding: '4rem 6rem', background: 'white' }} className="contact-info">
                                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: S.secondary, marginBottom: '2.5rem' }}>
                                    <EditableText section="contact" field="title">{content.contact?.title || "Contáctanos"}</EditableText>
                                </h2>
                                <p style={{ color: '#475569', marginBottom: '3rem', fontSize: '1.1rem' }}>
                                    <EditableText section="contact" field="subtitle">{content.contact?.subtitle || "Estamos listos para escuchar su proyecto y ofrecer soluciones integrales."}</EditableText>
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    {[
                                        { icon: 'phone', text: '+57 310 7981505' },
                                        { icon: 'phone', text: '+57 314 2191841' },
                                        { icon: 'email', text: 'info.igescol@gmail.com' },
                                        { icon: 'location_on', text: 'Medellín, Colombia' },
                                        { icon: 'schedule', text: 'Lun - Sáb 7:00 AM - 6:00 PM' },
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                            <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: 'rgba(0,180,216,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: S.primary, transition: 'all 0.3s', flexShrink: 0 }}>
                                                <span className="material-symbols-outlined">{item.icon}</span>
                                            </div>
                                            <span style={{ fontWeight: 700, color: S.secondary, fontSize: '1rem' }}>{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={{ padding: '4rem 6rem', background: '#f8fafc', display: 'flex', alignItems: 'center' }} className="contact-form-wrap">
                                <form style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={e => e.preventDefault()}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} placeholder="Nombre" type="text" style={{ padding: '1rem 1.5rem', borderRadius: '16px', border: 'none', background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', fontFamily: 'Montserrat, sans-serif', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
                                        <input value={form.asunto} onChange={e => setForm({ ...form, asunto: e.target.value })} placeholder="Asunto" type="text" style={{ padding: '1rem 1.5rem', borderRadius: '16px', border: 'none', background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', fontFamily: 'Montserrat, sans-serif', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
                                    </div>
                                    <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email *" type="email" required style={{ padding: '1rem 1.5rem', borderRadius: '16px', border: 'none', background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', fontFamily: 'Montserrat, sans-serif', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
                                    <textarea value={form.mensaje} onChange={e => setForm({ ...form, mensaje: e.target.value })} placeholder="Mensaje" rows={5} style={{ padding: '1rem 1.5rem', borderRadius: '16px', border: 'none', background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', fontFamily: 'Montserrat, sans-serif', outline: 'none', width: '100%', boxSizing: 'border-box', resize: 'vertical' }} />
                                    <button type="submit" style={{ background: S.secondary, color: 'white', fontWeight: 900, padding: '1.25rem', borderRadius: '16px', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', boxShadow: '0 10px 30px rgba(12,35,64,0.2)', transition: 'all 0.3s', fontSize: '0.875rem' }}
                                        onMouseOver={e => { e.currentTarget.style.background = S.primary; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                        onMouseOut={e => { e.currentTarget.style.background = S.secondary; e.currentTarget.style.transform = 'translateY(0)'; }}>
                                        ENVIAR MENSAJE
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <style>{`@media(max-width:1024px){ .contact-grid { grid-template-columns: 1fr !important; } .contact-info, .contact-form-wrap { padding: 2rem !important; } }`}</style>
            </section>

            <IgescolFooter />
        </div>
    );
}
