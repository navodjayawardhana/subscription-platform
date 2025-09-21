import { apiRequest } from '../config/api.config';
import type { CreateWebsiteRequest, Website } from "../handler/types";

export class WebsiteService {
    private static readonly ENDPOINTS = {
        CREATE_WEBSITE: '/create-website',
        GET_ALL_WEBSITES: '/all-websites',
    };

    static async createWebsite(websiteData: CreateWebsiteRequest): Promise<Website> {
        try {
            const response = await apiRequest<{ message: string; data: Website }>(
                WebsiteService.ENDPOINTS.CREATE_WEBSITE,
                {
                    method: 'POST',
                    body: JSON.stringify(websiteData),
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error creating website:', error);
            throw error;
        }
    }

    static async getAllWebsites(): Promise<Website[]> {
        try {
            const response = await apiRequest<{ message: string; data: Website[] }>(
                WebsiteService.ENDPOINTS.GET_ALL_WEBSITES
            );
            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error('Error fetching websites:', error);
            return [];
        }
    }

    static validateWebsiteData(websiteData: CreateWebsiteRequest): string[] {
        const errors: string[] = [];

        if (!websiteData.name?.trim()) {
            errors.push('Website name is required');
        }

        if (!websiteData.url?.trim()) {
            errors.push('Website URL is required');
        } else {
            try {
                new URL(websiteData.url);
            } catch {
                errors.push('Please enter a valid URL');
            }
        }

        return errors;
    }

    static formatUrl(url: string): string {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return `https://${url}`;
        }
        return url;
    }
}
