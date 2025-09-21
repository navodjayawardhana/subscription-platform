import {
    DashboardIcon,
    UsersIcon,
    WebsitesIcon,
    PostsIcon,
    SubscriptionsIcon,
} from "./components/icons";
import type { NavigationItem } from "./handler/types";

export const NAVIGATION: NavigationItem[] = [
    {
        id: "dashboard",
        name: "Dashboard",
        icon: DashboardIcon,
        path: "/dashboard",
    },
    {
        id: "users",
        name: "Users",
        icon: UsersIcon,
        path: "/users",
    },
    {
        id: "websites",
        name: "Websites",
        icon: WebsitesIcon,
        path: "/websites",
    },
    {
        id: "posts",
        name: "Posts",
        icon: PostsIcon,
        path: "/posts",
    },
    {
        id: "subscriptions",
        name: "Subscriptions",
        icon: SubscriptionsIcon,
        path: "/subscriptions",
    },
];
