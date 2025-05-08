export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                ' w-4 h-4 rounded-sm border-gray-300 hover:border-gray-400 disabled:bg-gray-100 text-gray-950 focus:outline-none focus:ring-0 focus-visible:ring-0 ' +
                className
            }
        />
    );
}
