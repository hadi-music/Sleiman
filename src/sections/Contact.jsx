import Section from "../components/Section";
import ContactForm from "../pages/form.jsx";
import { useData } from "../hooks/useData";
import { DataService } from "../data/DataService";
import "./contact.css";

export default function Contact() {
  const { data: formData, loading } = useData(DataService.getFormData);

  return (
    <Section headerTitle="GET IN TOUCH" className="contact" loading={loading}>
      <div className="contact-svg-wrapper">
        <img src="/images/contact.svg" alt="Contact" className="contact-svg" />
      </div>
      <ContactForm formData={formData} />
    </Section>
  );
}
