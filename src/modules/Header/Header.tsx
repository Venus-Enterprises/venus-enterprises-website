import Image from "next/image";
import Link from "next/link"; // ✅ ADD THIS
import styles from "./Header.module.css";
import { getHeaderVM } from "@/shared/adapters/headerAdapter";

function GreenTickIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      width="14"
      height="14"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="10" fill="#16A34A" />
      <path
        d="M6 10.5L8.5 13L14 7.5"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8c1.5 3 3.6 5.1 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.2 1.3.5 2.7.8 4.2.8.7 0 1.2.5 1.2 1.2V21c0 .7-.5 1.2-1.2 1.2C10.5 22.2 1.8 13.5 1.8 3.6 1.8 2.9 2.3 2.4 3 2.4h3.6c.7 0 1.2.5 1.2 1.2 0 1.5.3 2.9.8 4.2.1.4 0 .9-.3 1.2L6.6 10.8z"
        fill="currentColor"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Header() {
  const vm = getHeaderVM();

  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>

        {/* ✅ UPDATED: Wrapped with Link */}
        <Link href="/" className={styles.left}>
          <Image
            src={vm.logo.src}
            alt={vm.logo.alt}
            width={vm.logo.width}
            height={vm.logo.height}
            priority
          />

          <div className={styles.brandText}>
            <div className={styles.companyName}>{vm.companyName}</div>

            <div className={styles.metaRow}>
              {vm.location && (
                <span className={styles.metaItem}>
                  {vm.location}
                </span>
              )}

              {vm.location && vm.gstNo && (
                <span className={styles.separator}>|</span>
              )}

              {vm.gstNo && (
                <span className={styles.metaItem}>
                  <GreenTickIcon />
                  <span className={styles.gstText}>{vm.gstNo}</span>
                </span>
              )}
            </div>
          </div>
        </Link>

        <div className={styles.right}>
          <a
            className={styles.pillBtnDark}
            href={vm.telHref}
            aria-label={`Call ${vm.contact.phoneNumber}`}
          >
            <PhoneIcon />
            <span>{vm.contact.phoneLabel} {vm.contact.phoneNumber}</span>
          </a>

          <a
            className={styles.pillBtnBlue}
            href="/contact-us"
            aria-label="Go to Contact Us page"
          >
            <MailIcon />
            <span>{vm.contact.emailLabel}</span>
          </a>
        </div>

      </div>
    </header>
  );
}