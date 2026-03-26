import { useRouter } from "next/router";
import styles from "./CategoryListingPage.module.css";
import Breadcrumb from "@/shared/components/Breadcrumb/Breadcrumb";
import productsData from "@/config/products_Category_list.json";
import EnquiryBlock from "@/modules/EnquiryBlock/EnquiryBlock";

function normalizeText(value: string) {
  return decodeURIComponent(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export default function CategoryListingPage() {
  const router = useRouter();
  const categoryParam = String(router.query.category || "");
  const title = decodeURIComponent(categoryParam || "Category");

  const matchedCategory = productsData.categories.find(
    (category) => normalizeText(category.name) === normalizeText(title)
  );

  const products = matchedCategory?.products || [];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Our Products", href: "/products" },
            { label: title },
          ]}
        />

        <h1 className={styles.title}>{title}</h1>

        {products.length > 0 ? (
          <div className={styles.grid}>
            {products.map((product) => (
              <div key={product.name} className={styles.card}>
                <div className={styles.cardInner}>
                  <div className={styles.imageBox}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.image}
                      loading="lazy"
                    />
                  </div>

                  <h3 className={styles.productName}>{product.name}</h3>

                  <p className={styles.availability}>
                    Availability: <span>{product.availability}</span>
                  </p>

                  <a href="/contact-us" className={styles.quoteBtn}>
                    Get Quotation
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.desc}>No products found for this category.</p>
        )}
      </div>
           {/* ✅ Enquiry Block should be below category list (inside container for alignment) */}
              <EnquiryBlock />
    </main>
  );
}