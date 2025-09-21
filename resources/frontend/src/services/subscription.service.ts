import { apiRequest } from '../config/api.config';
import type {CreateSubscriptionRequest, Subscription} from "../handler/types";

export class SubscriptionService {
    private static readonly ENDPOINTS = {
        CREATE_SUBSCRIPTION: '/create-subscription',
    };

    static async createSubscription(
        subscriptionData: CreateSubscriptionRequest
    ): Promise<Subscription> {
        try {
            const response = await apiRequest<Subscription>(
                SubscriptionService.ENDPOINTS.CREATE_SUBSCRIPTION,
                {
                    method: 'POST',
                    body: JSON.stringify(subscriptionData),
                }
            );
            return response;
        } catch (error) {
            console.error('Error creating subscription:', error);
            throw error;
        }
    }

    static validateSubscriptionData(
        subscriptionData: CreateSubscriptionRequest
    ): string[] {
        const errors: string[] = [];

        if (!subscriptionData.subscriber_id) {
            errors.push('Please select a valid user');
        }

        if (!subscriptionData.website_id) {
            errors.push('Please select a valid website');
        }

        return errors;
    }
}
