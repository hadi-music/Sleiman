import React from "react"
import Section from "../components/Section"
import ArchivalStack from "../components/ArchivalStack"
import { useData } from "../hooks/useData"
import { DataService } from "../data/DataService"
import "./studio.css"

export default function Studio({ active }) {
  const data = useData(DataService.getStudioData)

  const { 
    studioContent = { title: '', text: '', notation: '' }, 
    studioData = [] 
  } = data || {};

  return (
    <Section headerTitle="Studio" className={`studio ${active ? "is-active" : ""}`}>
      <div className="studio-layout">
        <div className="studio-scroll">
          <ArchivalStack studioData={studioData} />
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