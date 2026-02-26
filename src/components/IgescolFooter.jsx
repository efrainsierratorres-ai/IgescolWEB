import React from 'react';
import { Link } from 'react-router-dom';

const C = { navy: '#0C2340', teal: '#00B4D8' };

export default function IgescolFooter() {
    return (
        <footer style={{ background: C.navy, color: 'white', fontFamily: "'Montserrat', sans-serif" }}>
            {/* Main footer */}
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem 2rem' }}>
                <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                            <img src="/images/logo-igescol.jpg" alt="IGESCOL" style={{ height: '50px', objectFit: 'contain', borderRadius: '6px' }} />
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                            Consultoría integral en ingeniería civil. Lideramos la transformación técnica con innovación, sostenibilidad y precisión.
                        </p>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.teal, marginBottom: '1.25rem' }}>Navegación</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                { to: '/', label: 'Inicio' },
                                { to: '/nosotros', label: 'Nosotros' },
                                { to: '/proceso', label: 'Proceso de Trabajo' },
                                { to: '/por-que-elegirnos', label: 'Por qué elegirnos' },
                                { to: '/cotizacion', label: 'Cotización' },
                            ].map(link => (
                                <Link key={link.to} to={link.to} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
                                    onMouseOver={e => e.currentTarget.style.color = C.teal}
                                    onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.teal, marginBottom: '1.25rem' }}>Servicios</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                { to: '/servicios/licencias', label: 'Licencias de Construcción' },
                                { to: '/servicios/infraestructura', label: 'Infraestructura Vial' },
                                { to: '/servicios/domotica', label: 'Domótica Residencial' },
                                { to: '/servicios/diseno-estructural', label: 'Diseño Estructural' },
                            ].map(link => (
                                <Link key={link.to} to={link.to} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
                                    onMouseOver={e => e.currentTarget.style.color = C.teal}
                                    onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.teal, marginBottom: '1.25rem' }}>Contacto</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: C.teal, marginTop: '2px' }}>phone</span>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span>+57 310 7981505</span>
                                    <span>+57 314 2191841</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: C.teal }}>mail</span>
                                <a href="mailto:info.igescol@gmail.com" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}
                                    onMouseOver={e => e.currentTarget.style.color = C.teal}
                                    onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                                    info.igescol@gmail.com
                                </a>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: C.teal }}>schedule</span>
                                <span>Lun - Sáb 7:00 AM - 6:00 PM</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: C.teal }}>location_on</span>
                                <span>Medellín, Colombia</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider + bottom */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', margin: 0 }}>
                        © {new Date().getFullYear()} IGESCOL S.A.S. Todos los derechos reservados.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.8rem' }}>Privacidad</a>
                        <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.8rem' }}>Términos</a>
                        <Link to="/login" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.8rem' }}>Acceso</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
