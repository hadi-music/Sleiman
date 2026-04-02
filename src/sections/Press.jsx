import { useState } from "react"
import { motion } from "framer-motion"
import Section from "../components/Section"
import LavaGrid from "../pages/LavaGrid"
import pressData from "../data/press.json"

import "./Press.css"

export default function Press() {

  const [active, setActive] = useState(pressData[0])

  return (

    <Section className="press" headerTitle="Press">


      {/* LEFT SIDE */}

      <div className="press-left">

        <LavaGrid
          pressData={pressData}
          active={active}
          setActive={setActive}
        />

      </div>

      {/* RIGHT SIDE: VERTICAL STACK */}
      <div className="press-right-stack">
        
        {/* TOP: FEATURED IMAGE */}
        <motion.div 
          className="press-featured-image-wrapper"
          key={`img-${active.publication}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <img src="/images/herom.webp" alt="Featured" className="press-featured-image" loading="lazy" />
        </motion.div>

        {/* BOTTOM: TEXT CONTENT */}
        <motion.div
          key={`text-${active.publication}`}
          className="press-text-container"
          onMouseDown={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
            delay: 0.1
          }}
        >
          <h2>{active.publication}</h2>
          <h3>{active.title}</h3>

          {active.excerpt && (
            <p className="excerpt">{active.excerpt}</p>
          )}

          <a
            href={active.link}
            className="press-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Article
          </a>
        </motion.div>

      </div>

      {/* Floating Logo (Optional/Keep if needed elsewhere, but user wants featured image) */}
      <motion.img
        key={active.logo}
        src={active.logo}
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