import { useRef } from "react"
import { motion } from "framer-motion"
import { useData } from "../hooks/useData"
import { DataService } from "../data/DataService"
import Section from "../components/Section"
import "./Home.css"

export default function Home({ active }) {
  const { data: homeData, loading } = useData(DataService.getHomeData)

  const {
    overlayText = '',
    overlayCaption = ''
  } = homeData || {};

  const containerRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()

    // Calculate relative percentage position (0 to 100)
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    containerRef.current.style.setProperty("--mouse-x", `${x}%`)
    containerRef.current.style.setProperty("--mouse-y", `${y}%`)
  }

  const handleMouseEnter = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--reveal-opacity", "1")
    }
  }

  const handleMouseLeave = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--reveal-opacity", "0")
    }
  }

  return (
    <Section className="home" loading={loading}>

      <div className="home-text">
        <picture className="home-title-image-wrapper">
          <source media="(max-width: 768px)" srcSet="/images/Sleimanm.svg" />
          <img
            src="/images/Sleiman.svg"
            alt="Sleiman Damien"
            className="home-title-image"
            loading="lazy"
          />
        </picture>
      </div>

      <div className="home-image">

        <picture>

          <source
            media="(max-width: 768px)"
            srcSet="/images/herom.webp"
          />

          <img src="/images/hero.webp" loading="lazy" />

        </picture>

        <div className="home-overlay">

          <p className="overlay-text">
            {overlayText}
          </p>

          <p className="overlay-caption">
            {(overlayCaption || '').split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}{i < arr.length - 1 ? " " : ""}
                <br />
              </span>
            ))}
          </p>

        </div>

      </div>

    </Section>
  )
}