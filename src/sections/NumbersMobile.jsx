import { useState } from "react"
import { motion } from "framer-motion"
import dataLocal from "../data/numbers.json"
import { useData } from "../hooks/useData"
import { DataService } from "../data/DataService"
import "./numbers-mobile.css"

const playIcon = "/icons/play.webp"
const shareIcon = "/icons/share.webp"
const copyIcon = "/icons/copy.webp"
const embedIcon = "/icons/embed.webp"



export default function NumbersMobile() {

  const [activeRow, setActiveRow] = useState(null)
  const [copiedKey, setCopiedKey] = useState(null)
  const [copyTimer, setCopyTimer] = useState(null)

  const data = useData(DataService.getNumbersData, dataLocal)

  const handleCopyFeedback = (key) => {
    if (copyTimer) clearTimeout(copyTimer)
    setCopiedKey(key)
    const t = setTimeout(() => setCopiedKey(null), 2000)
    setCopyTimer(t)
  }

  const handleShare = (url) => {
    if (navigator.share) {
      navigator.share({ title: "Sleiman Damien – Productions", url })
    }
  }

  // Motion variants for cinematic staggered entrance of action buttons
  const actionsContainerVariants = {
    hidden: {
      transition: { when: "afterChildren" }
    },
    visible: {
      transition: {
        delayChildren: 0.12,
        staggerChildren: 0.07,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const actionItemVariants = {
    hidden: { opacity: 0, y: 10, rotate: -4 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.38,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (

    <div className="numbers-mobile">

      <div className={`numbers-mobile-inner ${activeRow ? 'has-open-row' : ''}`} onClick={(e) => {
        if (!(e.target.closest && e.target.closest('.numbers-row'))) {
          setActiveRow(null)
        }
      }}>

        {/* Top-right title for mobile (keeps scope local to NumbersMobile) */}
        <div className="numbers-mobile-header" aria-hidden>
          <div className="section-header__title">MUSIC</div>
        </div>

        {/* BACKGROUND IMAGE */}
        <div className="mobile-bg">
          <img src="/images/numbers.webp" alt="Numbers background" loading="lazy" />
        </div>

        {/* Centered Main Stat */}
        <div className="streams-center">
          <div className="mobile-streams-number">{data.streams.value}</div>
          <div className="mobile-streams-label">{data.streams.label.toUpperCase()}</div>
        </div>

        {/* Platform title indicator */}
        <div className={`platform-title ${activeRow ? 'show' : ''}`}>
          {activeRow ? data.platforms.find(p => p.class === activeRow)?.name : '\u00A0'}
        </div>

        {/* TWO-COLUMN INTERACTION SYSTEM */}
        <div className="numbers-buttons" onClick={(e) => e.stopPropagation()}>
          {data.platforms.map((platform) => (
            <div key={platform.class} className={`numbers-row ${platform.class} ${activeRow === platform.class ? 'active' : ''}`}>
              <button className={`numbers-button platform-btn ${platform.class}`} onClick={() => setActiveRow(activeRow === platform.class ? null : platform.class)}>
                <img src={platform.icon} alt={platform.name} loading="lazy" />
              </button>
              <motion.div className="numbers-actions" variants={actionsContainerVariants} initial="hidden" animate={activeRow === platform.class ? 'visible' : 'hidden'}>
                <motion.button variants={actionItemVariants} className="numbers-button numbers-action" onClick={() => window.open(platform.url, "_blank")}>
                  <img src={playIcon} alt="Play" loading="lazy" />
                </motion.button>
                <motion.button variants={actionItemVariants} className="numbers-button numbers-action" onClick={() => handleShare(platform.url)}>
                  <img src={shareIcon} alt="Share" loading="lazy" />
                </motion.button>
                <motion.button variants={actionItemVariants} className="numbers-button numbers-action" onClick={() => { navigator.clipboard.writeText(platform.url); handleCopyFeedback(`${platform.class}-copy`); }} aria-label="Copy">
                  <img className={copiedKey === `${platform.class}-copy` ? 'flash-invert' : ''} src={copyIcon} alt="Copy" loading="lazy" />
                </motion.button>
                <motion.button variants={actionItemVariants} className="numbers-button numbers-action" onClick={() => { navigator.clipboard.writeText(platform.url); handleCopyFeedback(`${platform.class}-embed`); }} aria-label="Embed">
                  <img className={copiedKey === `${platform.class}-embed` ? 'flash-invert' : ''} src={embedIcon} alt="Embed" loading="lazy" />
                </motion.button>
              </motion.div>
            </div>
          ))}
        </div>

      </div>

    </div>

  )

}