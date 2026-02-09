// header.js
function renderTopHeader(options = {}) {
    // options can include pageTitle, showLogout, custom buttons
    const { pageTitle = '', showLogout = true } = options;

    return `
    <div id="top-header" class="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 h-16">
        <button id="menu-button" class="text-gray-200 hover:text-white text-lg transition">☰</button>
        <button id="logout-btn" class="text-gray-200 hover:text-white text-sm transition">Log out</button>
    </div>
    `;
}

function initTopHeader() {
    const menuButton = document.getElementById('menu-button');
    if (menuButton) menuButton.onclick = () => openSidebar();

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.onclick = () => {
        const confirmed = confirm('Log out?');
        if (confirmed) logout();
    };
}

// expose globally
window.renderTopHeader = renderTopHeader;
window.initTopHeader = initTopHeader;
