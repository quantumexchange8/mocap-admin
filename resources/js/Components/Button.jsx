export default ({
    type = 'submit',
    className = '',
    processing,
    children,
    href,
    target,
    external,
    variant = 'primary',
    size = 'base',
    iconOnly,
    squared = false,
    pill = false,
    srText,
    onClick,
    disabled,

}) => {
    const baseClasses = `inline-flex items-center transition-colors font-bold text-center select-none disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none`

    let variantClasses = ``

    switch (variant) {
        case 'secondary':
            variantClasses = `bg-gray-100 border-gray-100 text-gray-950 hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400 rounded-sm`
            break
        case 'outlined':
            variantClasses = `bg-white border border-gray-300 text-gray-950 shadow-sm hover:bg-gray-50 disabled:bg-white disabled:text-gray-400 rounded-sm`
            break
        case 'text':
            variantClasses = `text-gray-950 hover:bg-gray-50 disabled:text-gray-400 rounded-sm`
            break
        case 'success':
            variantClasses = `bg-success-600 text-white hover:bg-success-700 disabled:bg-gray-100 disabled:text-gray-400 rounded-sm`
            break
        case 'text-success':
            variantClasses = `text-success-600 hover:bg-success-50 disabled:text-gray-400 rounded-sm`
            break
        case 'danger':
            variantClasses = `bg-error-700 text-white hover:bg-error-800 disabled:bg-gray-100 disabled:text-gray-400 rounded-sm`
            break
        case 'outlined-danger':
            variantClasses = `border-error-700 text-error-700 hover:bg-error-50 disabled:border-gray-300 disabled:text-gray-300 rounded-sm`
            break
        case 'text-danger':
            variantClasses = `text-error-700 hover:bg-error-50 disabled:text-gray-400 rounded-sm`
            break
        default:
            variantClasses = `bg-gray-950 text-white text-sm hover:bg-gray-800 disabled:text-gray-400 disabled:bg-gray-600 rounded-sm`
    }

    const sizeClasses = `${
        size == 'sm' ? (iconOnly ? 'p-4' : 'px-4 py-2 text-sm font-normal h-[38px]') : ''
    }${
        size == 'md' ? (iconOnly ? 'p-4' : 'px-4 py-3 text-sm font-normal h-[46px]') : ''
    }${
        size == 'lg' ? (iconOnly ? 'p-4' : 'px-6 py-4 text-sm font-normal h-[54px]') : ''
    }`

    const roundedClasses = `${!squared && !pill ? 'rounded-sm' : ''} ${
        pill ? 'rounded-full' : ''
    }`

    if (href) {
        const Tag = external ? 'a' : Link

        return (
            <Tag
                target={target}
                href={href}
                className={`${baseClasses} ${sizeClasses} ${variantClasses} ${roundedClasses} ${className} ${
                    processing ? 'pointer-events-none opacity-50' : ''
                }`}
                disabled={disabled}
            >
                {children}
                {iconOnly && <span className="sr-only">{srText ?? ''}</span>}
            </Tag>
        )
    }

    return (
        <button
            type={type}
            className={`${baseClasses} ${sizeClasses} ${variantClasses} ${roundedClasses} ${className}`}
            disabled={processing || disabled}
            onClick={onClick}
        >
            {children}
            {iconOnly && <span className="sr-only">{srText ?? ''}</span>}
        </button>
    )    
}