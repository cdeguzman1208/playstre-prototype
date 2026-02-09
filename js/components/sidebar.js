function initSidebar() {
    if (document.getElementById('sidebar-overlay')) return;

    const sidebarHtml = `
    <div id="sidebar-overlay" class="fixed inset-0 z-[9999] hidden pointer-events-none">
        <div id="sidebar-backdrop" class="absolute inset-0 bg-black/50 z-[9998]"></div>
            <aside id="sidebar"
                class="fixed left-0 top-0 h-full w-64 bg-gray-900
                    transform -translate-x-full
                    transition-transform duration-300 ease-out
                    shadow-xl z-80 pointer-events-auto z-[9999]">

                <div class="p-6 flex justify-between items-center border-b border-gray-800">
                    <h2 class="text-lg font-semibold text-white">Playstre</h2>
                    <button id="close-sidebar" class="text-gray-400 hover:text-white">✕</button>
                </div>

                <nav class="p-4 space-y-2">
                    <button data-route="home" class="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-800">Home</button>
                    <button data-route="store" class="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-800">Store</button>
                    <button data-route="social" class="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-800">Social</button>
                    <button data-route="profile" class="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-800">Profile</button>
                    <button data-route="settings" class="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-800">Settings</button>
                </nav>
            </aside>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', sidebarHtml);

    document.getElementById('sidebar-backdrop').onclick = closeSidebar;
    document.getElementById('close-sidebar').onclick = closeSidebar;

    document.querySelectorAll('[data-route]').forEach(btn => {
        btn.onclick = () => {
            const route = btn.dataset.route;
            closeSidebar();
            if (window.currentRoute === route) return;
            navigateTo(route);
        };
    });
}

function openSidebar() {
    const overlay = document.getElementById('sidebar-overlay');
    const sidebar = document.getElementById('sidebar');

    overlay.classList.remove('hidden');
    overlay.classList.remove('pointer-events-none'); // enable clicks
    requestAnimationFrame(() => sidebar.classList.remove('-translate-x-full'));
}

function closeSidebar() {
    const overlay = document.getElementById('sidebar-overlay');
    const sidebar = document.getElementById('sidebar');

    sidebar.classList.add('-translate-x-full');
    setTimeout(() => overlay.classList.add('hidden'), 300);
    overlay.classList.add('pointer-events-none'); // disable clicks while hidden
}

window.initSidebar = initSidebar;
window.openSidebar = openSidebar;
window.closeSidebar = closeSidebar;
