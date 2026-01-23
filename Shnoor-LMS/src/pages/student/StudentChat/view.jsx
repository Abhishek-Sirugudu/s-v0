import React from 'react';
import { Bell, X, MessageSquare } from 'lucide-react';
import ChatList from '../../../components/chat/ChatList';
import ChatWindow from '../../../components/chat/ChatWindow';

const StudentChatView = ({
    notification, setNotification,
    chats, activeChat,
    handleSelectChat, currentUser,
    handleSendMessage, setActiveChat
}) => {
    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {notification && notification.visible && (
                <div className="fixed top-24 right-6 min-w-[300px] z-50 bg-white border-l-4 border-indigo-600 shadow-xl rounded-lg p-4 animate-slide-in">
                    <div className="flex items-start gap-4">
                        <div className="pt-1 text-indigo-600"><Bell size={24} /></div>
                        <div className="flex-1">
                            <strong className="block text-primary-900 font-bold">{notification.sender}</strong>
                            <p className="text-slate-600 text-sm">{notification.message}</p>
                        </div>
                        <button
                            className="text-slate-400 hover:text-slate-600"
                            onClick={() => setNotification({ ...notification, visible: false })}
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>
            )}

            <div className={`flex flex-1 h-full overflow-hidden ${activeChat ? 'active-chat-mobile' : ''}`}>

                { }
                <div className={`w-full md:w-80 border-r border-slate-200 bg-slate-50 flex flex-col ${activeChat ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-4 border-b border-slate-200 bg-white">
                        <h2 className="text-xl font-bold text-primary-900">Messages</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <ChatList
                            chats={chats}
                            activeChat={activeChat}
                            onSelectChat={handleSelectChat}
                            currentUser={currentUser}
                        />
                    </div>
                </div>

                { }
                <div className={`flex-1 flex flex-col bg-white ${!activeChat ? 'hidden md:flex' : 'flex'}`}>
                    {activeChat ? (
                        <ChatWindow
                            activeChat={activeChat}
                            currentUser={currentUser}
                            onSendMessage={handleSendMessage}
                            onBack={() => setActiveChat(null)}
                        />
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8">
                            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                                <MessageSquare className="text-slate-300 w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-700 mb-2">No Chat Selected</h3>
                            <p>Select a student from the list to start messaging.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentChatView;
