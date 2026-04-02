import CardStack from "./components/CardStack"

import Home from "./sections/Home"
import Numbers from "./sections/Numbers"
import Press from "./sections/Press"
import Studio from "./sections/Studio"
import Contact from "./sections/Contact"

export default function App() {

  const sections = [
    Home,
    Numbers,
    Press,
    Studio,
    Contact
  ]

  return <CardStack sections={sections} />

}