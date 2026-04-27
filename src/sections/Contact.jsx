import Section from "../components/Section";
import ContactForm from "../pages/form.jsx";
import "./contact.css";

export default function Contact() {
  return (
    <Section headerTitle="GET IN TOUCH" className="contact">
      <div className="contact-svg-wrapper">
        <img src="/images/contact.svg" alt="Contact" className="contact-svg" />
      </div>
      <ContactForm />
    </Section>
  );
}
