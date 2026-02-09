// Store Screen (Discovery)

function renderStoreScreen() {
    return `
        <div class="min-h-screen bg-gray-950 text-gray-100">
            ${renderTopHeader({ pageTitle: 'Discover' })}

            <!-- Page Container -->
            <div class="max-w-6xl mx-auto px-8 pt-24 pb-16">
                <!-- Page Title -->
                <div class="mb-12">
                    <h1 class="text-4xl font-bold text-white mb-3">
                        Discover
                    </h1>
                    <p class="text-lg text-gray-400">
                        Explore games, creators, and ideas from the Playstre community
                    </p>
                </div>

                <!-- Search -->
                <div class="mb-14 max-w-auto">
                    <input
                        id="store-search"
                        type="text"
                        placeholder="Search games, genres, or creators..."
                        class="w-full px-6 py-4 text-lg rounded-xl bg-gray-900 border border-gray-800 text-gray-200 focus:outline-none focus:border-blue-500 transition"
                    />

                    <!-- Filters -->
                    <div class="flex flex-wrap gap-2 mt-4">
                        ${['All', 'Racing', 'Shooting', 'Cards', 'Multiplayer', 'Single Player']
                            .map(label => `
                                <button
                                    class="store-filter px-4 py-1.5 rounded-full text-sm
                                           bg-gray-900 border border-gray-800
                                           text-gray-300 hover:text-blue-400 hover:border-blue-500 transition"
                                >
                                    ${label}
                                </button>
                            `).join('')}
                    </div>
                </div>

                <!-- Featured -->
                <section class="mb-20">
                    <h2 class="text-2xl font-semibold mb-6">Featured</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        ${mockStoreGames.slice(0, 3).map(game => featuredCard(game)).join('')}
                    </div>
                </section>

                <!-- Top Games -->
                <section class="mb-20">
                    <h2 class="text-2xl font-semibold mb-6">Top Games</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        ${mockStoreGames.slice(0,6).map(game => standardGameCard(game)).join('')}
                    </div>
                </section>

                <!-- Top Creators -->
                <section class="mb-20">
                    <h2 class="text-2xl font-semibold mb-6">Top Creators</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        ${mockCreators.map(c => creatorCard(c)).join('')}
                    </div>
                </section>

                <!-- For You -->
                <section>
                    <h2 class="text-2xl font-semibold mb-6">For You</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        ${mockStoreGames.map(game => standardGameCard(game)).join('')}
                    </div>
                </section>

            </div>
        </div>
    `;
}

function initStoreScreen() {
    initSidebar();
    initTopHeader();

    const menuButton = document.getElementById('menu-button');
    if (menuButton) {
        menuButton.onclick = () => openSidebar();
    }

    // Filter highlight behavior (visual only)
    document.querySelectorAll('.store-filter').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.store-filter').forEach(b =>
                b.classList.remove('border-blue-500', 'text-blue-400')
            );
            btn.classList.add('border-blue-500', 'text-blue-400');
        };
    });
}

/* ---------------- Mock Data ---------------- */

const mockStoreGames = [
    { id: 1, title: 'Neon Drift', emoji: '🏎️', creator: 'Alex', plays: 1200 },
    { id: 2, title: 'Pixel Blaster', emoji: '🔫', creator: 'Nova', plays: 980 },
    { id: 3, title: 'Card Kings', emoji: '🃏', creator: 'Luna', plays: 860 },
    { id: 4, title: 'Space Odyssey', emoji: '🚀', creator: 'Kai', plays: 740 },
    { id: 5, title: 'Dungeon Quest', emoji: '🗡️', creator: 'Mia', plays: 650 },
    { id: 6, title: 'Puzzle Mania', emoji: '🧩', creator: 'Zane', plays: 430 },
    { id: 7, title: 'Cyber Run', emoji: '🤖', creator: 'Aria', plays: 510 },
    { id: 8, title: 'Magic Gardens', emoji: '🌸', creator: 'Leo', plays: 390 },
    { id: 9, title: 'Battle Arena', emoji: '⚔️', creator: 'Nina', plays: 780 },
    { id: 10, title: 'Sky High', emoji: '🛩️', creator: 'Jax', plays: 320 },
    { id: 11, title: 'Zombie Rush', emoji: '🧟', creator: 'Ella', plays: 600 },
    { id: 12, title: 'Ocean Explorer', emoji: '🌊', creator: 'Finn', plays: 270 },
    { id: 13, title: 'Stealth Ops', emoji: '🕵️', creator: 'Rico', plays: 480 },
    { id: 14, title: 'Candy Clash', emoji: '🍬', creator: 'Sophie', plays: 530 },
    { id: 15, title: 'Star Warriors', emoji: '⭐', creator: 'Leo', plays: 910 }
];

const mockCreators = [
    { id: 1, name: 'Tanya', games: 12 },
    { id: 2, name: 'Cromwell', games: 9 },
    { id: 3, name: 'TJ', games: 15 }
];

/* ---------------- Cards ---------------- */

function featuredCard(game) {
    return `
        <div class="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-blue-500 transition cursor-pointer">
            <div class="text-5xl mb-4">${game.emoji}</div>
            <h3 class="text-xl font-semibold text-white mb-2">${game.title}</h3>
            <p class="text-gray-400 text-sm">by ${game.creator}</p>
        </div>
    `;
}

function standardGameCard(game) {
    return `
        <div class="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition cursor-pointer">
            <div class="text-4xl mb-3">${game.emoji}</div>
            <h4 class="font-semibold text-gray-100 mb-1">${game.title}</h4>
            <p class="text-xs text-gray-400">${game.plays} plays</p>
        </div>
    `;
}

function creatorCard(creator) {
    return `
        <div class="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition cursor-pointer">
            <div class="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-lg font-bold mb-4">
                ${creator.name.charAt(0)}
            </div>
            <h4 class="font-semibold text-gray-100">${creator.name}</h4>
            <p class="text-xs text-gray-400">${creator.games} games</p>
        </div>
    `;
}
