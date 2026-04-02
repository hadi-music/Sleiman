import { useState } from "react"
import { motion } from "framer-motion"
import "./numbers-mobile.css"


const spotifyLogo = "/icons/spotify.webp"
const anghamiLogo = "/icons/anghami.webp"
const appleLogo = "/icons/apple.webp"
const youtubeLogo = "/icons/youtube.webp"

const playIcon = "/icons/play.webp"
const shareIcon = "/icons/share.webp"
const copyIcon = "/icons/copy.webp"
const embedIcon = "/icons/embed.webp"



export default function NumbersMobile() {

  const [activeRow, setActiveRow] = useState(null)
  const [copiedKey, setCopiedKey] = useState(null)
  const [copyTimer, setCopyTimer] = useState(null)

  const spotifyPlaylist =
    "https://open.spotify.com/playlist/5NvNj3xzBNYelqHh1Ys7XG"

  const anghamiPlaylist =
    "https://play.anghami.com/playlist/276536890"

  const itunesPlaylist =
    "https://music.apple.com/ae/playlist/sleiman-damien-discography/pl.u-NpXmzlkFalPr6p"

  const youtubePlaylist =
    "https://www.youtube.com/playlist?list=PLFABu_G6ga7uN3SDDesYnJw3gMfdspvRT"

  const platforms = {
    spotify: {
      key: 'spotify',
      name: 'Spotify',
      url: spotifyPlaylist,
      logo: spotifyLogo,
    },
    anghami: {
      key: 'anghami',
      name: 'Anghami',
      url: anghamiPlaylist,
      logo: anghamiLogo,
    },
    apple: {
      key: 'apple',
      name: 'Apple Music',
      url: itunesPlaylist,
      logo: appleLogo,
    },
    youtube: {
      key: 'youtube',
      name: 'YouTube',
      url: youtubePlaylist,
      logo: youtubeLogo,
    }
  }

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
          <div className="mobile-streams-number">1.2B</div>
          <div className="mobile-streams-label">TOTAL STREAMS</div>
        </div>

        {/* Platform title indicator */}
        <div className={`platform-title ${activeRow ? 'show' : ''}`}>
          {activeRow ? platforms[activeRow].name : '\u00A0'}
        </div>

        {/* TWO-COLUMN INTERACTION SYSTEM */}
        <div className="numbers-buttons" onClick={(e) => e.stopPropagation()}>
          {/* Spotify row */}
          <div className={`numbers-row spotify ${activeRow === 'spotify' ? 'active' : ''}`}>
            <button className="numbers-button platform-btn spotify" onClick={() => setActiveRow(activeRow === 'spotify' ? null : 'spotify')}>
              <img src={spotifyLogo} alt="Spotify" loading="lazy" />
            </button>
            <motion.div className="numbers-actions" variants={actionsContainerVariants} initial="hidden" animate={activeRow === 'spotify' ? 'visible' : 'hidden'}>
              <motion.button variants={actionItemVariants} className="numbers-button numbers-action" onClick={() => window.open(platforms.spotify.url, "_blank")}>
                <img src={playIcon} alt="Play" loading="lazy" />
              </motion.button>
              <motion.button variants={actionItemVariants} className="numbers-button numbers-action" onClick={() => handleShare(platforms.spotify.url)}>
                <img src={shareIcon} alt="Share" loading="lazy" />
              </motion.button>
              <motion.button variants={actionItemVariants} className="numbers-button numbers-action" onClick={() => { navigator.clipboard.writeText(platforms.spotify.url); handleCopyFeedback('spotify-copy'); }} aria-label="Copy">
                <img className={copiedKey === 'spotify-copy' ? 'flash-invert' : ''} src={copyIcon} alt="Copy" loading="lazy" />
              </motion.button>
              <motion.button variants={actionItemVariants} className="numbers-button numbers-action" onClick={() => { navigator.clipboard.writeText(platforms.spotify.url); handleCopyFeedback('spotify-embed'); }} aria-label="Embed">
                <img className={copiedKey === 'spotify-embed' ? 'flash-invert' : ''} src={embedIcon} alt="Embed" loading="lazy" />
              </motion.button>
            </motion.div>
          </div>

          {/* Anghami row */}
          <div className={`numbers-row anghami ${activeRow === 'anghami' ? 'active' : ''}`}>
            <button className="numbers-button platform-btn anghami" onClick={() => setActiveRow(activeRow === 'anghami' ? null : 'anghami')}>
              <img src={anghamiLogo} alt="Anghami" loading="lazy" />
            </button>
            <motion.div className="numbers-actions" variants={actionsContainerVariants} initial="hidden" animate={activeRow === 'anghami' ? 'visible' : 'hidden'}>
              <motion.button variants={actionItemVariants} className="numbers-button numbers-action" onClick={() => window.open(platforms.anghami.url, "_blank")}>
                <img src={playIcon} alt="Play" loading="lazy" />
              </motion.button>
              <motion.button variants={actionItemVariants} className="numbers-button numbers-action" onClick={() => handleShare(platforms.anghami.url)}>
                <img src={shareIcon} alt="Share" loading="lazy" />
              </motion.button>
              <motion.button variants={actionItemVariants} className="numbers-button numbers-action" onClick={() => { navigator.clipboard.writeText(platforms.anghami.url); handleCopyFeedback('anghami-copy'); }} aria-label="Copy">
                <img className={copiedKey === 'anghami-copy' ? 'flash-invert' : ''} src={copyIcon} alt="Copy" loading="lazy" />
              </motion.button>
              <motion.button variants={actionItemVariants} className="numbers-button numbers-action" onClick={() => { navigator.clipboard.writeText(platforms.anghami.url); handleCopyFeedback('anghami-embed'); }} aria-label="Embed">
                <img className={copiedKey === 'anghami-embed' ? 'flash-invert' : ''} src={embedIcon} alt="Embed" loading="lazy" />
              </motion.button>
            </motion.div>
          </div>

          {/* Apple Music row */}
          <div className={`numbers-row apple ${activeRow === 'apple' ? 'active' : ''}`}>
            <button className="numbers-button platform-btn apple" onClick={() => setActiveRow(activeRow === 'apple' ? null : 'apple')}>
              <img src={appleLogo} alt="Apple Music" loading="lazy" />
            </button>
            <motion.div className="numbers-actions" variants={actionsContainerVariants} initial="hidden" animate={activeRow === 'apple' ? 'visible' : 'hidden'}>
              <motion.button variants={actionItemVariants} className="numbers-button numbers-action" onClick={() => window.open(platforms.apple.url, "_blank")}>
                <img src={playIcon} alt="Play" loading="lazy" />
              </motion.button>
              <motion.button variants={actionItemVariants} className="numbers-button numbers-action" onClick={() => handleShare(platforms.apple.url)}>
                <img src={shareIcon} alt="Share" loading="lazy" />
              </motion.button>
              <motion.button variants={actionItemVariants} className="numbers-button numbers-action" onClick={() => { navigator.clipboard.writeText(platforms.apple.url); handleCopyFeedback('apple-copy'); }} aria-label="Copy">
                <img className={copiedKey === 'apple-copy' ? 'flash-invert' : ''} src={copyIcon} alt="Copy" loading="lazy" />
              </motion.button>
              <motion.button variants={actionItemVariants} className="numbers-button numbers-action" onClick={() => { navigator.clipboard.writeText(platforms.apple.url); handleCopyFeedback('apple-embed'); }} aria-label="Embed">
                <img className={copiedKey === 'apple-embed' ? 'flash-invert' : ''} src={embedIcon} alt="Embed" loading="lazy" />
              </motion.button>
            </motion.div>
          </div>

          {/* YouTube row */}
          <div className={`numbers-row youtube ${activeRow === 'youtube' ? 'active' : ''}`}>
            <button className="numbers-button platform-btn youtube" onClick={() => setActiveRow(activeRow === 'youtube' ? null : 'youtube')}>
              <img src={youtubeLogo} alt="YouTube" loading="lazy" />
            </button>
            <motion.div className="numbers-actions" variants={actionsContainerVariants} initial="hidden" animate={activeRow === 'youtube' ? 'visible' : 'hidden'}>
              <motion.button variants={actionItemVariants} className="numbers-button numbers-action" onClick={() => window.open(platforms.youtube.url, "_blank")}>
                <img src={playIcon} alt="Play" loading="lazy" />
              </motion.button>
              <motion.button variants={actionItemVariants} className="numbers-button numbers-action" onClick={() => handleShare(platforms.youtube.url)}>
                <img src={shareIcon} alt="Share" loading="lazy" />
              </motion.button>
              <motion.button variants={actionItemVariants} className="numbers-button numbers-action" onClick={() => { navigator.clipboard.writeText(platforms.youtube.url); handleCopyFeedback('youtube-copy'); }} aria-label="Copy">
                <img className={copiedKey === 'youtube-copy' ? 'flash-invert' : ''} src={copyIcon} alt="Copy" loading="lazy" />
              </motion.button>
              <motion.button variants={actionItemVariants} className="numbers-button numbers-action" onClick={() => { navigator.clipboard.writeText(platforms.youtube.url); handleCopyFeedback('youtube-embed'); }} aria-label="Embed">
                <img className={copiedKey === 'youtube-embed' ? 'flash-invert' : ''} src={embedIcon} alt="Embed" loading="lazy" />
              </motion.button>
            </motion.div>
          </div>
        </div>

      </div>

    </div>

  )

}