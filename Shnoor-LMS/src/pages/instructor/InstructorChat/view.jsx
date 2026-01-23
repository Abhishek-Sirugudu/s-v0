import React from 'react';
import ChatList from '../../../components/chat/ChatList';
import ChatWindow from '../../../components/chat/ChatWindow';
import { MessageSquare } from 'lucide-react';

const InstructorChatView = ({
    notification, setNotification,
    chats, activeChat,
    handleSelectChat, currentUser,
    handleSendMessage, setActiveChat
}) => {
    return (
        <div className="h-[calc(100vh-64px)] bg-[#f8fafc] flex overflow-hidden font-sans border-t border-slate-200">
            {/* Notification Toast */}
            {notification && notification.visible && (
                <div className="absolute top-4 right-6 z-50 bg-white border-l-4 border-indigo-600 shadow-xl rounded-md p-4 animate-fade-in-down min-w-[320px]">
                    <div className="flex items-start gap-4">
                        <div className="text-xl">🔔</div>
                        <div className="flex-1">
                            <strong className="block text-primary-900 font-bold text-sm">{notification.sender}</strong>
                            <p className="text-slate-600 text-xs mt-1">{notification.message}</p>
                        </div>
                        <button
                            className="text-slate-400 hover:text-slate-600 transition-colors"
                            onClick={() => setNotification({ ...notification, visible: false })}
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            {/* Sidebar (Chat List) */}
            <div className={`w-full md:w-80 bg-white border-r border-slate-200 flex flex-col shrink-0 transition-transform ${activeChat ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h2 className="text-sm font-bold text-primary-900 uppercase tracking-wide">Messages</h2>
                    <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{chats.length}</span>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <ChatList
                        chats={chats}
                        activeChat={activeChat}
                        onSelectChat={handleSelectChat}
                        currentUser={currentUser}
                    />
                </div>
            </div>

            {/* Main Chat Area */}
            <div className={`flex-1 flex flex-col bg-[#f8fafc] ${!activeChat ? 'hidden md:flex' : 'flex'} relative`}>
                {activeChat ? (
                    <ChatWindow
                        activeChat={activeChat}
                        currentUser={currentUser}
                        onSendMessage={handleSendMessage}
                        onBack={() => setActiveChat(null)}
                    />
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <MessageSquare className="w-10 h-10 text-slate-300" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-600 mb-1">Select a Conversation</h3>
                        <p className="text-sm text-slate-400">Choose a student from the sidebar to start chatting.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InstructorChatView;
