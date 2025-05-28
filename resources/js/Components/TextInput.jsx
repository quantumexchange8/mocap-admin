import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, hasError, placeholder, withIcon = false, prefix = null, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused || hasError) {
            input.current.focus();
        }
    }, [isFocused, hasError]); // 添加 hasError 作为依赖

    return (
        <div className="relative w-full">
            {prefix && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    {prefix}
                </span>
            )}
            <input
                {...props}
                type={type}
                className={
                    `bg-white hover:bg-white disabled:bg-gray-100 border py-3 px-4 text-gray-950 text-sm rounded-sm caret-gray-950 placeholder-gray-500 placeholder:text-sm w-full
                    ${withIcon ? 'pl-11 pr-4' : ''}
                    ${prefix ? 'pl-10' : ''}
                    ${hasError ? 'border-error-500 focus:border-error-500' : 'border-gray-300 focus:border-gray-950 '}` +
                    className
                }
                ref={input}
                placeholder={placeholder}
            />
        </div>
    );
});
