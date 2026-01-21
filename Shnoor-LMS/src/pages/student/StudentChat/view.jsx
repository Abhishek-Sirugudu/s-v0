import React from 'react';
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
                <div className="fixed top-24 right-6 min-w-[300px] z-50 bg-white border-l-4 border-blue-600 shadow-xl rounded-lg p-4 animate-slide-in">
                    <div className="flex items-start gap-4">
                        <div className="text-2xl pt-1">🔔</div>
                        <div className="flex-1">
                            <strong className="block text-slate-900 font-bold">{notification.sender}</strong>
                            <p className="text-slate-600 text-sm">{notification.message}</p>
                        </div>
                        <button
                            className="text-slate-400 hover:text-slate-600"
                            onClick={() => setNotification({ ...notification, visible: false })}
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            <div className={`flex flex-1 h-full overflow-hidden ${activeChat ? 'active-chat-mobile' : ''}`}>

                { }
                <div className={`w-full md:w-80 border-r border-slate-200 bg-slate-50 flex flex-col ${activeChat ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-4 border-b border-slate-200 bg-white">
                        <h2 className="text-xl font-bold text-slate-800">Messages</h2>
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
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
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
