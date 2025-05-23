import {
    CloseButton,
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { XIcon } from './Icon/Outline';

export default function Modal({
    children,
    show = false,
    maxWidth = 'lg',
    closeable = true,
    onClose = () => {},
    title,
    footer,
    showFooter,
}) {
    const close = () => {
        if (!closeable) {
            return;
        }
        onClose();
    };

    const maxWidthClass = {
        sm: 'w-[400px]',
        md: 'w-[600px]',
        lg: 'w-[700px] lg:w-[800px]',
    }[maxWidth];

    const maxHeightClass = {
        sm: 'max-h-[70vh]',
        md: 'max-h-[80vh]',
        lg: 'max-h-[90vh]',
    }[maxWidth];

    return (
        <Transition show={show} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 z-50 flex items-center justify-center transform overflow-y-auto px-4 py-6 transition-all sm:px-0"
                onClose={() => {}}
                static
            >
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-gray-500/75" />
                </TransitionChild>

                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <DialogPanel
                        className={`flex flex-col transform overflow-hidden rounded shadow-dialog bg-white transition-all sm:mx-auto sm:w-full ${maxWidthClass} ${maxHeightClass}`}
                    >
                        <DialogTitle className='w-full flex justify-between items-center py-4 px-6'>
                            <div>{title}</div>
                            <CloseButton onClick={close}>
                                <XIcon />
                            </CloseButton>
                        </DialogTitle>
                        <div className="flex-1 overflow-y-auto">
                            {children}
                        </div>
                        <div className={`"w-full p-6 bg-white " ${showFooter}`}>
                            {footer}
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
}
