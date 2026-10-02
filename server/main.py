from flask import Flask, request, session
from flask_cors import CORS
from script import DataManager, dataPlayer
from datetime import datetime

app = Flask(__name__)
app.secret_key = "8004628"
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

@app.route("/api/auth/logout", methods=["POST"])
def logout():
    session.clear()
    return {"message": "Signed out"}, 200

@app.route("/api/auth/username", methods=["GET"])
def username():
    user_id = session.get("user_id")
    username = DataManager().QueryName(user_id)

    return {"username": username["username"]}

@app.route("/api/auth/me", methods=["GET"])
def me():
    user_id = session.get("user_id")
    username = DataManager().QueryName(user_id)

    if not user_id:
        return {"error": "this guy aint signed in"}, 401

    return {"user_id": user_id, "username": username["username"]}

@app.route("/api/auth/signin", methods=["POST"])
def signin():
    data = request.get_json()

    username = data["username"]
    password = data["password"]

    user = DataManager().Signin(username, password)

    if not user:
        return {"error": "Invalid username or password"}, 401

    session["user_id"] = user["id"]

    return {"message": "Signed in"}

@app.route("/api/auth/signup", methods=["POST"])
def signup():
    data = request.get_json()

    username = data["username"]
    password = data["password"]
    
    user = DataManager().Signup(username, password)

    if not user:
        return {"error": "something happened on the sign up page"}, 401

    session["user_id"] = user["id"]

    return {"message": "Signed up!"}

@app.route("/api/totalbalance", methods=["GET"])
def total_balance():
    user_id = session.get("user_id")

    data = DataManager().db.select("accounts", {"user_id": user_id})
    processed_data = 0

    for acc in data:
        processed_data += DataManager().AccountBalance(user_id, acc["id"])[0]["balance"]
    return {"total_balance": processed_data}

@app.route("/api/accounts", methods=["GET"])
def account_get():
    user_id = session.get("user_id")

    data = DataManager().db.select("accounts", {"user_id": user_id})
    processed_data = []

    for acc in data:

        processed_data.append(DataManager().AccountBalance(user_id, acc["id"])[0])
    return processed_data

@app.route("/api/accounts", methods=["POST"])
def account_send():
    user_id = session.get("user_id")

    data = request.get_json()
    data = {**data, "user_id": user_id}
    DataManager().InsertAccount(data)
    
    return {"message": "Uploaded account!"}


@app.route("/api/transactions", methods=["POST"])
def transaction_send():
    
    user_id = session.get("user_id")
    data = request.get_json()

    transaction = {
        "user_id": user_id,
        "account_id": data["account_id"],
        "category_id": data["category_id"],
        "description": data["description"],
        "amount": data["amount"],
        "type": data["type"],
        "date": data["date"],
        "notes": data.get("notes")
    }
    DataManager().db.insert("transactions", transaction)
    DataManager().remainingAccountBalance(data["account_id"])
    return {"message": "Transaction complete!"}, 201

@app.route("/api/transactions", methods=["GET"])
def transaction_get():
    
    user_id = session.get("user_id")
    transaction = DataManager().db.select("transactions", {"user_id": user_id})
    
    return transaction

@app.route("/api/categories", methods=["GET"])
def categories_get():
    user_id = session.get("user_id")
    categories = DataManager().db.select("categories", {"user_id": user_id})
    return categories

@app.route("/api/categories", methods=["POST"])
def categories_send():
    user_id = session.get("user_id")
    data = request.get_json()
    DataManager().db.insert("categories", {"user_id": user_id, "cat_name": data["category_name"]})

    return {"message": "Category creation complete!"}, 201

@app.route("/api/budgets", methods=["GET"])
def budgets_get():
    user_id = session.get("user_id")
    budgets = DataManager().db.select("budgets", {"user_id": user_id})
    return budgets

@app.route("/api/budgets", methods=["POST"])
def budgets_send():
    user_id = session.get("user_id")
    data = request.get_json()

    budget = {
        "user_id": user_id,
        "category_id": data["category_id"],
        "title": data["title"],
        "amount": data["amount"],
        "description": data["description"],
    }

    DataManager().db.insert("budgets", budget)
    
    return {"message": "Budget creation complete!"}, 201

@app.route("/api/budgets/details", methods=["GET"])
def budgetDetails():
    user_id = session.get("user_id")
    ses = DataManager().db.select("budgets", {"user_id": user_id})
    les = []
    for budget in ses:
        res = DataManager().BudgetDetails(user_id, budget["id"])[0]
        les.append(res)

    return les

@app.route("/api/home/overall", methods=["GET"])
def Homeoverall():
    user_id = session.get("user_id")

    expense_types = DataManager().db.select("transactions", {"user_id": user_id})
    types = []

    for item in expense_types:
        # lists out the types (e.g. transfer, income, expense) 
        types.append(item["type"])

    les = []
    for trans_type in list(set(types)):
        res = DataManager().TransactionTotal(user_id,trans_type)

        les.append(res[0])

    return les

@app.route("/api/home/details/<trans_type>", methods=["GET"])
def Homedetails(trans_type):
    user_id = session.get("user_id")
    expense_types = DataManager().db.select("transactions", {"user_id": user_id})
    types = []
    for item in expense_types:
        # lists out the types (e.g. transfer, income, expense) 
        data = DataManager().db.select("categories", {"id": item["category_id"]})
        types.append( data[0]["cat_name"])


    les = []
    for cat_name in types:
        try:
            res = DataManager().TransactionTotal(user_id,trans_type, cat_name)
            if not res:
                continue

            if len(les) == 0:
                les.append({"cat_name": res[0]["cat_name"], "amount": res[0]["amount"]})
                continue
            else:
                found = False
                for dataset in les:
                    if dataset["cat_name"] == res[0]["cat_name"]:
                        found = True
                        dataset["amount"] += res[0]["amount"]
                        break
                if not found:
                    les.append({"cat_name": res[0]["cat_name"], "amount": res[0]["amount"]})

        except IndexError:
            continue
    return les





if __name__ == "__main__":
    

    print("Starting server...")
    DataManager().initialize_database()
    app.run(host="0.0.0.0", port=8080, debug=True)
