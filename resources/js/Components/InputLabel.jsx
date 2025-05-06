export default function InputLabel({
    value,
    className = '',
    children,
    hasError,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-sm font-normal ${hasError ? 'text-error-500' : 'text-gray-700'} ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
