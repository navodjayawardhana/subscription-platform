import React, { useEffect, useState } from "react";
import { Card, Button, Input, Alert, LoadingSpinner } from "../components/ui";
import { useAsyncState } from "../hooks/common.hooks";
import { UserService } from "../services/user.service";
import { PlusIcon } from "../components/icons";
import type { CreateUserRequest, User } from "../handler/types";

const Users: React.FC = () => {
    const usersState = useAsyncState<User[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<CreateUserRequest>({
        name: "",
        email: "",
    });
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        usersState.setLoading("loading");
        usersState.setError(null);

        try {
            const response = await UserService.getAllSubscribers();
            usersState.setData(response);
            usersState.setLoading("success");
        } catch (error) {
            console.error("Error fetching users:", error);
            usersState.setError("Failed to load users");
            usersState.setLoading("error");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = UserService.validateUserData(formData);
        if (validationErrors.length > 0) {
            setFormErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        setFormErrors([]);
        setSuccessMessage(null);

        try {
            await UserService.createUserSubscriber(formData);
            await fetchUsers();

            setFormData({ name: "", email: "" });
            setShowForm(false);
            setSuccessMessage("User created successfully!");

            setTimeout(() => setSuccessMessage(null), 5000);
        } catch (error) {
            console.error("Error creating user:", error);
            setFormErrors(["Failed to create user. Please try again."]);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange =
        (field: keyof CreateUserRequest) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
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

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Users Management
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Manage user subscribers and their information
                    </p>
                </div>
                <div className="flex space-x-3">
                    <Button
                        onClick={() => setShowForm(true)}
                        className="flex items-center"
                    >
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Add New User
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
                    title="Create New User"
                    subtitle="Add a new user subscriber to the system"
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
                                label="Full Name"
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange("name")}
                                placeholder="Enter user's full name"
                                required
                                helpText="This will be displayed as the user's display name"
                            />

                            <Input
                                label="Email Address"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange("email")}
                                placeholder="user@example.com"
                                required
                                helpText="Must be a valid email address"
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setFormData({ name: "", email: "" });
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
                                {isSubmitting ? "Creating..." : "Create User"}
                            </Button>
                        </div>
                    </form>
                </Card>
            )}

            <Card
                title="All Users"
                subtitle={`${usersState.data.length} user${usersState.data.length !== 1 ? "s" : ""} registered`}
            >
                {usersState.loading === "loading" ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <LoadingSpinner size="lg" />
                        <p className="mt-4 text-gray-500">Loading users...</p>
                    </div>
                ) : usersState.error ? (
                    <div className="text-center py-12">
                        <Alert type="error" message={usersState.error} />
                        <Button onClick={fetchUsers} className="mt-4">
                            Try Again
                        </Button>
                    </div>
                ) : usersState.data.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                            <PlusIcon className="h-6 w-6 text-gray-400" />
                        </div>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                            No users found
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Get started by creating your first user subscriber.
                        </p>
                        <div className="mt-6">
                            <Button onClick={() => setShowForm(true)}>
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Add First User
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
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Create_at
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {usersState.data.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            #{user.id}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <a
                                                href={`mailto:${user.email}`}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                {user.email}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(user.created_at)}
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

export default Users;
