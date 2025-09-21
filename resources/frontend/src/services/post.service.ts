import { apiRequest } from "../config/api.config";
import type { CreatePostRequest, Post } from "../handler/types";

export class PostService {
    private static readonly ENDPOINTS = {
        CREATE_POST: "/create-post",
    };

    static async createPost(postData: CreatePostRequest): Promise<Post> {
        try {
            const response = await apiRequest<Post>(
                PostService.ENDPOINTS.CREATE_POST,
                {
                    method: "POST",
                    body: JSON.stringify(postData),
                },
            );
            return response;
        } catch (error) {
            console.error("Error creating post:", error);
            throw error;
        }
    }

    static validatePostData(postData: CreatePostRequest): string[] {
        const errors: string[] = [];

        if (!postData.title?.trim()) {
            errors.push("Post title is required");
        } else if (postData.title.length > 255) {
            errors.push("Title must be less than 255 characters");
        }

        if (!postData.description?.trim()) {
            errors.push("Post content is required");
        } else if (postData.description.length < 6) {
            errors.push("Content must be at least 6 characters long");
        }

        if (!postData.website_id) {
            errors.push("Please select a valid website");
        }

        return errors;
    }
}
