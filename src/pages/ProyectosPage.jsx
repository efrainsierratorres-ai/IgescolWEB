import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IgescolNavbar from '../components/IgescolNavbar';
import IgescolFooter from '../components/IgescolFooter';
import EditableText from '../components/Editable';
import { useCMS } from '../hooks/useCMS';
import '../styles/stitch.css';

const S = { primary: '#00B4D8', secondary: '#0C2340', container: { maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' } };

const projects = [
    {
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZf_3qTI-tUOmB7c42UvQ_kO4ID2lWPwE3yCLZI6oluHGi7T2z4mnlaRKRapSiTqIJ-fW-7n2TKYpUjccu3RLqcPleraFOHI_L7MEvPArK6XDqc9FTZKU4kiiXipc8wsQU3Q3SjgRUkhbWmMdq63WBxiXgDcnuGXceMb49q8nurW0xKONCUzovV78c8I6EkA8vpxFju5SPL2DtbGlZ4EpYrFjTf14sxShurxllsxYLRyNrJewQ7RxzFu90wCbO8NIUboW8LiVKS0dC",
        category: 'Infraestructura Vial',
        title: 'Conexión Vial Región Sur',
        desc: 'Desarrollo y modernización de corredores viales para mejorar la conectividad regional con altos estándares de calidad.',
        link: '/servicios/infraestructura'
    },
    {
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTMZZKZ888e0JdXK4ya0OBHK91PbwwmBS75ScynydsVuCzN9f5_f0bezp6LnsIGl5LWPDSvzXLYkdmJDjA4GMD9CR7hqNLNGGu0LICTcuoTNW3ne-6Cj8KZvSRFkOVy0JOE0qvVtasCc8Suichy2Vo2Zpw0j6XuHfL2HLC2wy9ocSavG7NmCBYwH2K8y2ZPCXjEEPrkBjXk7MmI-4uY8SWRCX4Fbqqpd6RKj45i6Ty1ya1A19yKr-Nx1hYsTdtzYLiEVejE--upX5n",
        category: 'Licencias de Construcción',
        title: 'Altos del Norte',
        desc: 'Gestión integral de licencias y permisos urbanísticos para complejo residencial de alta densidad en zona de expansión.',
        link: '/servicios/licencias'
    },
    {
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBU1zqxvB3VuCDEOvjVfqTJqGl5KXVpLZ88sbzy7dX810nhzO9i2_JB8rWe8REAxPCRrOvdkZ4Z-LDq00wXTJXoFvD0aSD4F75YLphY2jfhFyY2GyBh0clWuV4Miq2Ibuv9HqtsHSbEGJ9bcpz0y6XgPEuVL5q7NIBRZXLVi6yf7AGC_kl9nY6DskQ1WXxo2YKN_BlnPrf9uOxxeI9njgU5lCZWVruOJG57LjGgJx9iwPKg4jrXbEqjGnBv8EKKxz57X4SVWpArKo0D",
        category: 'Domótica Residencial',
        title: 'Smart Home Systems',
        desc: 'Implementación de ecosistemas inteligentes de automatización y control para viviendas modernas de alto nivel.',
        link: '/servicios/domotica'
    },
    {
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuSh4v_IrW-eOTbH590fDLQCQKAraXFYA3Oo8twwIyu2J0jd2WaU0HS9lR49kmK1czkv61M6p6-8hjRFlccxnU6KDsKYeg0HMIA6126Iq6sVL5Cp0PIRvVBfjcyDZa-aN2JjH4uxx5AYdk8AjxNLIXyr3Fs3Nb4d-DUa-tb1Nok80r_vTFjOSV9r6fCu1-HgG76Vejm0Fa51AOEazsI6tfOGwR7r8ElijRWMs4XmmjS67sH35cHB3HZbKmb-1IZeLFT8lWJ8kz82wI",
        category: 'Infraestructura Vial',
        title: 'Intersección 80',
        desc: 'Diseño y optimización técnica de flujos vehiculares complejos en intersecciones urbanas de alto tráfico.',
        link: '/servicios/infraestructura'
    },
    {
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCp6p9OUxuBloFa8ilPCOYL5t3HwSecAAzn0ZHnvmMUlIPaYpLe_ilWiv1qCmYMJluysKsEGL823hXXrk6pCdJG5AZMRPRusbQ_-euEkENsWlv2SDppYrGzx3dcMuZC9bubaGFbsBWQ5XQ5Y5jwI0JSZpFqfC6txYvO3yedlmXxQkHiefUDhxyXwrnTV1udSJPg6VMS5qGqZbkiMuoXvRV3W-UGtV16uxjLO3tDfWCmmFsmw7mbieusZpI18w59ljpRwuntWHxsXTi5",
        category: 'Especiales',
        title: 'Centro Comercial Plaza',
        desc: 'Consultoría e ingeniería integral para el desarrollo de grandes superficies comerciales y retail.',
        link: '/servicios/infraestructura'
    },
    {
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_v7gpM-ptf5ZVypXKi0czzsE_9cGfedcckqAkGf4LCiDgDuwT9ska7dRvbeE7nh9XBxzGQScF7bT8t_LpaftNfFXS_Z36GZiLaQMgsVyrfp-BgMubZt5W_OnNOoo110H6X_9kd8sb7E4RtvRgXwNe_N4PMLEwfF0RTofQNqAVEcUuBE7pzSFOmGGxCOvmqwreQbdMFpnX7ztVqepvQtKOh2V319J5J53ExtxHoi6e1ILW0rQup_JeSE0awQJfkbGTB8WyFkwtDTUi",
        category: 'Diseño de Estructuras',
        title: 'Torre Empresarial Sigma',
        desc: 'Diseño estructural avanzado y cálculo sísmico para edificación corporativa de gran altura.',
        link: '/servicios/diseno-estructural'
    },
];

const categories = [
    'Todos',
    'Licencias de Construcción',
    'Diseño de Estructuras',
    'Infraestructura Vial',
    'Domótica Residencial',
    'Especiales'
];

export default function ProyectosPage() {
    const { content } = useCMS();
    const [filter, setFilter] = useState('Todos');

    const filtered = filter === 'Todos' ? projects : projects.filter(p => p.category === filter);

    return (
        <div style={{ fontFamily: "'Montserrat', sans-serif", background: '#f8fafc', color: '#1e293b' }}>
            <IgescolNavbar />

            <header className="topo-bg" style={{ paddingTop: '12rem', paddingBottom: '5rem', background: 'white', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ ...S.container, textAlign: 'center' }}>
                    <div style={{ display: 'inline-block', padding: '4px 16px', borderRadius: '9999px', background: 'rgba(0,180,216,0.1)', color: S.primary, fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                        <EditableText section="projects" field="subtitle_top">{content.projects?.subtitle_top || "Portafolio de Ingeniería"}</EditableText>
                    </div>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, color: S.secondary, marginBottom: '1.5rem' }}>
                        <EditableText section="projects" field="title">{content.projects?.title || "Nuestros Proyectos"}</EditableText>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#475569', maxWidth: '48rem', margin: '0 auto', fontWeight: 300 }}>
                        <EditableText section="projects" field="subtitle">{content.projects?.subtitle || "Explora nuestra trayectoria en soluciones de ingeniería técnica y consultoría especializada."}</EditableText>
                    </p>
                </div>
            </header>

            <section style={{ padding: '4rem 0' }}>
                <div style={S.container}>
                    {/* Filtros */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                style={{
                                    padding: '0.6rem 1.5rem',
                                    borderRadius: '9999px',
                                    border: 'none',
                                    background: filter === cat ? S.primary : 'white',
                                    color: filter === cat ? 'white' : S.secondary,
                                    fontWeight: 700,
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    boxShadow: filter === cat ? '0 8px 20px rgba(0,180,216,0.3)' : '0 2px 8px rgba(0,0,0,0.05)',
                                    transition: 'all 0.3s'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                        {filtered.map((p, i) => (
                            <div key={i} style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s' }}
                                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-8px)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                                <div style={{ height: '16rem', overflow: 'hidden' }}>
                                    <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: S.primary, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>{p.category}</span>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: S.secondary, marginBottom: '1rem' }}>{p.title}</h3>
                                    <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, marginBottom: '2rem', flexGrow: 1 }}>{p.desc}</p>
                                    <Link to={p.link} style={{
                                        color: S.primary,
                                        fontWeight: 700,
                                        fontSize: '0.85rem',
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        VER SERVICIO <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ padding: '6rem 0', background: S.secondary, textAlign: 'center' }}>
                <div style={{ ...S.container, maxWidth: '800px' }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'white', marginBottom: '1.5rem' }}>¿Necesita una solución técnica experta?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginBottom: '3rem' }}>Estamos preparados para llevar su proyecto al siguiente nivel con precisión e innovación.</p>
                    <Link to="/cotizacion" style={{ background: S.primary, color: 'white', fontWeight: 900, padding: '1.25rem 3rem', borderRadius: '12px', textDecoration: 'none', display: 'inline-block', boxShadow: '0 10px 30px rgba(0,180,216,0.3)' }}>
                        SOLICITAR COTIZACIÓN
                    </Link>
                </div>
            </section>

            <IgescolFooter />
        </div>
    );
}
