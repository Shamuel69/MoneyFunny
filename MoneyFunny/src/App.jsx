import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, Link} from 'react-router-dom';
import Signin, { Signup } from "./subpages/signin.jsx"
import Accounts from "./subpages/accounts"
import Budgets from "./subpages/budgets"
import Transactions from "./subpages/transactions"
import axios from 'axios';

function Home( {user} ) {
  const [overall, setOverall] = useState([])

  useEffect(() => {
    const handleOverall = async() => {
      const res = await axios.get("http://localhost:8080/api/home/overall", {withCredentials:true})
      const res2 = await axios.get("http://localhost:8080/api/home/details", {withCredentials:true})

      console.log(res)

      setOverall(res)
    }
    handleOverall()
  }, [])

  return (
    <>
    <div className="w-full h-full align-middle text-center">
        <h2>Ayo dis da home</h2>

    {user ? (
      <>
        <h2>Welcome, {user}!</h2>
        <div className="flex flex-col p-2.5 md:p-5 gap-5">
          Heres how things are looking for you right now:
          <div className="grid grid-cols-3 gap-2 md:gap-5 border-b ">
            <label>Total balence</label>
            <label>Income</label>
            <label>Spent</label>
            <label>Transferred</label>
            {i}
      
          </div>
        </div>
      </>

    ):(
      <p>Welcome! Please register or log in to start budgeting the right way!</p>
      )}

    </div>
    </>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [active, setActive] = useState(false)
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
      {user ? (
        <div className="text-2xl flex flex-row p-2.5  hover:bg-(--bg-secondary) " onClick={() => setActive((prev) => !prev)}>
          <h2 className="first-letter:uppercase relative ">{user.username}</h2>
          {active ? (
            <div className="w-[40%] md:w-fit h-fit absolute p-2 mx-auto top-[55px] bg-(--secondary)">
              <button className="bg-(--error) border rounded w-35">Log Out</button>
            </div>

          ):(
            <></>
          )}
        </div>
        ):( 
        <div className="text-lg flex flex-row  border-2 rounded-3xl text-(--text-primary)">
          <Link to="/signup" className="bg-(--accent) p-2 border-1-transparent rounded-3xl">Sign-Up</Link>
          <Link to="/signin" className="p-2 ">Sign-in</Link>
        </div>
      )}
    </div>
    </section>
    <section id="display-area">
      <Routes>
        <Route path="/" element={<Home/>}/>
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
