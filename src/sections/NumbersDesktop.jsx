import { useState, useCallback } from "react"
import dataLocal from "../data/numbers.json"
import { useData } from "../hooks/useData"
import { DataService } from "../data/DataService"
import Section from "../components/Section"
import Drawer from "../components/drawer"
import "./numbers.css"

export default function NumbersDesktop() {
  const [active, setActive] = useState(null)
  const data = useData(DataService.getNumbersData, dataLocal)

  const handleHover = useCallback((index) => {
    setActive(index)
  }, [])

  const handleLeave = useCallback(() => {
    setActive(null)
  }, [])

  return (
    <Section className="numbers" headerTitle="Music">
      <div className="numbers-layout">
        
        {/* LEFT PANEL */}
        <div className="numbers-left">
          <div className="drawers-container">
            {data.platforms.map((platform, i) => (
              <Drawer 
                key={platform.name}
                platform={platform}
                isActive={active === i}
                onHover={handleHover}
                onLeave={handleLeave}
                index={i}
              />
            ))}
          </div>

          <div className="numbers-header">
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