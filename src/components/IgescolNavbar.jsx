import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const C = { navy: '#0C2340', teal: '#00B4D8' };

export default function IgescolNavbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { to: '/', label: 'Inicio' },
        { to: '/nosotros', label: 'Nosotros' },
        { to: '/proyectos', label: 'Proyectos' },
        { to: '/proceso', label: 'Proceso' },
        { to: '/por-que-elegirnos', label: 'Por qué elegirnos' },
        { to: '/cotizacion', label: 'Cotización' },
    ];

    return (
        <>
            {/* Top bar */}
            <div style={{ background: C.navy, position: 'fixed', top: 0, width: '100%', zIndex: 60, height: '44px' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                    <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.7rem', color: 'rgba(255,255,255,0.85)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '11px', color: C.teal }}>phone</span>
                                <span>+57 310 7981505</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '11px', color: C.teal }}>phone</span>
                                <span>+57 314 2191841</span>
                            </div>
                        </div>
                        <div className="topbar-extra" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '12px', color: C.teal }}>mail</span>
                                <span>info.igescol@gmail.com</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '12px', color: C.teal }}>schedule</span>
                                <span>Lun - Sáb 7:00 AM - 6:00 PM</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '12px', color: C.teal }}>location_on</span>
                                <span>Medellín, Colombia</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main navbar */}
            <nav style={{ background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', position: 'fixed', top: '44px', width: '100%', zIndex: 50 }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>

                    {/* Logo a la izquierda */}
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <img src="/igescol-logoH.jpg" alt="IGESCOL" style={{ height: '56px', objectFit: 'contain' }} />
                    </Link>

                    {/* Menú central (Desktop) */}
                    <div className="desktop-nav" style={{ display: 'flex', gap: '2rem' }}>
                        {navLinks.map(link => (
                            <Link key={link.to} to={link.to} style={{
                                textDecoration: 'none', fontWeight: isActive(link.to) ? 700 : 600, fontSize: '0.85rem',
                                color: isActive(link.to) ? C.teal : C.navy, fontFamily: 'Montserrat, sans-serif',
                                transition: 'color 0.2s'
                            }}
                                onMouseOver={e => { if (!isActive(link.to)) e.currentTarget.style.color = C.teal; }}
                                onMouseOut={e => { if (!isActive(link.to)) e.currentTarget.style.color = C.navy; }}
                            >{link.label}</Link>
                        ))}
                    </div>

                    {/* Botón ACCESO a la derecha */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Link to="/login" style={{
                            background: C.navy,
                            color: 'white',
                            fontWeight: 700,
                            padding: '0.7rem 1.8rem',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontSize: '0.8rem',
                            fontFamily: 'Montserrat, sans-serif',
                            letterSpacing: '0.05em',
                            boxShadow: '0 4px 12px rgba(12,35,64,0.2)',
                            transition: 'all 0.2s'
                        }}
                            onMouseOver={e => { e.currentTarget.style.background = C.teal; }}
                            onMouseOut={e => { e.currentTarget.style.background = C.navy; }}>
                            ACCESO
                        </Link>

                        <button onClick={() => setMobileOpen(!mobileOpen)} className="mobile-toggle" style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.navy, display: 'none' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>{mobileOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileOpen && (
                <div style={{ position: 'fixed', top: '124px', left: 0, right: 0, background: 'white', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', zIndex: 49, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {navLinks.map(link => (
                        <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} style={{ textDecoration: 'none', fontWeight: 600, color: isActive(link.to) ? C.teal : C.navy, padding: '1rem 0', borderBottom: '1px solid #f1f5f9', fontFamily: 'Montserrat, sans-serif', fontSize: '1rem' }}>
                            {link.label}
                        </Link>
                    ))}
                    <Link to="/login" onClick={() => setMobileOpen(false)} style={{ textDecoration: 'none', fontWeight: 700, color: 'white', background: C.navy, padding: '1rem', borderRadius: '8px', textAlign: 'center', marginTop: '1rem', fontFamily: 'Montserrat, sans-serif' }}>
                        ACCESO
                    </Link>
                </div>
            )}

            <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
          .topbar-extra { display: none !important; }
        }
      `}</style>
        </>
    );
}
