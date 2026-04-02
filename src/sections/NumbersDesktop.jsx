import { useState } from "react"
import data from "../data/numbers.json"
import Section from "../components/Section"
import Drawer from "../components/drawer"
import "./numbers.css"

export default function NumbersDesktop() {
  const [active, setActive] = useState(null)

  return (
    <Section className="numbers">
      <div className="numbers-layout">
        
        {/* LEFT PANEL */}
        <div className="numbers-left">
          <div className="drawers-container">
            {data.platforms.map((platform, i) => (
              <Drawer 
                key={platform.name}
                platform={platform}
                isActive={active === i}
                onHover={() => setActive(i)}
                onLeave={() => setActive(null)}
                index={i}
              />
            ))}
          </div>

          <div className="numbers-header">
            <div className="numbers-title">MUSIC</div>
            <div className="numbers-top-label">Streams</div>
          </div>

          <div className="numbers-stat">
            <div className="streams-number">{data.streams.value}</div>
            <div className="streams-label">Across all Platforms</div>
          </div>

          <div className="numbers-footer">
            Hover for playlists.
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="numbers-right">
          <img src="/images/numbers.webp" alt="studio" loading="lazy" />
        </div>

      </div>
    </Section>
  )
}