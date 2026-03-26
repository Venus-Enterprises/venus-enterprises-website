import Header from "@/modules/Header";
import Footer from "@/modules/Footer";
import ContactUsPage from "@/modules/ContactUsPage";

export default function ContactUs() {
  return (
    <div className="contactPageShell">
      <Header />
      <main className="contactPageBody">
        <ContactUsPage />
      </main>
      <Footer />
    </div>
  );
}
