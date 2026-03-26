import styles from "./FloatingWhatsApp.module.css";

export default function FloatingWhatsApp() {

  const phoneNumber = "+919994488293";
  const message = "Hello, I would like to know more about your products.";

  const whatsappLink =
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappButton}
      aria-label="Chat on WhatsApp"
    >
      <img
        src="/icons/whatsapp.svg"
        alt="WhatsApp"
        className={styles.icon}
      />
    </a>
  );
}