import React, { useEffect, useState } from "react";
import {
    Card,
    Button,
    Input,
    Textarea,
    Select,
    Alert,
    LoadingSpinner,
} from "../components/ui";
import { useAsyncState } from "../hooks/common.hooks";
import { PostService } from "../services/post.service";
import { WebsiteService } from "../services/website.service";
import { PlusIcon } from "../components/icons";
import type { CreatePostRequest, Website } from "../handler/types";

const Posts: React.FC = () => {
    const websitesState = useAsyncState<Website[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<CreatePostRequest>({
        title: "",
        description: "",
        website_id: "",
    });
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchWebsites();
    }, []);

    const fetchWebsites = async () => {
        websitesState.setLoading("loading");
        websitesState.setError(null);

        try {
            const websites = await WebsiteService.getAllWebsites();
            websitesState.setData(websites);
            websitesState.setLoading("success");
        } catch (error) {
            console.error("Error fetching websites:", error);
            websitesState.setError("Failed to load websites");
            websitesState.setLoading("error");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = PostService.validatePostData(formData);
        if (validationErrors.length > 0) {
            setFormErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        setFormErrors([]);
        setSuccessMessage(null);

        try {
            await PostService.createPost(formData);

            setFormData({ title: "", description: "", website_id: "" });
            setShowForm(false);
            setSuccessMessage("Post created successfully!");

            setTimeout(() => setSuccessMessage(null), 5000);
        } catch (error) {
            console.error("Error creating post:", error);
            setFormErrors(["Failed to create post. Please try again."]);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange =
        (field: keyof CreatePostRequest) =>
        (
            e: React.ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >,
        ) => {
            setFormData({ ...formData, [field]: e.target.value });
            if (formErrors.length > 0) setFormErrors([]);
        };

    const websiteOptions = websitesState.data.map((website) => ({
        value: website.id.toString(),
        label: website.name,
    }));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Posts Management
                    </h1>
                </div>
                <div className="flex space-x-3">
                    <Button
                        onClick={() => setShowForm(true)}
                        disabled={websitesState.data.length === 0}
                        className="flex items-center"
                    >
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Create New Post
                    </Button>
                </div>
            </div>

            {successMessage && (
                <Alert
                    type="success"
                    message={successMessage}
                    onClose={() => setSuccessMessage(null)}
                />
            )}

            {websitesState.data.length === 0 &&
                websitesState.loading === "success" && (
                    <Alert
                        type="warning"
                        title="No Websites Available"
                        message="You need to create at least one website before you can create posts. Please go to the Websites section first."
                    />
                )}

            {showForm && (
                <Card
                    title="Create New Post"
                    subtitle="Write and publish description for your website"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {formErrors.length > 0 && (
                            <Alert
                                type="error"
                                title="Validation Error"
                                message={formErrors.join(", ")}
                            />
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                <Input
                                    label="Post Title"
                                    type="text"
                                    value={formData.title}
                                    onChange={handleInputChange("title")}
                                    placeholder="Enter an engaging title for your post"
                                    required
                                    helpText="Keep it concise and descriptive (max 255 characters)"
                                />

                                <Textarea
                                    label="Post Content"
                                    value={formData.description}
                                    onChange={handleInputChange("description")}
                                    placeholder="Write your post content here..."
                                    rows={12}
                                    required
                                    helpText="Minimum 10 characters required"
                                />
                            </div>

                            <div className="space-y-6">
                                <Select
                                    label="Target Website"
                                    value={formData.website_id.toString()}
                                    onChange={handleInputChange("website_id")}
                                    options={websiteOptions}
                                    placeholder="Select a website"
                                    required
                                    helpText="Choose which website this post belongs to"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                            <Button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setFormData({
                                        title: "",
                                        description: "",
                                        website_id: "",
                                    });
                                    setFormErrors([]);
                                }}
                                variant="secondary"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                loading={isSubmitting}
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? "Publishing..."
                                    : "Publish Post"}
                            </Button>
                        </div>
                    </form>
                </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Post Creation Tips">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium text-gray-900">
                                Writing Effective Titles
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                                Create clear, descriptive titles that accurately
                                represent your content. Keep them under 60
                                characters for better readability.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900">
                                Content Structure
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                                Break your content into short paragraphs and use
                                clear language. Aim for 200-300 words for
                                optimal engagement.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900">
                                Website Selection
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                                Make sure to select the appropriate website for
                                your content. Each post will be associated with
                                the chosen website.
                            </p>
                        </div>
                    </div>
                </Card>

                <Card
                    title="Available Websites"
                    subtitle={`${websitesState.data.length} websites available`}
                >
                    {websitesState.loading === "loading" ? (
                        <div className="flex justify-center py-4">
                            <LoadingSpinner />
                        </div>
                    ) : websitesState.data.length === 0 ? (
                        <div className="text-center py-6">
                            <p className="text-gray-500 mb-4">
                                No websites available for posting.
                            </p>
                            <p className="text-sm text-gray-400">
                                Create a website first in the Websites section.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {websitesState.data.map((website) => (
                                <div
                                    key={website.id}
                                    className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                                >
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900">
                                            {website.name}
                                        </div>
                                        <div className="text-sm text-gray-500 truncate">
                                            {website.url}
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Posts;
