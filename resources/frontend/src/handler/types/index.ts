export interface BaseEntity {
    id: number;
    created_at: string;
    updated_at?: string;
}

export interface User extends BaseEntity {
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Website extends BaseEntity {
    name: string;
    url: string;
    description?: string;
    status?: 'active' | 'inactive';
}

export interface Post extends BaseEntity {
    title: string;
    content: string;
    website_id: number;
    website?: Website;
    status?: 'published' | 'draft';
}

export interface Subscription extends BaseEntity {
    user_id: number;
    website_id: number;
    user?: User;
    website?: Website;
    status?: 'active' | 'inactive';
}

export interface CreateUserRequest {
    name: string;
    email: string;
}

export interface CreateWebsiteRequest {
    name: string;
    url: string;
    description?: string;
}

export interface CreatePostRequest {
    title: string;
    content: string;
    website_id: number;
}

export interface CreateSubscriptionRequest {
    user_id: number;
    website_id: number;
}

export interface DashboardStats {
    totalUsers: number;
    totalWebsites: number;
    totalPosts: number;
    totalSubscriptions: number;
    activeSubscriptions?: number;
    publishedPosts?: number;
}

export interface NavigationItem {
    id: string;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    path: string;
}

export interface PageProps {
    onNavigate?: (page: string) => void;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
    data: T;
    loading: LoadingState;
    error: string | null;
}
