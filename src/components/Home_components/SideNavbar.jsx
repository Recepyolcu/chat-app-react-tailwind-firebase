import { useContext, useState } from 'react';
import { BiLogIn, BiHomeAlt2, BiChat } from 'react-icons/bi';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { AuthContext } from '../../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const anchorMobileClass = "flex items-center gap-4 p-4 py-6 border-b-[3px] border-neutral-700 hover:bg-neutral-700 hover:text-white duration-300 ease-out";

export default function SideNavbar() {
    const [ showMenu, setShowMenu ] = useState(false);
    const { currentUser } = useContext(AuthContext);
    return (
        <div className="max-sm:p-0 max-md:px-0 max-md:pb-0 flex gap-4 p-5 w-full justify-between bg-gray-300 border-b-[3px] border-neutral-800">
            <div className="max-sm:items-start max-lg:flex-col flex justify-between items-center gap-5 w-full">
                <div className="max-sm:w-full max-sm:flex-row max-sm:px-5 max-sm:py-5 max-lg:flex-col max-lg:gap-2 flex items-center gap-5">
                    <img className="w-12 h-12 rounded-full object-cover" src={currentUser.photoURL} alt="avatar" />
                    <span className="max-sm:text-2xl max-sm:ml-4 text-lg font-medium">{currentUser.displayName}</span>
                    <button onClick={() => setShowMenu(show => !show)} className="sm:hidden ml-auto">
                        <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    {showMenu &&
                        <nav className="bg-white absolute top-[83px] right-0 w-full">
                            <ul className="flex flex-col w-full">
                                {currentUser && <li className="w-full"><a className={anchorMobileClass} href="http://localhost:3000/Profile"><img className="w-10 h-10 rounded-full object-cover" src={currentUser.photoURL} alt="avatar" /> Profile </a></li>}
                                <li className="w-full"><a className={anchorMobileClass} href="http://localhost:3000/"><BiHomeAlt2 className="text-4xl" /> Home</a></li>
                                <li className="w-full"><a className={anchorMobileClass} href="http://localhost:3000/Rooms"><BiChat className="text-4xl" /> Rooms</a></li>
                                {!currentUser && <li className="w-full"><a className={anchorMobileClass} href="http://localhost:3000/Register"><AiOutlineUserAdd className="text-4xl" /> Sign up</a></li>}
                                {!currentUser && <li className="w-full"><a className={anchorMobileClass} href="http://localhost:3000/Login"><BiLogIn className="text-4xl" /> Sign in</a></li>}
                            </ul>
                        </nav>
                    }
                </div>
                <button onClick={() => signOut(auth)} className="max-sm:hidden max-md:rounded-none max-md:w-full max-md:border-b-0 max-md:border-x-0 max-md:border-t-[3px] font-medium px-3 py-1 border-2 border-neutral-800 hover:bg-neutral-800 hover:text-white duration-300 ease-out cursor-pointer rounded-lg">Log out</button>
            </div>
        </div>
    )
}