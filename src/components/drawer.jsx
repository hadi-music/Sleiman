import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import './drawer.css';

// Import icons

const iconMap = {
    spotify: '/icons/spotify.webp',
    youtube: '/icons/youtube.webp',
    anghami: '/icons/anghami.webp',
    itunes: '/icons/apple.webp'
};

const Drawer = memo(({ platform, isActive, onHover, onLeave, index }) => {
    const [copied, setCopied] = useState(false);
    const [embedCopied, setEmbedCopied] = useState(false);

    if (!platform) return null;

    const platformIcon = iconMap[platform.class] || '/icons/spotify.webp';

    const drawerStyle = {
        '--drawer-bg': platform.colors?.bg || '#FFFFFF',
        '--drawer-text': platform.colors?.text || '#000000',
        '--drawer-button-bg': platform.colors?.button || '#FE2C55',
        '--drawer-accent': platform.colors?.accent || '#CCCCCC',
        '--logo-url': `url(${platformIcon})`,
        '--play-icon-url': `url(/icons/play.webp)`,
        '--share-icon-url': `url(/icons/share.webp)`,
        '--copy-icon-url': `url(/icons/copy.webp)`,
        '--embed-icon-url': `url(/icons/embed.webp)`,
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `Sleiman Damien - ${platform.name}`,
                url: platform.url
            });
        } else {
            navigator.clipboard.writeText(platform.url);
            alert("Link copied");
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(platform.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleEmbed = () => {
        // Simple embed placeholder, real implementation would need platform-specific embed code
        navigator.clipboard.writeText(`<iframe src="${platform.url}/embed"></iframe>`);
        setEmbedCopied(true);
        setTimeout(() => setEmbedCopied(false), 2000);
    };

    return (
        <div 
            className="drawer-hover-zone" 
            style={{ top: `${index * 25}%` }}
            onMouseEnter={() => onHover(index)}
            onMouseLeave={onLeave}
        >
            <div 
                className={`soundharbor-drawer ${platform.class} ${isActive ? 'sh-active' : ''}`} 
                style={drawerStyle}
            >
                {/* Collapsed Strip Icon */}
                <div className="sh-collapsed-icon">
                    <div className="sh-logo-img sh-logo-small" />
                </div>

                {/* Expanded Content */}
                <div className="sh-expanded-content">
                    <header className="sh-header">
                        <div className="sh-brand">
                            <div className="sh-logo-img" />
                            <h1 className="sh-brand-text">{platform.name}</h1>
                        </div>
                    </header>

                    <hr className="sh-divider" />

                    <div className="sh-content">
                        <h2 className="sh-playlist-title">{platform.playlistName}</h2>

                        <div className="sh-button-group">
                            <button className="sh-btn sh-btn-play" onClick={() => window.open(platform.url, '_blank')}>
                                <div className="sh-icon sh-icon-play" /> {platform.cta || 'Play'}
                            </button>
                            <button className="sh-btn sh-btn-share" onClick={handleShare}>
                                <div className="sh-icon sh-icon-share" /> Share
                            </button>
                            <button className="sh-btn sh-btn-copy" onClick={handleCopy}>
                                <div className="sh-icon sh-icon-copy" /> {copied ? 'Copied' : 'Copy'}
                            </button>
                            <button className="sh-btn sh-btn-embed" onClick={handleEmbed}>
                                <div className="sh-icon sh-icon-embed" /> {embedCopied ? 'Copied' : 'Embed'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Drawer;