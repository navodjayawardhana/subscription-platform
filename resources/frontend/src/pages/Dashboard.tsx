import React, { useEffect } from "react";
import { Card } from "../components/ui";
import { useAsyncState } from "../hooks/common.hooks";
import { UserService } from "../services/user.service";
import { WebsiteService } from "../services/website.service";
import type { DashboardStats, PageProps } from "../handler/types";

const Dashboard: React.FC<PageProps> = ({ onNavigate }) => {
    const statsState = useAsyncState<DashboardStats>({
        totalUsers: 0,
        totalWebsites: 0,
        totalPosts: 0,
        totalSubscriptions: 0,
    });

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        statsState.setLoading("loading");
        statsState.setError(null);

        try {
            const [users, websites] = await Promise.all([
                UserService.getAllSubscribers(),
                WebsiteService.getAllWebsites(),
            ]);

            statsState.setData({
                totalUsers: users.length,
                totalWebsites: websites.length,
                totalPosts: 0,
                totalSubscriptions: 0,
            });

            statsState.setLoading("success");
        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
            statsState.setError("Failed to load dashboard statistics");
            statsState.setLoading("error");
        }
    };

    const statCards = [
        {
            title: "Total Users",
            value: statsState.data.totalUsers,
            color: "blue",
        },
        {
            title: "Total Websites",
            value: statsState.data.totalWebsites,
            color: "green",
        },
        {
            title: "Total Posts",
            value: statsState.data.totalPosts,
            color: "purple",
        },
        {
            title: "Subscriptions",
            value: statsState.data.totalSubscriptions,
            color: "yellow",
        },
    ];

    const quickActions = [
        {
            title: "Manage Users",
            description: "View and create user subscribers",
            color: "blue",
            action: () => onNavigate?.("users"),
        },
        {
            title: "Manage Websites",
            description: "Create and manage websites",
            color: "green",
            action: () => onNavigate?.("websites"),
        },
        {
            title: "Create Posts",
            description: "Write and publish content",
            color: "purple",
            action: () => onNavigate?.("posts"),
        },
        {
            title: "Manage Subscriptions",
            description: "Link users to websites",
            color: "yellow",
            action: () => onNavigate?.("subscriptions"),
        },
    ];

    const getColorClasses = (color: string) => {
        const colors = {
            blue: {
                bg: "bg-blue-100",
                text: "text-blue-600",
                hover: "hover:bg-blue-100",
            },
            green: {
                bg: "bg-green-100",
                text: "text-green-600",
                hover: "hover:bg-green-100",
            },
            purple: {
                bg: "bg-purple-100",
                text: "text-purple-600",
                hover: "hover:bg-purple-100",
            },
            yellow: {
                bg: "bg-yellow-100",
                text: "text-yellow-600",
                hover: "hover:bg-yellow-100",
            },
        };
        return colors[color as keyof typeof colors] || colors.blue;
    };

    if (statsState.loading === "loading") {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm animate-pulse"
                        >
                            <div className="h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-8 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            </div>

            {statsState.error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
                    <p>{statsState.error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => {
                    return (
                        <Card
                            key={index}
                            className="hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center">
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">
                                        {stat.title}
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900">
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                <Card
                    title="Quick Actions"
                    subtitle="Common administrative tasks"
                >
                    <div className="space-y-3">
                        {quickActions.map((action, index) => {
                            const colorClasses = getColorClasses(action.color);
                            return (
                                <button
                                    key={index}
                                    onClick={action.action}
                                    className={`w-full text-left px-4 py-4 ${colorClasses.bg} ${colorClasses.hover} rounded-lg transition-colors group`}
                                >
                                    <div
                                        className={`font-medium ${colorClasses.text} group-hover:${colorClasses.text}`}
                                    >
                                        {action.title}
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">
                                        {action.description}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </Card>
            </div>

            <Card title="Recent Activity" subtitle="Latest system events">
                <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                        Dashboard statistics refreshed successfully
                    </div>
                    <div className="text-sm text-gray-600">
                        {statsState.data.totalUsers} user
                        {statsState.data.totalUsers !== 1 ? "s" : ""} currently
                        registered
                    </div>
                    <div className="text-sm text-gray-600">
                        {statsState.data.totalWebsites} website
                        {statsState.data.totalWebsites !== 1 ? "s" : ""} in the
                        system
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Dashboard;
