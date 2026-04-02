import { useState } from "react"
import { motion } from "framer-motion"
import "./PlatformDrawer.css"

// Import your action icons (Ensure these paths match your folder structure)

export default function PlatformDrawer({ platform, index, active }) {
    const [copied, setCopied] = useState(false)
    const [embedCopied, setEmbedCopied] = useState(false)

    const isOpen = active === index

    const handleCopy = (text, type) => {
        navigator.clipboard.writeText(text)
        if (type === "link") {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } else {
            setEmbedCopied(true)
            setTimeout(() => setEmbedCopied(false), 2000)
        }
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `Sleiman Damien – ${platform.name}`,
                url: platform.url,
            })
        } else {
            handleCopy(platform.url, "link")
        }
    }

    return (
        <motion.div
            className={`drawer ${platform.class}`}
            style={{
                top: `${index * 25}%`,
                pointerEvents: isOpen ? "auto" : "none"
            }}
            initial={{ x: "-110%" }}
            animate={{ x: isOpen ? 0 : "-110%" }}
            transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }}
        >
            <div className="drawer-content">

                {/* 1. WATERMARK LOGO (LEFT) */}
                <img
                    src={`/icons/${platform.class}.webp`}
                    className="drawer-watermark"
                    alt={platform.name}
                    loading="lazy"
                />

                {/* 2. BRAND TITLE (CENTER) */}
                <div className="drawer-title-main">
                    <div className="title-top">SLEIMAN DAMIEN</div>
                    <div className="title-bottom">DISCOGRAPHY</div>
                </div>

                {/* 3. ACTIONS GRID (RIGHT) */}
                <div className="drawer-actions-grid">

                    <div className="action-item">
                        <button className="icon-circle" onClick={() => window.open(platform.url, "_blank")}>
                            <img src="/icons/play.webp" alt="play" loading="lazy" />
                        </button>
                        <span className="action-label">play</span>
                    </div>

                    <div className="action-item">
                        <button className="icon-circle" onClick={handleShare}>
                            <img src="/icons/share.webp" alt="share" loading="lazy" />
                        </button>
                        <span className="action-label">share</span>
                    </div>

                    <div className="action-item">
                        <button className="icon-circle" onClick={() => handleCopy(platform.url, "link")}>
                            <img src="/icons/copy.webp" alt="copy" loading="lazy" />
                        </button>
                        <span className="action-label">{copied ? "copied" : "copy"}</span>
                    </div>

                    <div className="action-item">
                        <button className="icon-circle" onClick={() => handleCopy(`<iframe src="${platform.url}"></iframe>`, "embed")}>
                            <img src="/icons/embed.webp" alt="embed" loading="lazy" />
                        </button>
                        <span className="action-label">{embedCopied ? "copied" : "embed"}</span>
                    </div>

                </div>

            </div>
        </motion.div>
    )
}