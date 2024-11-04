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
                        className="w-full p-4 border border-border rounded-lg shadow-lg bg-card text-foreground focus:outline-none focus:border-blue-500 hover:border-blue-300 transition duration-200 ease-in-out placeholder-font-mono transform hover:rotate-1"
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
                     <section className="font-mono  max-w-md">
                        <p className="mb-3">"I’m building with the Gemini API (free version, of course) while learning TensorFlow.js—because why not get all the AI perks without the price tag? Just call me a budget tech wizard! 🧙‍♂️💸🤖"</p>
                        <p>"This model doesn’t have memory, so it’s like having a goldfish for a chat buddy—let’s keep it to one question at a time before it forgets what we were talking about! 🐠🤔" </p>
                     </section>
                </div>
            ) : (
                <Message initialMessage={inputText} />
            )}
        </main>
    );
}
