import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaArrowLeft, FaSmile, FaPaperclip, FaTimes, FaFileAlt, FaVideo, FaImage } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';

const ChatWindow = ({ activeChat, currentUser, onSendMessage, onBack }) => {
    const [newMessage, setNewMessage] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [activeChat?.messages?.length, activeChat?.id]);

    const handleFileSelect = (e) => {
        if (e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const onEmojiClick = (emojiObject) => {
        setNewMessage(prev => prev + emojiObject.emoji);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newMessage.trim() && !selectedFile) return;

        setIsUploading(true);

        try {
            await onSendMessage(newMessage, selectedFile);
            setNewMessage('');
            setSelectedFile(null);
            setShowEmoji(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (error) {
            console.error("Failed to send message", error);
        } finally {
            setIsUploading(false);
        }
    };

    const renderAttachment = (msg) => {
        if (!msg.attachment_url) return null;

        const type = msg.attachment_type || 'file';

        if (type === 'image') {
            return (
                <img
                    src={msg.attachment_url}
                    alt="attachment"
                    className="max-w-full max-h-[300px] rounded-lg mb-2 cursor-pointer hover:opacity-95 transition-opacity"
                    onClick={() => window.open(msg.attachment_url, '_blank')}
                />
            );
        }
        if (type === 'video') {
            return (
                <video controls className="max-w-full max-h-[300px] rounded-lg mb-2 bg-black">
                    <source src={msg.attachment_url} />
                    Your browser does not support the video tag.
                </video>
            );
        }
        if (type === 'audio') {
            return (
                <audio controls src={msg.attachment_url} className="w-full mt-2" />
            );
        }

        return (
            <a
                href={msg.attachment_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-slate-100 p-3 rounded-lg text-slate-700 hover:bg-slate-200 transition-colors mb-2"
            >
                <FaFileAlt className="text-slate-500" size={20} />
                <span className="underline text-sm font-medium truncate max-w-[200px]">{msg.attachment_name || 'Download File'}</span>
            </a>
        );
    };

    if (!activeChat) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 text-slate-400 p-8">
                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                    <FaSmile size={32} className="text-slate-300" />
                </div>
                <p className="text-lg font-medium text-slate-500">Select a conversation to start chatting</p>
            </div>
        );
    }

    const recipientName = activeChat.recipientName || "Unknown User";

    return (
        <div className="flex flex-col h-full bg-white">
            { }
            <div className="h-16 px-6 border-b border-slate-200 flex items-center justify-between bg-white shrink-0 sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
                        onClick={onBack}
                    >
                        <FaArrowLeft />
                    </button>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">{recipientName}</h3>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <p className="text-xs text-slate-500">Active now</p>
                        </div>
                    </div>
                </div>
            </div>

            { }
            <div
                className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50 scroll-smooth custom-scrollbar"
                onClick={() => setShowEmoji(false)}
            >
                {activeChat.messages?.length > 0 ? (
                    activeChat.messages.map((msg) => {
                        const isMyMessage = msg.senderId === currentUser?.uid;
                        const timeString = msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "";

                        return (
                            <div key={msg.id || Math.random()} className={`flex flex-col ${isMyMessage ? 'items-end' : 'items-start'}`}>
                                <div className={`max-w-[85%] md:max-w-[70%] break-words shadow-sm ${isMyMessage
                                    ? 'bg-primary-900 text-white rounded-2xl rounded-tr-sm'
                                    : 'bg-white text-slate-800 border border-slate-100 rounded-2xl rounded-tl-sm'
                                    } p-4 relative group`}>

                                    {renderAttachment(msg)}

                                    {msg.text && (
                                        <div className={`text-sm md:text-base leading-relaxed ${msg.attachment_url ? 'mt-2' : ''}`}>
                                            {msg.text}
                                        </div>
                                    )}
                                </div>
                                <div className="text-[10px] text-slate-400 mt-1 px-1 font-medium">
                                    {timeString}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                        <FaSmile size={48} className="mb-4" />
                        <p>No messages yet. Say hello! 👋</p>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            { }
            {selectedFile && (
                <div className="px-4 py-3 bg-blue-50 border-t border-blue-100 flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                        {selectedFile.type.startsWith('image/') ? <FaImage className="text-blue-500" /> :
                            selectedFile.type.startsWith('video/') ? <FaVideo className="text-red-500" /> :
                                <FaFileAlt className="text-slate-500" />}
                    </div>
                    <span className="text-sm text-slate-700 font-medium truncate flex-1">
                        {selectedFile.name}
                    </span>
                    <button
                        onClick={() => setSelectedFile(null)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <FaTimes />
                    </button>
                </div>
            )}

            { }
            <div className="p-4 bg-white border-t border-slate-200">
                <form
                    className="flex items-center gap-2 bg-slate-100 rounded-2xl p-1.5 border border-transparent focus-within:border-primary-900/50 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary-900/10 transition-all shadow-inner"
                    onSubmit={handleSubmit}
                >
                    { }
                    <button
                        type="button"
                        className="p-2.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-xl transition-colors relative"
                        onClick={() => setShowEmoji(!showEmoji)}
                    >
                        <FaSmile size={20} />
                        {showEmoji && (
                            <div className="absolute bottom-14 left-0 z-50 shadow-xl rounded-2xl border border-slate-200">
                                <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={400} />
                            </div>
                        )}
                    </button>

                    { }
                    <button
                        className="p-2.5 text-slate-400 hover:text-primary-900 hover:bg-slate-50 rounded-xl transition-colors"
                        onClick={() => fileInputRef.current.click()}
                    >
                        <FaPaperclip size={20} />
                    </button>

                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileSelect}
                    />

                    { }
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        autoComplete="off"
                        disabled={isUploading}
                        className="flex-1 bg-transparent border-none focus:ring-0 text-slate-800 placeholder-slate-400 px-2 font-medium"
                    />

                    { }
                    <button
                        type="submit"
                        disabled={(!newMessage.trim() && !selectedFile) || isUploading}
                        className={`p-3 rounded-xl flex items-center justify-center transition-all ${(!newMessage.trim() && !selectedFile) || isUploading
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-primary-900 text-white shadow-lg shadow-primary-900/30 hover:bg-slate-800 hover:scale-105 active:scale-95'
                            }`}
                    >
                        <FaPaperPlane size={16} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatWindow;