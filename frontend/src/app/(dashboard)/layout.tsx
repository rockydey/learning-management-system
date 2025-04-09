import AuthWrapper from "@/settings/AuthWrapper";
import MobileMenu from "@/settings/MobileMenu";
import Sidebar from "@/settings/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="grid grid-cols-12 gap-6 lg:p-5">
      <div className="hidden lg:block lg:col-span-4 xl:col-span-3 2xl:col-span-2">
        <Sidebar />
      </div>
      <div className="col-span-12 lg:col-span-8 xl:col-span-9 2xl:col-span-10 h-[calc(100vh-40px)] overflow-y-auto">
        <div className="lg:hidden">
          <MobileMenu />
        </div>

        <div className="px-5 lg:px-0">
          <AuthWrapper>{children}</AuthWrapper>
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
