import { GoogleGenerativeAI } from "../../libs/google-generative-ai.js";

document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const chatMessages = document.getElementById("chat-messages");

    const API_KEY = 'AIzaSyCXtAFnWAbnP637BxJP7GQ1OlahDddDmtU'; 
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const addMessageToChat = (message, isBot = false) => {
        const messageElem = document.createElement("div");
        messageElem.classList.add("message");
        messageElem.classList.add(isBot ? "bot-message" : "user-message");
        messageElem.textContent = message;
        chatMessages.appendChild(messageElem);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
    };

    const handleSearch = async (query) => {
        try {
            const result = await model.generateContent(query);
            if (result.errors) {
                throw new Error(result.errors[0].message);
            }
            const response = await result.response;
            const text = response.text();
            addMessageToChat(text, true);
        } catch (error) {
            console.error('Error fetching data:', error);
            addMessageToChat('Sorry, something went wrong.', true);
        }
    };

    sendButton.addEventListener("click", () => {
        const query = userInput.value.trim();
        if (query) {
            addMessageToChat(query, false);
            handleSearch(query);
            userInput.value = ""; // Clear the input
        }
    });

    userInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendButton.click();
        }
    });
});
