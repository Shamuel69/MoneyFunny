# MoneyFunny

A full-stack personal finance manager built to help users track expenses and manage their money reliably.

MoneyFunny lets users create and monitor financial accounts, track their spending habits and transactions, and create spending budgets. Users can also view an overview of their finances through a responsive dashboard.

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
```

## How to install

### 1. Clone the repository

```bash
git clone https://github.com/Shamuel69/MoneyFunny.git
```

### 2. Set up the python backend

Navigate to the server directory in the terminal and use type this:
```cd server```

Create a virtual environment:
```python -m venv venv```

Activate it on Windows:
```venv\Scripts\activate```

Install the required Python packages:
```pip install -r requirements.txt```

Start the Flask server:

```bash
python server/main.py
```

### 3. Set up the React frontend

Open a second terminal and navigate to the frontend:

`cd MoneyFunny`

Open a second terminal and install the frontend dependencies:

`npm install`

Start the development server:

`npm run dev`

Vite will show you the local address to open in your browser.

## What I have learned

MoneyFunny was built as a project to practice working with real-world data rather than simply building another frontend application.

Some of the main concepts I worked with include:

- Designing relational database schemas
- SQL queries and foreign keys
- CRUD operations with SQLite
- Building REST APIs with Flask
- Session-based authentication
- Password hashing
- Connecting React to a Python backend
- Managing frontend application state
- Calculating financial data from database records
- Responsive UI design
- Representing monetary values safely using integer cents

## Database

MoneyFunny uses SQLite for local data storage.

The database contains tables for:

- Users
- Accounts
- Categories
- Transactions
- Budgets

Each user's financial data is associated with their user account.

Default spending categories are created when a new user signs up.

## Future Improvements

Possible improvements include:

- Recurring transactions
- Transfer support between accounts
- More detailed financial reports
- Charts and spending trends
- Improved budget tracking
- Database migrations
- Deployment with a hosted database
  