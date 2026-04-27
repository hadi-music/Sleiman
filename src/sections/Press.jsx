import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Section from "../components/Section"
import LavaGrid from "../pages/LavaGrid"
import { useData } from "../hooks/useData"
import { DataService } from "../data/DataService"

import "./press.css"

export default function Press() {

  const pressData = useData(DataService.getPressData)
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (pressData && pressData.length > 0) {
      const updatedActive = (active && pressData.find(item => item.publication === active.publication)) || pressData[0]
      setActive(updatedActive)
    }
  }, [pressData])

  // Safety: Don't crash if pressData is loading
  const safeData = pressData || [];
  const currentActive = active || safeData[0] || {};

  return (

    <Section className="press" headerTitle="Press">


      {/* LEFT SIDE */}

      <div className="press-left">
        <LavaGrid
          pressData={safeData}
          active={currentActive}
          setActive={setActive}
        />
      </div>

      <div className="press-right-stack">
        <motion.div
          className="press-featured-image-wrapper"
          key={`img-${currentActive.publication}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <a href={currentActive.link} target="_blank" rel="noopener noreferrer">
            <img src={currentActive.image || "/images/herom.webp"} alt="Featured" className="press-featured-image" loading="lazy" />
          </a>
        </motion.div>

        <motion.div
          key={`text-${currentActive.publication}`}
          className="press-text-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
            delay: 0.1
          }}
        >
          <h2>{currentActive.publication}</h2>
          <h3>{currentActive.title}</h3>

          {currentActive.excerpt && (
            <p className="excerpt">{currentActive.excerpt}</p>
          )}

          <a
            href={currentActive.link}
            className="press-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Article
          </a>
        </motion.div>
      </div>

      <motion.img
        key={currentActive.logo}
        src={currentActive.logo}
        className="press-logo"
        loading="lazy"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.45,
          ease: [0.4, 0, 0.2, 1]
        }}
      />

    </Section>

  )

}