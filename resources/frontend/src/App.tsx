import React from "react";
import { useToggle, useLocalStorage } from "./hooks/common.hooks";
import { NAVIGATION } from "./navigation";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Websites from "./pages/Websites";
import Posts from "./pages/Posts";
import Subscriptions from "./pages/Subscriptions";

const App: React.FC = () => {
    const [sidebarOpen, toggleSidebar, setSidebarOpen] = useToggle(false);
    const [currentPage, setCurrentPage] = useLocalStorage<string>(
        "currentPage",
        "dashboard",
    );

    const handleNavigate = (pageId: string) => {
        setCurrentPage(pageId);
        setSidebarOpen(false);
    };

    const renderCurrentPage = () => {
        switch (currentPage) {
            case "dashboard":
                return <Dashboard onNavigate={handleNavigate} />;
            case "users":
                return <Users />;
            case "websites":
                return <Websites />;
            case "posts":
                return <Posts />;
            case "subscriptions":
                return <Subscriptions />;
            default:
                return <Dashboard onNavigate={handleNavigate} />;
        }
    };

    const getCurrentPageTitle = () => {
        const currentNav = NAVIGATION.find((nav) => nav.id === currentPage);
        return currentNav ? currentNav.name : "Dashboard";
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="sm:hidden">
                <button
                    type="button"
                    onClick={toggleSidebar}
                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                >
                    <span className="sr-only">Open sidebar</span>
                </button>
            </div>

            <Sidebar
                currentPage={currentPage}
                onNavigate={handleNavigate}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="sm:ml-64">
                <div className="min-h-screen bg-gray-50">
                    <Header title={getCurrentPageTitle()} />
                    <main className="p-6">
                        <div className="max-w-7xl mx-auto">
                            {renderCurrentPage()}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default App;
