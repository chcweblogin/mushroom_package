document.addEventListener('DOMContentLoaded', () => {
    // Inject Chat Widget HTML
    const chatWidget = document.createElement('div');
    chatWidget.className = 'chat-widget';
    chatWidget.innerHTML = `
        <button class="chat-toggle" aria-label="Toggle Chat">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="icon-chat" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 11.5C21.0031 12.8199 20.6951 14.1272 20.1039 15.3128C19.5126 16.4984 18.6567 17.5262 17.6105 18.3071C16.5644 19.0881 15.3611 19.5986 14.1037 19.7944C12.8463 19.9902 11.5739 19.8653 10.398 19.431L5.5 21L7.069 16.289C6.16016 15.1764 5.58666 13.826 5.41094 12.3855C5.23522 10.945 5.4639 9.46788 6.07198 8.11504C6.68006 6.76219 7.64413 5.58622 8.85874 4.71616C10.0734 3.8461 11.4925 3.31557 12.961 3.182C14.498 3.041 16.059 3.42 17.382 4.256C18.705 5.092 19.71 6.334 20.231 7.776C20.752 9.218 20.757 10.806 20.244 12.276" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="icon-close" style="display:none;" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <div class="chat-window">
            <div class="chat-header">
                <h3>Myco Assistant</h3>
                <button class="close-chat">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div class="chat-messages" id="chat-messages">
                <div class="message bot">
                    Hello! I'm your Mushroom Packaging assistant. Ask me about our process, sustainability, or products.
                </div>
            </div>
            <form class="chat-input-area" id="chat-form">
                <input type="text" placeholder="Type a message..." aria-label="Type message">
                <button type="submit" class="send-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </form>
        </div>
    `;
    document.body.appendChild(chatWidget);

    // Knowledge Base
    const knowledgeBase = {
        "how": "We use agricultural waste (hemp) and mycelium (mushroom roots). The mycelium binds the hemp together in a mold over 4-6 days, creating a strong, solid shape. It's grown, not manufactured!",
        "process": "1. Mix hemp & mycelium. 2. Fill mold. 3. Grow for 4 days. 4. Heat to stop growth. 5. Ready to ship!",
        "strong": "Yes! It's comparable to Styrofoam (EPS) in strength and shock absorption. It protects wine, electronics, and heavy furniture.",
        "compost": "It decomposes in soil in about 45 days. You can break it up and put it in your garden. No industrial facility needed.",
        "water": "It is water-resistant/hydrophobic, similar to styrofoam. It can handle humidity and splashes but isn't meant to be submerged for long periods.",
        "cost": "Pricing depends on volume and shape. Stock items start around $1-2. Custom molds require a tooling fee. Use the contact form for a quote!",
        "custom": "We love custom projects! We can mold to almost any shape. Click 'Custom Design' in the menu or fill out the contact form to start.",
        "eat": "No, you can't eat it! While it's made from mushrooms, the heating process renders it inert and inedible.",
        "sustainable": "It's carbon negative, uses waste products, and leaves no plastic behind. It's one of the most sustainable packaging options on Earth.",
        "default": "I'm not sure about that one. Try asking about 'composting', 'strength', 'process', or 'custom design'. Or use the Contact form for specific inquiries."
    };

    // DOM Elements
    const toggleBtn = chatWidget.querySelector('.chat-toggle');
    const closeBtn = chatWidget.querySelector('.close-chat');
    const chatWindow = chatWidget.querySelector('.chat-window');
    const chatForm = chatWidget.querySelector('#chat-form');
    const messagesContainer = chatWidget.querySelector('#chat-messages');
    const input = chatWidget.querySelector('input');
    const iconChat = chatWidget.querySelector('.icon-chat');
    const iconClose = chatWidget.querySelector('.icon-close');

    // Toggle Chat
    function toggleChat() {
        const isActive = chatWindow.classList.toggle('active');
        if (isActive) {
            input.focus();
            iconChat.style.display = 'none';
            iconClose.style.display = 'block';
        } else {
            iconChat.style.display = 'block';
            iconClose.style.display = 'none';
        }
    }

    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    // Handle Message
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;

        // User Message
        addMessage(text, 'user');
        input.value = '';

        // Bot Response (Simulated Delay)
        setTimeout(() => {
            const response = getResponse(text);
            addMessage(response, 'bot');
        }, 500);
    });

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        div.textContent = text;
        messagesContainer.appendChild(div);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function getResponse(text) {
        text = text.toLowerCase();

        // Simple keyword matching
        if (text.includes('how') || text.includes('work') || text.includes('made')) return knowledgeBase.how;
        if (text.includes('process') || text.includes('grow')) return knowledgeBase.process;
        if (text.includes('strong') || text.includes('protect') || text.includes('weight') || text.includes('heavy')) return knowledgeBase.strong;
        if (text.includes('compost') || text.includes('biodegradable') || text.includes('rot') || text.includes('dispose')) return knowledgeBase.compost;
        if (text.includes('water') || text.includes('proof') || text.includes('wet')) return knowledgeBase.water;
        if (text.includes('cost') || text.includes('price') || text.includes('much')) return knowledgeBase.cost;
        if (text.includes('custom') || text.includes('logo') || text.includes('design')) return knowledgeBase.custom;
        if (text.includes('eat') || text.includes('edible')) return knowledgeBase.eat;
        if (text.includes('sustainable') || text.includes('eco') || text.includes('green')) return knowledgeBase.sustainable;

        return knowledgeBase.default;
    }
});
