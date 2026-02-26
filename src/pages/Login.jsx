import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

const C = { navy: '#0C2340', teal: '#00B4D8' };

export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [localLoading, setLocalLoading] = useState(false);
    const [error, setError] = useState(null);
    const [resetSent, setResetSent] = useState(false);

    const { signIn, profile, user, resetPassword } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect if already logged in
    useEffect(() => {
        if (user && profile) {
            const origin = location.state?.from?.pathname || `/${profile.role || 'user'}`;
            navigate(origin, { replace: true });
        }
    }, [user, profile, navigate, location]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLocalLoading(true);

        try {
            const { error: signInError } = await signIn({ email, password: pass });
            if (signInError) throw signInError;
        } catch (err) {
            setError(err.message || 'Error al iniciar sesión');
            setLocalLoading(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!email) {
            setError('Por favor, ingrese su correo electrónico primero.');
            return;
        }
        setError(null);
        setLocalLoading(true);
        try {
            const { error } = await resetPassword(email);
            if (error) throw error;
            setResetSent(true);
        } catch (err) {
            setError(err.message || 'Error al enviar correo de recuperación');
        } finally {
            setLocalLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin
                }
            });
            if (error) throw error;
        } catch (err) {
            setError(err.message || 'Error con Google Auth');
        }
    };

    return (
        <div style={{ fontFamily: "'Montserrat', sans-serif", height: '100vh', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', background: 'white', overflow: 'hidden' }}>
            {/* Lado izquierdo - Diseño Visual (Oculto en móvil) */}
            <div className="login-visual" style={{ gridColumn: 'span 7', position: 'relative', background: C.navy, overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(12,35,64,0.8)', mixBlendMode: 'multiply', zIndex: 10 }}></div>
                <img
                    alt="Technical Blueprint"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)', opacity: 0.6, zIndex: 0 }}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAle6GYvgdcZon18_NbyhO5Mc-ROs2cxAEC6LcemPERVMU9bx3jB9TWsQhxC7uKw_aq0W7k3misyDgF3V2TFt7j3mPDS1yz1kIcSylxFOnek6FHDhXLncGSq__a6DkEgT-FNQqnQM0uCpHtldnEYOMgVF6qQQFcuvKUhOEsFPitwlAwr6yqa3yPKE9h0sDv3mfnp_oJum16N9N4Sy8HAGCrLYDX-fcr30Ty2XLA2QOvKSkYp4kC_M4s17X_K4NHTlAlZ35HDf70jhsD"
                />

                <div style={{ position: 'absolute', inset: 0, zIndex: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ color: 'white', background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '8px', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '1.875rem' }}>layers</span>
                        </div>
                        <span style={{ fontWeight: 700, fontSize: '1.875rem', letterSpacing: '-0.025em', color: 'white' }}>IGESCOL</span>
                    </div>

                    <div style={{ maxWidth: '32rem' }}>
                        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                            Ingeniería de Precisión para el Futuro
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', fontWeight: 300, lineHeight: 1.6 }}>
                            Acceda a la plataforma integral de gestión de proyectos y consultoría técnica avanzada.
                        </p>
                    </div>

                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>
                        © 2024 IGESCOL. Todos los derechos reservados.
                    </div>
                </div>

                {/* Decoraciones Blur */}
                <div style={{ position: 'absolute', top: '5rem', right: '5rem', width: '16rem', height: '16rem', background: 'rgba(0,180,216,0.2)', borderRadius: '50%', filter: 'blur(64px)', zIndex: 10 }}></div>
                <div style={{ position: 'absolute', bottom: '2.5rem', left: '5rem', width: '20rem', height: '20rem', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(64px)', zIndex: 10 }}></div>
            </div>

            {/* Lado derecho - Formulario */}
            <div className="login-form-container" style={{ gridColumn: 'span 5', background: 'white', position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>

                {/* Botón Volver */}
                <div style={{ position: 'absolute', top: 0, right: 0, padding: '2rem', display: 'flex', justifyContent: 'flex-end', width: '100%', zIndex: 10 }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseOver={e => e.currentTarget.style.color = C.teal}
                        onMouseOut={e => e.currentTarget.style.color = '#475569'}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>arrow_back</span>
                        Volver al inicio
                    </Link>
                </div>

                <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
                    <div style={{ width: '100%', maxWidth: '24rem' }}>

                        {/* Logo visible solo en móvil */}
                        <div className="login-mobile-logo" style={{ display: 'none', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', justifyContent: 'center' }}>
                            <div style={{ color: C.teal, background: 'rgba(0,180,216,0.1)', padding: '0.5rem', borderRadius: '8px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1.875rem' }}>layers</span>
                            </div>
                            <span style={{ fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.025em', color: C.navy }}>IGESCOL</span>
                        </div>

                        <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.875rem', fontWeight: 800, color: C.navy, marginBottom: '0.5rem' }}>Iniciar Sesión</h2>
                            <p style={{ color: '#64748b' }}>Bienvenido de nuevo a su panel de control.</p>
                        </div>

                        {error && (
                            <div style={{ padding: '1rem', background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '12px', color: '#991b1b', fontSize: '0.85rem', marginBottom: '1.5rem', fontWeight: 600 }}>
                                {error}
                            </div>
                        )}

                        {resetSent && (
                            <div style={{ padding: '1rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', color: '#166534', fontSize: '0.85rem', marginBottom: '1.5rem', fontWeight: 600 }}>
                                Se ha enviado un correo para restablecer su contraseña.
                            </div>
                        )}

                        {/* Botón Google */}
                        <button
                            onClick={handleGoogleLogin}
                            disabled={localLoading}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.75rem',
                                padding: '0.875rem',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                background: 'white',
                                color: C.navy,
                                fontWeight: 700,
                                fontSize: '0.9rem',
                                cursor: localLoading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s',
                                marginBottom: '1.5rem',
                                opacity: localLoading ? 0.7 : 1
                            }}
                            onMouseOver={e => !localLoading && (e.currentTarget.style.background = '#f8fafc')}
                            onMouseOut={e => !localLoading && (e.currentTarget.style.background = 'white')}
                        >
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '18px', height: '18px' }} />
                            Continuar con Google
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ flexGrow: 1, height: '1px', background: '#f1f5f9' }}></div>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>O CON CORREO</span>
                            <div style={{ flexGrow: 1, height: '1px', background: '#f1f5f9' }}></div>
                        </div>

                        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: 700, color: C.navy }}>Correo Electrónico</label>
                                <div style={{ position: 'relative' }}>
                                    <span className="material-symbols-outlined" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '1.25rem' }}>mail</span>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="nombre@empresa.com"
                                        style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none', fontFamily: 'Montserrat, sans-serif' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <label style={{ fontSize: '0.875rem', fontWeight: 700, color: C.navy }}>Contraseña</label>
                                    <button
                                        type="button"
                                        onClick={handleForgotPassword}
                                        style={{ background: 'none', border: 'none', padding: 0, fontSize: '0.75rem', fontWeight: 700, color: C.teal, cursor: 'pointer', fontFamily: 'Montserrat, sans-serif' }}
                                    >
                                        ¿Olvidó su contraseña?
                                    </button>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <span className="material-symbols-outlined" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '1.25rem' }}>lock</span>
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        required
                                        value={pass}
                                        onChange={e => setPass(e.target.value)}
                                        placeholder="••••••••"
                                        style={{ width: '100%', padding: '1rem 3.5rem 1rem 3rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none', fontFamily: 'Montserrat, sans-serif', boxSizing: 'border-box' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass(!showPass)}
                                        style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center', padding: 0 }}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>{showPass ? 'visibility_off' : 'visibility'}</span>
                                    </button>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <input type="checkbox" id="remember" style={{ width: '1rem', height: '1rem', borderRadius: '4px', accentColor: C.teal }} />
                                <label htmlFor="remember" style={{ fontSize: '0.875rem', color: '#64748b' }}>Recordar mi sesión</label>
                            </div>

                            <button type="submit" disabled={localLoading} style={{
                                background: C.teal,
                                color: 'white',
                                padding: '1rem',
                                borderRadius: '12px',
                                border: 'none',
                                fontWeight: 700,
                                cursor: localLoading ? 'not-allowed' : 'pointer',
                                fontSize: '0.9rem',
                                letterSpacing: '0.05em',
                                boxShadow: '0 8px 20px rgba(0,180,216,0.2)',
                                transition: 'all 0.3s',
                                opacity: localLoading ? 0.7 : 1
                            }}
                                onMouseOver={e => !localLoading && (e.currentTarget.style.background = C.navy)}
                                onMouseOut={e => !localLoading && (e.currentTarget.style.background = C.teal)}>
                                {localLoading ? 'INGRESANDO...' : 'INGRESAR'}
                            </button>
                        </form>

                        <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
                            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                                ¿Aún no tiene una cuenta?
                                <Link to="/register" style={{ color: C.teal, fontWeight: 700, textDecoration: 'none', marginLeft: '0.5rem' }}>Regístrese aquí</Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div style={{ height: '8px', background: `linear-gradient(to right, ${C.teal}, ${C.navy})` }}></div>
            </div>

            <style>{`
                @media (max-width: 1024px) {
                    .login-visual { display: none !important; }
                    .login-form-container { grid-column: span 12 !important; }
                    .login-mobile-logo { display: flex !important; }
                }
            `}</style>
        </div>
    );
}
