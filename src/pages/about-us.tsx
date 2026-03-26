import Head from "next/head";
import Header from "@/modules/Header";
import Footer from "@/modules/Footer";
import AboutCompany from "@/modules/AboutCompany";

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>About Us | Venus Enterprises</title>
      </Head>

      <div>
        <Header />
        <main>
          <AboutCompany />
        </main>
        <Footer />
      </div>
    </>
  );
}