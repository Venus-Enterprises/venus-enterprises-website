import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";
import { getFooterVM } from "@/shared/adapters/footerAdapter";

export default function Footer() {
  const vm = getFooterVM();

  const centerLinks = vm.quickLinks?.links ?? [];
  const rightLinks = vm.policyLinks?.links ?? [];

  return (
    <footer className={styles.wrapper}>
      <div className={styles.container}>
        {/* LEFT */}
        <div className={styles.left}>
          <span className={styles.mark} aria-hidden="true">
            <Image
              src={vm.brand.logo.src}
              alt={vm.brand.logo.alt}
              width={18}
              height={18}
              className={styles.logo}
            />
          </span>
          <span className={styles.copy}>{vm.copyrightText}</span>
        </div>

        {/* CENTER */}
        <nav className={styles.center} aria-label="Footer quick links">
          {centerLinks.map((l) => (
            <Link key={`${l.label}-${l.href}`} href={l.href} className={styles.link}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT */}
        <nav className={styles.right} aria-label="Footer policy links">
          {rightLinks.map((l) => (
            <Link key={`${l.label}-${l.href}`} href={l.href} className={styles.link}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}