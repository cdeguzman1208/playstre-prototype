// Game Editor screen

let editorState = {
    isBuilding: false,
    isBuilt: false,
    currentGame: null,
    chatMessages: []
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomResponse() {
    const responses = [
        "Done! I've made that update.",
        "All set — I’ve applied the change.",
        "That’s been updated. Want to tweak anything else?",
        "Finished! Let me know if you want more adjustments."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function renderEditorScreen(params) {
    const gameId = params.gameId;
    
    // Editor requires an existing game - if no gameId, redirect to dashboard
    if (!gameId) {
        navigateTo('home');
        return '<div>Redirecting...</div>';
    }
    
    // Load game
    const allGames = [...fakeGames, ...appState.createdGames];
    editorState.currentGame = allGames.find(g => g.id === gameId);
    
    // If game not found, redirect to dashboard
    if (!editorState.currentGame) {
        navigateTo('home');
        return '<div>Game not found. Redirecting...</div>';
    }
    
    editorState.isBuilt = true;
    editorState.isBuilding = false;
    
    // Initialize chat messages if empty (only on first load, not on re-render)
    if (editorState.chatMessages.length === 0) {
        editorState.chatMessages = [{ type: 'system', text: '...' }];
    
        setTimeout(() => {
            editorState.chatMessages = [
                { type: 'system', text: 'Your game is ready! You can ask me to make changes.' }
            ];
            updateChatUI();
        }, 1200);
    }    
    
    const chatMessagesHtml = editorState.chatMessages.map(msg => `
        <div class="chat-message ${msg.type === 'system' ? 'system-message' : 'user-message'} mb-4">
            <div class="text-sm ${msg.type === 'system' ? 'text-gray-600' : 'text-gray-900'}">${msg.text}</div>
        </div>
    `).join('');
    
    return `
        <!-- Top Bar -->
        <div class="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div class="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
                <h1 class="text-xl font-semibold text-gray-900">Playstre</h1>
                <button id="publish-btn" class="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
                    Publish
                </button>
            </div>
        </div>

        <!-- Two Column Layout -->
        <div class="flex h-[calc(100vh-73px)] bg-gray-50">
            <!-- Left Panel: AI Chat -->
            <div class="w-96 bg-white border-r border-gray-200 flex flex-col">
                <div class="flex-1 overflow-y-auto p-6" id="chat-messages">
                    ${chatMessagesHtml}
                </div>
                <div class="border-t border-gray-200 p-4">
                    <form id="chat-form" class="flex gap-2">
                        <input 
                            type="text" 
                            id="chat-input" 
                            placeholder="Ask me to change something..." 
                            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                        <button 
                            type="submit" 
                            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>

            <!-- Right Panel: Game Preview -->
            <div class="flex-1 bg-gray-100 flex items-center justify-center p-8" id="game-preview">
                ${renderGamePreview()}
            </div>

            <!-- Publish Success Modal -->
            <div id="publish-modal" class="fixed inset-0 bg-black/40 hidden items-center justify-center z-50">
                <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6 text-center space-y-4">
                    <h2 class="text-xl font-semibold text-gray-900">Your game is live 🎉</h2>
                    <p class="text-sm text-gray-600">
                        Your game has been saved. Share it or head back to your dashboard.
                    </p>
    
                    <div class="flex items-center gap-2">
                        <input
                            id="share-link-input"
                            type="text"
                            readonly
                            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 bg-gray-50"
                        />
                        <button
                            id="copy-link-btn"
                            class="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition"
                        >
                            Copy
                        </button>
                    </div>
    
                    <button
                        id="return-dashboard-btn"
                        class="w-full px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                    >
                        Save & Return to Dashboard
                    </button>
                </div>
            </div>    
        </div>
    `;
}


function renderGamePreview() {
    if (editorState.currentGame) {
        return `
            <div class="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full">
                <div class="text-center mb-6">
                    <div class="text-7xl mb-4">${editorState.currentGame.emoji}</div>
                    <h2 class="text-3xl font-bold text-gray-900 mb-2">${editorState.currentGame.title}</h2>
                    <p class="text-gray-600">${editorState.currentGame.type} • ${editorState.currentGame.subtype} • ${editorState.currentGame.theme}</p>
                </div>
                <div class="bg-gray-100 rounded-lg p-8 text-center">
                    <div class="text-4xl mb-4">🎮</div>
                    <p class="text-gray-600">Game Preview</p>
                    <p class="text-sm text-gray-500 mt-2">This is where your playable game would appear</p>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full text-center">
                <div class="text-6xl mb-4">🎮</div>
                <h2 class="text-2xl font-semibold text-gray-900 mb-2">Game Preview</h2>
                <p class="text-gray-600">Loading game...</p>
            </div>
        `;
    }
}

function initEditorScreen() {
    // Handle chat form
    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('chat-input');
            const message = input.value.trim();
            if (message) {
                handleChatMessage(message);
                input.value = '';
            }
        });
    }

    // Handle publish button
    document.getElementById('publish-btn')?.addEventListener('click', handlePublish);

    // Modal buttons
    document.getElementById('copy-link-btn')?.addEventListener('click', copyShareLink);
    document.getElementById('return-dashboard-btn')?.addEventListener('click', finalizePublish);
}


function handleChatMessage(message) {
    const input = document.getElementById('chat-input');
    input.disabled = true;

    // Add user message
    editorState.chatMessages.push({ type: 'user', text: message });

    // Show typing indicator
    editorState.chatMessages.push({ type: 'system', text: '...' });
    updateChatUI();

    // Simulate AI thinking + response
    setTimeout(() => {
        editorState.chatMessages.pop(); // remove "..."
        editorState.chatMessages.push({
            type: 'system',
            text: getRandomResponse()
        });
        input.disabled = false;
        input.focus();
        updateChatUI();
    }, 1200 + Math.random() * 800);
}


function updateChatUI() {
    const chatContainer = document.getElementById('chat-messages');
    if (!chatContainer) return;
    
    const chatMessagesHtml = editorState.chatMessages.map(msg => `
        <div class="chat-message ${msg.type === 'system' ? 'system-message' : 'user-message'} mb-4">
            <div class="text-sm ${msg.type === 'system' ? 'text-gray-600' : 'text-gray-900'}">${msg.text}</div>
        </div>
    `).join('');
    
    chatContainer.innerHTML = chatMessagesHtml;
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function handlePublish() {
    if (!editorState.currentGame) {
        navigateTo('home');
        return;
    }

    // Save game
    const existingIndex = appState.createdGames.findIndex(
        g => g.id === editorState.currentGame.id
    );

    if (existingIndex >= 0) {
        appState.createdGames[existingIndex] = editorState.currentGame;
    } else {
        appState.createdGames.push(editorState.currentGame);
    }

    localStorage.setItem(
        'playstre_games',
        JSON.stringify(appState.createdGames)
    );

    // Generate fake share link
    const shareUrl = `${window.location.origin}/play/${editorState.currentGame.id}`;

    const linkInput = document.getElementById('share-link-input');
    if (linkInput) {
        linkInput.value = shareUrl;
    }

    // Show modal
    const modal = document.getElementById('publish-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function copyShareLink() {
    const input = document.getElementById('share-link-input');
    if (!input) return;

    input.select();
    input.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(input.value);
}

function finalizePublish() {
    // Reset editor state
    editorState.chatMessages = [];

    // Hide modal
    const modal = document.getElementById('publish-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }

    // Return to dashboard
    navigateTo('home');
}
