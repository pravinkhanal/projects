const sendChatButton = document.querySelector(".reply span");
const chatInput = document.querySelector(".reply textarea");
const chatbox = document.querySelector(".chatbox");

let userMessage;
const api_key = "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";

const createChatLi = (message, className) => {
    const chatLi =  document.createElement("li");
    chatLi.classList.add("chat", className)
    let chatContent = className == "outgoing" ? `<p>${message}</p>` :  `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");
    
    const requestOptions = {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${api_key}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: "userMessage"}]
        })
    }
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.textContent = "Opps! Something went wrong. Try Again!";
    })
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    // Append user message to the chat box
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));

    // Displays the thinking ... while waiting to give a response
    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking ...", "incoming")
        chatbox.appendChild(incomingChatLi);
        generateResponse(incomingChatLi);
    }, 600);
}

sendChatButton.addEventListener("click", handleChat);