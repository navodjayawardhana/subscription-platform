import { apiRequest } from '../config/api.config';
import type {CreateUserRequest, User} from "../handler/types";

export class UserService {
    private static readonly ENDPOINTS = {
        CREATE_USER_SUBSCRIBER: '/create-user-subscriber',
        GET_ALL_SUBSCRIBERS: '/subscribers',
    };

    static async createUserSubscriber(userData: CreateUserRequest): Promise<User> {
        try {
            const response = await apiRequest<User>(
                UserService.ENDPOINTS.CREATE_USER_SUBSCRIBER,
                {
                    method: 'POST',
                    body: JSON.stringify(userData),
                }
            );
            return response;
        } catch (error) {
            console.error('Error creating user subscriber:', error);
            throw error;
        }
    }

    static async getAllSubscribers(): Promise<User[]> {
        try {
            const response = await apiRequest<User[]>(
                UserService.ENDPOINTS.GET_ALL_SUBSCRIBERS
            );
            return Array.isArray(response) ? response : [];
        } catch (error) {
            console.error('Error fetching subscribers:', error);
            return [];
        }
    }

    static validateUserData(userData: CreateUserRequest): string[] {
        const errors: string[] = [];

        if (!userData.name?.trim()) {
            errors.push('Name is required');
        }

        if (!userData.email?.trim()) {
            errors.push('Email is required');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            errors.push('Please enter a valid email address');
        }

        return errors;
    }
}
