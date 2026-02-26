import React from 'react';
import { Link } from 'react-router-dom';
import IgescolNavbar from '../components/IgescolNavbar';
import IgescolFooter from '../components/IgescolFooter';
import EditableText from '../components/Editable';
import { useCMS } from '../hooks/useCMS';
import '../styles/stitch.css';

const S = { primary: '#00B4D8', secondary: '#0C2340', container: { maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' } };

const sections = [
    {
        icon: 'model_training',
        title: 'Modelado BIM Avanzado',
        desc: 'Utilizamos Building Information Modeling para crear representaciones digitales precisas que optimizan la planificación, el diseño y la construcción de infraestructuras.',
        details: [
            'Detección temprana de interferencias.',
            'Optimización de cantidades y presupuestos.',
            'Coordinación multidisciplinaria en tiempo real.'
        ]
    },
    {
        icon: 'developer_board',
        title: 'Sistemas Inteligentes',
        desc: 'Integramos tecnologías de punta en cada proyecto, desde domótica residencial hasta sistemas de gestión vial automatizados.',
        details: [
            'Automatización de procesos críticos.',
            'Monitoreo remoto y sensores IoT.',
            'Eficiencia energética garantizada.'
        ]
    },
    {
        icon: 'query_stats',
        title: 'Sostenibilidad Rigurosa',
        desc: 'Nuestro compromiso con el medio ambiente se traduce en diseños que minimizan el impacto ecológico y maximizan la durabilidad.',
        details: [
            'Uso de materiales eco-amigables.',
            'Gestión eficiente de recursos hídricos y energía.',
            'Diseño orientado a la longevidad estructural.'
        ]
    }
];

export default function TecnologiaSostenibilidadPage() {
    const { content } = useCMS();

    return (
        <div style={{ fontFamily: "'Montserrat', sans-serif", background: 'white', color: '#1e293b' }}>
            <IgescolNavbar />

            <header className="topo-bg" style={{ paddingTop: '12rem', paddingBottom: '5rem', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ ...S.container, textAlign: 'center' }}>
                    <div style={{ display: 'inline-block', padding: '4px 16px', borderRadius: '9999px', background: 'rgba(0,180,216,0.1)', color: S.primary, fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                        <EditableText section="tech" field="subtitle_top">{content.tech?.subtitle_top || "Futuro & Innovación"}</EditableText>
                    </div>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, color: S.secondary, marginBottom: '1.5rem' }}>
                        <EditableText section="tech" field="title">{content.tech?.title || "Tecnología y Sostenibilidad"}</EditableText>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#475569', maxWidth: '48rem', margin: '0 auto', fontWeight: 300 }}>
                        <EditableText section="tech" field="description">{content.tech?.description || "Fusionamos la excelencia en ingeniería con las tecnologías más avanzadas para crear infraestructuras duraderas y responsables."}</EditableText>
                    </p>
                </div>
            </header>

            {sections.map((sec, i) => (
                <section key={i} style={{ padding: '6rem 0', background: i % 2 === 0 ? 'white' : '#f8fafc' }}>
                    <div style={S.container}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                            <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: S.primary, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,180,216,0.3)' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '2rem' }}>{sec.icon}</span>
                                    </div>
                                    <h2 style={{ fontSize: '2rem', fontWeight: 900, color: S.secondary, margin: 0 }}>{sec.title}</h2>
                                </div>
                                <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.8, marginBottom: '2rem' }}>{sec.desc}</p>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {sec.details.map((detail, idx) => (
                                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <span className="material-symbols-outlined" style={{ color: S.primary, fontSize: '20px' }}>check_circle</span>
                                            <span style={{ fontWeight: 600, color: S.secondary }}>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div style={{ order: i % 2 === 0 ? 2 : 1, background: 'rgba(12,35,64,0.02)', borderRadius: '40px', padding: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,0,0,0.05)' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '8rem', color: S.secondary, opacity: 0.1 }}>{sec.icon}</span>
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            <section style={{ padding: '8rem 0', background: S.secondary, textAlign: 'center' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 900, color: 'white', marginBottom: '1.5rem' }}>Llevemos su proyecto al futuro</h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', marginBottom: '3rem' }}>Integramos ingeniería técnica con visión tecnológica para resultados sin precedentes.</p>
                    <Link to="/cotizacion" style={{ background: S.primary, color: 'white', fontWeight: 800, padding: '1.25rem 3rem', borderRadius: '12px', textDecoration: 'none', display: 'inline-block', boxShadow: '0 10px 30px rgba(0,180,216,0.3)', transition: 'all 0.3s' }}
                        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                        INICIAR PROYECTO
                    </Link>
                </div>
            </section>

            <IgescolFooter />
        </div>
    );
}
