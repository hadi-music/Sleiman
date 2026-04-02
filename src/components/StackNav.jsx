import { motion } from "framer-motion"

export default function StackNav({ sections, index, setIndex }) {

  const colors = [
    "#ffffffff",
    "#ffffffff",
    "#ffffffff",
    "#ffffffff",
    "#ffffffff",
    "#ffffffff",
    "#ffffffff"
  ]

  return (

    <div className="stack-nav">

      {sections.map((_, i) => (

        <motion.div
          key={i}
          className="nav-dot"

          onClick={() => setIndex(i)}

          animate={{
            scale: i === index ? 1.6 : 1
          }}

          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}

          style={{
            background: colors[i]
          }}

        />

      ))}

    </div>

  )

}