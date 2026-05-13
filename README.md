The application is runs:

- Laravel app: http://localhost (port 80)
- Vite dev server: http://localhost:5173

Verwaltung test user: admin@wagner.test

Use these commands:

- ./vendor/bin/sail up -d - Start Sail containers
- ./vendor/bin/sail down - Stop Sail containers
- ./vendor/bin/sail artisan ... - Run artisan commands
- ./vendor/bin/sail npm run dev - Start Vite (already running in background)
- ./vendor/bin/sail composer ... - Run composer commands

Optional: Add alias to ~/.zshrc:
alias sail='./vendor/bin/sail'
