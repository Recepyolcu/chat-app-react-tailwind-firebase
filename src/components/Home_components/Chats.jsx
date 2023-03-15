import { data } from "autoprefixer";
import { onSnapshot, doc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";

export default function Chats() {
    const [ chats, setChats ] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
                setChats(doc.data());
            });
            return () => unsub();
        }
        currentUser.uid && getChats();
    }, [currentUser.uid]);
    
    const handleSelect = (user) => {
        dispatch({type: 'CHANGE_USER', payload: user});
    }

    return (
        <div className="flex flex-col">
            {true && Object.entries(chats).map((chat) => (
                <div key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)} className="flex items-center gap-3 px-3 py-4 border-b-2 cursor-pointer w-full hover:bg-gray-200 duration-300 ease-out">
                    <img className="w-12 h-12 rounded-full object-cover" src={chat[1].userInfo.photoURL} alt="user" />
                    <div className="flex flex-col">
                        <span className="font-semibold text-lg">{chat[1].userInfo.displayName}</span>
                        <p>{chat[1].lastMessage?.text}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}