import { useState } from 'react'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Routes, Route, Link} from 'react-router-dom';
import Signin, { Signup } from "./subpages/signin.jsx"
import Accounts from "./subpages/accounts"
import Budgets from "./subpages/budgets"
import Transactions from "./subpages/transactions"

function Home() {
  return (
    <>
    <div className="w-full h-full align-middle text-center">
        <Link to="/"><h2>Ayo dis da home</h2></Link>
    </div>
    </>
  )
}

function App() {

  return (
    <div className="min-h-dvh">
    <section id="header" className="w-full h-15 border-b-1 border-(--accent)">
    <div className="w-[90%] h-full items-center flex flex-row justify-between mx-auto text-3xl">
      <div className="flex flex-row gap-5">
          <Link to="/"><h2>Money<span className="text-(--accent) font-semibold italic">Funny</span></h2></Link>
          <div id="subpages" className="flex flex-row items-center gap-2.5 text-2xl">
            <Link to="/accounts" className="relative group">Accounts<span className="absolute bottom-0 left-0 w-full h-0.5 scale-x-0 origin-center bg-(--accent) transition-transform duration-200 group-hover:scale-x-100"></span></Link>
            <Link to="/transaction" className="relative group">Transactions<span className="absolute bottom-0 left-0 w-full h-0.5 scale-x-0 origin-center bg-(--accent) transition-transform duration-200 group-hover:scale-x-100"></span></Link>
            <Link to="budgets" className="relative group">Budgets<span className="absolute bottom-0 left-0 w-full h-0.5 scale-x-0 origin-center bg-(--accent) transition-transform duration-200 group-hover:scale-x-100"></span></Link>

          </div>
      </div>
      <div className="text-lg flex flex-row  border-2 rounded-3xl text-(--text-primary)">
        <Link to="/signup" className="bg-(--accent) p-2 border-1-transparent rounded-3xl">Sign-Up</Link>
        <Link to="/signin" className="p-2 ">Sign-in</Link>
      </div>
    </div>
    </section>
    <section id="display-area">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/accounts" element={<Accounts/>}/>
        <Route path="/budgets" element={<Budgets/>}/>
        <Route path="/transaction" element={<Transactions/>}/>
      </Routes>
    </section>
    </div >
  )
}

export default App
