import Link from "next/link";
import styles from "./ProductsPreview.module.css";
import { getProductsPreviewVM } from "@/shared/adapters/productsAdapter";

export default function ProductsPreview() {
  const vm = getProductsPreviewVM();

  // Same defensive pattern as other modules (like Footer):
  // If VM not available, don't render module.
  if (!vm || !Array.isArray(vm.categories)) {
    return null;
  }

  // Ensure href is NEVER undefined
  const viewAllHref =
    (vm as any)?.viewAll?.href ||
    (vm as any)?.viewAllHref ||
    "/products";

  return (
    <section className={styles.section} aria-label="Our Products">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>{vm.title}</h2>
          {vm.subtitle ? <p className={styles.subtitle}>{vm.subtitle}</p> : null}
        </header>

        <div className={styles.grid} role="list">
          {vm.categories.map((cat: any) => {
            // Ensure category href is NEVER undefined
            const categoryHref =
              cat?.href || (cat?.slug ? `/products/${cat.slug}` : "/products");

            return (
              <Link
                key={cat.slug || cat.name}
                href={categoryHref}
                className={styles.card}
                role="listitem"
              >
                <div className={styles.imageWrap}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className={styles.image}
                    loading="lazy"
                  />
                </div>
                <div className={styles.caption}>{cat.name}</div>
              </Link>
            );
          })}

          <Link href={viewAllHref} className={styles.viewAllCard} role="listitem">
            <div className={styles.viewAllInner}>
              <div className={styles.viewAllText}>
                <span className={styles.viewAllLine1}>View</span>
                <span className={styles.viewAllLine2}>All</span>
                <span className={styles.viewAllLine3}>Products</span>
              </div>

              <span className={styles.eye} aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}