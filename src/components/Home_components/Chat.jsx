import { useContext } from 'react';
import { AiOutlineVideoCamera, AiOutlineUserAdd } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { ChatContext } from '../../context/ChatContext';
import Input from './Input';
import Messages from './Messages';

export default function Chat() {
    const { data } = useContext(ChatContext);
    
    return (
        <div className="max-sm:hidden flex-grow flex flex-col justify-between">
            <div className="p-5 w-full flex items-center justify-between bg-gray-300 border-b-[3px] border-neutral-800">
                <span>{data.user?.displayName}</span>
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