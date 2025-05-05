export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'w-6 h-6 flex-shrink-0 rounded-sm border-gray-300 hover:border-gray-400 disabled:bg-gray-100 text-gray-950 focus:bg-gray-950' +
                className
            }
        />
    );
}
