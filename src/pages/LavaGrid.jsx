import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"

const defaultState = [
  { id: 0, c: 1, r: 1, w: 3, h: 3 },
  { id: 1, c: 4, r: 1, w: 3, h: 3 },
  { id: 2, c: 7, r: 1, w: 3, h: 3 },
  { id: 3, c: 1, r: 4, w: 3, h: 3 },
  { id: 4, c: 4, r: 4, w: 3, h: 3 },
  { id: 5, c: 7, r: 4, w: 3, h: 3 },
  { id: 6, c: 1, r: 7, w: 3, h: 3 },
  { id: 7, c: 4, r: 7, w: 3, h: 3 },
  { id: 8, c: 7, r: 7, w: 3, h: 3 }
]

const centerState = [
  { id: 0, c: 1, r: 1, w: 2, h: 2 },
  { id: 1, c: 3, r: 1, w: 5, h: 2 },
  { id: 2, c: 8, r: 1, w: 2, h: 2 },
  { id: 3, c: 1, r: 3, w: 2, h: 5 },
  { id: 4, c: 3, r: 3, w: 5, h: 5 },
  { id: 5, c: 8, r: 3, w: 2, h: 5 },
  { id: 6, c: 1, r: 8, w: 2, h: 2 },
  { id: 7, c: 3, r: 8, w: 5, h: 2 },
  { id: 8, c: 8, r: 8, w: 2, h: 2 }
]

const state0 = [
  { id: 0, c: 1, r: 1, w: 5, h: 5 },
  { id: 1, c: 6, r: 1, w: 2, h: 5 },
  { id: 2, c: 8, r: 1, w: 2, h: 5 },
  { id: 3, c: 1, r: 6, w: 5, h: 2 },
  { id: 4, c: 6, r: 6, w: 2, h: 2 },
  { id: 5, c: 8, r: 6, w: 2, h: 2 },
  { id: 6, c: 1, r: 8, w: 4, h: 2 },
  { id: 7, c: 5, r: 8, w: 3, h: 2 },
  { id: 8, c: 8, r: 8, w: 2, h: 2 }
]

const state1 = [
  { id: 0, c: 1, r: 1, w: 2, h: 5 },
  { id: 1, c: 3, r: 1, w: 5, h: 5 },
  { id: 2, c: 8, r: 1, w: 2, h: 5 },
  { id: 3, c: 1, r: 6, w: 5, h: 2 },
  { id: 4, c: 6, r: 6, w: 2, h: 2 },
  { id: 5, c: 8, r: 6, w: 2, h: 2 },
  { id: 6, c: 1, r: 8, w: 4, h: 2 },
  { id: 7, c: 5, r: 8, w: 3, h: 2 },
  { id: 8, c: 8, r: 8, w: 2, h: 2 }
]

const state2 = [
  { id: 0, c: 1, r: 1, w: 2, h: 5 },
  { id: 1, c: 3, r: 1, w: 2, h: 5 },
  { id: 2, c: 5, r: 1, w: 5, h: 5 },
  { id: 3, c: 1, r: 6, w: 2, h: 2 },
  { id: 4, c: 3, r: 6, w: 2, h: 2 },
  { id: 5, c: 5, r: 6, w: 5, h: 2 },
  { id: 6, c: 1, r: 8, w: 2, h: 2 },
  { id: 7, c: 3, r: 8, w: 3, h: 2 },
  { id: 8, c: 6, r: 8, w: 4, h: 2 }
]

const state3 = [
  { id: 0, c: 1, r: 1, w: 5, h: 2 },
  { id: 1, c: 6, r: 1, w: 2, h: 2 },
  { id: 2, c: 8, r: 1, w: 2, h: 2 },
  { id: 3, c: 1, r: 3, w: 5, h: 5 },
  { id: 4, c: 6, r: 3, w: 2, h: 5 },
  { id: 5, c: 8, r: 3, w: 2, h: 5 },
  { id: 6, c: 1, r: 8, w: 4, h: 2 },
  { id: 7, c: 5, r: 8, w: 3, h: 2 },
  { id: 8, c: 8, r: 8, w: 2, h: 2 }
]

const state4 = [
  { id: 0, c: 1, r: 1, w: 2, h: 2 },
  { id: 1, c: 3, r: 1, w: 5, h: 2 },
  { id: 2, c: 8, r: 1, w: 2, h: 2 },
  { id: 3, c: 1, r: 3, w: 2, h: 5 },
  { id: 4, c: 3, r: 3, w: 5, h: 5 },
  { id: 5, c: 8, r: 3, w: 2, h: 5 },
  { id: 6, c: 1, r: 8, w: 2, h: 2 },
  { id: 7, c: 3, r: 8, w: 5, h: 2 },
  { id: 8, c: 8, r: 8, w: 2, h: 2 }
]

const state5 = [
  { id: 0, c: 1, r: 1, w: 4, h: 2 },
  { id: 1, c: 5, r: 1, w: 3, h: 2 },
  { id: 2, c: 8, r: 1, w: 2, h: 2 },
  { id: 3, c: 1, r: 3, w: 2, h: 2 },
  { id: 4, c: 3, r: 3, w: 2, h: 2 },
  { id: 5, c: 5, r: 3, w: 5, h: 5 },
  { id: 6, c: 1, r: 5, w: 2, h: 5 },
  { id: 7, c: 3, r: 5, w: 2, h: 5 },
  { id: 8, c: 5, r: 8, w: 5, h: 2 }
]

const state6 = [
  { id: 0, c: 1, r: 1, w: 4, h: 2 },
  { id: 1, c: 5, r: 1, w: 3, h: 2 },
  { id: 2, c: 8, r: 1, w: 2, h: 2 },
  { id: 3, c: 1, r: 3, w: 2, h: 2 },
  { id: 4, c: 3, r: 3, w: 2, h: 2 },
  { id: 5, c: 5, r: 3, w: 5, h: 2 },
  { id: 6, c: 1, r: 5, w: 5, h: 5 },
  { id: 7, c: 6, r: 5, w: 2, h: 5 },
  { id: 8, c: 8, r: 5, w: 2, h: 5 }
]

const state7 = [
  { id: 0, c: 1, r: 1, w: 4, h: 2 },
  { id: 1, c: 5, r: 1, w: 3, h: 2 },
  { id: 2, c: 8, r: 1, w: 2, h: 2 },
  { id: 3, c: 1, r: 3, w: 2, h: 2 },
  { id: 4, c: 3, r: 3, w: 2, h: 2 },
  { id: 5, c: 5, r: 3, w: 5, h: 2 },
  { id: 6, c: 1, r: 5, w: 2, h: 5 },
  { id: 7, c: 3, r: 5, w: 5, h: 5 },
  { id: 8, c: 8, r: 5, w: 2, h: 5 }
]

const state8 = [
  { id: 0, c: 1, r: 1, w: 2, h: 2 },
  { id: 1, c: 3, r: 1, w: 3, h: 2 },
  { id: 2, c: 6, r: 1, w: 4, h: 2 },
  { id: 3, c: 1, r: 3, w: 2, h: 2 },
  { id: 4, c: 3, r: 3, w: 2, h: 2 },
  { id: 5, c: 5, r: 3, w: 5, h: 2 },
  { id: 6, c: 1, r: 5, w: 2, h: 5 },
  { id: 7, c: 3, r: 5, w: 2, h: 5 },
  { id: 8, c: 5, r: 5, w: 5, h: 5 }
]

export default function LavaGrid({ pressData, active, setActive }) {
  const [layout, setLayout] = useState(defaultState)
  const gridRef = useRef(null)

  const isInView = useInView(gridRef, {
    margin: "0px 0px -100px 0px",
    once: false
  })

  // Outside click handler to collapse grid
  useEffect(() => {
    function handleOutsideClick(e) {
      if (!gridRef.current) return

      // Ignore clicks inside the grid itself
      if (gridRef.current.contains(e.target)) return

      // Ignore clicks inside the article content panel (e.g., Read Article links)
      if (e.target.closest('.press-right-stack')) return

      // Reset to default state if clicking outside both
      setLayout(defaultState)
      if (active !== pressData[0]) setActive(pressData[0])
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [active, setActive, pressData])

  // Viewport flush to collapse grid when scrolled out of view
  useEffect(() => {
    if (!isInView && layout !== defaultState) {
      setLayout(defaultState)
      if (active !== pressData[0]) setActive(pressData[0])
    }
  }, [isInView, layout, active, setActive, pressData])

  const handleClick = (id) => {
    const layouts = [state0, state1, state2, state3, state4, state5, state6, state7, state8]
    const newLayout = layouts[id] || defaultState
    setLayout(newLayout)
    setActive(pressData[id])
  }

  const cardTransition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] }

  const cardVariants = {
    default: (color) => ({
      backgroundColor: color || "#000000"
    }),
    active: {
      backgroundColor: "#0f4f78"
    },
    hover: {
      backgroundColor: "#656460"
    }
  }

  return (
    <div ref={gridRef} className="lava-grid">
      {layout.map(card => {
        const data = pressData[card.id]
        const isActive = data === active

        return (
          <motion.div
            layout // Native Framer Motion FLIP
            key={card.id}
            data-card-id={card.id}
            className={`lava-card ${isActive ? "active" : ""}`}
            onClick={() => handleClick(card.id)}
            variants={cardVariants}
            initial="default"
            custom={data?.color}
            animate={isActive ? "active" : "default"}
            whileHover={isActive ? "active" : "hover"}
            transition={cardTransition}
            style={{
              gridColumn: `${card.c} / span ${card.w}`,
              gridRow: `${card.r} / span ${card.h}`
            }}
          >
            {/* The logo is now nested inside the card, maintaining aspect ratio intrinsically */}
            {data && data.logo && (
              <motion.img
                layout // Inverts the parent scale transform
                src={data.logo}
                alt={data.publication || 'press logo'}
                className="lava-card__logo"

                loading="lazy"
                transition={cardTransition}
              />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}