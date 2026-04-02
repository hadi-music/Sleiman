import { useState, useEffect } from "react";
import Section from "../components/Section";

// Import both versions
import ContactForm from "../pages/form.jsx";       // Desktop/4K
import FormMobile from "../pages/formmobile.jsx"; // New Mobile Layout

import "./contact.css";

export default function Contact() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the listener when component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Section headerTitle="Contact" className="contact">
      {/* This is the fix: We add a dynamic class "mobile-view" or "desktop-view".
          Now, your CSS files can specifically target only their mode.
      */}
      <div className={`section-body ${isMobile ? "mobile-view" : "desktop-view"}`}>
        {isMobile ? <FormMobile /> : <ContactForm />}
      </div>
    </Section>
  );
}