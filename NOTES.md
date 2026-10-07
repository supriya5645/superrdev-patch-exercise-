# NOTES

## Summary of changes
1. **Backend / Database**: Fixed the SQL operator precedence bug in `TaskRepository.java`, `db/queries/search_tasks.sql`, and `db/oracle/task_search_package.sql`. Previously, the lack of parentheses around the `OR` condition for title and description meant archived tasks could unintentionally appear in search results.
2. **Backend**: Removed the artificial `Thread.sleep` delay in `TaskController.java` which artificially slowed down requests, particularly those with short search terms.
3. **Frontend**: Implemented debouncing in `useTasks.js` (300ms) to prevent excessive API calls while typing, and added a cleanup function with an `ignore` flag to avoid race conditions where stale network responses might overwrite newer ones.
4. **Frontend**: Fixed pagination in `App.jsx` so that changing the search query or status filter correctly resets the view to page 1.

## What you chose not to change and why
I chose not to implement advanced features from the task list (like dark mode, bulk assignment, or role-based access control). The goal of this exercise was fixing high-value existing bugs, and those would require larger scope changes and risk introducing new issues. I also did not change the architecture or add external libraries for things like debouncing, as a simple `setTimeout` is sufficient and avoids bloat.

## The biggest remaining risk you see in this codebase
The biggest remaining risk is the lack of proper request validation in the backend. Currently, the `TaskController` accepts arbitrary input for parameters like `page` and `pageSize`, which could lead to excessively large database queries (e.g. `pageSize=1000000`). Additionally, `pageSize` is not clamped, exposing the app to potential Denial of Service (DoS) attacks.

## What tools/AI you used and how
I used an AI assistant to quickly analyze the full-stack structure and trace the search bugs spanning across the frontend hooks, backend controller, and SQL queries.
