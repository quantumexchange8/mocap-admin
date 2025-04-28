import { Sidebar } from "./Icon/Outline";

export default function Navbar({ header }){
    return (
        <nav className={`sticky top-0 z-10 ease-in duration-500 w-full bg-white md:shadow-navbar py-2 px-3`}>
            <div className='flex items-center gap-6'>
                <div className='p-2.5 cursor-pointer hover:bg-neutral-200 rounded-xl'>
                    <Sidebar />
                </div>
                <div className='text-gray-950 text-lg font-semibold'>
                    {header}
                </div>
            </div>
        </nav>

    )
}