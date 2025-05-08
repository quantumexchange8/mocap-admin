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
                `bg-white hover:bg-white disabled:bg-gray-100 border hover:border-gray-400 focus:border-gray-950 py-3 px-4 text-gray-950 text-sm rounded-sm caret-gray-950 placeholder-gray-500 placeholder:text-sm
                ${withIcon ? 'pl-11 pr-4' : ''}
                ${hasError ? 'border border-error-500 focus:ring-0 focus:outline-none' : ' border-gray-300 '}` +
                className
            }
            ref={input}
            placeholder={placeholder}
        />
    );
});
