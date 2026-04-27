import React from 'react';
import './form.css';
import formLocal from '../data/form.json';
import { useData } from '../hooks/useData';
import { DataService } from '../data/DataService';

const ContactForm = () => {
    const formData = useData(DataService.getFormData, formLocal);
    const { location, contact, social_media, theme } = formData;

    const dynamicTheme = {
        '--orange-bg':  theme.orange_box_bg,
        '--orange-text': theme.orange_box_text,
        '--blue-bg':    theme.blue_box_bg,
        '--blue-text':  theme.blue_box_text,
        '--white-bg':   theme.white_box_bg,
        '--white-text': theme.white_box_text,
        '--btn-bg':     theme.button_bg,
        '--btn-text':   theme.button_text,
    };

    const socialIcon = (platform) => {
        const p = platform.toLowerCase();
        if (p === 'instagram') return '/icons/insta.webp';
        if (p === 'threads')   return '/icons/threads.webp';
        if (p === 'tiktok')    return '/icons/tiktok.webp';
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
                                    <p>{contact.email}</p>
                                </div>
                            </div>
                            <div className="cf-contact-row">
                                <span className="cf-icon">
                                    <img src="/icons/web.webp" alt="Website" loading="lazy" />
                                </span>
                                <div>
                                    <p>{contact.website.replace('https://', '')}</p>
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
                        <form className="cf-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="cf-input-row">
                                <div className="cf-field">
                                    <label>NAME</label>
                                    <input type="text" autoComplete="name" />
                                </div>
                                <div className="cf-field">
                                    <label>EMAIL</label>
                                    <input type="email" autoComplete="email" />
                                </div>
                            </div>
                            <div className="cf-field">
                                <label>SUBJECT</label>
                                <input type="text" />
                            </div>
                            <div className="cf-field cf-field--grow">
                                <label>MESSAGE</label>
                                <textarea rows="4"></textarea>
                            </div>
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
