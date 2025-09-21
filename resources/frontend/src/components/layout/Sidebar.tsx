import React from "react";
import { NAVIGATION } from "../../navigation";
import type { NavigationItem } from "../../handler/types";

interface SidebarProps {
    currentPage: string;
    onNavigate: (pageId: string) => void;
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    currentPage,
    onNavigate,
    sidebarOpen,
    setSidebarOpen,
}) => {
    return (
        <>
            <aside
                id="sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r border-gray-200 shadow-sm">
                    <nav className="space-y-2">
                        {NAVIGATION.map((item: NavigationItem) => {
                            const IconComponent = item.icon;
                            const isActive = currentPage === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        onNavigate(item.id);
                                        setSidebarOpen(false);
                                    }}
                                    className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150 ${
                                        isActive
                                            ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                >
                                    <IconComponent
                                        className={`w-5 h-5 ${
                                            isActive
                                                ? "text-blue-700"
                                                : "text-gray-500"
                                        }`}
                                    />
                                    <span className="ml-3">{item.name}</span>
                                    {isActive && (
                                        <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black bg-opacity-50 sm:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </>
    );
};

export default Sidebar;
