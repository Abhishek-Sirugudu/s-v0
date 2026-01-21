import React from 'react';

const ChatList = ({ chats, activeChat, onSelectChat, currentUser }) => {
    return (
        <div className="flex flex-col h-full bg-slate-50">
            <div className="p-4 border-b border-slate-200">
                <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* Groups Section */}
                <div className="pt-4 px-3 pb-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Course Groups</h4>
                    <div className="space-y-1">
                        {['React Basics Group', 'Advanced JS Squad', 'UI/UX Design Team'].map((group, idx) => (
                            <div
                                key={`group-${idx}`}
                                className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all ${activeChat?.id === `group_${idx}`
                                        ? 'bg-white shadow-sm ring-1 ring-slate-200'
                                        : 'hover:bg-slate-100'
                                    }`}
                                onClick={() => onSelectChat({ id: `group_${idx}`, recipientName: group, isGroup: true, messages: [] })}
                            >
                                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-lg shrink-0">
                                    {group.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-slate-800 text-sm truncate">{group}</div>
                                    <div className="text-xs text-slate-500 truncate">Tap to chat with peers</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Direct Messages Section */}
                <div className="pt-2 px-3 pb-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Direct Messages</h4>
                    <div className="space-y-1">
                        {chats.map((chat) => {
                            const otherParticipant = chat.participants.find(p => p !== currentUser.uid);
                            const displayName = chat.recipientName || otherParticipant;

                            return (
                                <div
                                    key={chat.id}
                                    className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all relative ${activeChat?.id === chat.id
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'bg-white/50 hover:bg-white hover:shadow-sm'
                                        }`}
                                    onClick={() => onSelectChat(chat)}
                                >
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${displayName}&background=${activeChat?.id === chat.id ? 'fff' : '0D8ABC'}&color=${activeChat?.id === chat.id ? '0D8ABC' : 'fff'}`}
                                        alt={displayName}
                                        className="w-10 h-10 rounded-full object-cover shrink-0 border border-white/20"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className={`font-bold text-sm truncate ${activeChat?.id === chat.id ? 'text-white' : 'text-slate-800'}`}>
                                            {displayName}
                                        </div>
                                        <div className={`text-xs truncate ${activeChat?.id === chat.id ? 'text-blue-100' : 'text-slate-500'}`}>
                                            {chat.lastMessage}
                                        </div>
                                    </div>
                                    {chat.unreadCount > 0 && (
                                        <div className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-sm">
                                            {chat.unreadCount}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatList;
