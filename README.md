# MoneyFunny

A full-stack personal finance manager that was built to assist with tracking expenses and manage money in a reliable way.

MoneyFunny lets users create and monitor financial accounts. Allowing users to track their spending habbits, track transactions, and create spending budgets. Displaying and overview of their finances through a responsive front page.

## Features

- User signup and authentication
- Password hashing
- Account management
- Transaction tracking
- Custom spending categories
- Category-based budgets
- Account balance calculations
- Income and expense tracking
- Financial dashboard
- Responsive design for desktop and mobile
- Local SQLite database
- Flask REST API
- React frontend

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Axios

### Backend

- Python
- Flask
- SQLite
- Werkzeug
- Flask-CORS

## How It Works

MoneyFunny uses a React frontend that communicates with a Flask REST API that interacts with a locally created database.

The backend handles authentication, database operations, transaction processing, budget calulations, and account balances.

Fincancial amounts are stored as integer cents rather than floating-point values.
For example:

```text
$14.82 → 1482

