import HeadNav from "@/src/core/shared/presentation/components/head-nav";
import SideBar from "@/src/core/shared/presentation/components/side-bar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen overflow-hidden">
            <SideBar />
            <main className="flex-1 overflow-hidden">
                <HeadNav />
                <div className="overflow-auto h-full">
                    {children}
                </div>
            </main>
        </div>
    )
};

export default ProtectedLayout;