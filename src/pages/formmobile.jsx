import React from 'react';
import './formmobile.css';
import formLocal from '../data/form.json';
import { useData } from '../hooks/useData';
import { DataService } from '../data/DataService';

// Social Icons

const FormMobile = () => {
    const formData = useData(DataService.getFormData, formLocal);
    const { location, contact, social_media } = formData;

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

    return (
        <div className="mobile-form-container">

            {/* MAIN ELEMENT: QUICK MESSAGE */}
            <div className="card message-card">
                <h2>QUICK MESSAGE</h2>
                <form 
                    className="message-form" 
                    name="contact" 
                    method="POST" 
                    onSubmit={handleSubmit}
                >
                    <input type="hidden" name="form-name" value="contact" />
                    <p style={{ display: 'none' }}>
                        <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                    </p>
                    <input type="hidden" name="subject" value="Mobile Form Submission" />

                    <div className="mobile-input-row">
                        <div className="input-group">
                            <label>NAME</label>
                            <input type="text" name="name" required />
                        </div>
                        <div className="input-group">
                            <label>EMAIL</label>
                            <input type="email" name="email" required />
                        </div>
                    </div>
                    <div className="input-group">
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
                        else if (p === 'spotify') icon = '/icons/spotify.webp';
                        else if (p === 'youtube') icon = '/icons/youtube.webp';
                        else if (p === 'anghami') icon = '/icons/anghami.webp';
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