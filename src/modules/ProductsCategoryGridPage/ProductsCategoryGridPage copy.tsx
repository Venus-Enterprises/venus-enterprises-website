import Link from "next/link";
import styles from "./ProductsCategoryGridPage.module.css";
import EnquiryBlock from "@/modules/EnquiryBlock/EnquiryBlock";

// ✅ Config-driven categories (no hardcoding)
import categories from "@/config/products_Category.json";

type Category = {
  name: string;
  slug: string;
  imageUrl: string;
};

export default function ProductsCategoryGridPage() {
  const CATEGORIES = categories as Category[];

  return (
    <section className={styles.pageSection}>
      <div className={styles.pageContainer}>
        {/* Breadcrumb + Search Row */}
        <div className={styles.topRow}>
          <nav className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <span className={styles.breadcrumbSep}>»</span>
            <span className={styles.breadcrumbCurrent}>Our Products</span>
          </nav>

          <div
            className={styles.searchWrap}
            role="search"
            aria-label="Search products"
          >
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search Products/Services"
            />
            <button
              className={styles.searchBtn}
              type="button"
              aria-label="Search"
            >
              🔍
            </button>
          </div>
        </div>

        {/* Title + Description */}
        <h1 className={styles.pageTitle}>Our Products</h1>
        <p className={styles.pageDesc}>
          Explore our product categories and choose what you need.
        </p>

        {/* Grid */}
        <div className={styles.grid} role="list">
          {CATEGORIES.map((cat) => (
            <div className={styles.card} role="listitem" key={cat.slug}>
              <Link
                href={`/products/${cat.slug}`}
                className={styles.cardLink}
                aria-label={cat.name}
              >
                <div className={styles.imageWrap}>
                  <img
                    className={styles.image}
                    src={cat.imageUrl}
                    alt={cat.name}
                  />
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{cat.name}</h3>
                </div>
              </Link>

              <div className={styles.cardFooter}>
                <Link
                  href={`/products/${cat.slug}`}
                  className={styles.viewAllBtn}
                >
                  View All
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
        {/* ✅ Enquiry Block should be below category list (inside container for alignment) */}
        <EnquiryBlock />
    </section>
  );
}