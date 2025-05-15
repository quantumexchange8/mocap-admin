import { forwardRef, useEffect, useRef } from 'react';
import { XIcon } from './Icon/Outline';

export default forwardRef(function SearchInput({ type = 'text', className = '', isFocused = false, IconComponent = null, dataValue = '', clearfunc = null, hasError, placeholder, withIcon = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused || hasError) {
            input.current.focus();
        }
    }, [isFocused, hasError]); // 添加 hasError 作为依赖

    return (
        <div className="relative w-full">
            {withIcon && IconComponent && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <IconComponent className="w-4 h-4" />
                </div>
            )}
            <input
                {...props}
                type={type}
                className={
                    `bg-white hover:bg-white disabled:bg-gray-100 border hover:border-gray-400 py-2 px-4 text-gray-950 text-sm rounded-sm caret-gray-950 placeholder-gray-500 placeholder:text-sm max-w-[200px]
                    ${withIcon ? 'pl-11 pr-4 ' : ''}
                    ${hasError ? 'border border-error-500 focus:ring-0 focus:outline-none focus:border-error-500 w-full ' : ' border-gray-300 focus:border-gray-950 '}` +
                    className
                }
                ref={input}
                placeholder={placeholder}
            />
            { dataValue && clearfunc }
        </div>
    );
});
