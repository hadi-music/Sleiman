import { useState } from "react"
import Section from "../components/Section"
import ArchivalStack from "../components/ArchivalStack"
import { studioContent } from "../data/studio-data"
import "./studio.css"

export default function Studio({ active }) {
  return (
    <Section headerTitle="Studio" className={`studio ${active ? "is-active" : ""}`}>
      <div className="studio-layout">
        <div className="studio-scroll">
          <ArchivalStack />
        </div>

        <div className="stack-legend">
          <div className="legend-left">
            <h3 className="plate-title">{studioContent.title}</h3>
            <p className="plate-body">{studioContent.text}</p>
          </div>
          <div className="legend-right">
            <span className="plate-notation">{studioContent.notation}</span>
          </div>
        </div>
      </div>
    </Section>
  )
}