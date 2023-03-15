import { BiSend, BiImageAdd } from 'react-icons/bi';
import { ImAttachment } from 'react-icons/im';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc, } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

export default function Input() {
        const [ text, setText ] = useState("");
        const [ img, setImg ] = useState(null);
        const [ error, setError ] = useState('');
      
        const { currentUser } = useContext(AuthContext);
        const { data } = useContext(ChatContext);

        const metadata = {
            contentType: 'chatImages/jpeg'
        };
      
        const handleSend = async () => {
            if (img) {
                const storageRef = ref(storage, uuid());
                const uploadTask = uploadBytesResumable(storageRef, img, metadata);
                uploadTask.on((error) => { setError(error) },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                            id: uuid(),
                            text,
                            senderId: currentUser.uid,
                            date: Timestamp.now(),
                            img: downloadURL,
                            }),
                        });
                    });
                }
                );
            } else {
                await updateDoc(doc(db, "chats", data.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                    }),
                });
            }
        
            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [data.chatId + ".lastMessage"]: { text }, [data.chatId + ".date"]: serverTimestamp(),
            });
        
            await updateDoc(doc(db, "userChats", data.user.uid), {
                [data.chatId + ".lastMessage"]: { text }, [data.chatId + ".date"]: serverTimestamp(),
            });

            console.log();
        
            setText("");
            setImg(null);
        };

    return (
        <div className='w-full flex border-t-[3px] px-2 pr-4 items-center border-neutral-800'>
            {error && <span className='absolute bottom-5 text-red-500'>{error}</span>}
            <label className='flex w-full items-center' htmlFor="msg-input">
                <input onChange={(e) => setText(e.target.value)} value={text} className='bg-transparent outline-none w-full p-4' placeholder='message..' type="text" name="" id="msg-input" />
            </label>
            
            <input onChange={(e) => setImg(e.target.files[0])} className='hidden' type="file" id="img" />
            <label htmlFor="img">
                <BiImageAdd className='text-3xl text-neutral-500 hover:text-neutral-600 duration-300 ease-out'/>
            </label>
            
            <label htmlFor="send">
                <input className='hidden' type="submit" id="send" />
                <button onClick={handleSend} className='p-1'>
                    <BiSend className='text-3xl ml-2 hover:text-neutral-600 duration-300 ease-out' />
                </button>
            </label>
        </div>
    )
}