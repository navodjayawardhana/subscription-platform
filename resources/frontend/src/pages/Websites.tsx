import React, { useEffect, useState } from "react";
import { Card, Button, Input, Alert, LoadingSpinner } from "../components/ui";
import { useAsyncState } from "../hooks/common.hooks";
import { WebsiteService } from "../services/website.service";
import { PlusIcon, ExternalLinkIcon } from "../components/icons";
import type { CreateWebsiteRequest, Website } from "../handler/types";

const Websites: React.FC = () => {
    const websitesState = useAsyncState<Website[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<CreateWebsiteRequest>({
        name: "",
        url: "",
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

        const validationErrors = WebsiteService.validateWebsiteData(formData);
        if (validationErrors.length > 0) {
            setFormErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        setFormErrors([]);
        setSuccessMessage(null);

        try {
            const formattedData = {
                ...formData,
                url: WebsiteService.formatUrl(formData.url),
            };

            await WebsiteService.createWebsite(formattedData);

            await fetchWebsites();

            setFormData({ name: "", url: "" });
            setShowForm(false);
            setSuccessMessage("Website created successfully!");

            setTimeout(() => setSuccessMessage(null), 5000);
        } catch (error) {
            console.error("Error creating website:", error);
            setFormErrors(["Failed to create website. Please try again."]);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange =
        (field: keyof CreateWebsiteRequest) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormData({ ...formData, [field]: e.target.value });
            if (formErrors.length > 0) {
                setFormErrors([]);
            }
        };

    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getDomainFromUrl = (url: string) => {
        try {
            return new URL(url).hostname;
        } catch {
            return url;
        }
    };

    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Websites Management
                    </h1>
                </div>
                <div className="flex space-x-3">
                    <Button
                        onClick={() => setShowForm(true)}
                        variant="success"
                        className="flex items-center"
                    >
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Add New Website
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

            {showForm && (
                <Card
                    title="Create New Website"
                    subtitle="Add a new website to the system"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {formErrors.length > 0 && (
                            <Alert
                                type="error"
                                title="Validation Error"
                                message={formErrors.join(", ")}
                            />
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Website Name"
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange("name")}
                                placeholder="My Awesome Website"
                                required
                                helpText="A friendly name for the website"
                            />

                            <Input
                                label="Website URL"
                                type="url"
                                value={formData.url}
                                onChange={handleInputChange("url")}
                                placeholder="https://example.com"
                                required
                                helpText="Full URL including http:// or https://"
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setFormData({ name: "", url: "" });
                                    setFormErrors([]);
                                }}
                                variant="secondary"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="success"
                                loading={isSubmitting}
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? "Creating..."
                                    : "Create Website"}
                            </Button>
                        </div>
                    </form>
                </Card>
            )}

            <Card
                title="All Websites"
                subtitle={`${websitesState.data.length} website${websitesState.data.length !== 1 ? "s" : ""} registered`}
            >
                {websitesState.loading === "loading" ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <LoadingSpinner size="lg" />
                        <p className="mt-4 text-gray-500">
                            Loading websites...
                        </p>
                    </div>
                ) : websitesState.error ? (
                    <div className="text-center py-12">
                        <Alert type="error" message={websitesState.error} />
                        <Button onClick={fetchWebsites} className="mt-4">
                            Try Again
                        </Button>
                    </div>
                ) : websitesState.data.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                            <PlusIcon className="h-6 w-6 text-gray-400" />
                        </div>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                            No websites found
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Get started by creating your first website.
                        </p>
                        <div className="mt-6">
                            <Button
                                onClick={() => setShowForm(true)}
                                variant="success"
                            >
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Add First Website
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Website
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        URL
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created At
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {websitesState.data.map((website) => (
                                    <tr
                                        key={website.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            #{website.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                                    <span className="text-sm font-medium text-green-600">
                                                        {website.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {website.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {getDomainFromUrl(
                                                            website.url,
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {isValidUrl(website.url) ? (
                                                <a
                                                    href={website.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 flex items-center"
                                                >
                                                    Visit Site
                                                    <ExternalLinkIcon className="ml-1 w-3 h-3" />
                                                </a>
                                            ) : (
                                                <span className="text-gray-500">
                                                    Invalid URL
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(website.created_at)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Websites;
