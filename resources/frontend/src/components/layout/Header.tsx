import React from "react";

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
                    <p className="text-sm text-gray-600 mt-1">{today}</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>subscription-platform</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
