import Section from "../components/Section";
import ContactForm from "../pages/form.jsx";
import "./contact.css";

export default function Contact() {
  return (
    <Section headerTitle="Contact" className="contact">
      <div className="contact-svg-wrapper">
        <img src="/images/contact.svg" alt="Contact" className="contact-svg" />
      </div>
      <ContactForm />
    </Section>
  );
}
