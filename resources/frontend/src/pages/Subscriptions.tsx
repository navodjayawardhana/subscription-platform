import React, { useEffect, useState } from "react";
import { Card, Button, Select, Alert, LoadingSpinner } from "../components/ui";
import { useAsyncState } from "../hooks/common.hooks";
import { SubscriptionService } from "../services/subscription.service";
import { UserService } from "../services/user.service";
import { WebsiteService } from "../services/website.service";
import { PlusIcon } from "../components/icons";
import type {
    CreateSubscriptionRequest,
    User,
    Website,
} from "../handler/types";

const Subscriptions: React.FC = () => {
    const usersState = useAsyncState<User[]>([]);
    const websitesState = useAsyncState<Website[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<CreateSubscriptionRequest>({
        subscriber_id: "",
        website_id: "",
    });
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        usersState.setLoading("loading");
        websitesState.setLoading("loading");

        try {
            const [users, websites] = await Promise.all([
                UserService.getAllSubscribers(),
                WebsiteService.getAllWebsites(),
            ]);

            usersState.setData(users);
            usersState.setLoading("success");
            websitesState.setData(websites);
            websitesState.setLoading("success");
        } catch (error) {
            console.error("Error fetching data:", error);
            usersState.setError("Failed to load data");
            websitesState.setError("Failed to load data");
            usersState.setLoading("error");
            websitesState.setLoading("error");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors =
            SubscriptionService.validateSubscriptionData(formData);
        if (validationErrors.length > 0) {
            setFormErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        setFormErrors([]);
        setSuccessMessage(null);

        try {
            await SubscriptionService.createSubscription(formData);

            setFormData({ subscriber_id: "", website_id: "" });
            setShowForm(false);
            setSuccessMessage("Subscription created successfully!");

            setTimeout(() => setSuccessMessage(null), 5000);
        } catch (error) {
            console.error("Error creating subscription:", error);
            setFormErrors(["Failed to create subscription. Please try again."]);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSelectChange =
        (field: keyof CreateSubscriptionRequest) =>
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setFormData({ ...formData, [field]: e.target.value });
            if (formErrors.length > 0) setFormErrors([]);
        };

    const getSelectedUser = () => {
        return usersState.data.find(
            (user) => user.id === formData.subscriber_id,
        );
    };

    const getSelectedWebsite = () => {
        return websitesState.data.find(
            (website) => website.id === formData.website_id,
        );
    };

    const userOptions = usersState.data.map((user) => ({
        value: user.id.toString(),
        label: user.email,
    }));

    const websiteOptions = websitesState.data.map((website) => ({
        value: website.id.toString(),
        label: website.name,
    }));

    const isDataLoading =
        usersState.loading === "loading" || websitesState.loading === "loading";
    const hasRequiredData =
        usersState.data.length > 0 && websitesState.data.length > 0;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Subscriptions Management
                    </h1>
                </div>
                <div className="flex space-x-3">
                    <Button
                        onClick={() => setShowForm(true)}
                        variant="warning"
                        disabled={!hasRequiredData}
                        className="flex items-center"
                    >
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Create Subscription
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

            {!hasRequiredData && !isDataLoading && (
                <Alert
                    type="warning"
                    title="Missing Prerequisites"
                    message={`You need both users and websites to create subscriptions. Currently you have ${usersState.data.length} users and ${websitesState.data.length} websites.`}
                />
            )}

            {showForm && (
                <Card
                    title="Create New Subscription"
                    subtitle="Link a user to a website for content updates"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {formErrors.length > 0 && (
                            <Alert
                                type="error"
                                title="Validation Error"
                                message={formErrors.join(", ")}
                            />
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <Select
                                    label="Select User"
                                    value={
                                        formData.subscriber_id
                                            ? formData.subscriber_id.toString()
                                            : ""
                                    }
                                    onChange={handleSelectChange(
                                        "subscriber_id",
                                    )}
                                    options={userOptions}
                                    placeholder="Choose a user"
                                    required
                                />

                                <Select
                                    label="Select Website"
                                    value={
                                        formData.website_id
                                            ? formData.website_id.toString()
                                            : ""
                                    }
                                    onChange={handleSelectChange("website_id")}
                                    options={websiteOptions}
                                    placeholder="Choose a website"
                                    required
                                />
                            </div>

                            <div className="space-y-6">
                                {getSelectedUser() && (
                                    <Card title="Selected User">
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <span className="text-sm font-medium text-blue-600">
                                                        {getSelectedUser()
                                                            ?.email.charAt(0)
                                                            .toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {
                                                            getSelectedUser()
                                                                ?.email
                                                        }
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {
                                                            getSelectedUser()
                                                                ?.email
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                )}

                                {getSelectedWebsite() && (
                                    <Card title="Selected Website">
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                                    <span className="text-sm font-medium text-green-600">
                                                        {getSelectedWebsite()
                                                            ?.name.charAt(0)
                                                            .toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {
                                                            getSelectedWebsite()
                                                                ?.name
                                                        }
                                                    </div>
                                                    <div className="text-sm text-gray-500 truncate">
                                                        {
                                                            getSelectedWebsite()
                                                                ?.url
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                            <Button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setFormData({
                                        subscriber_id: "",
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
                                variant="warning"
                                loading={isSubmitting}
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? "Creating..."
                                    : "Create Subscription"}
                            </Button>
                        </div>
                    </form>
                </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card
                    title="Available Users"
                    subtitle={`${usersState.data.length} users available`}
                >
                    {usersState.loading === "loading" ? (
                        <div className="flex justify-center py-4">
                            <LoadingSpinner />
                        </div>
                    ) : usersState.data.length === 0 ? (
                        <div className="text-center py-6">
                            <p className="text-gray-500 mb-2">
                                No users available.
                            </p>
                            <p className="text-sm text-gray-400">
                                Create users first in the Users section.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {usersState.data.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                                >
                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span className="text-sm font-medium text-blue-600">
                                            {user.email.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="ml-3 flex-1 min-w-0">
                                        <div className="text-sm font-medium text-gray-900 truncate">
                                            {user.email}
                                        </div>
                                        <div className="text-sm text-gray-500 truncate">
                                            {user.email}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
                            <p className="text-gray-500 mb-2">
                                No websites available.
                            </p>
                            <p className="text-sm text-gray-400">
                                Create websites first in the Websites section.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {websitesState.data.map((website) => (
                                <div
                                    key={website.id}
                                    className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                                >
                                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                        <span className="text-sm font-medium text-green-600">
                                            {website.name
                                                .charAt(0)
                                                .toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="ml-3 flex-1 min-w-0">
                                        <div className="text-sm font-medium text-gray-900 truncate">
                                            {website.name}
                                        </div>
                                        <div className="text-sm text-gray-500 truncate">
                                            {website.url}
                                        </div>
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

export default Subscriptions;
