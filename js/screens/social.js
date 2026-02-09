// social.js

const sampleUsers = [
    { id: 1, name: 'Cromwell', emoji: '🎸', mutual: true },
    { id: 2, name: 'Beatrice', emoji: '🎤', mutual: true },
    { id: 3, name: 'Luna', emoji: '🌙', mutual: false },
    { id: 4, name: 'Kai', emoji: '🕹️', mutual: false },
    { id: 5, name: 'Rin', emoji: '🎮', mutual: true },
];

const sampleFriendRequests = [
    { id: 6, name: 'Echo', emoji: '🎧' },
    { id: 7, name: 'Nova', emoji: '🛸' },
];

const sampleMessages = [
    { id: 1, from: 'Cromwell', message: 'Hey! Ready to test the new game?', time: '2m ago' },
    { id: 2, from: 'Beatrice', message: 'Check out this crazy level I made!', time: '10m ago' },
    { id: 3, from: 'Luna', message: 'Are you joining tonight?', time: '1h ago' },
];

// ---------------- Render Social Screen ----------------

function renderSocialScreen() {
    const tabsHtml = `
        <div class="flex gap-4 border-b border-gray-800 mb-6">
            <button class="social-tab px-4 py-2 rounded-md font-semibold hover:bg-gray-800 transition-colors" data-tab="followers">Followers</button>
            <button class="social-tab px-4 py-2 rounded-md font-semibold hover:bg-gray-800 transition-colors" data-tab="following">Following</button>
            <button class="social-tab px-4 py-2 rounded-md font-semibold hover:bg-gray-800 transition-colors" data-tab="requests">Friend Requests</button>
            <button class="social-tab px-4 py-2 rounded-md font-semibold hover:bg-gray-800 transition-colors" data-tab="messages">Messages</button>
        </div>
    `;

    return `
        <div class="min-h-screen bg-gray-950 text-gray-100">
            ${renderTopHeader({ pageTitle: 'Social' })}

            <!-- Page Container -->
            <div class="max-w-6xl mx-auto px-8 pt-24 pb-16">
                <h1 class="text-4xl font-bold mb-8 text-left">Social</h1>
                ${tabsHtml}
                <div id="social-content">
                    ${renderSocialFollowers()} <!-- Default tab -->
                </div>
            </div>
        </div>
    `;
}

// ---------------- Init Social Screen ----------------

function initSocialScreen() {
    initSidebar();
    initTopHeader();

    const tabButtons = document.querySelectorAll('.social-tab');
    const contentContainer = document.getElementById('social-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('tab-active', 'bg-gray-800'));
            btn.classList.add('tab-active', 'bg-gray-800');

            const tab = btn.dataset.tab;
            let html = '';
            switch(tab) {
                case 'followers': html = renderSocialFollowers(); break;
                case 'following': html = renderSocialFollowing(); break;
                case 'requests': html = renderFriendRequests(); break;
                case 'messages': html = renderSocialMessages(); break;
            }
            contentContainer.innerHTML = html;
        });
    });
}

// ---------------- Tab Render Functions ----------------

function renderSocialFollowers() {
    return `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${sampleUsers.map(user => `
            <div class="bg-gray-900 rounded-xl p-4 flex items-center gap-3 border border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer">
                <div class="text-3xl">${user.emoji}</div>
                <div class="flex-1 min-w-0">
                    <p class="font-semibold text-gray-100">${user.name}</p>
                    <p class="text-xs text-gray-400">${user.mutual ? 'Mutual' : 'Follower'}</p>
                </div>
                <button class="px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 rounded-md text-white">Message</button>
            </div>
        `).join('')}
    </div>
    `;
}

function renderSocialFollowing() {
    return `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${sampleUsers.map(user => `
            <div class="bg-gray-900 rounded-xl p-4 flex items-center gap-3 border border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer">
                <div class="text-3xl">${user.emoji}</div>
                <div class="flex-1 min-w-0">
                    <p class="font-semibold text-gray-100">${user.name}</p>
                    <p class="text-xs text-gray-400">${user.mutual ? 'Mutual' : 'Following'}</p>
                </div>
                <button class="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded-md text-white">Unfollow</button>
            </div>
        `).join('')}
    </div>
    `;
}

function renderFriendRequests() {
    return `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${sampleFriendRequests.map(user => `
            <div class="bg-gray-900 rounded-xl p-4 flex items-center gap-3 border border-gray-800 hover:bg-gray-800 transition-colors">
                <div class="text-3xl">${user.emoji}</div>
                <div class="flex-1 min-w-0">
                    <p class="font-semibold text-gray-100">${user.name}</p>
                    <p class="text-xs text-gray-400">Sent you a friend request</p>
                </div>
                <div class="flex gap-2">
                    <button class="px-3 py-1 text-xs bg-green-500 hover:bg-green-600 rounded-md text-white">Accept</button>
                    <button class="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 rounded-md text-white">Decline</button>
                </div>
            </div>
        `).join('')}
    </div>
    `;
}

function renderSocialMessages() {
    return `
    <div class="flex flex-col gap-4">
        ${sampleMessages.map(msg => `
            <div class="bg-gray-900 rounded-xl p-4 border border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer">
                <p class="font-semibold text-gray-100">${msg.from}</p>
                <p class="text-gray-400 text-sm">${msg.message}</p>
                <p class="text-xs text-gray-500 mt-1">${msg.time}</p>
            </div>
        `).join('')}
    </div>
    `;
}

// ---------------- Export ----------------

window.renderSocialScreen = renderSocialScreen;
window.initSocialScreen = initSocialScreen;
