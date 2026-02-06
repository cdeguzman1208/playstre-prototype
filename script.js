// Main entry point - Playstre App

// Initialize app on load
document.addEventListener('DOMContentLoaded', () => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('playstre_user');
    const savedGames = localStorage.getItem('playstre_games');
    
    // Register screens first
    registerScreen('auth', renderAuthScreen, initAuthScreen);
    registerScreen('home', renderHomeScreen, initHomeScreen);
    registerScreen('editor', renderEditorScreen, initEditorScreen);
    registerScreen('search', renderSearchScreen, initSearchScreen);
    registerScreen('create', renderBuilderScreen, initBuilderScreen);
    registerScreen('game', renderGameScreen, initGameScreen);
    registerScreen('profile', renderProfileScreen, initProfileScreen);
    registerScreen('settings', renderSettingsScreen, initSettingsScreen);
    
    // Load user state and show appropriate screen
    if (savedUser) {
        appState.currentUser = JSON.parse(savedUser);
        appState.isAuthenticated = true;
        appState.createdGames = savedGames ? JSON.parse(savedGames) : [];
        showAppShell();
    } else {
        appState.isAuthenticated = false;
        showAuthScreen();
    }
});

function showAuthScreen() {
    console.log('showAuthScreen: isAuthenticated =', appState.isAuthenticated);
    appState.isAuthenticated = false;
    updateAppShell();
    navigateTo('auth');
    console.log('showAuthScreen: #app.innerHTML length =', document.getElementById('app')?.innerHTML?.length || 0);
}

function showAppShell() {
    console.log('showAppShell: isAuthenticated =', appState.isAuthenticated);
    appState.isAuthenticated = true;
    updateAppShell();
    navigateTo('home');
    console.log('showAppShell: #app.innerHTML length =', document.getElementById('app')?.innerHTML?.length || 0);
}

function logout() {
    console.log('Logging out');

    // Clear persisted data
    localStorage.removeItem('playstre_user');
    localStorage.removeItem('playstre_games');

    // Reset app state
    appState.currentUser = null;
    appState.createdGames = [];
    appState.isAuthenticated = false;

    // Go back to auth screen
    showAuthScreen();
}
