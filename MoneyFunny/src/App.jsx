import { useState } from 'react'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Routes, Route, Link} from 'react-router-dom';
import Signin, { Signup } from "./subpages/signin.jsx"

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
      <div>
          <h2>Money<span className="text-(--accent) font-semibold italic">Funny</span></h2>
      </div>
      <div className="text-lg flex flex-row  border-2 rounded-3xl text-(--text-primary)">
        <Link to="/signup" className="bg-(--accent) p-2 border-1-transparent rounded-3xl">Sign-Up</Link>
        <Link to="/signup" className="p-2 ">Sign-in</Link>
      </div>
    </div>
    </section>
    <section id="display-area">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>

      </Routes>
    </section>
    </div >
  )
}

export default App
