import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';

const DetailPage = () => {
    const { elementId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const detailContent = {
        'about': {
            title: 'Quiénes Somos',
            subtitle: 'Compromiso y Rigor Técnico',
            content: 'En IGESCOL SAS, nos especializamos en brindar soluciones de ingeniería integral. Nuestra trayectoria se basa en la excelencia técnica, integrando herramientas de vanguardia como la metodología BIM para asegurar el éxito en cada etapa constructiva.',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000',
            features: ['Consultoría Técnica Especializada', 'Gestión de Proyectos', 'Metodología BIM de Alto Nivel', 'Seguridad y Salud en el Trabajo']
        },
        'serv1': {
            title: 'Licencias de Construcción',
            subtitle: 'Gestión y Viabilidad Normativa',
            content: 'Facilitamos el proceso de obtención de licencias de construcción mediante una asesoría técnica y legal rigurosa. Aseguramos que su proyecto cumpla con todas las normativas locales, minimizando riesgos y optimizando tiempos de respuesta.',
            image: 'https://images.unsplash.com/photo-1503387762-592dea58ef23?w=1000',
            features: ['Asesoría en Curadurías', 'Cumplimiento Normativo', 'Planos Arquitectónicos y Estructurales', 'Estudios de Suelos']
        },
        'serv2': {
            title: 'Diseño de Estructuras',
            subtitle: 'Ingeniería Estructural Especializada',
            content: 'Desarrollamos diseños estructurales completos para proyectos de edificación e infraestructura. Nuestro enfoque integra análisis técnico riguroso, modelado avanzado y optimización de sistemas estructurales bajo normativa NSR-10 y estándares internacionales. Garantizamos seguridad, eficiencia y viabilidad constructiva.',
            image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480f5?w=1000',
            features: ['Diseño de Estructuras en Concreto y Acero', 'Análisis y Modelado Estructural', 'Cálculo de Cimentaciones', 'Evaluación de Vulnerabilidad Sísmica']
        },
        'serv3': {
            title: 'Infraestructura Vial',
            subtitle: 'Ingeniería para la Movilidad',
            content: 'Desarrollamos proyectos de infraestructura vial enfocados en la durabilidad y la eficiencia. Desde el diseño geométrico hasta la supervisión de obra, garantizamos soluciones que cumplen con los estándares nacionales de transporte.',
            image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240c5?w=1000',
            features: ['Diseño Geométrico de Vías', 'Estudios de Tráfico', 'Interventoría Vial', 'Mantenimiento y Reparación']
        },
        'serv4': {
            title: 'Domótica Residencial',
            subtitle: 'Hogares Inteligentes y Sostenibles',
            content: 'Transformamos espacios habitacionales en entornos inteligentes. Nuestra integración domótica permite el control centralizado de iluminación, clima y seguridad, aportando confort y una significativa reducción en el consumo energético.',
            image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1000',
            features: ['Control de Iluminación Inteligente', 'Sistemas de Seguridad Centralizados', 'Eficiencia Energética Automática', 'Integración por Voz y App']
        },
        'step1': {
            title: 'Diagnóstico Técnico',
            subtitle: 'Nuestro Proceso - Etapa 1',
            content: 'Iniciamos con una evaluación profunda del terreno o la infraestructura existente. Detectamos riesgos potenciales y oportunidades de optimización antes de proceder con cualquier diseño.',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1000',
            features: ['Levantamiento Técnico', 'Evaluación de Riesgos', 'Estudio de Viabilidad', 'Informe de Diagnóstico']
        },
        'step2': {
            title: 'Propuesta Estructural',
            subtitle: 'Nuestro Proceso - Etapa 2',
            content: 'Diseñamos la hoja de ruta técnica y financiera. Definimos alcances claros y cronogramas realistas para asegurar que el cliente tenga visibilidad total sobre la inversión.',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000',
            features: ['Diseño de Anteproyecto', 'Costeo Detallado', 'Cronograma de Ejecución', 'Aprobación Técnica']
        },
        'step3': {
            title: 'Ejecución y Control',
            subtitle: 'Nuestro Proceso - Etapa 3',
            content: 'Materializamos el proyecto bajo una supervisión técnica constante. Aplicamos ingeniería de precisión y nos aseguramos de que cada detalle cumpla con los estándares de calidad.',
            image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000',
            features: ['Coordinación en Obra', 'Control de Calidad', 'Gestión de Recursos', 'Supervisión Interdisciplinaria']
        },
        'step4': {
            title: 'Entrega Final',
            subtitle: 'Nuestro Proceso - Etapa 4',
            content: 'Finalizamos con la entrega de documentación técnica, manuales de uso y la certificación del cumplimiento de objetivos. Brindamos soporte posterior para asegurar el funcionamiento óptimo.',
            image: 'https://images.unsplash.com/photo-1531834357921-a0703e1c0a18?w=1000',
            features: ['Entregables Técnicos', 'Certificaciones', 'Cierre de Proyecto', 'Garantía y Soporte']
        },
        'why1': {
            title: 'Gestión BIM Avanzada',
            subtitle: '¿Porque Elegirnos?',
            content: 'Utilizamos Building Information Modeling para reducir errores de coordinación. El gemelo digital permite detectar interferencias antes de la construcción real, ahorrando tiempo y dinero.',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1000',
            features: ['Reducción de Retrabajos', 'Precisión en Cantidades', 'Coordinación 3D', 'Simulación de Construcción']
        },
        'why2': {
            title: 'Propuesta Estructurada',
            subtitle: '¿Porque Elegirnos?',
            content: 'No dejamos nada al azar. Nuestras propuestas son sólidas, basadas en datos reales y cumpliendo estrictamente con la normativa vigente para evitar contratiempos legales.',
            image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1000',
            features: ['Solidez Técnica', 'Transparencia Comercial', 'Cumplimiento Normativo', 'Mitigación de Riesgos']
        },
        'why3': {
            title: 'Soluciones a Medida',
            subtitle: '¿Porque Elegirnos?',
            content: 'Entendemos que cada cliente es único. Personalizamos nuestras soluciones técnicas para adaptarlas a los requerimientos específicos de cada proyecto, presupuesto y tiempo.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000',
            features: ['Diseño Personalizado', 'Flexibilidad Técnica', 'Eficiencia en Costos', 'Optimización de Espacios']
        },
        'why4': {
            title: 'Acompañamiento Profesional',
            subtitle: '¿Porque Elegirnos?',
            content: 'Somos sus aliados estratégicos. Nuestro equipo directivo brinda soporte constante, asegurando que el cliente nunca se sienta solo durante el desarrollo del proyecto.',
            image: 'https://images.unsplash.com/photo-1521791136364-703a1bd2fe3f?w=1000',
            features: ['Asesoría Continua', 'Respaldo Directivo', 'Comunicación Fluida', 'Compromiso Ético']
        },
        'tech': {
            title: 'Tecnología y Sostenibilidad',
            subtitle: 'Nuestro Compromiso Futuro',
            content: 'En IGESCOL, la innovación va de la mano con el respeto ambiental. Integramos sistemas que optimizan recursos y reducen la huella de carbono en cada obra de ingeniería.',
            image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000',
            features: ['Uso de Energías Limpias', 'Materiales Eco-amigables', 'Optimización Energética', 'Construcción Sostenible']
        }
    };

    const data = detailContent[elementId] || detailContent['about'];

    return (
        <div className="detail-page" style={{ background: '#f8fbff', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
            {/* Minimal Nav */}
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
                        <ArrowLeft size={16} /> VOLVER AL INICIO
                    </button>
                </div>
            </div>

            <div className="container" style={{ padding: '60px 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 60, alignItems: 'start' }}>
                    {/* Left side: Image and details box */}
                    <div>
                        <div style={{
                            width: '100%',
                            height: 500,
                            borderRadius: '30px',
                            backgroundImage: `url(${data.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
                            marginBottom: 40
                        }}></div>

                        <div style={{ background: '#0B2540', color: 'white', padding: 40, borderRadius: 30, boxShadow: '0 20px 40px rgba(11,37,64,0.3)' }}>
                            <h3 style={{ marginBottom: 20, fontSize: '1.5rem' }}>Solicitar Información</h3>
                            <p style={{ opacity: 0.8, marginBottom: 30 }}>Estamos listos para asesorarte en tu próximo proyecto técnico de alta escala.</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><Phone size={20} color="#4089A7" /> +57 (311) 758 05 56</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><Mail size={20} color="#4089A7" /> contacto@igescol.com</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><MapPin size={20} color="#4089A7" /> Bogotá, Colombia</div>
                            </div>
                        </div>
                    </div>

                    {/* Right side: Content */}
                    <div style={{ padding: '20px 0' }}>
                        <span style={{ color: '#4089A7', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 15, display: 'block' }}>{data.subtitle}</span>
                        <h1 style={{ fontSize: '4rem', fontWeight: 800, color: '#0B2540', lineHeight: 1, marginBottom: 30 }}>{data.title}</h1>
                        <div style={{ width: 80, height: 8, background: '#4089A7', borderRadius: 4, marginBottom: 40 }}></div>

                        <p style={{ fontSize: '1.25rem', lineHeight: 1.8, color: '#4a5568', marginBottom: 50 }}>{data.content}</p>

                        <h3 style={{ fontSize: '1.8rem', color: '#0B2540', marginBottom: 30, fontWeight: 700 }}>Puntos Clave</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                            {data.features.map((f, i) => (
                                <div key={i} style={{ background: 'white', padding: '25px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: 15, boxShadow: '0 10px 25px rgba(0,0,0,0.03)', border: '1px solid #eef2f6' }}>
                                    <CheckCircle size={24} color="#4089A7" />
                                    <span style={{ fontWeight: 600, color: '#2d3748' }}>{f}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Simple Footer */}
            <footer style={{ background: 'white', padding: '40px 0', borderTop: '1px solid #eef2f6', textAlign: 'center' }}>
                <p style={{ color: '#a0aec0', fontSize: '0.9rem' }}>© 2026 IGESCOL SAS - Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default DetailPage;
