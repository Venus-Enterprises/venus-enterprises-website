import Head from "next/head";
import Header from "@/modules/Header/Header";
import Footer from "@/modules/Footer/Footer";
import ProductsCategoryGridPage from "@/modules/ProductsCategoryGridPage/ProductsCategoryGridPage";
import styles from "./ProductsPage.module.css";

export default function ProductsIndexPage() {
  return (
    <>
      <Head>
        <title>Our Products</title>
        <meta name="description" content="Browse our product categories." />
      </Head>

      <div className={styles.pageShell}>
        <Header />

        <main className={styles.pageMain}>
          <ProductsCategoryGridPage />
        </main>

        <Footer />
      </div>
    </>
  );
}