import axios from 'axios';
import React, {useState, useEffect} from 'react'

export default function Budgets() {
    const [active, setActive] = useState(false)
    const [budgets, setBudgets] = useState([])
    const [accounts, setAccounts] = useState([])



    const handleNewBudget = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const credentials = Object.fromEntries(formData.entries());
        const res = await axios.post("http://localhost:8080/api/budgets", credentials, {withCredentials: true})
    }

    useEffect(() => {
        const handleGetBudget = async() => {
            try {
                const res = await axios.get("http://localhost:8080/api/transactions", {withCredentials:true})
                const res2 = await axios.get("http://localhost:8080/api/accounts", {withCredentials:true})

                console.log(res.data)
                console.log(res2.data)

                setBudgets(res.data)
                setAccounts(res2.data)
            }catch {
                console.error('Error fetching budget data:', error)
            }
        }
        handleGetBudget();
    }, [])

    return (
        <div className="w-full min-h-dvh">
            <div className="p-5 w-[90%] md:w-[85%] flex flex-row justify-between align-middle mx-auto border-b-1 border-(--accent)">
            <h2 className="text-2xl p-2.5">Budgets:</h2>
            <button className="bg-(--bg-secondary) hover:bg-(--bg-tertiary) p-2.5 rounded" onClick={() => setActive(prev => !prev)}>+ Add Budget</button>
        </div>
        {active && (
            <div className="p-5 w-[90%] md:w-[85%] mx-auto border-b-1 border-(--accent)">
            <>
            <h2 className="w-[80%] p-5 md:p-2 h-fit ">Set your budget!</h2>
            <form onSubmit={handleNewBudget}>
            <div className="mb-4">
                <label className="block mb-2">Title:</label>
                <input type="text" name="title" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Description: <span className="text-(--text-muted)">*Optional</span></label>
                <input type="text" name="description" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Amount:</label>
                <input type="number" name="amount" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Account:</label>
                <select type="number" name="account_id" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required >
                    {accounts.map(account => (
                        <option value={account.id}>{account.name}</option>
                    ))}

                </select>
            </div>
            
            <div className="mb-4">
                <label className="block mb-2">Type:</label>
                <select name="type" className="w-full md:w-[30%] p-2 border rounded" required>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                    <option value="transfer">Transfer</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-2">Date:</label>
                <input type="date" name="date" className="w-full md:w-[30%] p-2 border rounded" required/>
            </div>
            <div className="mb-4">
                <label className="block mb-2">Notes:</label>
                <textarea name="notes" placeholder="Lunch with friends" className="w-full md:w-[30%] p-2 border rounded focus:outline-0" />
            </div>
            <button type="submit" className="bg-green-500 hover:bg-green-600 duration-300 text-white px-3 py-1 rounded mr-2">
                Submit
            </button>
            </form>
            </>
        </div>
)}
        </div>
    )
}
