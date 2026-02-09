/* ---------------- Mock Data ---------------- */

const mockPronouns = ['He/Him', 'She/Her', 'They/Them', 'Other'];

/* ---------------- State ---------------- */

const profileState = {
    name: 'John Doe',
    pronouns: 'He/Him',
    bio: '"We all make choices in life, but in the end our choices make us." – Andrew Ryan, BioShock',
    editingProfile: false,
    editingAvatar: false
};

/* ---------------- Render Functions ---------------- */

function renderProfileScreen() {
    const { name, pronouns, bio, editingProfile, editingAvatar } = profileState;

    // Profile info section
    const profileInfoHtml = editingProfile
        ? `
        <div class="space-y-4 flex-1">
            <div class="flex flex-col md:flex-row md:items-center gap-4">
                <label class="w-32 text-gray-300 font-semibold">Name</label>
                <input id="profile-name" type="text" value="${name}" class="flex-1 px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-blue-500 transition" />
            </div>
            <div class="flex flex-col md:flex-row md:items-center gap-4">
                <label class="w-32 text-gray-300 font-semibold">Pronouns</label>
                <select id="profile-pronouns" class="flex-1 px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-blue-500 transition">
                    ${mockPronouns.map(p => `<option ${p === pronouns ? 'selected' : ''}>${p}</option>`).join('')}
                </select>
            </div>
            <div class="flex flex-col md:flex-row md:items-start gap-4">
                <label class="w-32 text-gray-300 font-semibold">Bio</label>
                <textarea id="profile-bio" rows="3" class="flex-1 px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-blue-500 transition resize-none">${bio}</textarea>
            </div>
            <div class="flex gap-4 mt-2">
                <button id="save-profile-btn" class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition">Save Profile</button>
                <button id="cancel-edit-btn" class="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition">Cancel</button>
            </div>
        </div>
        `
        : `
        <div class="flex-1 space-y-2">
            <h1 class="text-4xl font-bold text-white">${name}</h1>
            <p class="text-gray-400">${pronouns}</p>
            <p class="text-gray-300">${bio}</p>
            <div class="flex gap-4 mt-4">
                <button id="edit-profile-btn" class="mt-14 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition">Edit Profile</button>
                <button id="edit-avatar-btn" class="mt-14 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition">Edit Avatar</button>
            </div>
        </div>
        `;

    // Main rectangular avatar preview
    const mainAvatarHtml = `
        <div class="w-full h-72 md:h-96 bg-gray-800 border border-gray-700 rounded-2xl flex items-center justify-center text-gray-500 text-2xl">
            Main Avatar Preview
        </div>
    `;

    // Avatar customization options (shown only when editing)
    const avatarOptionsHtml = editingAvatar
        ? `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-6">
            <div class="flex flex-col gap-2">
                <label class="text-gray-300 font-semibold">Head</label>
                <div class="bg-gray-700 rounded-xl h-24 flex items-center justify-center text-gray-400">Select Head</div>
            </div>
            <div class="flex flex-col gap-2">
                <label class="text-gray-300 font-semibold">Hair</label>
                <div class="bg-gray-700 rounded-xl h-24 flex items-center justify-center text-gray-400">Select Hair</div>
            </div>
            <div class="flex flex-col gap-2">
                <label class="text-gray-300 font-semibold">Eyes</label>
                <div class="bg-gray-700 rounded-xl h-24 flex items-center justify-center text-gray-400">Select Eyes</div>
            </div>
            <div class="flex flex-col gap-2">
                <label class="text-gray-300 font-semibold">Clothes</label>
                <div class="bg-gray-700 rounded-xl h-24 flex items-center justify-center text-gray-400">Select Clothes</div>
            </div>
            <div class="flex flex-col gap-2">
                <label class="text-gray-300 font-semibold">Accessories</label>
                <div class="bg-gray-700 rounded-xl h-24 flex items-center justify-center text-gray-400">Select Accessories</div>
            </div>
            <div class="flex flex-col gap-2">
                <label class="text-gray-300 font-semibold">&nbsp;</label>
                <div class="flex gap-2">
                    <button id="randomize-avatar-btn" class="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-xl text-white font-semibold transition">Randomize</button>
                    <button id="reset-avatar-btn" class="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-white font-semibold transition">Reset</button>
                </div>
            </div>
        </div>
        <button id="save-avatar-btn" class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition mt-4">Save Avatar</button>
        ` : ``;

    // Small circular avatar (next to profile info)
    const smallAvatarHtml = `
        <div class="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gray-800 border-4 border-gray-700 flex items-center justify-center text-gray-500 text-xl">
            Avatar
        </div>
    `;

    return `
    <div class="min-h-screen bg-gray-950 text-gray-100">
        ${renderTopHeader({ pageTitle: 'Profile' })}
        <div class="max-w-6xl mx-auto px-8 pt-24 pb-16 space-y-6">

            <!-- Main Avatar Preview + options -->
            <section>
                ${mainAvatarHtml}
                ${avatarOptionsHtml}
            </section>

            <!-- Profile Info with small avatar -->
            <section class="bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col md:flex-row md:items-center gap-8">
                ${smallAvatarHtml}
                ${profileInfoHtml}
            </section>

        </div>
    </div>
    `;
}


/* ---------------- Init Functions ---------------- */

function initProfileScreen() {
    initSidebar();
    initTopHeader();

    const menuButton = document.getElementById('menu-button');
    if (menuButton) menuButton.onclick = () => openSidebar();

    // Attach click listeners after render
    setTimeout(() => {
        // Profile edit/save
        const editProfileBtn = document.getElementById('edit-profile-btn');
        const saveProfileBtn = document.getElementById('save-profile-btn');
        const cancelProfileBtn = document.getElementById('cancel-edit-btn'); // <- new
    
        if (editProfileBtn) editProfileBtn.onclick = () => {
            profileState.editingProfile = true;
            rerenderProfile();
        };
    
        if (saveProfileBtn) saveProfileBtn.onclick = () => {
            profileState.name = document.getElementById('profile-name').value;
            profileState.pronouns = document.getElementById('profile-pronouns').value;
            profileState.bio = document.getElementById('profile-bio').value;
            profileState.editingProfile = false;
            rerenderProfile();
        };
    
        if (cancelProfileBtn) cancelProfileBtn.onclick = () => {
            // Simply exit editing mode without saving changes
            profileState.editingProfile = false;
            rerenderProfile();
        };
    
        // Avatar edit/save
        const editAvatarBtn = document.getElementById('edit-avatar-btn');
        const saveAvatarBtn = document.getElementById('save-avatar-btn');
        if (editAvatarBtn) editAvatarBtn.onclick = () => {
            profileState.editingAvatar = true;
            rerenderProfile();
        };
        if (saveAvatarBtn) saveAvatarBtn.onclick = () => {
            profileState.editingAvatar = false;
            rerenderProfile();
        };
    }, 50);
    
}

/* ---------------- Helper ---------------- */

function rerenderProfile() {
    const app = document.getElementById('app');
    if (!app) {
        console.error('App container not found');
        return;
    }

    app.innerHTML = renderProfileScreen();
    initProfileScreen();
}


/* ---------------- Export ---------------- */

window.renderProfileScreen = renderProfileScreen;
window.initProfileScreen = initProfileScreen;
