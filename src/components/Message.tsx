import { useEffect, useState } from  "react";

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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialMessage.trim()) {
            sendMessage(initialMessage);
        }
    }, [initialMessage]);

    const sendMessage = async (message: string) => {
        if (!message.trim()) return; 

        const userMessage: MessageType = { text: message, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);
        setError(null); 

        try {
            const response = await fetch('https://eyayapi.vercel.app/message', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            const aiMessage: MessageType = { text: data.ai, sender: "ai" }; 
            setMessages((prev) => [...prev, aiMessage]);
            setNewMessage("");
        } catch (error) {
            setError("Error fetching data. Please try again.");
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <main className="h-screen flex flex-col">
            <nav className="fixed top-0 left-0 right-0 bg-white border p-4 shadow-lg z-10">
                <label className="text-2xl font-mono font-semibold tracking-widest">EyAy</label>
            </nav>
            
            <div className="flex-1 pt-20 pb-20 overflow-y-auto bg-background text-foreground">
                <div className="p-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`bg-black/60 text-white p-3 rounded-lg max-w-lg ${msg.sender === "user" ? "text-right bg-blue-700" : "text-left"}`}>
                                <p>
                                    {index === messages.length - 1 && isLoading && msg.sender === "ai" 
                                        ? "Loading..."
                                        : msg.text
                                    }
                                </p> 
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 flex items-center border-t shadow-lg z-10">
                <input 
                    type="text" 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                    placeholder="Type a message..." 
                    className="flex-1 placeholder-black bg-black/30 text-black p-3 rounded-l-lg" 
                    disabled={isLoading}
                />
                <button 
                    onClick={() => sendMessage(newMessage)} 
                    className="bg-blue-700 text-primary-foreground p-3 rounded-r-lg ml-2"
                    disabled={isLoading}
                >
                    Send
                </button>
            </div>

            {error && <div className="text-red-500 text-center mt-4">{error}</div>}
        </main>
    );
}
