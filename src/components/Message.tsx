import { useEffect, useState } from "react";

type MessageType = {
    text: string;
    sender: "user" | "ai";
};

type MessageProps = {
    initialMessage: string;
};

export default function Message({ initialMessage }: MessageProps) {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [newMessage, setNewMessage] = useState<string>(""); 

   
    useEffect(() => {
        if (initialMessage.trim()) {
            sendMessage(initialMessage);
        }
    }, [initialMessage]);

    const sendMessage = async (message: string) => {
        const userMessage: MessageType = { text: message, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const response = await fetch('https://eyayapi.vercel.app/message', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });

            const data = await response.json();
            const aiMessage: MessageType = { text: data.ai, sender: "ai" }; 
            setMessages((prev) => [...prev, aiMessage]);
            setNewMessage("");
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="bg-background text-foreground h-screen flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`bg-black/60 text-white p-3 rounded-lg max-w-xs ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                            <p>{msg.text}</p> 
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 flex items-center">
                <input 
                    type="text" 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                    placeholder="Type a message..." 
                    className="flex-1 placeholder-black bg-black/30 text-black p-3 rounded-l-lg" 
                />
                <button 
                    onClick={() => sendMessage(newMessage)} 
                    className="bg-black/40 text-primary-foreground p-3 rounded-r-lg ml-2"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
