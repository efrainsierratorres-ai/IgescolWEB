import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMS } from '../hooks/useCMS';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import '../styles/Landing.css';
import SalesBot from '../components/SalesBot';
import { Phone, Clock, Facebook, Twitter, Linkedin, Instagram, Search, FileText, Settings, CheckCircle, Award, Move, X, Maximize, Palette, Image as ImageIcon, Menu } from 'lucide-react';

// --- Style Panel ---
const StylePanel = ({ onStyleChange, currentStyle }) => {
    return (
        <div className="style-panel" style={{
            position: 'absolute',
            top: -50,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'white',
            padding: 8,
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            gap: 8,
            zIndex: 1000
        }}>
            <input
                type="color"
                value={currentStyle.color || '#000000'}
                onChange={(e) => onStyleChange({ color: e.target.value })}
                title="Color del texto"
                style={{ width: 30, height: 30, border: 'none', cursor: 'pointer' }}
            />
            <select
                value={currentStyle.fontSize || '16px'}
                onChange={(e) => onStyleChange({ fontSize: e.target.value })}
                style={{ padding: 4, borderRadius: 4, border: '1px solid #ddd' }}
            >
                {[12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64, 72].map(s => <option key={s} value={`${s}px`}>{s}px</option>)}
            </select>
            <select
                value={currentStyle.fontFamily || 'Inter, sans-serif'}
                onChange={(e) => onStyleChange({ fontFamily: e.target.value })}
                style={{ padding: 4, borderRadius: 4, border: '1px solid #ddd', width: 100 }}
            >
                <option value="Inter, sans-serif">Inter</option>
                <option value="'Roboto', sans-serif">Roboto</option>
                <option value="'Open Sans', sans-serif">Open Sans</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
            </select>
            <select
                value={currentStyle.fontWeight || '400'}
                onChange={(e) => onStyleChange({ fontWeight: e.target.value })}
                style={{ padding: 4, borderRadius: 4, border: '1px solid #ddd' }}
            >
                <option value="300">Light</option>
                <option value="400">Regular</option>
                <option value="600">Bold</option>
                <option value="800">Extra Bold</option>
            </select>
        </div>
    );
};

// --- Resizable & Draggable Element ---
const DraggableResizable = ({ children, id, position, size, style, customStyle, onUpdate, isEditing, className }) => {
    const [pos, setPos] = useState(position || { x: 0, y: 0 });
    const [dims, setDims] = useState(size || { w: 'auto', h: 'auto' });
    const [localStyle, setLocalStyle] = useState(customStyle || {});
    const [isSelected, setIsSelected] = useState(false);

    // Drag state
    const [dragging, setDragging] = useState(false);
    const [rel, setRel] = useState(null);

    // Resize state
    const [resizing, setResizing] = useState(false);
    const [resizeStart, setResizeStart] = useState(null);

    useEffect(() => { if (position) setPos(position); }, [position]);
    useEffect(() => { if (size) setDims(size); }, [size]);
    useEffect(() => { if (customStyle) setLocalStyle(customStyle); }, [customStyle]);

    // --- Drag Handlers ---
    const onMouseDown = (e) => {
        if (!isEditing || e.button !== 0 || resizing) return;
        e.stopPropagation();
        setIsSelected(true);
        setDragging(true);
        setRel({ x: e.pageX - pos.x, y: e.pageY - pos.y });
    };

    const onMouseMove = useCallback((e) => {
        if (dragging) {
            e.preventDefault();
            setPos({ x: e.pageX - rel.x, y: e.pageY - rel.y });
        } else if (resizing) {
            e.preventDefault();
            const w = Math.max(50, resizeStart.w + (e.pageX - resizeStart.x));
            const h = Math.max(20, resizeStart.h + (e.pageY - resizeStart.y));
            setDims({ w, h });
        }
    }, [dragging, rel, resizing, resizeStart]);

    const onMouseUp = useCallback(() => {
        if (dragging) {
            setDragging(false);
            onUpdate?.(id, { ...getUpdateData(), pos });
        }
        if (resizing) {
            setResizing(false);
            onUpdate?.(id, { ...getUpdateData(), size: dims });
        }
    }, [dragging, resizing, id, pos, dims]);

    const getUpdateData = () => ({ pos, size: dims, style: localStyle });

    // Global mouse hook
    useEffect(() => {
        if (dragging || resizing) {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        } else {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, [dragging, resizing, onMouseMove, onMouseUp]);

    const handleStyleChange = (newStyles) => {
        const updated = { ...localStyle, ...newStyles };
        setLocalStyle(updated);
        onUpdate?.(id, { pos, size: dims, style: updated });
    };

    return (
        <div
            style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                width: dims.w === 'auto' ? 'auto' : `${dims.w}px`,
                height: dims.h === 'auto' ? 'auto' : `${dims.h}px`,
                position: 'relative',
                cursor: isEditing ? (dragging ? 'grabbing' : 'grab') : 'default',
                zIndex: isSelected ? 100 : 1,
                ...localStyle,
                ...style
            }}
            className={`${className || ''} ${isEditing ? 'editable-wrapper' : ''}`}
            onMouseDown={onMouseDown}
            onClick={(e) => { if (isEditing) { e.stopPropagation(); setIsSelected(true); } }}
        >
            {isEditing && isSelected && (
                <>
                    <StylePanel currentStyle={localStyle} onStyleChange={handleStyleChange} />
                    <div
                        className="resize-handle"
                        style={{
                            position: 'absolute', bottom: -5, right: -5, width: 15, height: 15, background: 'var(--primary)', cursor: 'nwse-resize', borderRadius: '50%', zIndex: 101, border: '2px solid white'
                        }}
                        onMouseDown={(e) => {
                            e.stopPropagation();
                            setResizing(true);
                            setResizeStart({ x: e.pageX, y: e.pageY, w: e.target.parentElement.offsetWidth, h: e.target.parentElement.offsetHeight });
                        }}
                    />
                    <div className="selection-border" style={{ position: 'absolute', inset: -2, border: '2px dashed var(--primary)', pointerEvents: 'none', borderRadius: 4 }}></div>
                    <button
                        className="close-selection"
                        onClick={(e) => { e.stopPropagation(); setIsSelected(false); }}
                        style={{ position: 'absolute', top: -10, right: -10, background: 'red', color: 'white', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', fontSize: 10 }}
                    >
                        <X size={12} />
                    </button>
                </>
            )}
            {children}
        </div>
    );
};

// --- Editable Text ---
const EditableText = ({ tag: Tag, content, onSave, isEditing, style, className, defaultContent }) => {
    const handleBlur = (e) => onSave && onSave(e.target.innerText);
    const displayContent = content || defaultContent;

    return (
        <Tag
            className={className}
            style={{ outline: 'none', minWidth: 10, minHeight: 10, ...style }}
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={handleBlur}
            onClick={(e) => isEditing && e.stopPropagation()}
        >
            {displayContent}
        </Tag>
    );
};

// --- Editable Image ---
const EditableImage = ({ src, onSave, isEditing, className, style, defaultSrc }) => {
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const displaySrc = src || defaultSrc;

    const handleClick = (e) => {
        if (!isEditing) return;
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '-')}`;
            let { data, error } = await supabase.storage.from('site_assets').upload(fileName, file);

            if (error) throw error;

            const { data: publicUrlData } = supabase.storage.from('site_assets').getPublicUrl(fileName);
            onSave(publicUrlData.publicUrl);
        } catch (err) {
            console.error('Upload error:', err);
            const reader = new FileReader();
            reader.onload = (e) => onSave(e.target.result); // Base64 fallback
            reader.readAsDataURL(file);
            alert(`Error subiendo a nube (usando local temporalmente): ${err.message}`);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={className} style={{ ...style, backgroundImage: displaySrc ? `url(${displaySrc})` : 'none', position: 'relative', minHeight: 50 }}>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleFileChange} />
            {isEditing && (
                <div
                    onClick={handleClick}
                    style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 50 }}
                    title="Click para cambiar imagen"
                >
                    {uploading ? <span style={{ fontSize: 10, background: 'black', color: 'white', padding: 4 }}>...</span> : <ImageIcon size={24} color="white" />}
                </div>
            )}
        </div>
    );
};

// Wrapper Helper
const ContentWrapper = ({ id, data, isEditing, onUpdate, children, style, className }) => (
    <DraggableResizable
        id={id}
        position={data?.[`${id}_pos`]}
        size={data?.[`${id}_size`]}
        customStyle={data?.[`${id}_style`]}
        isEditing={isEditing}
        onUpdate={(eid, val) => {
            onUpdate?.(`${eid}_pos`, val.pos);
            onUpdate?.(`${eid}_size`, val.size);
            onUpdate?.(`${eid}_style`, val.style);
        }}
        style={style}
        className={className}
    >
        {children}
    </DraggableResizable>
);

// ========== SECTIONS ==========

const Header = ({ data, isEditing, onUpdate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header>
            <div className="top-bar">
                <div className="container">
                    <div className="top-links">
                        <ContentWrapper id="top_links_box" data={data} isEditing={isEditing} onUpdate={onUpdate}>
                            <a href="#about"><EditableText tag="span" content={data?.link_about} defaultContent="About" isEditing={isEditing} onSave={(v) => onUpdate('link_about', v)} /></a>
                            <a href="#blog"><EditableText tag="span" content={data?.link_blog} defaultContent="Blog" isEditing={isEditing} onSave={(v) => onUpdate('link_blog', v)} /></a>
                            <span style={{ marginLeft: 10, fontSize: 11, cursor: 'pointer' }}>English ▼</span>
                        </ContentWrapper>
                    </div>
                    <div className="top-right">
                        <ContentWrapper id="top_contact_box" data={data} isEditing={isEditing} onUpdate={onUpdate}>
                            <div style={{ display: 'flex', gap: 15 }}>
                                <div><Phone size={14} style={{ marginRight: 5 }} /><EditableText tag="span" content={data?.phone_top} defaultContent="+1 222 333-44-55" isEditing={isEditing} onSave={(v) => onUpdate('phone_top', v)} /></div>
                                <div><Clock size={14} style={{ marginRight: 5 }} /><EditableText tag="span" content={data?.hours} defaultContent="Mon-Sat 08:00-16:00" isEditing={isEditing} onSave={(v) => onUpdate('hours', v)} /></div>
                            </div>
                        </ContentWrapper>
                        <div className="social-icons">
                            <a href="#"><Facebook size={14} /></a>
                            <a href="#"><Twitter size={14} /></a>
                            <a href="#"><Linkedin size={14} /></a>
                            <a href="#"><Instagram size={14} /></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-header">
                <div className="container" style={{ position: 'relative' }}>
                    <div className="logo-section" style={{ width: 340, height: 100 }}>
                        <ContentWrapper id="main_logo" data={data} isEditing={isEditing} onUpdate={onUpdate} style={{ width: '100%', height: '100%' }}>
                            <EditableImage src={data?.logo} defaultSrc="/igescol-logo.jpg" isEditing={isEditing} onSave={(v) => onUpdate('logo', v)} style={{ width: '100%', height: '100%', backgroundSize: 'contain', backgroundPosition: 'left center', backgroundRepeat: 'no-repeat' }} />
                        </ContentWrapper>
                    </div>
                    {/* Phone Section on the right */}
                    <div className="header-phone">
                        <ContentWrapper id="header_phone_box" data={data} isEditing={isEditing} onUpdate={onUpdate}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-end' }}>
                                <Phone size={35} color="var(--primary)" />
                                <div style={{ textAlign: 'right' }}>
                                    <EditableText tag="div" className="phone-number" content={data?.phone_main} defaultContent="+1 222 333-44-55" isEditing={isEditing} onSave={(v) => onUpdate('phone_main', v)} />
                                    <EditableText tag="div" className="phone-label" content={data?.phone_label} defaultContent="Call us for enquiry" isEditing={isEditing} onSave={(v) => onUpdate('phone_label', v)} />
                                </div>
                            </div>
                        </ContentWrapper>
                    </div>
                </div>
            </div>
            {/* Navigation Bar - Restored & Responsive */}
            <div className="nav-bar">
                <div className="container" style={{ justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>

                    {/* Mobile Toggle Button */}
                    <button className="mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`} style={{ flex: 'unset' }}>
                        <ul className="nav-links">
                            <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Inicio</a></li>
                            <li><a href="#nosotros" onClick={() => setIsMenuOpen(false)}>Nosotros</a></li>
                            <li><a href="#services" onClick={() => setIsMenuOpen(false)}>Servicios</a></li>
                            <li><a href="#projects" onClick={() => setIsMenuOpen(false)}>Proyectos</a></li>
                            <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contacto</a></li>
                        </ul>
                    </nav>

                    <ContentWrapper id="nav_btn" data={data} isEditing={isEditing} onUpdate={onUpdate}>
                        <button className="btn-mabi">
                            <EditableText tag="span" content={data?.nav_btn_text} defaultContent="ACCESO" isEditing={isEditing} onSave={(v) => onUpdate('nav_btn_text', v)} />
                        </button>
                    </ContentWrapper>
                </div>
            </div>
        </header>
    );
};

const HeroSection = ({ data, isEditing, onUpdate }) => (
    <section id="home" className="hero-section" style={{ backgroundImage: data?.bg_image ? `url(${data.bg_image})` : 'url(https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600)' }}>
        <div className="container">
            <div className="hero-content">
                <ContentWrapper id="hero_text" data={data} isEditing={isEditing} onUpdate={onUpdate}>
                    <h1>
                        <EditableText tag="div" className="title-line1" content={data?.title_line1} defaultContent="CONSULTORÍA INTEGRAL" isEditing={isEditing} onSave={(v) => onUpdate('title_line1', v)} />
                        <EditableText tag="div" className="title-line2" content={data?.title_line2} defaultContent="EN INGENIERÍA Y DOMÓTICA" isEditing={isEditing} onSave={(v) => onUpdate('title_line2', v)} />
                    </h1>
                </ContentWrapper>
                <div className="hero-buttons">
                    <ContentWrapper id="hero_btn_1_box" data={data} isEditing={isEditing} onUpdate={onUpdate} style={{ display: 'inline-block', marginRight: 10 }}>
                        <button className="btn-hero-primary"><EditableText tag="span" content={data?.btn_primary} defaultContent="MÁS INFORMACIÓN" isEditing={isEditing} onSave={(v) => onUpdate('btn_primary', v)} /></button>
                    </ContentWrapper>
                    <ContentWrapper id="hero_btn_2_box" data={data} isEditing={isEditing} onUpdate={onUpdate} style={{ display: 'inline-block' }}>
                        <button className="btn-hero-secondary"><EditableText tag="span" content={data?.btn_secondary} defaultContent="CONTÁCTANOS" isEditing={isEditing} onSave={(v) => onUpdate('btn_secondary', v)} /></button>
                    </ContentWrapper>
                </div>
            </div>
        </div>
        {isEditing && (
            <div style={{ position: 'absolute', top: 20, right: 20 }}>
                <EditableImage src={data?.bg_image} isEditing={isEditing} onSave={(v) => onUpdate('bg_image', v)} style={{ width: 100, height: 60, border: '2px solid white', borderRadius: 8 }} />
            </div>
        )}
    </section>
);

const ServicesSection = ({ data, isEditing, onUpdate }) => {
    const services = [
        { id: 1, title: 'Licencias de Construcción', desc: 'Acompañamos todo el proceso de licenciamiento ante las autoridades competentes, cumplimiento normativo, optimización de tiempos y viabilidad técnica del proyecto.', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400' },
        { id: 2, title: 'Infraestructura Vial', desc: 'Diseño y consultoría en vías y carreteras. Desarrollamos estudios y diseños de infraestructura vial bajo criterios técnicos, normativos y de seguridad, orientados a proyectos urbanos y rurales.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
        { id: 3, title: 'Domótica Residencial', desc: 'Diseñamos e implementamos soluciones de domótica que integran confort, eficiencia energética y seguridad, adaptadas a las necesidades del usuario.', img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400' }
    ];

    return (
        <section id="services" className="services-section">
            <div className="container">
                <ContentWrapper id="serv_main_title" data={data} isEditing={isEditing} onUpdate={onUpdate}>
                    <h2 className="section-title"><EditableText tag="span" content={data?.title} defaultContent="Estos son nuestros servicios" isEditing={isEditing} onSave={(v) => onUpdate('title', v)} /></h2>
                </ContentWrapper>
                <div className="services-grid">
                    {services.map((s, i) => (
                        <div key={i} className="service-card">
                            <ContentWrapper id={`serv_img_${i}`} data={data} isEditing={isEditing} onUpdate={onUpdate} style={{ height: 200, width: '100%', marginBottom: 15 }}>
                                <EditableImage src={data?.[`service${i + 1}_img`]} defaultSrc={s.img} isEditing={isEditing} onSave={(v) => onUpdate(`service${i + 1}_img`, v)} className="service-card-image" style={{ width: '100%', height: '100%', backgroundSize: 'cover' }} />
                            </ContentWrapper>
                            <div className="service-card-content">
                                <ContentWrapper id={`serv_txt_${i}`} data={data} isEditing={isEditing} onUpdate={onUpdate}>
                                    <h3><EditableText tag="span" content={data?.[`service${i + 1}_title`]} defaultContent={s.title} isEditing={isEditing} onSave={(v) => onUpdate(`service${i + 1}_title`, v)} /></h3>
                                    <p><EditableText tag="span" content={data?.[`service${i + 1}_desc`]} defaultContent={s.desc} isEditing={isEditing} onSave={(v) => onUpdate(`service${i + 1}_desc`, v)} /></p>
                                </ContentWrapper>
                                <ContentWrapper id={`serv_btns_${i}`} data={data} isEditing={isEditing} onUpdate={onUpdate}>
                                    <div className="service-buttons">
                                        <button className="btn-saber-mas">SABER MÁS</button>
                                        <button className="btn-cotizar">COTIZAR</button>
                                    </div>
                                </ContentWrapper>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProcessSection = ({ data, isEditing, onUpdate }) => {
    const steps = [
        { icon: <Search size={28} />, title: 'Diagnóstico', description: 'Análisis técnico inicial del proyecto, identificando riesgos, oportunidades y condiciones reales del predio o infraestructura.', key: 'step1' },
        { icon: <FileText size={28} />, title: 'Propuesta', description: 'Definición de la solución técnica, alcance del servicio, cronograma y costos asociados.', key: 'step2' },
        { icon: <Settings size={28} />, title: 'Ejecución', description: 'Desarrollo del proyecto conforme a los lineamientos técnicos, normativos y de calidad establecidos.', key: 'step3' },
        { icon: <CheckCircle size={28} />, title: 'Entrega', description: 'Presentación de entregables finales, documentación técnica y cierre del proyecto.', key: 'step4' }
    ];
    return (
        <section className="process-section">
            <div className="container">
                <ContentWrapper id="proc_title" data={data} isEditing={isEditing} onUpdate={onUpdate}>
                    <h2 className="section-title"><EditableText tag="span" content={data?.title} defaultContent="Nuestro proceso de trabajo" isEditing={isEditing} onSave={(v) => onUpdate('title', v)} /></h2>
                </ContentWrapper>
                <div className="process-grid">
                    {steps.map((step, i) => (
                        <div key={i} className="process-card">
                            <div className="process-icon">{step.icon}</div>
                            <ContentWrapper id={`proc_txt_${i}`} data={data} isEditing={isEditing} onUpdate={onUpdate}>
                                <h4><EditableText tag="span" content={data?.[`${step.key}_title`] || step.title} isEditing={isEditing} onSave={(v) => onUpdate(`${step.key}_title`, v)} /></h4>
                                <p><EditableText tag="span" content={data?.[`${step.key}_desc`] || step.description} isEditing={isEditing} onSave={(v) => onUpdate(`${step.key}_desc`, v)} /></p>
                            </ContentWrapper>
                            <ContentWrapper id={`proc_btn_${i}`} data={data} isEditing={isEditing} onUpdate={onUpdate}>
                                <button className="btn-saber-mas">SABER MÁS</button>
                            </ContentWrapper>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ========== ABOUT (UPDATED WITH EXACT MOCKUP TEXT) ==========
const AboutSection = ({ data, isEditing, onUpdate }) => (
    <section id="nosotros" className="about-section" style={{ background: 'white' }}>
        <div className="container">
            <h2 className="section-title">Quiénes Somos</h2>
            <div className="about-content" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div className="about-logo" style={{ width: 600, height: 300 }}>
                    <ContentWrapper id="about_logo_box" data={data} isEditing={isEditing} onUpdate={onUpdate} style={{ width: '100%', height: '100%' }}>
                        <EditableImage src={data?.logo} defaultSrc="/igescol-logo.jpg" isEditing={isEditing} onSave={(v) => onUpdate('logo', v)} className="about-logo-icon" style={{ width: '100%', height: '100%', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
                    </ContentWrapper>
                </div>
                <div className="about-text">
                    <ContentWrapper id="about_text_box" data={data} isEditing={isEditing} onUpdate={onUpdate}>
                        <p><EditableText tag="span" content={data?.text1} defaultContent="Somos IGECCOL. una empresa de consultoria en ingeniera orientada a brindar soluciones técnicas Confiables, eficientes y ajusttadas a la normativa vigente." isEditing={isEditing} onSave={(v) => onUpdate('text1', v)} /></p>
                        <p><EditableText tag="span" content={data?.text2} defaultContent="Contamos con experiencia en proyectos, de construcción, Infraestructura vial y sistemas de domótica residencial, acompariando a nuestros clientes desde la etapa de planeación nasta la ejecución y entrega final." isEditing={isEditing} onSave={(v) => onUpdate('text2', v)} /></p>
                        <p><EditableText tag="span" content={data?.text3} defaultContent="Nuestro enfoque se besa en la calidad técnica, la responsabilidad profesional y la optimización de rezursos." isEditing={isEditing} onSave={(v) => onUpdate('text3', v)} /></p>
                    </ContentWrapper>
                    <ContentWrapper id="about_btn_box" data={data} isEditing={isEditing} onUpdate={onUpdate}>
                        <button className="btn-conocenos">CONÓCENOS</button>
                    </ContentWrapper>
                </div>
            </div>
        </div>
    </section>
);

// ========== WHY US (UPDATED WITH EXACT MOCKUP TEXT) ==========
const WhyUsSection = ({ data, isEditing, onUpdate }) => {
    const cards = [
        { key: 'why1', title: 'Diagnóstico Técnico', desc: 'Análisis técnico y normativo inicial del proyecto, identificando riesgos, oportunidades y condiciones reales del predio o infraestructura. Este diagnóstico permite tomar decisiones informadas desde el primer momento y optimizar tiempos y costos.', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400' },
        { key: 'why2', title: 'Propuesta Estructurada', desc: 'Definimos soluciones técnicas viables, acompañadas de alcances claros, cronogramas realistas y estimaciones económicas ajustadas a la normativa vigente y a los objetivos del cliente.', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400' },
        { key: 'why3', title: 'Soluciones a Medida', desc: 'Cada proyecto es diseñado según sus condiciones específicas: ubicación, normativa, presupuesto y uso final. Integramos ingeniería, tecnología y sostenibilidad para entregar soluciones personalizadas y eficientes.', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400' },
        { key: 'why4', title: 'Acompañamiento Profesional', desc: 'Brindamos asesoría técnica continua durante todas las etapas del proyecto, desde la conceptualización hasta la entrega de los productos finales, garantizando calidad, cumplimiento y respaldo profesional.', img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400' }
    ];

    return (
        <section className="why-us-section">
            <div className="container">
                <h2 className="section-title">Por Qué <span>Elegirnos</span></h2>
                <div className="why-us-grid">
                    {cards.map((c, i) => (
                        <div key={i} className="why-card">
                            <ContentWrapper id={`why_img_${i}`} data={data} isEditing={isEditing} onUpdate={onUpdate} style={{ height: 200, width: '100%', marginBottom: 15 }}>
                                <EditableImage src={data?.[`${c.key}_img`]} defaultSrc={c.img} isEditing={isEditing} onSave={(v) => onUpdate(`${c.key}_img`, v)} className="why-card-image" style={{ width: '100%', height: '100%', backgroundSize: 'cover' }} />
                            </ContentWrapper>
                            <ContentWrapper id={`why_txt_${i}`} data={data} isEditing={isEditing} onUpdate={onUpdate}>
                                <h4><EditableText tag="span" content={data?.[`${c.key}_title`]} defaultContent={c.title} isEditing={isEditing} onSave={(v) => onUpdate(`${c.key}_title`, v)} /></h4>
                                <p><EditableText tag="span" content={data?.[`${c.key}_desc`]} defaultContent={c.desc} isEditing={isEditing} onSave={(v) => onUpdate(`${c.key}_desc`, v)} /></p>
                            </ContentWrapper>
                            <ContentWrapper id={`why_btn_${i}`} data={data} isEditing={isEditing} onUpdate={onUpdate}>
                                <button className="btn-saber-mas">SABER MÁS</button>
                            </ContentWrapper>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProjectsSection = ({ data, isEditing, onUpdate }) => {
    const categories = [{ baseKey: 'cat1', title: 'GESTION DE LICENCIAS DE CONSTRUCCION', projs: [1, 2, 3, 4, 5, 6] }, { baseKey: 'cat2', title: 'INFRAESTRUCTURA VIAL', projs: [1, 2, 3, 4, 5, 6] }];
    return (
        <section id="projects" className="projects-section">
            <div className="container">
                <h2 className="section-title">Nuestros Proyectos</h2>
                {categories.map((cat, ci) => (
                    <div key={ci} className="project-category">
                        <ContentWrapper id={`proj_cat_${ci}_title`} data={data} isEditing={isEditing} onUpdate={onUpdate}>
                            <h3><EditableText tag="span" content={data?.[`${cat.baseKey}_title`]} defaultContent={cat.title} isEditing={isEditing} onSave={(v) => onUpdate(`${cat.baseKey}_title`, v)} /></h3>
                        </ContentWrapper>
                        <div className="project-grid-new">
                            {cat.projs.map((p, pi) => (
                                <div key={pi} className="project-item-new" style={{ position: 'relative', height: 200 }}>
                                    <ContentWrapper id={`proj_img_${ci}_${pi}`} data={data} isEditing={isEditing} onUpdate={onUpdate} style={{ width: '100%', height: '100%' }}>
                                        <EditableImage src={data?.[`${cat.baseKey}_proj${pi + 1}_img`]} defaultSrc={`https://via.placeholder.com/300?text=P${pi + 1}`} isEditing={isEditing} onSave={(v) => onUpdate(`${cat.baseKey}_proj${pi + 1}_img`, v)} className="project-item-image-new" style={{ width: '100%', height: '100%', backgroundSize: 'cover' }} />
                                    </ContentWrapper>
                                    <div className="project-overlay">
                                        <ContentWrapper id={`proj_txt_${ci}_${pi}`} data={data} isEditing={isEditing} onUpdate={onUpdate}>
                                            <h5><EditableText tag="span" content={data?.[`${cat.baseKey}_proj${pi + 1}_name`]} defaultContent="Nombre Proyecto" isEditing={isEditing} onSave={(v) => onUpdate(`${cat.baseKey}_proj${pi + 1}_name`, v)} /></h5>
                                        </ContentWrapper>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const ContactSection = ({ data, isEditing, onUpdate }) => (
    <section id="contact" className="contact-section">
        <div className="container">
            <h2 className="section-title">¿Tienes un proyecto en mente?</h2>
            <div className="contact-grid">
                <div className="stats-side" style={{ padding: 20 }}>
                    <ContentWrapper id="cnt_stats" data={data} isEditing={isEditing} onUpdate={onUpdate}>
                        <div className="stats-header">
                            <h4>Tecnologia y Iesnobilisidad</h4>
                        </div>
                        <div className="cert-icon" style={{ margin: '20px 0' }}>
                            <Award size={60} color="#10b981" />
                        </div>
                        <div className="stats-numbers" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, textAlign: 'center' }}>
                            <div className="stat-item"><div className="number" style={{ fontSize: '1.5rem', fontWeight: 800 }}>30%</div><div className="label" style={{ fontSize: '0.7rem' }}>Deeagxtera<br />sertifkJasex<br />denvirsfíes</div></div>
                            <div className="stat-item"><div className="number" style={{ fontSize: '1.5rem', fontWeight: 800 }}>90%</div><div className="label" style={{ fontSize: '0.7rem' }}>Deseíac<br />Genexítex<br />en BIM</div></div>
                            <div className="stat-item"><div className="number" style={{ fontSize: '1.5rem', fontWeight: 800 }}>90%</div><div className="label" style={{ fontSize: '0.7rem' }}>Content 8<br />Doxfícia<br />Rcmprnit 360</div></div>
                        </div>
                        <div style={{ borderTop: '1px solid #eee', paddingTop: 20, marginBottom: 20, marginTop: 20 }}>
                            <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--secondary)', marginBottom: 10 }}>H Desenga Bicoinibilsited</p>
                            <p style={{ fontSize: '0.85rem', color: 'var(--gray-text)', marginBottom: 15 }}>Design Princlies</p>
                        </div>
                        <div className="cert-logos">
                            <span>Licenseess</span>
                            <span>Ifrlstructax</span>
                            <span>Flevia Controllit</span>
                        </div>
                    </ContentWrapper>
                </div>
                <div className="contact-form-side">
                    <h3>Contáctanos</h3>
                    <ContentWrapper id="cnt_txt" data={data} isEditing={isEditing} onUpdate={onUpdate}>
                        <p className="subtitle"><EditableText tag="span" content={data?.subtitle} defaultContent="¿Tienes un proyecto en mente?" isEditing={isEditing} onSave={(v) => onUpdate('subtitle', v)} /></p>
                        <p className="desc"><EditableText tag="span" content={data?.desc} defaultContent="Nuestro equipo esta listo para asesorarte." isEditing={isEditing} onSave={(v) => onUpdate('desc', v)} /></p>
                    </ContentWrapper>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>NOMBRE</label>
                            <input type="text" placeholder="" />
                        </div>
                        <div className="form-group">
                            <label>CORREO REIGISTRONICO</label>
                            <input type="email" placeholder="Correo Electrónico" />
                        </div>
                        <div className="form-group">
                            <label>TELÉFONO</label>
                            <input type="tel" placeholder="Teléfono" />
                        </div>
                        <div className="form-group full">
                            <label>MENSAJE</label>
                            <textarea placeholder="Mensaje"></textarea>
                        </div>
                    </div>
                    <ContentWrapper id="cnt_submit_btn" data={data} isEditing={isEditing} onUpdate={onUpdate}>
                        <button className="btn-submit">ENVIAR SOLICITUD</button>
                    </ContentWrapper>
                </div>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="footer">
        <div className="container"><p>© 2024 IGESCOL - Todos los derechos reservados</p></div>
    </footer>
);

export default function Home({ forceEdit = false }) {
    const { content: cmsContent, loading, refresh } = useCMS();
    const { profile } = useAuth();
    const [isEditing, setIsEditing] = useState(forceEdit || false);
    const [localContent, setLocalContent] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => { if (cmsContent) setLocalContent(cmsContent); }, [cmsContent]);
    useEffect(() => { if (forceEdit) setIsEditing(true); }, [forceEdit]);

    const updateLocalSection = useCallback((sectionName, fieldPath, value) => {
        setLocalContent(prev => {
            const newContent = { ...prev };
            newContent[sectionName] = { ...(newContent[sectionName] || {}), [fieldPath]: value };
            return newContent;
        });
    }, []);

    const handleGlobalSave = async () => {
        setSaving(true);
        try {
            const promises = Object.keys(localContent).map(section =>
                supabase.from('cms_content').upsert({
                    section_name: section,
                    content: localContent[section]
                }, { onConflict: 'section_name' })
            );
            await Promise.all(promises);
            await refresh();
            alert('¡Sitio actualizado con éxito!');
            setIsEditing(false);
        } catch (err) {
            console.error('Save error:', err);
            alert('Error al guardar.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Cargando...</div>;

    const createProps = (section) => ({
        data: localContent[section] || {},
        isEditing,
        onUpdate: (path, val) => updateLocalSection(section, path, val)
    });

    return (
        <div className="landing-page">
            {isEditing && (
                <div style={{ position: 'fixed', bottom: 30, right: 30, zIndex: 10000, display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ background: 'white', padding: '10px 20px', borderRadius: 50, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                        <Maximize size={16} />
                        <span>Haz click en textos o imágenes</span>
                    </div>
                    <button onClick={handleGlobalSave} disabled={saving} style={{ padding: '16px 32px', borderRadius: 50, background: '#10b981', color: 'white', border: 'none', fontWeight: 800, cursor: 'pointer' }}>
                        {saving ? 'GUARDANDO...' : 'GUARDAR Y SALIR'}
                    </button>
                    <button onClick={() => setIsEditing(false)} style={{ padding: '16px', borderRadius: '50%', background: '#ef4444', color: 'white', border: 'none', cursor: 'pointer' }}>
                        <X />
                    </button>
                </div>
            )}
            {/* {!isEditing && (
                <button onClick={() => setIsEditing(true)} style={{ position: 'fixed', bottom: 30, right: 30, zIndex: 10000, padding: '16px 32px', borderRadius: 50, background: 'var(--primary)', color: 'white', border: 'none', fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 30px rgba(64,137,167,0.3)' }}>
                    <Palette size={16} style={{ marginRight: 8 }} /> MODO DISEÑADOR
                </button>
            )} */}

            <Header {...createProps('header')} />
            <HeroSection {...createProps('hero')} />
            <ServicesSection {...createProps('services')} />
            <ProcessSection {...createProps('process')} />
            <AboutSection {...createProps('about')} />
            <WhyUsSection {...createProps('whyus')} />
            <ProjectsSection {...createProps('projects')} />
            <ContactSection {...createProps('contact')} />
            <Footer />
            <SalesBot />
        </div>
    );
}
