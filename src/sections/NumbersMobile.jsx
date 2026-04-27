import { useState, memo } from "react"
import { motion } from "framer-motion"
import { useData } from "../hooks/useData"
import { DataService } from "../data/DataService"
import Loader from "../components/Loader"
import "./numbers-mobile.css"

const playIcon = "/icons/play.webp"
const shareIcon = "/icons/share.webp"
const copyIcon = "/icons/copy.webp"
const embedIcon = "/icons/embed.webp"

// Memoized individual row to prevent unnecessary re-renders
const PlatformRow = memo(({ platform, isActive, onToggle, onCopyFeedback, onShare }) => {
  const actionsContainerVariants = {
    hidden: { 
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    visible: { 
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const actionItemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <div className={`numbers-row ${platform.class} ${isActive ? 'active' : ''}`}>
      <button className={`numbers-button platform-btn ${platform.class}`} onClick={() => onToggle(platform.class)}>
        <img src={platform.icon} alt={platform.name} loading="lazy" decoding="async" />
      </button>
      <motion.div className="numbers-actions" variants={actionsContainerVariants} initial="hidden" animate={isActive ? 'visible' : 'hidden'}>
        <motion.button variants={actionItemVariants} className="numbers-button numbers-action" onClick={() => window.open(platform.url, "_blank")}>
          <img src={playIcon} alt="Play" loading="lazy" decoding="async" />
        </motion.button>
        <motion.button variants={actionItemVariants} className="numbers-button numbers-action" onClick={() => onShare(platform.url)}>
          <img src={shareIcon} alt="Share" loading="lazy" decoding="async" />
        </motion.button>
        <motion.button variants={actionItemVariants} className="numbers-button numbers-action" onClick={() => { navigator.clipboard.writeText(platform.url); onCopyFeedback(`${platform.class}-copy`); }} aria-label="Copy">
          <img src={copyIcon} alt="Copy" loading="lazy" decoding="async" />
        </motion.button>
        <motion.button variants={actionItemVariants} className="numbers-button numbers-action" onClick={() => { navigator.clipboard.writeText(platform.url); onCopyFeedback(`${platform.class}-embed`); }} aria-label="Embed">
          <img src={embedIcon} alt="Embed" loading="lazy" decoding="async" />
        </motion.button>
      </motion.div>
    </div>
  )
})

export default function NumbersMobile() {
  const [activeRow, setActiveRow] = useState(null)
  const [copiedKey, setCopiedKey] = useState(null)
  const [copyTimer, setCopyTimer] = useState(null)

  const { data, loading } = useData(DataService.getNumbersData)

  const { 
    streams = { value: '0', label: 'Streams' }, 
    platforms = [] 
  } = data || {};

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

  const toggleRow = (platformClass) => {
    setActiveRow(prev => prev === platformClass ? null : platformClass)
  }

  return (
    <div className="numbers-mobile">
      <Loader loading={loading} />
      <div className={`numbers-mobile-inner ${activeRow ? 'has-open-row' : ''}`} onClick={(e) => {
        if (!(e.target.closest && e.target.closest('.numbers-row'))) {
          setActiveRow(null)
        }
      }}>

        <div className="numbers-mobile-header" aria-hidden>
          <div className="section-header__title">MUSIC</div>
        </div>

        <div className="mobile-bg">
          <img src="/images/numbers.webp" alt="Numbers background" loading="lazy" decoding="async" />
        </div>

        <div className="streams-center">
          <div className="mobile-streams-number">{streams.value}</div>
          <div className="mobile-streams-label">{(streams.label || '').toUpperCase()}</div>
        </div>

        <div className={`platform-title ${activeRow ? 'show' : ''}`}>
          {activeRow ? platforms.find(p => p.class === activeRow)?.name : '\u00A0'}
        </div>

        <div className="numbers-buttons" onClick={(e) => e.stopPropagation()}>
          {platforms.map((platform) => (
            <PlatformRow 
              key={platform.class}
              platform={platform}
              isActive={activeRow === platform.class}
              onToggle={toggleRow}
              onCopyFeedback={handleCopyFeedback}
              onShare={handleShare}
            />
          ))}
        </div>
      </div>
    </div>
  )
}