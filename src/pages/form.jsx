import React from 'react';
import './form.css';
import { useData } from '../hooks/useData';
import { DataService } from '../data/DataService';

const ContactForm = ({ formData }) => {
    // Safety: Ensure all expected properties exist even if Sheet is empty
    const { 
        location = {}, 
        contact = { email: '', website: '' }, 
        social_media = [], 
        theme = {} 
    } = formData || {};

    const [status, setStatus] = React.useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(data).toString(),
        })
            .then(() => {
                setStatus("SUCCESS");
                form.reset();
            })
            .catch((error) => {
                console.error("Form submission error:", error);
                setStatus("ERROR");
            });
    };

    const dynamicTheme = {
        '--orange-bg':  theme.orange_box_bg || '#646360',
        '--orange-text': theme.orange_box_text || '#FFFFFF',
        '--blue-bg':    theme.blue_box_bg || '#94928b',
        '--blue-text':  theme.blue_box_text || '#FFFFFF',
        '--white-bg':   theme.white_box_bg || '#bfbcb6',
        '--white-text': theme.white_box_text || '#2F2F2F',
        '--btn-bg':     theme.button_bg || '#2F2F2F',
        '--btn-text':   theme.button_text || '#FFFFFF',
    };

    const socialIcon = (platform) => {
        const p = platform.toLowerCase();
        if (p === 'instagram') return '/icons/insta.webp';
        if (p === 'threads')   return '/icons/threads.webp';
        if (p === 'tiktok')    return '/icons/tiktok.webp';
        if (p === 'spotify')   return '/icons/spotify.webp';
        if (p === 'youtube')   return '/icons/youtube.webp';
        if (p === 'anghami')   return '/icons/anghami.webp';
        return null;
    };

    return (
        <div className="cf-wrap" style={dynamicTheme}>
            <div className="cf-grid">

                {/* ── LEFT COLUMN: Visit Us + Drop a Line ── */}
                <div className="cf-col">

                    <div className="cf-card cf-card--dark">
                        <h2 className="cf-heading">VISIT US</h2>
                        <div className="cf-address">
                            <span>
                                {location.company}<br />
                                {location.building}<br />
                                {location.street}
                            </span>
                            <span>
                                {location.area}<br />
                                {location.city}
                            </span>
                        </div>
                        {/* Map Link */}
                        <a 
                            href={location.map_url || "#"} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="cf-map-link"
                        >
                            <img src="/images/map.webp" alt="Location Map" className="cf-map-img" loading="lazy" />
                        </a>
                    </div>

                    <div className="cf-card cf-card--mid">
                        <h2 className="cf-heading">DROP A LINE</h2>

                        <div className="cf-contact-rows">
                            <div className="cf-contact-row">
                                <span className="cf-icon">
                                    <img src="/icons/mail.webp" alt="Email" loading="lazy" />
                                </span>
                                <div>
                                    <small>email</small>
                                    <p>
                                        <a
                                            href={`mailto:${contact.email}`}
                                            className="cf-email-link"
                                            onPointerDown={(e) => e.stopPropagation()}
                                            onClick={(e) => { e.stopPropagation(); window.open(`mailto:${contact.email}`); }}
                                        >
                                            {contact.email}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="cf-socials">
                            {social_media.map((s, i) => (
                                <a
                                    key={i}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cf-social-btn"
                                >
                                    <img src={socialIcon(s.platform)} alt={s.platform} loading="lazy" />
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                {/* ── RIGHT COLUMN: Quick Message ── */}
                <div className="cf-col">

                    <div className="cf-card cf-card--light">
                        <h2 className="cf-heading">QUICK MESSAGE</h2>
                        <form 
                            className="cf-form" 
                            name="contact" 
                            method="POST" 
                            onSubmit={handleSubmit}
                        >
                            <input type="hidden" name="form-name" value="contact" />
                            <p style={{ display: 'none' }}>
                                <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                            </p>
                            <div className="cf-input-row">
                                <div className="cf-field">
                                    <label>NAME</label>
                                    <input type="text" name="name" autoComplete="name" required />
                                </div>
                                <div className="cf-field">
                                    <label>EMAIL</label>
                                    <input type="email" name="email" autoComplete="email" required />
                                </div>
                            </div>
                            <div className="cf-field">
                                <label>SUBJECT</label>
                                <input type="text" name="subject" required />
                            </div>
                            <div className="cf-field cf-field--grow">
                                <label>MESSAGE</label>
                                <textarea name="message" rows="4" required></textarea>
                            </div>
                            {status === "SUCCESS" && (
                                <p className="status-success" style={{ color: '#2ecc71', marginTop: '10px', fontSize: '0.9rem' }}>
                                    Thank you! Your message has been sent.
                                </p>
                            )}
                            {status === "ERROR" && (
                                <p className="status-error" style={{ color: '#e74c3c', marginTop: '10px', fontSize: '0.9rem' }}>
                                    Something went wrong. Please try again.
                                </p>
                            )}
                            <button type="submit" className="cf-btn">
                                SEND MESSAGE <span aria-hidden="true">→</span>
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContactForm;
