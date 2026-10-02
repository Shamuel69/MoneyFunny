import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash


# USER
#  │
#  ├── Accounts
#  │     ├── Checking
#  │     ├── Savings
#  │     └── Credit Card
#  │
#  ├── Categories
#  │     ├── Food
#  │     ├── Bills
#  │     └── Entertainment
#  │
#  ├── Transactions
#  │     ├── Chipotle
#  │     ├── Paycheck
#  │     └── Steam
#  │
#  └── Budgets
#        ├── Food
#        └── Entertainment

class dataPlayer():
    def __init__(self, db_path:str):
        self.conn = sqlite3.connect(db_path)
        self.conn.execute("PRAGMA foreign_keys = ON")
        self.conn.row_factory = sqlite3.Row
        self.cursor = self.conn.cursor()

    def insert(self, table:str, data):
        if isinstance(data, dict):
            data = [data]

        for array in data:
            keys = array.keys()

            columns = ", ".join(keys)
            value_keys = ", ".join(':' + k for k in keys)

            print(f"""INSERT OR REPLACE INTO {table}({columns})
                                    VALUES ({value_keys})
                                """, array)
            
            self.cursor.execute(f"""INSERT OR REPLACE INTO {table}({columns})
                                    VALUES ({value_keys})
                                """, array)

        self.conn.commit()

    def create_table(self, command):
        """
        CAUTION: YOU NEED TO KNOW HOW TO SET UP TABLES ALREADY FOR THIS!

        All you need to do is type in your command and you are done. 
        Heres an example of an actual command:\n
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL
        )"""

        
        self.cursor.execute(command)
        self.conn.commit()
        print("completed")

    def select(self, table:str, where:dict = None, ):
        """Giving you the option to select your table in the database, \n
        and finally the condition statement (if empty it will just return whats been selected)"""
        
        if not where:
            self.cursor.execute(f"""SELECT * FROM {table}""")
        else:
            clause = []
            values = []

            for key, value in where.items():
                if isinstance(value, tuple):
                    operator, val = value
                    clause.append(f'{key} {operator} ?')
                    values.append(val)
                else:
                    clause.append(f'{key} = ?')
                    values.append(value)

            clause = " AND ".join(clause)
            self.cursor.execute(f"""
                                    SELECT * FROM {table} 
                                    WHERE {clause};
                                """, values)

        results = self.cursor.fetchall()
        print("Results: ", results)
        results = [dict(row) for row in results]
        return results
    def update(self, table:str, where:dict, data:dict):
        """
        Hunts down the specific data you need and updates it right then and there with the conditions you set:\n\n
        An Example:
            "products",
            where={"id": 7},
            data={"quantity": 25}
        """
        data_key = data.keys()
        data_clause = ", ".join(f'{k} = ?' for k in data_key)
        data_values = tuple(data.values())

        where_key = where.keys() 
        where_clause =" AND ".join(f'{k} = ?' for k in where_key)
        where_values = tuple(where.values()) 
        all_values = data_values + where_values

        
        self.cursor.execute(f"""
                                UPDATE {table}
                                Set {data_clause}
                                WHERE {where_clause};
                            """, all_values)
        self.conn.commit()
            

    def delete(self, table:str, where:dict = None):
        
        if not where:
            self.cursor.execute(f"DROP TABLE IF EXISTS {table}")

        else:
            where_clause = " AND ".join(f"{k} = ?" for k in where.keys())
            where_values = tuple(where.values())

            self.cursor.execute(f"""
                                    DELETE FROM {table}
                                    WHERE {where_clause};
                                """, where_values)
        
        self.conn.commit()
        print("Deleted")
            
users_command = """
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL
    )
    """
accounts_command = """
    CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY,
        user_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        starting_balance REAL NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
    """

categories_command = """
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY,
        user_id INTEGER NOT NULL,
        cat_name TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
    """

transactions_command = """
    CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY,
        user_id INTEGER NOT NULL,
        account_id INTEGER NOT NULL,
        category_id INTEGER,
        description TEXT NOT NULL,
        amount INTEGER NOT NULL,
        type TEXT NOT NULL,
        date TEXT NOT NULL,
        notes TEXT,

        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (account_id) REFERENCES accounts(id),
        FOREIGN KEY (category_id) REFERENCES categories(id)
    )
    """

budgets_command = """
    CREATE TABLE IF NOT EXISTS budgets (
        id INTEGER PRIMARY KEY,
        user_id INTEGER NOT NULL,
        category_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        amount INTEGER NOT NULL,

        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (category_id) REFERENCES categories(id)
    )
    """



class DataManager():
    def __init__(self):
        self.db = dataPlayer("server/MoneyFunny.db")

    def Signin(self, username, password):
        users = self.db.select("users", {"username": username})

        if not users:
            return False

        user = users[0]
        
        if not check_password_hash(
            user["password_hash"],
            password
        ): 
            return False
        return user

    def Signup(self, username, password):
        existing = self.db.select(
            "users",
            {"username": username}
        )

        if existing: return False

        password_hash = generate_password_hash(password)

        self.db.insert("users", {"username": username, "password_hash": password_hash})
        user = self.db.select("users", {"username": username})

        return user[0]

    def Create_table(self, command):
        self.db.create_table(command)

    def QueryName(self, session_id):
        username = self.db.select("users", {"id": session_id})
        username = username[0]["username"]
        dictionary = {"id": session_id, "username": username}
        
        return dictionary
    
    def InsertAccount(self, data: dict):
        """This is used to insert cards or accounts, data is looking for these specific parts:\n
            VALUE (\n
            :user_id,\n
            :name,\n
            :type,\n
            :starting_balance,\n
            :created_at (you dont need to send this one)\n
            )
            """

        if not "name" in data.keys():
            data = data 
        print(f"blank {self.db.select("accounts", )}")
        account = self.db.insert("accounts", data)

    def BudgetDetails(self, user_id, budget_id):
        query = """
            Select
                budgets.amount,
                budgets.title,

                categories.cat_name AS cat_name,
                categories.id AS cat_id,
                COALESCE(SUM(transactions.amount), 0) AS spent

            FROM budgets
            JOIN categories ON budgets.category_id = categories.id
            
            LEFT JOIN transactions 
                ON transactions.user_id = budgets.user_id
                AND transactions.category_id = categories.id 

            WHERE budgets.user_id = ? 
                AND budgets.id = ?

        """
        self.db.cursor.execute(query, (user_id, budget_id))

        return [dict(row) for row in self.db.cursor.fetchall()]

    def TransactionTotal(self, user_id, trans_type, category:str = None):
        if not category:
            query = """
                Select
                    transactions.type,
                    COALESCE(SUM(transactions.amount), 0) AS amount,

                    (
                        SELECT COALESCE(SUM(accounts.starting_balance), 0)
                        FROM accounts
                        WHERE accounts.user_id = transactions.user_id
                    ) AS account_amount


                FROM transactions
                JOIN categories ON transactions.category_id = categories.id 
                WHERE transactions.user_id = ? 
                    AND transactions.type = ?
            """

            self.db.cursor.execute(query, (user_id, trans_type))

        else:
            query = """
                Select
                    transactions.category_id,
                    transactions.type,
                    categories.cat_name,
                    COALESCE(SUM(transactions.amount), 0) AS amount
                    
                FROM transactions
                JOIN categories ON transactions.category_id = categories.id

                WHERE transactions.user_id = ? 
                    AND transactions.type = ?
                    AND categories.cat_name = ?
                GROUP BY transactions.type, categories.cat_name
            """

            self.db.cursor.execute(query, (user_id, trans_type, category))
        return [dict(row) for row in self.db.cursor.fetchall()]

    def AccountBalance(self, user_id, account_id):
        query = """
            SELECT
                accounts.id,
                accounts.name,
                accounts.type,
                accounts.starting_balance,
                accounts.starting_balance
                + COALESCE(SUM(
                    CASE
                        WHEN transactions.type = 'income'
                            THEN transactions.amount
                        WHEN transactions.type = 'expense'
                            THEN -transactions.amount
                        ELSE 0
                    END
                ), 0) AS balance

            FROM accounts
            LEFT JOIN transactions
                ON transactions.account_id = accounts.id

            WHERE accounts.user_id = ?
                AND accounts.id = ?

            GROUP BY
                accounts.id,
                accounts.name,
                accounts.starting_balance
        """

        self.db.cursor.execute(query, (user_id, account_id))
        return [dict(row) for row in self.db.cursor.fetchall()]
    
    def remainingAccountBalance(self, account_id):
            query = """
                Select
                    accounts.starting_balance 
                    +COALESCE(SUM(
                        CASE 
                        WHEN transactions.type = "income"
                            THEN transactions.amount
                        WHEN transactions.type = "expense"
                            THEN -transactions.amount
                        ELSE 0 
                        END
                        ), 0) AS balance

                FROM accounts
                LEFT JOIN transactions ON transactions.account_id = accounts.id 
                WHERE accounts.id = ? 
            """

            print(f"before: {self.db.select("accounts", {"id": account_id})}")
            
            self.db.cursor.execute(query, (account_id,))
    
            print(f"after: {self.db.select("accounts", {"id": account_id})}\n")
            
                
            return 

    def initialize_database(self):
        db = dataPlayer("server/MoneyFunny.db")

        try:
            print("Initializing database...")
            db.create_table(users_command)
            db.create_table(accounts_command)
            db.create_table(categories_command)
            db.create_table(transactions_command)
            db.create_table(budgets_command)
            print("Database initialized successfully.")
        except sqlite3.OperationalError as e:
            print(f"Error creating tables: {e}")
