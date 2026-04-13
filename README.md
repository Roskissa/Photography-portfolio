Run local
pnpm run dev

Webp conversion
magick mogrify -path web -resize 2560x -format webp -quality 50 \*.jpg

First Time Setup
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

Initialize Project
git init

Connect to GitHub later:
git remote add origin <your-repo-url>

Daily Workflow

1. Check changes
   git status

2. Add files
   git add .

3. Commit
   git commit -m "Your message"

4. Push
   git push origin main

Inspect Changes
git diff # Unstaged changes
git diff --staged # Staged changes
git log # Commit history

Branching
Create and switch:
git checkout -b feature/my-feature

Switch branch:
git checkout main

Merge into main:
git checkout main
git merge feature/my-feature

Sync With Remote
Pull latest changes:
git pull

Push branch:
git push origin feature/my-feature

Undo / Fix
Unstage file:
git reset <file>

Discard all local changes
git reset --hard

Stash (Temporary Save)
Save work:
git stash

Restore:
git stash pop

Rebase (Clean History)
git checkout main
git pull
git checkout feature/my-feature
git rebase main

.gitignore
node_modules
dist
.env
.vite
.DS_Store
\*.log
