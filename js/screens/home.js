// Dashboard screen (Home)
const basePath = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '');
const heroUrl = `${basePath}/assets/hero.gif`;

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

// Descriptions for each option
const gameTypeDescriptions = {
    'Racing': 'Fast-paced games focused on driving or vehicles.',
    'Shooting': 'Action games where aiming and firing is key.',
    'Cards': 'Games that use cards, strategy, and luck.'
};

const gameSubtypeDescriptions = {
    'Arcade': 'Simpler, action-oriented gameplay with quick rewards.',
    'Simulator': 'Realistic simulation of vehicles, combat, or cards.',
    'Open World': 'Large maps to explore with freedom of choice.',
    'Nascar': 'Racing focused on speed and professional tracks.',
    'Tactical': 'Requires strategy and careful planning.',
    'Battle Royale': 'Last player standing wins in a competitive arena.',
    'Strategy': 'Careful planning to outwit opponents.',
    'Poker': 'Classic card game of betting and bluffing.',
    'Collectible': 'Games centered around collecting and deck-building.'
};

const gameThemeDescriptions = {
    'Jungle': 'Lush forests, wildlife, and survival challenges.',
    'Sci-Fi': 'Futuristic technology, space, or aliens.',
    'Realistic': 'Grounded in real-world visuals and physics.'
};

const playerCountDescriptions = {
    1: 'Single player experience.',
    2: 'Play with a friend.',
    3: 'Small group of players.',
    4: 'Up to four players for multiplayer fun.'
};

// Updated getCurrentSuggestions
function getCurrentSuggestions() {
    const makeCardHtml = (label, description) => `
        <div style="
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            padding: 1rem;
            cursor: pointer;
            text-align: center;
            width: 13.75rem;
        ">
            <div style="font-weight:600; color:#e5e7eb;">${label}</div>
            <div style="font-size:0.85rem; color:#9ca3af; line-height:1.3;">${description}</div>        
        </div>
    `;

    if (!dashboardState.pinnedType) {
        return gameTypes.map(type => ({
            category: 'type',
            value: type,
            text: makeCardHtml(type, gameTypeDescriptions[type])
        }));
    } else if (!dashboardState.pinnedSubtype) {
        const typeKey = dashboardState.pinnedType.charAt(0).toUpperCase() + dashboardState.pinnedType.slice(1);
        const subtypes = gameSubtypes[typeKey] || [];
        return subtypes.map(subtype => ({
            category: 'subtype',
            value: subtype.toLowerCase().replace(' ', '-'),
            text: makeCardHtml(subtype, gameSubtypeDescriptions[subtype])
        }));
    } else if (!dashboardState.pinnedTheme) {
        return gameThemes.map(theme => ({
            category: 'theme',
            value: theme.toLowerCase().replace(' ', '-'),
            text: makeCardHtml(theme, gameThemeDescriptions[theme])
        }));
    } else if (!dashboardState.pinnedPlayers) {
        return playerCounts.map(count => ({
            category: 'players',
            value: count.toString(),
            text: makeCardHtml(`${count} Player${count > 1 ? 's' : ''}`, playerCountDescriptions[count])
        }));
    }

    return [];
}

// Updated renderHomeScreen heading
function getStepHeading() {
    if (!dashboardState.pinnedType) return 'Step 1: Select a game type';
    if (!dashboardState.pinnedSubtype) return 'Step 2: Select a game subtype';
    if (!dashboardState.pinnedTheme) return 'Step 3: Select a theme';
    if (!dashboardState.pinnedPlayers) return 'Step 4: Select player count';
    return 'All steps completed!';
}

function renderHomeScreen(params) {
    const progressSteps = getProgressSteps();
    const progressHtml = `
        <div class="flex gap-2 mb-8 justify-center">
            ${progressSteps.map(completed => `
                <div style="
                    flex: 1;
                    height: 0.5rem;
                    border-radius: 0.25rem;
                    background: ${completed 
                        ? 'linear-gradient(to bottom right, #2563eb, #8b5cf6)'
                        : '#1f2937'};
                    transition: background-color 0.3s;
                "></div>
            `).join('')}
        </div>
    `;

    const myGames = appState.createdGames.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
    );

    const suggestions = getCurrentSuggestions();
    const suggestionsHtml = suggestions.map((suggestion, index) => `
        <button class="suggestion-chip" data-suggestion-index="${index}" data-category="${suggestion.category}" data-value="${suggestion.value}">
            ${suggestion.text}
        </button>
    `).join('');

    const pinnedTags = getPinnedTags();
    const pinnedTagsHtml = pinnedTags.length > 0
        ? `<div class="mt-6 flex justify-center">
                <div id="pinned-tags-container" class="flex flex-wrap justify-center gap-2 max-w-2xl">
                    ${pinnedTags.map(tag => `
                        <span class="pinned-tag px-3 py-1 bg-gray-900 text-blue-400 border border-gray-700 rounded-full text-sm flex items-center gap-2"
                              data-category="${tag.category}" data-value="${tag.value}">
                            ${tag.text}
                            <button class="unpin-btn text-blue-500 hover:text-red-600" data-category="${tag.category}">×</button>
                        </span>
                    `).join('')}
                </div>
            </div>`
        : '';

    const myGamesHtml = myGames.length > 0 
        ? myGames.map(game => createDashboardGameCard(game)).join('')
        : '<p class="text-gray-400 text-center py-8">No games yet. Create your first game by following the steps above!</p>';

    const canBuild = dashboardState.pinnedType && dashboardState.pinnedSubtype && 
                     dashboardState.pinnedTheme && dashboardState.pinnedPlayers;

    return `
        <div class="min-h-screen bg-gray-950 text-gray-100 relative">
            <!-- Top Header -->
            ${renderTopHeader()}

            <!-- Sidebar Overlay is managed separately by initSidebar() -->

            <!-- Page Content (padding-top = header height) -->
            <div class="pt-0">
                <!-- Splash / Welcome Section -->
                <div
                    class="relative bg-cover bg-center min-h-[60vh]"
                    style="background-image: url('${heroUrl}');"
                >
                    <div class="backdrop-blur-[2px]">
                        <div class="max-w-6xl mx-auto px-8 pt-32 pb-18 text-center">
                            <h1 class="text-5xl font-bold text-white mt-4 mb-4">Welcome to Playstre</h1>
                            <p class="text-xl text-gray-200 mb-8">Describe a game or pick a starting point</p>

                            <div class="flex items-center gap-3 max-w-2xl mx-auto">
                                <input type="text" id="welcome-input" placeholder="Describe your game idea..."
                                    disabled
                                    class="flex-1 px-6 py-4 text-lg border border-gray-200 rounded-xl bg-white/90 text-gray-600 cursor-not-allowed focus:outline-none shadow-sm backdrop-blur"
                                >
                                <button id="confirm-build-btn"
                                    class="px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold text-lg hover:bg-blue-600 transition-colors disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
                                    ${canBuild ? '' : 'disabled'}>
                                    Build
                                </button>
                            </div>

                            <!-- Pinned Tags -->
                            ${pinnedTagsHtml}
                        </div>
                    </div>
                </div>

                <!-- Main Content Section -->
                <div class="max-w-6xl mx-auto px-8 py-12">
                    <!-- Suggestions Section -->
                    <div class="mb-20">
                        ${progressHtml}
                        <h2 class="text-2xl font-semibold text-gray-100 mb-6">${getStepHeading()}</h2>
                        <div class="flex flex-wrap gap-3" id="suggestions-container">
                            ${suggestions.length > 0 ? suggestionsHtml : '<p class="text-gray-400 text-left w-full">Press the build button to generate your game.</p>'}
                        </div>
                    </div>

                    <!-- My Games Section -->
                    <div class="bg-gray-900 rounded-2xl p-8 border border-gray-800">
                        <h2 class="text-2xl font-semibold text-gray-100 mb-6">My Games</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="my-games-container">
                            ${myGamesHtml}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}


function initHomeScreen() {
    // Sidebar setup
    initSidebar();

    const menuButton = document.getElementById('menu-button');
    if (menuButton) {
        menuButton.onclick = () => openSidebar();
    }

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
        <div class="dashboard-game-card bg-gray-950 rounded-xl shadow-sm hover:shadow-lg transition-shadow cursor-pointer p-6 border border-gray-800" data-game-id="${game.id}">
            <div class="flex items-start space-x-4 mb-4">
                <div class="text-4xl flex-shrink-0">${game.emoji}</div>
                <div class="flex-1 min-w-0">
                    <h3 class="text-lg font-semibold text-gray-100 mb-2">${game.title}</h3>
                    <div class="flex flex-wrap gap-2 mb-3">
                        <span class="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md">${game.type}</span>
                        <span class="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md">${game.theme}</span>
                    </div>
                    <p class="text-xs text-gray-400">Last edited ${timeAgo}</p>
                </div>
            </div>
        </div>
    `;
}

function getProgressSteps() {
    // Each step is completed if the corresponding pinned value exists
    return [
        !!dashboardState.pinnedType,
        !!dashboardState.pinnedSubtype,
        !!dashboardState.pinnedTheme,
        !!dashboardState.pinnedPlayers
    ];
}
