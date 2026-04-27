import React from 'react';
import './formmobile.css';
import formLocal from '../data/form.json';
import { useData } from '../hooks/useData';
import { DataService } from '../data/DataService';

// Social Icons

const FormMobile = () => {
    const formData = useData(DataService.getFormData, formLocal);
    const { location, contact, social_media } = formData;

    return (
        <div className="mobile-form-container">

            {/* MAIN ELEMENT: QUICK MESSAGE */}
            <div className="card message-card">
                <h2>QUICK MESSAGE</h2>
                <form className="message-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="mobile-input-row">
                        <div className="input-group">
                            <label>NAME</label>
                            <input type="text" />
                        </div>
                        <div className="input-group">
                            <label>EMAIL</label>
                            <input type="email" />
                        </div>
                    </div>
                    <div className="input-group">
                        <label>MESSAGE</label>
                        <textarea rows="4"></textarea>
                    </div>
                    <button type="submit" className="send-btn">
                        SEND MESSAGE <span>→</span>
                    </button>
                </form>
            </div>

            {/* MINIMAL FOOTER: EMAIL & SOCIALS */}
            <div className="mobile-footer">
                <p className="footer-email">{contact.email}</p>
                <div className="footer-socials">
                    {social_media.slice(0, 3).map((social, index) => {
                        let icon;
                        const p = social.platform.toLowerCase();
                        if (p === 'instagram') icon = '/icons/insta.webp';
                        else if (p === 'tiktok') icon = '/icons/tiktok.webp';
                        else if (p === 'threads') icon = '/icons/threads.webp';
                        return (
                            <a key={index} href={social.url} className="social-icon-link">
                                <img src={icon} alt={social.platform} loading="lazy" />
                            </a>
                        );
                    })}
                </div>
            </div>

        </div>
    );
};

export default FormMobile;