export const API_CONFIG = {
    BASE_URL: 'http://localhost:8000/api',
    TIMEOUT: 10000,
    HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
};

export interface ApiResponse<T = any> {
    data?: T;
    message?: string;
    success?: boolean;
    errors?: Record<string, string[]>;
}

export class ApiError extends Error {
    constructor(
        message: string,
        public status?: number,
        public response?: any
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export const apiRequest = async <T = any>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> => {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;

    const config: RequestInit = {
        headers: {
            ...API_CONFIG.HEADERS,
            ...options.headers,
        },
        ...options,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    try {
        const response = await fetch(url, {
            ...config,
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new ApiError(
                errorData.message || `HTTP error! status: ${response.status}`,
                response.status,
                errorData
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        clearTimeout(timeoutId);

        if (error instanceof ApiError) {
            throw error;
        }

        if (error.name === 'AbortError') {
            throw new ApiError('Request timeout', 408);
        }

        throw new ApiError(error.message || 'Network error occurred');
    }
};
