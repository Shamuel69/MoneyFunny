import React, { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, Link, useNavigate} from 'react-router-dom';
import Signin, { Signup } from "./subpages/signin.jsx"
import Accounts from "./subpages/accounts"
import Budgets from "./subpages/budgets"
import Transactions from "./subpages/transactions"
import axios from 'axios';

function Home( {user} ) {
  const [overall, setOverall] = useState([])
  const [totalBalance, setTotalBalance] = useState(0)
  const [expenses, setExpenses] = useState([])
  const [budgetDetails, setBudgetDetails] = useState([])

  useEffect(() => {
    const handleOverall = async() => {
      const res = await axios.get("http://localhost:8080/api/home/overall", {withCredentials:true})
      const res2 = await axios.get("http://localhost:8080/api/totalbalance", {withCredentials:true})
      const res3 = await axios.get("http://localhost:8080/api/home/details/expense", {withCredentials:true})
      const res4 = await axios.get("http://localhost:8080/api/budgets/details", {withCredentials: true})

      
      console.log(res.data)
      console.log(res2.data)
      console.log(res3.data)
      console.log(res4.data)

      setOverall(res.data)
      setTotalBalance(res2.data.total_balance)
      setExpenses(res3.data)
      setBudgetDetails(res4.data)
    }
    handleOverall()
  }, [])


  const expense = overall.find(item => item.type === "expense")?.amount || 0
  const income = overall.find(item => item.type === "income")?.amount || 0
  const transfer = overall.find(item => item.type === "transfer")?.amount || 0
  
  return (
    <>
    {user ? (

      <>
        <div className="w-full text-center px-4 py-6 md:py-10">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Welcome back, {user.username}.
          </h1>

          <p className="text-sm md:text-lg text-text-tertiary mt-2">
            Here's how your money is looking right now.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 px-4 md:px-10 mb-10 md:mb-10">
          <div className="min-w-fit w-[40%] md:w-full border-b md:border border-border md:rounded-xl p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Total Balance
            </h2>
            <p className="text-3xl md:text-4xl font-bold">
              ${ (totalBalance / 100).toFixed(2) }
            </p>
          </div>

          <div className="min-w-fit w-[40%] md:w-full border-b md:border border-border md:rounded-xl p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Income
            </h2>
            <p className="text-3xl md:text-4xl font-bold text-green-500">
              ${ (income / 100).toFixed(2) }
            </p>
          </div>
          
          <div className="min-w-fit w-[40%] md:w-full border-b md:border border-border md:rounded-xl p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Expenses
            </h2>
            <p className="text-3xl md:text-4xl font-bold text-red-500">
              ${ (expense / 100).toFixed(2) }
            </p>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">

          <div className="bg-bg-secondary border border-border rounded-xl p-4 md:p-6">
            <div className="mb-5">
              <h2 className="text-xl md:text-2xl font-semibold">
                Spending by Category
              </h2>
              <p className="text-sm text-text-tertiary mt-1">
                Where your money has been going.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-y-3 text-sm md:text-base">
              <span className="font-semibold text-text-secondary border-b border-border pb-2">
                Category
              </span>
              <span className="font-semibold text-text-secondary border-b border-border pb-2 text-right">
                Amount
              </span>

              {expenses.map((item, index) => (
                <React.Fragment key={index}>
                  <span className="py-1">
                    {item.cat_name}
                  </span>

                  <span className="py-1 text-right font-medium">
                    ${(item.amount / 100).toFixed(2)}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="bg-bg-secondary border border-border rounded-xl p-4 md:p-6">
            <div className="mb-5">
              <h2 className="text-xl md:text-2xl font-semibold">
                Budget Overview
              </h2>
              <p className="text-sm text-text-tertiary mt-1">
                How much you have left to spend.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-y-3 text-sm md:text-base">
              <span className="font-semibold text-text-secondary border-b border-border pb-2">
                Budget
              </span>
              <span className="font-semibold text-text-secondary border-b border-border pb-2 text-right">
                Remaining
              </span>

              {budgetDetails.map((item, index) => (
                <React.Fragment key={index}>
                  <span className="py-1">
                    {item.title}
                  </span>

                  <span className="py-1 text-right font-medium">
                    ${((item.amount - item.spent) / 100).toFixed(2)}
                    <span className="text-text-tertiary">
                      {" / "}{(item.amount / 100).toFixed(2)}
                    </span>
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>

        </div>
      </>
    ):(
      <div className="w-full text-center px-4">
        <p className="w-fit mx-auto text-lg md:text-xl p-10">
          Welcome! Please register or log in to start budgeting the right way!
        </p>
        <div className="flex flex-col w-full gap-2 border-t pt-4">
          <div>
            <Link to="/signup" onClick={() => setMenuOpen(false)} className="bg-(--accent) px-4 py-2 rounded-lg">
              Sign-Up
            </Link>

            <Link to="/signin" onClick={() => setMenuOpen(false)} className="px-4 py-2 rounded-lg">
              Sign-in
            </Link>
          </div>
        </div>
      </div>
      )}
  </>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [active, setActive] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const fetchUser = async() => {
        const res = await axios.get("http://localhost:8080/api/auth/me", {withCredentials:true})
        setUser(res.data)
    }
    fetchUser()

    console.log(user)
  }, [])

    
  return (
    <div className="min-h-dvh">
      <section id="header" className="w-full h-15 border-b border-(--accent)">
        <div className="w-[90%] h-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link to="/" className="text-3xl">
              Money<span className="text-(--accent) font-semibold italic">Funny</span>
            </Link>
            <div className="hidden md:block relative">
              <div className="flex items-center gap-5">
                <div className="hidden md:flex items-center gap-5 text-2xl">
                  <Link to="/accounts" className="relative group">
                    Accounts <span className="absolute bottom-0 left-0 w-full h-0.5 scale-x-0 origin-center bg-(--accent) transition-transform duration-200 group-hover:scale-x-100" />
                  </Link>
                  <Link to="/transaction" className="relative group">
                    Transactions<span className="absolute bottom-0 left-0 w-full h-0.5 scale-x-0 origin-center bg-(--accent) transition-transform duration-200 group-hover:scale-x-100" />
                  </Link>
                  <Link to="/budgets" className="relative group">
                    Budgets<span className="absolute bottom-0 left-0 w-full h-0.5 scale-x-0 origin-center bg-(--accent) transition-transform duration-200 group-hover:scale-x-100" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {user ? (
            <div className="hidden md:block relative">
              
              <button className="text-2xl p-2.5 hover:bg-(--bg-secondary)" onClick={() => setActive(prev => !prev)}>{user.username}</button>
              {active && (
                <div className="absolute right-0 top-full mt-2 p-2 bg-(--bg-secondary) border rounded">
                  <button className="bg-(--error) border rounded py-2" onClick={() => {
                    axios.post("http://localhost:8080/api/auth/logout", {}, {withCredentials:true})
                    .then(() => {
                      setUser(null)
                      setMenuOpen(false)
                    })
                  }}>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex text-lg border-2 rounded-3xl">
              <Link to="/signup" className="bg-(--accent) p-2 rounded-3xl">
                Sign-Up
              </Link>
              <Link to="/signin" className="p-2">
                Sign-in
              </Link>
            </div>
          )}
          <button className="md:hidden text-3xl px-2" onClick={() => setMenuOpen(prev => !prev)}>
            ☰
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden absolute z-50 w-full bg-(--bg-secondary) border-b border-(--accent)">
            <nav className="flex flex-col p-5 gap-4 text-xl">
              <Link to="/accounts" onClick={() => setMenuOpen(false)}>
                Accounts
              </Link>
              <Link to="/transaction" onClick={() => setMenuOpen(false)}>
                Transactions
              </Link>
              <Link to="/budgets" onClick={() => setMenuOpen(false)}>
                Budgets
              </Link>
              {user ? (
                <>
                  <div className="border-t pt-4">
                    {user.username}
                  </div>

                  <button className="bg-(--error) border rounded py-2" onClick={() => {
                    axios.post("http://localhost:8080/api/auth/logout", {}, {withCredentials:true})
                    .then(() => {
                      setUser(null)
                      setMenuOpen(false)
                    })
                  }}>
                    Log Out
                  </button>
                </>
              ) : (
                <div className="flex gap-2 border-t pt-4">
                  <Link to="/signup" onClick={() => setMenuOpen(false)} className="bg-(--accent) px-4 py-2 rounded-3xl">
                    Sign-Up
                  </Link>

                  <Link to="/signin" onClick={() => setMenuOpen(false)} className="px-4 py-2">
                    Sign-in
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
        
      </section>

    <section id="display-area">
      <Routes>
        <Route path="/" element={<Home user={user}/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/accounts" element={<Accounts/>}/>
        <Route path="/accounts:id" element={<Accounts/>}/>
        
        <Route path="/budgets" element={<Budgets/>}/>
        <Route path="/transaction" element={<Transactions/>}/>
      </Routes>
    </section>
    </div >
  )

}

export default App
