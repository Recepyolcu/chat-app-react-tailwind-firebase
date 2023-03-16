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
        <div>
        {(message.img || message.text !== '') && 
            <div ref={ref} className={message.senderId === currentUser.uid ? "w-10/12 ml-auto h-fit flex items-center gap-3 p-4 owner" : "w-10/12 flex items-end p-4 gap-3"}>
                <img className="w-10 h-10 rounded-full mb-2 object-cover" src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="msg-profile" />
                {message.text &&
                    <p className="text-lg px-3 bg-transparent border-[3px] border-neutral-800 rounded-lg owner-text-box">{message.text}</p>
                }
                {message.img && <img className="max-w-xl max-h-[300px] object-fill rounded-lg" src={message.img} alt="msg-img" />}
            </div>
        }
        </div>
    )
}