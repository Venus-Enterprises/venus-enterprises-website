import Head from "next/head";
import FloatingWhatsApp from "@/modules/FloatingWhatsApp/FloatingWhatsApp";
import Header from "@/modules/Header";
import Hero from "@/modules/Hero";
import Footer from "@/modules/Footer";
import ProductsPreview from "@/modules/ProductsPreview";
import EnquiryBlock from "@/modules/EnquiryBlock";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Venus Enterprises</title>
        <meta name="description" content="Venus Enterprises website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <Hero />
      <ProductsPreview />
      
      <EnquiryBlock />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}