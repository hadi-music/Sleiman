import React, { useState } from 'react';
import './ArchivalStack.css';
import { studioData } from '../data/studio-data.js';

export default function ArchivalStack() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="archival-container">
            {studioData.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                    <div
                        key={item.id}
                        className={`archival-card ${isActive ? 'active' : ''}`}
                        onClick={() => setActiveIndex(index)}
                    >
                        {/* Optimized Picture Element */}
                        <picture>
                            <source
                                srcSet={item.images.webp}
                                type="image/webp"
                            />
                            <img
                                src={item.images.webp}
                                alt={item.title}
                                className="archival-bg"
                                loading="lazy"
                            />
                        </picture>

                        <div className="archival-overlay"></div>

                        <div className="archival-content">
                            <h2 className="archival-title">{item.title}</h2>

                            <div className="archival-desc-wrapper">
                                <p className="archival-desc">{item.desc}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}