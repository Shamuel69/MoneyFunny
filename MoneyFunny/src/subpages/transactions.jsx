import axios from 'axios';
import React, {useEffect, useState} from 'react'

export default function Transactions() {
  const [transactions, setTransactions] = useState([])
  const [active, setActive] = useState(false)
  const [accounts, setAccounts] = useState([])
  const [categories, setCategories] = useState([])

  const handleNewTransactions = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const credentials = Object.fromEntries(formData.entries());
    const res = await axios.post("http://localhost:8080/api/transactions",
      credentials,
      {withCredentials: true}
    )

    // try{
    // }catch{
    // }
  }


  useEffect(() => {
    const handleTransactions = async() => {
      try{
        const res = await axios.get("http://localhost:8080/api/transactions", {withCredentials:true})
        const res2 = await axios.get("http://localhost:8080/api/accounts", {withCredentials:true})
        const res3 = await axios.get("http://localhost:8080/api/categories", {withCredentials:true})
        
        console.log(res.data)
        console.log(res2.data)
        console.log(res3.data)
        
        setCategories(res3.data)
        setAccounts(res2.data)
        setTransactions(res.data)

      } catch {
        console.error('Error fetching transaction data:', error)
      }
    }
    handleTransactions();
    setActive(false)
  }, [])
  
  const getCatName = (id) => {
    const category = categories.find(category => category.id === id);
    return category ? category.cat_name : "Unknown"
  }


  return (
    <div className="w-full min-h-dvh">
        <div className="p-5 w-[90%] md:w-[85%] flex flex-row justify-between align-middle mx-auto border-b-1 border-(--accent)">
            <h2 className="text-2xl p-2.5">Transaction history:</h2>
            <button className="bg-(--bg-secondary) hover:bg-(--bg-tertiary) p-2.5 rounded" onClick={() => setActive(prev => !prev)}>+ Add Transaction</button>
        </div>
        {active && (
          <div className="p-5 w-[90%] md:w-[85%] mx-auto border-b-1 border-(--accent)">
            <>
            <h2 className="w-[80%] p-5 h-fit">Make a new transaction!</h2>
            <form onSubmit={handleNewTransactions}>
              <div className="mb-4">
                  <label className="block mb-2">Description:</label>
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
                  <label className="block mb-2">Category:</label>
                  <select type="text" name="category_id" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required >
                    {categories.map(category => (
                      <option value={category.id}>{category.cat_name}</option>
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
        <div className="w-full md:w-[90%] lg:w-[80%] mx-auto">
            <div  className="grid grid-cols-5 gap-4 mt-2 mb-2 ">
              <p>Date</p>
              <p>Description</p>
              <p>Category</p>
              <p>Type</p>
              <p>Amount</p>
            </div>          
          {transactions ? (transactions.map(transaction => (

            <div id={transaction.id} className="grid grid-cols-5 gap-4 mt-3 mb-3 ">
              <label>
                {transaction.date}
              </label>
              <label className="first-letter:uppercase">
                {transaction.description}
              </label>
              <label className="first-letter:uppercase">
                {getCatName(transaction.category_id) }
              </label>
              <label className="first-letter:uppercase">
                {transaction.type}
              </label>
              <label>
                ${transaction.amount}
              </label>
            </div>
          ))):(
            <p>loading...</p>

          )}
        </div>
    </div>
  )
}
