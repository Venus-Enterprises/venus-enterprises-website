import Head from "next/head";
import { useRouter } from "next/router";
import Header from "@/modules/Header/Header";
import Footer from "@/modules/Footer/Footer";
import CategoryListingPage from "@/modules/CategoryListingPage/CategoryListingPage";
import styles from "./ProductsPage.module.css";

export default function CategoryPage() {
  const router = useRouter();
  const category = String(router.query.category || "");

  return (
    <>
      <Head>
        <title>{category ? `${category} | Our Products` : "Our Products"}</title>
      </Head>

      <div className={styles.pageShell}>
        <Header />

        <main className={styles.pageMain}>
          <CategoryListingPage />
        </main>

        <Footer />
      </div>
    </>
  );
}