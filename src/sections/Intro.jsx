import Section from "../components/Section"
import data from "../data/intro.json"

export default function Intro() {

  return (

    <Section
      title={data.title}
      subtitle={data.subtitle}
      className="intro"
    >

      <p>{data.text}</p>

    </Section>

  )

}