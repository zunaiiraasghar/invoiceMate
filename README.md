# InvoiceMate SaaS — AI-enabled

A Flask + SQLite invoice-management project with an AI chatbot.

## Features
- Register, log in, and log out
- Dashboard with sales and unpaid totals
- Add customers and products
- Create invoices and toggle Paid / Unpaid status
- Printable invoice page (use browser Print → Save as PDF)
- InvoiceMate AI chatbot on the Home page and Dashboard
- AI answers can use the signed-in user's own invoice totals and recent invoice records
- Offline helper replies if no API key is configured or the AI service is unavailable

## Run on Windows (PowerShell)
1. Extract the ZIP.
2. Open the `InvoiceMate_SaaS` folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Create and activate a virtual environment:

   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

   If activation is blocked:

   ```powershell
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   .\.venv\Scripts\Activate.ps1
   ```

5. Install dependencies:

   ```powershell
   python -m pip install --upgrade pip
   python -m pip install -r requirements.txt
   ```

6. Configure AI (recommended). Set your own OpenAI API key in the same terminal:

   ```powershell
   $env:OPENAI_API_KEY = "YOUR_API_KEY"
   $env:OPENAI_MODEL = "gpt-4o-mini"
   ```

   Do not paste your API key into chat, source code, screenshots, or a public repository. API usage may incur charges. If you do not set a key, the app still runs with the offline helper; it will not provide generative AI responses.

7. Start the app:

   ```powershell
   python app.py
   ```

8. Open `http://127.0.0.1:5000` in Chrome.
9. Register a test account, add a customer and product, create an invoice, and try the chatbot.

## AI chatbot behavior
- The chatbot calls the OpenAI API when `OPENAI_API_KEY` is set.
- The model can be changed with `OPENAI_MODEL`.
- When a user is logged in, only that user's own summary and recent invoices are included as chatbot context.
- The chatbot cannot create, edit, delete, or mark invoices paid; it explains how to do these actions.
- If AI setup is missing or temporarily unavailable, an offline helper responds to common app questions.

## Optional MySQL
SQLite is the default and requires no database setup. To use MySQL, install a driver such as `pymysql`, create the database, and set `DATABASE_URL` before starting the app.

## Important
This is a class-project starter, not a production-hardened billing service. Before public deployment, configure a strong secret key, CSRF protection, rate limiting, backups, HTTPS, and a production web server.
