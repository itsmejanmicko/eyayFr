import { useState } from "react";
import Message from "./Message";

export default function Chat() {
    const [isSearch, setIsSearch] = useState<boolean>(true);
    const [inputText, setInputText] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };

    const handleSend = async () => {
        if (inputText.trim() !== "") {
            setIsSearch(false);
        }
    };

    return (
        <main>
            {isSearch ? (
                <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
                    <h1 className="text-2xl font-bol font-mono mb-6 text-center">EyAi your ai no memory companion</h1>
                    <div className="relative w-full max-w-md mb-6">
                        <input
                            type="text"
                            placeholder="Ask anything..."
                            value={inputText}
                            onChange={handleInputChange}
                            className="w-full p-4 border border-border rounded-lg shadow-lg bg-card text-foreground focus:outline-none focus:ring focus:ring-ring transition duration-200 ease-in-out placeholder-font-mono"
                        />
                        <div className="absolute right-0 top-0 flex items-center space-x-2 p-2">
                            <button
                                onClick={handleSend}
                                className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg shadow-md hover:bg-secondary/80 transition duration-200"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <Message initialMessage={inputText} />
            )}
        </main>
    );
}
