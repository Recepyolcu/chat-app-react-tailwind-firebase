import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <ChatContextProvider>
        <div className='flex flex-col h-screen'>
            <Navbar />
            <div className='w-full h-full flex justify-center items-center'>
                <App />
            </div>
            <Footer />
        </div>
        </ChatContextProvider>
    </AuthContextProvider>
);
