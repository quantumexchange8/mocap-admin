import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, hasError, placeholder, withIcon = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                `bg-white hover:bg-white disabled:bg-gray-100 border border-gray-300 hover:border-gray-400 focus:border-gray-950 py-4 px-3 text-gray-950 text-sm leading-5 rounded-sm
                ${withIcon ? 'pl-11 pr-4' : ''}
                ${hasError ? 'border border-error-500 focus:ring-0 focus:outline-none' : 'focus:border-primary-50 focus:ring-[#EDF8FF] hover:border-gray-200 '}` +
                className
            }
            ref={input}
            placeholder={placeholder}
        />
    );
});
