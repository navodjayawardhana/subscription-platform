import React from "react";

interface IconProps {
    className?: string;
    size?: number;
}

export const DashboardIcon: React.FC<IconProps> = ({
    className = "w-5 h-5",
    size,
}) => (
    <svg
        className={className}
        width={size}
        height={size}
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 22 21"
    >
        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
    </svg>
);

export const UsersIcon: React.FC<IconProps> = ({
    className = "w-5 h-5",
    size,
}) => (
    <svg
        className={className}
        width={size}
        height={size}
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 18"
    >
        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
    </svg>
);

export const WebsitesIcon: React.FC<IconProps> = ({
    className = "w-5 h-5",
    size,
}) => (
    <svg
        className={className}
        width={size}
        height={size}
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 18 18"
    >
        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
    </svg>
);

export const PostsIcon: React.FC<IconProps> = ({
    className = "w-5 h-5",
    size,
}) => (
    <svg
        className={className}
        width={size}
        height={size}
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 18 20"
    >
        <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
    </svg>
);

export const SubscriptionsIcon: React.FC<IconProps> = ({
    className = "w-5 h-5",
    size,
}) => (
    <svg
        className={className}
        width={size}
        height={size}
        aria-hidden="true"
        fill="none"
        viewBox="0 0 18 16"
    >
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
        />
    </svg>
);

export const MenuIcon: React.FC<IconProps> = ({
    className = "w-6 h-6",
    size,
}) => (
    <svg
        className={className}
        width={size}
        height={size}
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
    >
        <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        />
    </svg>
);

export const PlusIcon: React.FC<IconProps> = ({
    className = "w-5 h-5",
    size,
}) => (
    <svg
        className={className}
        width={size}
        height={size}
        aria-hidden="true"
        fill="none"
        viewBox="0 0 18 18"
    >
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
        />
    </svg>
);

export const ExternalLinkIcon: React.FC<IconProps> = ({
    className = "w-5 h-5",
    size,
}) => (
    <svg
        className={className}
        width={size}
        height={size}
        aria-hidden="true"
        fill="none"
        viewBox="0 0 18 18"
    >
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
        />
    </svg>
);
