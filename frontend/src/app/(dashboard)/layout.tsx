import AuthWrapper from "@/settings/AuthWrapper";
import Sidebar from "@/settings/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="grid grid-cols-12 gap-6 px-5 py-5">
      <div className="col-span-2">
        <Sidebar />
      </div>
      <div className="col-span-10">
        <AuthWrapper>{children}</AuthWrapper>
      </div>
    </section>
  );
};

export default DashboardLayout;
