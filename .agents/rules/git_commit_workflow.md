# Git Commit and Branch Syncing Workflow

Whenever the user asks to **commit and save changes**:

1. **Commit on Current Branch**:
   - Stage relevant files (`git add ...`).
   - Commit with a clear, descriptive message (`git commit -m "..."`).

2. **Sync Across All Local Branches**:
   - Checkout or merge the changes into all key local branches (e.g. `main`, `add-Backend`, `feature-login-signup`).
   - Ensure working tree remains clean and return to the user's primary feature branch.

3. **Push to Remote Fork (`origin`)**:
   - Push updated branches to `origin` (`git push origin <branch>`).

4. **Report Status**:
   - Display a summary of all local and remote branches indicating their updated commit status.
