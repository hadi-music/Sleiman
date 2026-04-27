import { useState, useEffect } from "react"
import Section from "../components/Section"
import ArchivalStack from "../components/ArchivalStack"
import { studioContent as localContent, studioData as localImages } from "../data/studio-data"
import { DataService } from "../data/DataService"
import "./studio.css"

export default function Studio({ active }) {
  const [data, setData] = useState({ studioContent: localContent, studioData: localImages })

  useEffect(() => {
    let mounted = true
    DataService.getStudioData(localContent, localImages).then(res => {
      if (mounted && res) setData(res)
    }).catch(err => console.error(err))
    return () => { mounted = false }
  }, [])

  const { studioContent, studioData } = data

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