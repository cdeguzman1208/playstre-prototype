# Project Setup & GitHub Workflow

You do **not** need to use the terminal at any point — everything can be done with buttons and menus.

> ⚠️ **Important**
> - Changes are **NOT deployed** to the live GitHub Pages site until they are **merged into the `main` branch**.
> - You will always work on your **own branch**, not `main`.

---

## 0. What You Need Before Starting

### Create a GitHub account
1. Go to https://github.com
2. Click **Sign up**
3. Follow the steps (email, username, password)

### Install Visual Studio Code
1. Download from https://code.visualstudio.com/
2. Install normally

### Sign into GitHub inside VS Code
1. Open VS Code
2. Click the **Accounts icon** (bottom-left corner)
3. Sign in to GitHub when prompted

---

## 1. Clone the Repository

Cloning means downloading the project onto your computer.

1. Open **VS Code**
2. On the Welcome screen, click **Clone Git Repository**
   - If you don’t see it:
     - Press `Ctrl + Shift + P`
     - Type **Clone**
     - Select **Git: Clone**

3. When prompted for a repository URL:
   - Go to the GitHub repository in your browser
   - Click the green **Code** button
   - Make sure **HTTPS** is selected
   - Click **Copy**

4. Paste the URL into VS Code and press **Enter**

5. Choose a folder on your computer to store the project

6. When VS Code asks  
   **“Would you like to open the cloned repository?”**  
   → Click **Open**

✅ The project is now on your machine

---

## 2. Open the Project in Visual Studio Code

If it didn’t open automatically:

1. Open **VS Code**
2. Click **File → Open Folder**
3. Select the project folder you cloned
4. Click **Open**

You should now see the file tree on the left.

---

## 3. Project File Structure
```
js/
 ├─ screens/        ← all individual pages/components
 │   ├─ home.js
 │   ├─ editor.js
 │   └─ etc...
 ├─ data.js
 ├─ navigation.js

index.html
script.js
```

### Where you’ll usually work
- `js/screens/` → page logic & UI
- `index.html` → base HTML
- `script.js` → main entry logic

---

## 4. Preview the Website Locally (Live Preview)

You can preview your changes before deploying.

### Install Live Preview
1. In VS Code, click the **Extensions** icon (left sidebar)
2. Search for **Live Preview**
3. Install **Live Preview by Microsoft**

### Start the preview
1. Open `index.html`
2. Right-click inside the file
3. Select **Open with Live Preview** or **Show Preview**

🚀 The site will open in a local browser window and auto-refresh when you save.

---

## 5. Create a New Branch (Do NOT Work on Main)

You should never edit `main` directly.

1. Look at the **bottom-left corner** of VS Code
2. Click the branch name (likely `main`)
3. Select **Create new branch**
4. Name it something descriptive, for example:
   - `yourname-feature`
   - `fix-editor-ui`
   - `home-page-update`

5. Press **Enter**

✅ You are now working on your own branch

---

## 6. Make Changes

1. Open any file (for example `js/screens/home.js`)
2. Edit and save your changes
3. Repeat as needed

VS Code automatically tracks all changes.

---

## 7. Commit Your Changes

A commit saves a snapshot of your work.

1. Click the **Source Control** icon (left sidebar)
2. Review the list of changed files

3. In the **Message** box at the top, write a short message:
```
update home screen layout
```


4. Click **Commit**

✅ Changes are now saved locally

---

## 8. Push Your Branch to GitHub

Pushing uploads your work to GitHub.

1. After committing, click **Sync Changes** or **Push**
2. If prompted to publish the branch, confirm

✅ Your branch is now on GitHub

---

## 9. Open a Pull Request (Merge Into Main)

This is how changes get deployed.

1. Go to the repository on **GitHub.com**
2. Look for the banner:
**“Your branch had recent pushes”**
3. Click **Compare & pull request**

4. Add:
- A clear title
- A short description of what you changed

5. Click **Create pull request**

🚨 **Do NOT merge unless it is safe. I will check the pull request for conflicts.**

---

## 10. Deployment Reminder

- GitHub Pages deploys **only from `main`**
- Your changes go live **after**:
1. The pull request is approved
2. It is merged into `main`

---

## Quick Workflow Summary

1. Clone repo  
2. Create new branch  
3. Make changes  
4. Preview with Live Preview  
5. Commit  
6. Push  
7. Open pull request  
8. Merge → deploy 🎉

---

If anything feels confusing or broken, ask before merging — Git is forgiving if we’re careful 🙂
