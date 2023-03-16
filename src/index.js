import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import { OpenChatContextProvider } from './context/OpenChatContext';
import { WindowSizeContextProvider } from './context/WindowSizeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <WindowSizeContextProvider>
        <AuthContextProvider>
            <ChatContextProvider>
            <div className='flex flex-col h-screen'>
                    <OpenChatContextProvider>
                        <Navbar />
                        <div className='w-full h-full flex justify-center items-center'>
                                <App />
                        </div>
                    </OpenChatContextProvider>
                <Footer />
            </div>
            </ChatContextProvider>
        </AuthContextProvider>
    </WindowSizeContextProvider>
);
