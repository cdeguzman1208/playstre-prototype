// Dashboard screen (Home)

// Available options for each category
const gameTypes = ['Racing', 'Shooting', 'Cards'];
const gameSubtypes = {
    'Racing': ['Arcade', 'Simulator', 'Open World', 'Nascar'],
    'Shooting': ['Arcade', 'Simulator', 'Tactical', 'Battle Royale'],
    'Cards': ['Arcade', 'Strategy', 'Poker', 'Collectible']
};
const gameThemes = ['Jungle', 'Sci-Fi', 'Realistic'];
const playerCounts = [1, 2, 3, 4];

// Dashboard state for pinned selections
let dashboardState = {
    pinnedType: null,
    pinnedSubtype: null,
    pinnedTheme: null,
    pinnedPlayers: null
};

function renderHomeScreen(params) {
    // Reset dashboard state if not already set
    if (!dashboardState.pinnedType && !dashboardState.pinnedSubtype && 
        !dashboardState.pinnedTheme && !dashboardState.pinnedPlayers) {
        dashboardState = {
            pinnedType: null,
            pinnedSubtype: null,
            pinnedTheme: null,
            pinnedPlayers: null
        };
    }
    
    const myGames = appState.createdGames.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
    );
    
    // Generate suggestions based on current pinned state
    const suggestions = getCurrentSuggestions();
    const suggestionsHtml = suggestions.map((suggestion, index) => `
        <button class="suggestion-chip" data-suggestion-index="${index}" data-category="${suggestion.category}" data-value="${suggestion.value}">
            ${suggestion.text}
        </button>
    `).join('');
    
    // Generate pinned tags
    const pinnedTags = getPinnedTags();
    const pinnedTagsHtml = pinnedTags.length > 0
    ? `
        <div class="mt-6 flex justify-center">
            <div
                id="pinned-tags-container"
                class="flex flex-wrap justify-center gap-2 max-w-2xl"
            >
                ${pinnedTags.map(tag => `
                    <span
                        class="pinned-tag px-3 py-1 bg-white text-blue-800 rounded-full text-sm flex items-center gap-2"
                        data-category="${tag.category}"
                        data-value="${tag.value}"
                    >
                        ${tag.text}
                        <button
                            class="unpin-btn text-blue-800 hover:text-red-600"
                            data-category="${tag.category}"
                        >
                            ×
                        </button>
                    </span>
                `).join('')}
            </div>
        </div>
    `
    : '';
    
    const myGamesHtml = myGames.length > 0 
        ? myGames.map(game => createDashboardGameCard(game)).join('')
        : '<p class="text-gray-500 text-center py-8">No games yet. Create your first game using a suggestion above!</p>';
    
    const canBuild = dashboardState.pinnedType && dashboardState.pinnedSubtype && 
                     dashboardState.pinnedTheme && dashboardState.pinnedPlayers;
    
    return `
        <div class="min-h-screen bg-white">
            <!-- Splash / Welcome Section -->
            <div class="bg-gradient-to-br from-blue-300 via-green-100 to-purple-300">
                <button
                    id="logout-btn"
                    class="absolute top-6 right-8 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                    Log out
                </button>
                <div class="max-w-6xl mx-auto px-8 py-20 text-center">
                    <h1 class="text-5xl font-bold text-gray-900 mt-4 mb-4">
                        Welcome to Playstre
                    </h1>
                    <p class="text-xl text-gray-600 mb-8">
                        Describe a game or pick a starting point
                    </p>

                    <div class="flex items-center gap-3 max-w-2xl mx-auto">
                        <input 
                            type="text" 
                            id="welcome-input" 
                            placeholder="Describe your game idea..." 
                            disabled
                            class="flex-1 px-6 py-4 text-lg border border-gray-200 rounded-xl bg-white/80 text-gray-400 cursor-not-allowed focus:outline-none shadow-sm backdrop-blur"
                        >
                        <button 
                            id="confirm-build-btn" 
                            class="px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold text-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
                            ${canBuild ? '' : 'disabled'}
                        >
                            Build
                        </button>
                    </div>

                    <!-- Pinned Tags -->
                    ${pinnedTagsHtml}
                </div>
            </div>

            <!-- Main Content Section -->
            <div class="max-w-6xl mx-auto px-8 py-16">
                <!-- Suggestions Section -->
                <div class="mb-20">
                    <h2 class="text-2xl font-semibold text-gray-900 mb-6">
                        Suggestions
                    </h2>
                    <div class="flex flex-wrap gap-3" id="suggestions-container">
                        ${suggestionsHtml}
                    </div>
                </div>

                <!-- My Games Section -->
                <div class="bg-gray-50 rounded-2xl p-8">
                    <h2 class="text-2xl font-semibold text-gray-900 mb-6">
                        My Games
                    </h2>
                    <div
                        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        id="my-games-container"
                    >
                        ${myGamesHtml}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initHomeScreen() {
    // Handle logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            const confirmed = confirm('Log out of Playstre?');
            if (!confirmed) return;

            logout();
        });
    }

    // Handle suggestion clicks
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const category = chip.dataset.category;
            const value = chip.dataset.value;
            pinSuggestion(category, value);
        });
    });
    
    // Handle unpin clicks
    document.querySelectorAll('.unpin-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const category = btn.dataset.category;
            unpinSuggestion(category);
        });
    });
    
    // Handle build button
    const buildBtn = document.getElementById('confirm-build-btn');
    if (buildBtn) {
        buildBtn.addEventListener('click', handleConfirmBuild);
    }
    
    // Handle game card clicks
    document.querySelectorAll('.dashboard-game-card').forEach(card => {
        card.addEventListener('click', () => {
            const gameId = card.dataset.gameId;
            navigateTo('editor', { gameId });
        });
    });
}

function getCurrentSuggestions() {
    if (!dashboardState.pinnedType) {
        // Show types
        return gameTypes.map(type => ({
            category: 'type',
            value: type.toLowerCase(),
            text: type
        }));
    } else if (!dashboardState.pinnedSubtype) {
        // Show subtypes for pinned type
        const typeKey = dashboardState.pinnedType.charAt(0).toUpperCase() + dashboardState.pinnedType.slice(1);
        const subtypes = gameSubtypes[typeKey] || [];
        return subtypes.map(subtype => ({
            category: 'subtype',
            value: subtype.toLowerCase().replace(' ', '-'),
            text: subtype
        }));
    } else if (!dashboardState.pinnedTheme) {
        // Show themes
        return gameThemes.map(theme => ({
            category: 'theme',
            value: theme.toLowerCase().replace(' ', '-'),
            text: theme
        }));
    } else if (!dashboardState.pinnedPlayers) {
        // Show player counts
        return playerCounts.map(count => ({
            category: 'players',
            value: count.toString(),
            text: `${count} Player${count > 1 ? 's' : ''}`
        }));
    }
    return [];
}

function getPinnedTags() {
    const tags = [];
    if (dashboardState.pinnedType) {
        tags.push({ category: 'type', value: dashboardState.pinnedType, text: dashboardState.pinnedType });
    }
    if (dashboardState.pinnedSubtype) {
        tags.push({ category: 'subtype', value: dashboardState.pinnedSubtype, text: dashboardState.pinnedSubtype.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') });
    }
    if (dashboardState.pinnedTheme) {
        tags.push({ category: 'theme', value: dashboardState.pinnedTheme, text: dashboardState.pinnedTheme.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') });
    }
    if (dashboardState.pinnedPlayers) {
        tags.push({ category: 'players', value: dashboardState.pinnedPlayers, text: `${dashboardState.pinnedPlayers} Player${dashboardState.pinnedPlayers > 1 ? 's' : ''}` });
    }
    return tags;
}

function pinSuggestion(category, value) {
    if (category === 'type') {
        dashboardState.pinnedType = value;
        dashboardState.pinnedSubtype = null;
        dashboardState.pinnedTheme = null;
        dashboardState.pinnedPlayers = null;
    } else if (category === 'subtype') {
        dashboardState.pinnedSubtype = value;
        dashboardState.pinnedTheme = null;
        dashboardState.pinnedPlayers = null;
    } else if (category === 'theme') {
        dashboardState.pinnedTheme = value;
        dashboardState.pinnedPlayers = null;
    } else if (category === 'players') {
        dashboardState.pinnedPlayers = parseInt(value);
    }
    
    // Re-render dashboard
    const appContainer = document.getElementById('app');
    if (appContainer) {
        appContainer.innerHTML = renderHomeScreen({});
        initHomeScreen();
    }
}

function unpinSuggestion(category) {
    if (category === 'type') {
        dashboardState.pinnedType = null;
        dashboardState.pinnedSubtype = null;
        dashboardState.pinnedTheme = null;
        dashboardState.pinnedPlayers = null;
    } else if (category === 'subtype') {
        dashboardState.pinnedSubtype = null;
        dashboardState.pinnedTheme = null;
        dashboardState.pinnedPlayers = null;
    } else if (category === 'theme') {
        dashboardState.pinnedTheme = null;
        dashboardState.pinnedPlayers = null;
    } else if (category === 'players') {
        dashboardState.pinnedPlayers = null;
    }
    
    // Re-render dashboard
    const appContainer = document.getElementById('app');
    if (appContainer) {
        appContainer.innerHTML = renderHomeScreen({});
        initHomeScreen();
    }
}

function handleConfirmBuild() {
    if (!dashboardState.pinnedType || !dashboardState.pinnedSubtype || 
        !dashboardState.pinnedTheme || !dashboardState.pinnedPlayers) {
        return;
    }
    
    // Set gameState for title generation (use lowercase hyphenated format)
    appState.gameState = {
        type: dashboardState.pinnedType.toLowerCase(),
        subtype: dashboardState.pinnedSubtype.toLowerCase(),
        theme: dashboardState.pinnedTheme.toLowerCase(),
        players: dashboardState.pinnedPlayers
    };
    
    // Create game object
    const game = {
        id: `game_${Date.now()}`,
        title: generateGameTitle(),
        type: dashboardState.pinnedType.charAt(0).toUpperCase() + dashboardState.pinnedType.slice(1),
        subtype: dashboardState.pinnedSubtype.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        theme: dashboardState.pinnedTheme.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        players: dashboardState.pinnedPlayers,
        creator: appState.currentUser.username,
        plays: 0,
        likes: 0,
        emoji: getEmojiForType(dashboardState.pinnedType),
        createdAt: new Date().toISOString()
    };
    
    // Save game
    appState.createdGames.push(game);
    localStorage.setItem('playstre_games', JSON.stringify(appState.createdGames));
    
    // Reset dashboard state
    dashboardState = {
        pinnedType: null,
        pinnedSubtype: null,
        pinnedTheme: null,
        pinnedPlayers: null
    };
    
    // Reset editor state
    editorState.chatMessages = [];
    
    // Navigate to editor with the new game
    navigateTo('editor', { gameId: game.id });
}

function createDashboardGameCard(game) {
    const timeAgo = getTimeAgo(game.createdAt);
    return `
        <div class="dashboard-game-card bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer p-6 border border-gray-100" data-game-id="${game.id}">
            <div class="flex items-start space-x-4 mb-4">
                <div class="text-4xl flex-shrink-0">${game.emoji}</div>
                <div class="flex-1 min-w-0">
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">${game.title}</h3>
                    <div class="flex flex-wrap gap-2 mb-3">
                        <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">${game.type}</span>
                        <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">${game.theme}</span>
                    </div>
                    <p class="text-xs text-gray-500">Last edited ${timeAgo}</p>
                </div>
            </div>
        </div>
    `;
}
