import Sidebar from "../components/Home_components/Sidebar"
import Chat from "../components/Home_components/Chat"
import { useContext } from "react"
import { OpenChatContext } from "../context/OpenChatContext";
import { WindowSizeContext } from "../context/WindowSizeContext";

export default function Home() {
    const { openChat } = useContext(OpenChatContext);
    const { isSm } = useContext(WindowSizeContext);

    return (
        <div className="max-sm:border-none max-sm:m-0 max-sm:h-full max-sm:w-full max-2xl:w-11/12 max-md:w-full max-md:rounded-none max-md:mx-2 mt-20 flex w-9/12 h-5/6 border-[3px] border-neutral-800 bg-gray-100 rounded-2xl overflow-hidden">
            {!openChat &&
                <Sidebar />
            }
            {(openChat || !isSm) &&
                <Chat />
            }
        </div>
    )
}

