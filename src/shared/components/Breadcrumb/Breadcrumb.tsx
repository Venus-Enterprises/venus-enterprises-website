import Link from "next/link";
import styles from "./Breadcrumb.module.css";

export type BreadcrumbItem = {
  label: string;
  href?: string; // if not provided => render as text (current page)
};

type Props = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function Breadcrumb({ items, className }: Props) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={[styles.breadcrumb, className].filter(Boolean).join(" ")}>
      <ol className={styles.list}>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li key={`${item.label}-${idx}`} className={styles.item}>
              {item.href && !isLast ? (
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.current}>{item.label}</span>
              )}

              {!isLast && <span className={styles.sep}>›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}