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

    // Intent Threshold: Ignore micro-movements
    if (currentAbsDelta < 10) return

    // Inertia protection: Only trigger if delta is increasing or we've stopped long enough
    if (currentAbsDelta <= prevAbsDelta && currentAbsDelta < 50) return

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
          height: "100dvh",
          overflow: "hidden",
          position: "relative",
          touchAction: "none",
          willChange: "transform"
        }}
      >

        {sections.map((Section, i) => {

          const distance = i - index
          const isActive = distance === 0
          const isVisible = Math.abs(distance) <= 1

          return (
            <motion.div
              key={i}
              initial={false}
              animate={{
                y: `calc(${distance * 100}dvh)`,
                scale: isActive ? 1 : 0.95,
                opacity: isVisible ? 1 : 0,
                pointerEvents: isActive ? "auto" : "none"
              }}
              transition={{
                duration: transitionDuration,
                ease: [0.22, 1, 0.36, 1] // Quintic ease for premium feel
              }}
              onAnimationComplete={() => {
                if (i === index) isScrolling.current = false
              }}
              style={{
                position: "absolute",
                inset: 0,
                display: isVisible ? "flex" : "none",
                alignItems: "center",
                justifyContent: "center",
                zIndex: isActive ? 10 : 5 - Math.abs(distance),
                transform: "translateZ(0)",
                backfaceVisibility: "hidden"
              }}
            >
              <Section active={isActive} />
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