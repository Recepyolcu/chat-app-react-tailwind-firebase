import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";


export default function Message({ message }) {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);
    return (
        <div className={message.senderId === currentUser.uid ? "w-full flex items-end gap-3 owner" : "w-full flex items-end gap-3"}>
            <img className="w-10 h-10 rounded-full mb-2 object-cover" src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="msg-profile" />
            <div className="w-fit flex flex-col items-end">
                {message.img && <img className="w-2/3 max-w-xl rounded-lg" src={message.img} alt="msg-img" />}
                <div className="flex flex-col mt-3 gap-4 px-3 bg-transparent border-[3px] border-neutral-800 rounded-lg owner-text-box">
                    <p className="text-lg">{message.text}</p>
                </div>
                <div className="flex owner">
                    <span className="text-sm text-neutral-600"></span>
                </div>
            </div>
        </div>
    )
}