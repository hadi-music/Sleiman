import { useEffect, useState } from "react"
import NumbersDesktop from "./NumbersDesktop"
import NumbersMobile from "./NumbersMobile"

export default function Numbers() {

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768)

  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)

  }, [])

  return isMobile
    ? <NumbersMobile />
    : <NumbersDesktop />

}