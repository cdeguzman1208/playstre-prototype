// auth.js
// Mock Auth Screen (Sign In)

/* =========================
   Render Auth Screen
========================= */

function renderAuthScreen(params) {
    return `
        <div class="min-h-screen flex flex-col items-center justify-center px-6">
            <div class="text-center mb-8 fade-in">
                <h1 class="text-5xl font-bold text-gray-900 mb-2">Playstre</h1>
                <p class="text-gray-600 text-base">Create games in seconds with AI</p>
            </div>

            <div class="w-full max-w-sm space-y-4">
                <input
                    type="text"
                    id="signin-username"
                    placeholder="Username"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    id="signin-password"
                    placeholder="Password"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    id="signin-btn"
                    class="w-full px-6 py-4 bg-blue-500 text-white rounded-xl font-semibold text-base active:bg-blue-600 transition-all duration-300 shadow-lg active:scale-95"
                >
                    Sign In
                </button>

                <div class="flex items-center gap-3 my-2">
                    <div class="flex-1 h-px bg-gray-200"></div>
                    <span class="text-xs text-gray-400">or</span>
                    <div class="flex-1 h-px bg-gray-200"></div>
                </div>

                <button
                    id="google-signin-btn"
                    class="w-full px-6 py-4 border border-gray-300 rounded-xl font-semibold text-base flex items-center justify-center gap-3 hover:bg-gray-50 transition-all active:scale-95"
                >
                    <!-- Replace with an icon later if desired -->
                    <span class="text-lg">G</span>
                    Sign in with Google
                </button>

                <p class="text-xs text-gray-500 text-center">
                    This is a mock sign-in. No real authentication required.
                </p>
            </div>
        </div>
    `;
}

/* =========================
   Init Auth Screen
========================= */

function initAuthScreen() {
    document.getElementById('signin-btn')?.addEventListener('click', handleSignIn);
    document
        .getElementById('google-signin-btn')
        ?.addEventListener('click', handleGoogleSignIn);

    const usernameInput = document.getElementById('signin-username');
    const passwordInput = document.getElementById('signin-password');

    [usernameInput, passwordInput].forEach(input => {
        input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSignIn();
        });
    });
}

/* =========================
   Local Sign In (Mock)
========================= */

function handleSignIn() {
    const usernameInput = document.getElementById('signin-username');
    const passwordInput = document.getElementById('signin-password');

    if (!usernameInput || !passwordInput) return;

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        alert('Please enter a username and password');
        return;
    }

    completeMockAuth({
        username,
        provider: 'local'
    });
}

/* =========================
   Google Sign In (Mock)
========================= */

function handleGoogleSignIn() {
    // Fake Google user
    completeMockAuth({
        username: 'google_user',
        email: 'user@gmail.com',
        provider: 'google'
    });
}

/* =========================
   Shared Mock Auth Handler
========================= */

function completeMockAuth({ username, email = null, provider }) {
    appState.currentUser = {
        id: `user_${Date.now()}`,
        username,
        email,
        provider,
        avatar: username.charAt(0).toUpperCase()
    };

    appState.isAuthenticated = true;

    localStorage.setItem(
        'playstre_user',
        JSON.stringify(appState.currentUser)
    );

    // Show app shell
    const appShell = document.getElementById('app-shell');
    if (appShell) {
        appShell.style.display = 'flex';
    }

    // Update UI + navigate
    updateAppShell();
    navigateTo('home');
}
