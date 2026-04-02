import React from 'react';
import './form.css';
import formData from '../data/form.json';

// Social Icons

const ContactForm = () => {
    const { heading, location, contact, social_media, theme } = formData;

    const dynamicTheme = {
        '--orange-bg': theme.orange_box_bg,
        '--orange-text': theme.orange_box_text,
        '--blue-bg': theme.blue_box_bg,
        '--blue-text': theme.blue_box_text,
        '--white-bg': theme.white_box_bg,
        '--white-text': theme.white_box_text,
        '--button-bg': theme.button_bg,
        '--button-text': theme.button_text,
        '--page-bg': theme.page_background,
    };

    return (
        <div className="form-inner-wrapper" style={dynamicTheme}>
            <div className="main-grid">
                {/* Left Column */}
                <div className="column">
                    <div className="card orange-card">
                        <div className="card-content">
                            <h2>VISIT US</h2>
                            <p>
                                {location.company}<br />
                                {location.building}<br />
                                {location.street}<br />
                                {location.area}<br />
                                {location.city}
                            </p>
                        </div>
                    </div>

                    <div className="card blue-card">
                        <div className="card-top">
                            <h2>DROP A LINE</h2>
                            <div className="contact-info">
                                <div className="contact-item">
                                    <span className="icon"><img src="/icons/mail.webp" alt="Email" loading="lazy" /></span>
                                    <div>
                                        <small>email</small>
                                        <p>{contact.email}</p>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <span className="icon"><img src="/icons/web.webp" alt="Website" loading="lazy" /></span>
                                    <div>
                                        <small>website</small>
                                        <p>{contact.website.replace('https://', '')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="social-links-grid">
                            {social_media.map((social, index) => {
                                let icon;
                                if (social.platform.toLowerCase() === 'instagram') icon = '/icons/insta.webp';
                                else if (social.platform.toLowerCase() === 'tiktok') icon = '/icons/tiktok.webp';
                                else if (social.platform.toLowerCase() === 'threads') icon = '/icons/threads.webp';

                                return (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-button"
                                    >
                                        <img src={icon} alt={social.platform} loading="lazy" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="column">
                    <div className="card white-card">
                        <h2>QUICK MESSAGE</h2>
                        <form className="message-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="input-row">
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
                                <textarea rows="2"></textarea>
                            </div>
                            <button type="submit" className="send-btn">
                                SEND MESSAGE <span>→</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;