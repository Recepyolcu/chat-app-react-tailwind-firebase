import { useContext } from 'react';
import { AiOutlineVideoCamera, AiOutlineUserAdd } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { BiLeftArrow } from 'react-icons/bi';
import { ChatContext } from '../../context/ChatContext';
import { OpenChatContext } from '../../context/OpenChatContext';
import Input from './Input';
import Messages from './Messages';

export default function Chat() {
    const { data } = useContext(ChatContext);
    const { openChat, handleOpenChat } = useContext(OpenChatContext);
    
    return (
        <div className={openChat ? "max-sm:mt-[60px] w-full sm:flex-grow flex flex-col justify-between" : "max-sm:mt-[60px] sm:flex-grow flex flex-col justify-between"}>
            <div className="p-5 w-full flex items-center justify-between bg-gray-300 border-b-[3px] border-neutral-800">
                <button onClick={e => handleOpenChat()} className='sm:hidden p-2 hover:text-orange-600 duration-300 ease-out rounded-full'><BiLeftArrow className='text-3xl' /></button>
                <div className='flex items-center gap-5'>
                    {data.user?.photoURL && <img className='w-12 h-12 rounded-full object-cover' src={data.user?.photoURL} alt="" />}
                    <span className='text-xl font-semibold'>{data.user?.displayName}</span>
                </div>
                <div className='flex gap-4 text-3xl'>
                    <AiOutlineVideoCamera />
                    <AiOutlineUserAdd />
                    <BsThreeDots />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}