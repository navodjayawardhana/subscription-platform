export interface BaseEntity {
    id: string;
    created_at: string;
    updated_at?: string;
}

export interface User extends BaseEntity {
    email: string;
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
    website_id: string;
    website?: Website;
    status?: 'published' | 'draft';
}

export interface Subscription extends BaseEntity {
    user_id: string;
    website_id: string;
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
}

export interface CreatePostRequest {
    title: string;
    description: string;
    website_id: string;
}

export interface CreateSubscriptionRequest {
    subscriber_id: string;
    website_id: string;
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
