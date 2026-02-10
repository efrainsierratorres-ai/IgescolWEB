import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { MessageSquare, X, Send } from 'lucide-react';

export default function SalesBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async () => {
        const { error } = await supabase.from('leads').insert([{
            ...formData,
            source: 'bot',
            status: 'nuevo'
        }]);

        if (!error) {
            setSubmitted(true);
            setTimeout(() => {
                setIsOpen(false);
                setStep(0);
                setSubmitted(false);
                setFormData({ name: '', email: '', phone: '' });
            }, 3000);
        }
    };

    return (
        <div className="sales-bot" style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999 }}>
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
                >
                    <MessageSquare size={30} />
                </button>
            ) : (
                <div style={{ width: '350px', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '600' }}>Asesor IGESCOL</span>
                        <X size={20} style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
                    </div>
                    <div style={{ padding: '20px', minHeight: '250px' }}>
                        {!submitted ? (
                            <>
                                {step === 0 && (
                                    <div>
                                        <p style={{ marginBottom: '15px' }}>¡Hola! 👋 Soy el asistente virtual de IGESCOL. ¿Cómo te llamas?</p>
                                        <input
                                            type="text"
                                            placeholder="Tu nombre"
                                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                                            onKeyDown={(e) => e.key === 'Enter' && setStep(1)}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                        <button className="btn-primary" style={{ marginTop: '15px', width: '100%' }} onClick={() => setStep(1)}>Siguiente</button>
                                    </div>
                                )}
                                {step === 1 && (
                                    <div>
                                        <p style={{ marginBottom: '15px' }}>Un gusto, {formData.name}. ¿A qué correo te podemos contactar?</p>
                                        <input
                                            type="email"
                                            placeholder="tu@email.com"
                                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                                            onKeyDown={(e) => e.key === 'Enter' && setStep(2)}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                        <button className="btn-primary" style={{ marginTop: '15px', width: '100%' }} onClick={() => setStep(2)}>Siguiente</button>
                                    </div>
                                )}
                                {step === 2 && (
                                    <div>
                                        <p style={{ marginBottom: '15px' }}>Por último, déjanos tu WhatsApp para una atención rápida.</p>
                                        <input
                                            type="tel"
                                            placeholder="Número de teléfono"
                                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                        <button className="btn-primary" style={{ marginTop: '15px', width: '100%' }} onClick={handleSubmit}>Enviar Información</button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', paddingTop: '40px' }}>
                                <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>✅ ¡Información enviada!</p>
                                <p style={{ color: '#666' }}>Un asesor te contactará pronto.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
