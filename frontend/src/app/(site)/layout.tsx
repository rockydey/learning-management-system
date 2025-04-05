import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <div className="mb-20">
        <Navbar />
      </div>
      {children}
      <div className="mt-16">
        <Footer />
      </div>
    </section>
  );
};

export default SiteLayout;
