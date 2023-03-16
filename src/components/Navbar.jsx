import { useContext, useEffect, useState } from "react"
import { BiLogIn, BiHomeAlt2, BiChat } from 'react-icons/bi';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { AuthContext } from "../context/AuthContext";
import { WindowSizeContext } from "../context/WindowSizeContext";
import { OpenChatContext } from "../context/OpenChatContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const anchorMobileClass = "w-full flex items-center gap-4 p-4 py-6 border-b-[3px] border-neutral-700 hover:bg-neutral-700 hover:text-white duration-300 ease-out";

export default function Navbar() {
    const [ showMenu, setShowMenu ] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const { isSm, isMd } = useContext(WindowSizeContext);
    const { openChat, handleOpenChat } = useContext(OpenChatContext);

    useEffect(() => {
        if(!isMd) setShowMenu(false);
    }, [isMd]);

    function handleMenu() {
        setShowMenu(show => !show);
    }

    return (
        <header className="max-md:px-5 w-full fixed z-30 top-0 flex justify-between items-center gap-6 p-4 px-20 bg-gray-200">
            <h1 className="text-2xl font-semibold text-orange-600"><a href="/">Chatting</a></h1>
            <nav className="max-md:hidden">
                <ul className="flex gap-6 items-center">
                    <li><a className="flex gap-2 hover:underline" href="http://localhost:3000/"><BiHomeAlt2 className="text-2xl" /> Home</a></li>
                    <li><a className="flex gap-2 hover:underline" href="http://localhost:3000/Rooms"><BiChat className="text-2xl" /> Rooms</a></li>
                    {!currentUser && <li><a className="flex gap-2 hover:underline px-3 py-1 border-[3px] border-orange-600 text-orange-600 bg-white rounded-xl" href="http://localhost:3000/Register"><AiOutlineUserAdd className="text-2xl" /> Sign up</a></li>}
                    {!currentUser && <li><a className="flex gap-2 hover:underline px-3 py-1 border-[3px] border-orange-300 text-orange-400 bg-white rounded-xl" href="http://localhost:3000/Login"><BiLogIn className="text-2xl" /> Sign in</a></li>}
                    {currentUser && <li><a href="http://localhost:3000/Profile"><img className="w-12 h-12 rounded-full object-cover" src={currentUser.photoURL} alt="" /> </a></li>}
                </ul>
            </nav>
            <button onClick={handleMenu} className="md:hidden">
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            {showMenu &&
                <nav className="bg-white absolute top-[60px] right-0 w-full">
                    <ul className="flex flex-col w-full">
                        {currentUser && <li className="w-full"><a className={anchorMobileClass} href="/Profile"><img className="w-10 h-10 rounded-full object-cover" src={currentUser.photoURL} alt="avatar" /> Profile </a></li>}
                        {openChat && <li className="w-full"><button onClick={e => handleOpenChat()} className={anchorMobileClass} ><BiChat className="text-4xl" /> Chats</button></li>}
                        {!currentUser && <li className="w-full"><a className={anchorMobileClass} href="http://localhost:3000/Register"><AiOutlineUserAdd className="text-4xl" /> Sign up</a></li>}
                        {!currentUser && <li className="w-full"><a className={anchorMobileClass} href="http://localhost:3000/Login"><BiLogIn className="text-4xl" /> Sign in</a></li>}
                        {(isSm && currentUser) && <li className="w-full"><button className={anchorMobileClass} onClick={() => signOut(auth)}><BiLogIn className="text-4xl" /> Log out</button></li>}
                    </ul>
                </nav>
            }
        </header>
    )
}