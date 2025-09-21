interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    size = "md",
    loading = false,
    children,
    className = "",
    disabled,
    ...props
}) => {
    const baseClasses =
        "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary:
            "bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-500",
        success:
            "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
        warning:
            "bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    };

    return (
        <button
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            {children}
        </button>
    );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helpText?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    helpText,
    className = "",
    id,
    ...props
}) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className="space-y-1">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    error
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                } ${className}`}
                {...props}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            {helpText && !error && (
                <p className="text-sm text-gray-500">{helpText}</p>
            )}
        </div>
    );
};

interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helpText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
    label,
    error,
    helpText,
    className = "",
    id,
    ...props
}) => {
    const textareaId =
        id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className="space-y-1">
            {label && (
                <label
                    htmlFor={textareaId}
                    className="block text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
            <textarea
                id={textareaId}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    error
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                } ${className}`}
                {...props}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            {helpText && !error && (
                <p className="text-sm text-gray-500">{helpText}</p>
            )}
        </div>
    );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    helpText?: string;
    options: Array<{ value: string | number; label: string }>;
    placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
    label,
    error,
    helpText,
    options,
    placeholder,
    className = "",
    id,
    ...props
}) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className="space-y-1">
            {label && (
                <label
                    htmlFor={selectId}
                    className="block text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
            <select
                id={selectId}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    error
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                } ${className}`}
                {...props}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {helpText && !error && (
                <p className="text-sm text-gray-500">{helpText}</p>
            )}
        </div>
    );
};

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    subtitle?: string;
    actions?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = "",
    title,
    subtitle,
    actions,
}) => {
    return (
        <div
            className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}
        >
            {(title || subtitle || actions) && (
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            {title && (
                                <h3 className="text-lg font-medium text-gray-900">
                                    {title}
                                </h3>
                            )}
                            {subtitle && (
                                <p className="text-sm text-gray-500 mt-1">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                        {actions && (
                            <div className="flex items-center space-x-2">
                                {actions}
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className="px-6 py-4">{children}</div>
        </div>
    );
};

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = "md",
    className = "",
}) => {
    const sizes = {
        sm: "h-4 w-4",
        md: "h-8 w-8",
        lg: "h-12 w-12",
    };

    return (
        <div
            className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizes[size]} ${className}`}
        />
    );
};

interface AlertProps {
    type?: "success" | "error" | "warning" | "info";
    title?: string;
    message: string;
    onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
    type = "info",
    title,
    message,
    onClose,
}) => {
    const types = {
        success: "bg-green-50 text-green-800 border-green-200",
        error: "bg-red-50 text-red-800 border-red-200",
        warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
        info: "bg-blue-50 text-blue-800 border-blue-200",
    };

    return (
        <div className={`border rounded-md p-4 ${types[type]}`}>
            <div className="flex">
                <div className="flex-1">
                    {title && <h4 className="font-medium">{title}</h4>}
                    <p className={title ? "mt-1" : ""}>{message}</p>
                </div>
                {onClose && (
                    <button onClick={onClose} className="ml-4 hover:opacity-75">
                        <span className="sr-only">Close</span>
                        <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};
