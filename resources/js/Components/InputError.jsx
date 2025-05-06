export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'text-error-500 text-xs ' + className}
        >
            {message}
        </p>
    ) : null;
}
