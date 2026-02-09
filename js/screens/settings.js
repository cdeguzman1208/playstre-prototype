// settings.js

/* ---------------- Mock Data ---------------- */

const mockNotificationSettings = [
    { id: 1, label: 'Email Notifications', enabled: true },
    { id: 2, label: 'Push Notifications', enabled: false },
    { id: 3, label: 'SMS Alerts', enabled: false },
];

const mockBillingPlans = [
    { id: 1, plan: 'Free', description: 'Basic access, limited AI usage', price: '$0/month' },
    { id: 2, plan: 'Pro', description: 'Full AI access, priority support', price: '$9.99/month' },
];

/* ---------------- Render Functions ---------------- */

function renderSettingsScreen() {
    return `
        <div class="min-h-screen bg-gray-950 text-gray-100">
            ${renderTopHeader({ pageTitle: 'Settings' })}

            <div class="max-w-6xl mx-auto px-8 pt-24 pb-16 space-y-12">

                <!-- Account Settings -->
                <section class="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-6">
                    <h2 class="text-2xl font-bold text-white">Account Settings</h2>

                    <!-- Username -->
                    <div class="flex flex-col md:flex-row md:items-center gap-4">
                        <label class="w-40 text-gray-300 font-semibold">Username</label>
                        <input type="text" placeholder="Enter your username" class="flex-1 px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-blue-500 transition" />
                    </div>

                    <!-- Password -->
                    <div class="flex flex-col md:flex-row md:items-center gap-4">
                        <label class="w-40 text-gray-300 font-semibold">Password</label>
                        <input type="password" placeholder="Enter new password" class="flex-1 px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-blue-500 transition" />
                    </div>

                    <!-- Delete Account -->
                    <div class="flex flex-col md:flex-row md:items-center gap-4">
                        <label class="w-40 text-gray-300 font-semibold">Danger Zone</label>
                        <button class="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-white font-semibold transition">Delete My Account</button>
                    </div>
                </section>

                <!-- Notifications -->
                <section class="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-4">
                    <h2 class="text-2xl font-bold text-white">Notifications</h2>
                    ${mockNotificationSettings.map(setting => `
                        <div class="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-xl p-4">
                            <span>${setting.label}</span>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" ${setting.enabled ? 'checked' : ''} class="sr-only peer" />
                                <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-500 transition-colors"></div>
                                <span class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></span>
                            </label>
                        </div>
                    `).join('')}
                </section>

                <!-- Billing & Plans -->
                <section class="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-4">
                    <h2 class="text-2xl font-bold text-white">Billing & Plans</h2>
                    ${mockBillingPlans.map(plan => `
                        <div class="flex flex-col md:flex-row md:items-center justify-between bg-gray-800 border border-gray-700 rounded-xl p-4">
                            <div>
                                <h3 class="font-semibold text-white">${plan.plan}</h3>
                                <p class="text-gray-400 text-sm">${plan.description}</p>
                            </div>
                            <span class="text-gray-200 font-semibold">${plan.price}</span>
                        </div>
                    `).join('')}
                    <button class="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-semibold transition">Upgrade Plan</button>
                </section>

                <!-- Legal & Misc -->
                <section class="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-4">
                    <h2 class="text-2xl font-bold text-white">Legal & Misc</h2>
                    <div class="flex flex-col gap-3">
                        <button class="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-100 transition text-left">Terms of Service</button>
                        <button class="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-100 transition text-left">Privacy Policy</button>
                        <button class="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-100 transition text-left">Contact Support</button>
                    </div>
                </section>

            </div>
        </div>
    `;
}

/* ---------------- Init Functions ---------------- */

function initSettingsScreen() {
    initSidebar();
    initTopHeader();

    const menuButton = document.getElementById('menu-button');
    if (menuButton) menuButton.onclick = () => openSidebar();
}

/* ---------------- Export ---------------- */

window.renderSettingsScreen = renderSettingsScreen;
window.initSettingsScreen = initSettingsScreen;
