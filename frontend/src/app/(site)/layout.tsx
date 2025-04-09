import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <div className="mb-20">
        <Navbar />
      </div>
      {children}
      <div>
        <Footer />
      </div>
    </section>
  );
};

export default SiteLayout;
