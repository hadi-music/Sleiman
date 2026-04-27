import StackNav from "./StackNav"
import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue } from "framer-motion"

export default function CardStack({ sections }) {

  const [index, setIndex] = useState(0)

  const dragY = useMotionValue(0)
  const isScrolling = useRef(false)
  const lastDeltaY = useRef(0)
  const wheelTimeout = useRef(null)

  const next = () => {
    if (index < sections.length - 1) setIndex(i => i + 1)
  }

  const prev = () => {
    if (index > 0) setIndex(i => i - 1)
  }

  const lockScroll = () => {
    isScrolling.current = true
  }

  const handleWheel = (e) => {

    const currentAbsDelta = Math.abs(e.deltaY)
    const prevAbsDelta = lastDeltaY.current
    lastDeltaY.current = currentAbsDelta

    // Reset delta tracking when scrolling completely stops
    clearTimeout(wheelTimeout.current)
    wheelTimeout.current = setTimeout(() => {
      lastDeltaY.current = 0
    }, 150)

    if (isScrolling.current) return

    // Intent Threshold: Ignore micro-movements (Lowered for responsiveness)
    if (currentAbsDelta < 20) return

    // Acceleration Detection (Velocity Spike):
    if (currentAbsDelta <= prevAbsDelta * 1.2) return

    // BOUNDARY CHECK: Return early if trying to scroll past the start or end
    if (e.deltaY > 0 && index === sections.length - 1) return
    if (e.deltaY < 0 && index === 0) return

    if (e.deltaY > 0) next()
    else prev()

    lockScroll()
  }

  const handleKey = (e) => {

    if (isScrolling.current) return

    if (e.key === "ArrowDown") {
      if (index === sections.length - 1) return // BOUNDARY CHECK
      next()
      lockScroll()
    }

    if (e.key === "ArrowUp") {
      if (index === 0) return // BOUNDARY CHECK
      prev()
      lockScroll()
    }
  }

  const handleDragEnd = (e, info) => {
    
    if (isScrolling.current) {
      dragY.set(0)
      return
    }

    const isTouchInput = e.pointerType === "touch" || (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches)
    
    const offset = info.offset.y
    const velocity = info.velocity.y
    
    const distanceThreshold = isTouchInput ? 70 : 120
    const velocityThreshold = 400 // px/s flick detection

    const isFlickUp = velocity < -velocityThreshold && offset < -40
    const isDragUp = offset < -distanceThreshold

    const isFlickDown = velocity > velocityThreshold && offset > 40
    const isDragDown = offset > distanceThreshold

    if (isDragUp || isFlickUp) {
      if (index === sections.length - 1) { // BOUNDARY CHECK
        dragY.set(0)
        return
      }
      next()
      lockScroll()
    } else if (isDragDown || isFlickDown) {
      if (index === 0) { // BOUNDARY CHECK
        dragY.set(0)
        return
      }
      prev()
      lockScroll()
    }

    dragY.set(0)
  }

  const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches

  const transitionDuration = isTouchDevice ? 0.42 : 0.6

  useEffect(() => {

    window.addEventListener("keydown", handleKey)

    return () => {
      window.removeEventListener("keydown", handleKey)
    }

  }, [index])

  return (
    <>
      <motion.div
        onPan={(e, info) => {
          if (isScrolling.current) return
          let y = info.offset.y
          
          // BOUNDARY ELASTICITY:
          // If we are at the first section and swiping down, or last section and swiping up,
          // apply a resistance factor (0.25) to simulate the "dragElastic" effect.
          const isAtTop = index === 0 && y > 0
          const isAtBottom = index === sections.length - 1 && y < 0
          
          if (isAtTop || isAtBottom) {
            y *= 0.25
          }
          
          dragY.set(y)
        }}
        onPanEnd={handleDragEnd}
        onWheel={handleWheel}
        style={{
          y: dragY,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          position: "relative",
          touchAction: "none"
        }}
      >

        {sections.map((Section, i) => {

          const distance = i - index

          return (
            <motion.div
              key={i}
              animate={{
                y: `calc(${distance * 100}vh)`,
                scale: distance === 0 ? 1 : 0.92,
                display: Math.abs(distance) > 1 ? "none" : "flex"
              }}
              transition={{
                duration: Math.abs(distance) > 1 ? 0 : transitionDuration,
                ease: [0.25, 1, 0.5, 1] // Smoother, more cinematic ease
              }}
              onAnimationComplete={() => {
                if (i === index) isScrolling.current = false
              }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: distance === 0 ? "auto" : "none"
              }}
            >
              <Section active={i === index} />
            </motion.div>
          )

        })}

      </motion.div>

      {/* NAV OUTSIDE */}
      <div className="nav-mask" />

      <StackNav
        sections={sections}
        index={index}
        setIndex={setIndex}
      />

    </>

  )

}