import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { __unstable__loadDesignSystem } from 'tailwindcss';
export function AccountDetails() {
  const [account, setAccount] = useState([])

  
}

export default function Accounts( ) {
  const [accounts, setAccounts] = useState(null)
  const [addnew, setAddNew] = useState(false)
  const [name, setName] = useState(null)
  const nav = useNavigate()
  useEffect(() => {
    const handleNames = async() => {
      try{
        const res = await axios.get("http://localhost:8080/api/auth/me", {withCredentials: true})
        console.log("BLAM ", res.data)
        setName(res.data)
      }catch{
        console.error("No user signed in")
      }
    }
    handleNames();
  }, [])

  useEffect(() => {
    const handleAccounts = async() => {
      try {
        const res = await axios.get("http://localhost:8080/api/accounts", {withCredentials: true})
        console.log(res.data)
        setAccounts(res.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    handleAccounts();

  }, [])

  const handleNewAccount = async(e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const accountData = Object.fromEntries(formdata.entries())

    const res = await axios.post("http://localhost:8080/api/accounts", accountData, {withCredentials: true})
    nav(0)
  }

  return (
    <div className="w-full min-h-dvh overflow-y-scroll">
          <div className="p-5 w-full md:w-[90%] lg:w-[85%] flex flex-row justify-between align-middle mx-auto border-b-1 border-(--accent)">
            <h2 className="text-2xl p-2.5">Your accounts:</h2>
            <button onClick={() => setAddNew(prev => !prev)} className="p-2.5 text-lg bg-(--bg-tertiary) rounded-lg">Add new account!</button>
        </div>
        <div className="flex flex-col p-5 w-full gap-5 md:w-[80%] mx-auto mt-5">
          {addnew && (
            <>
            <h2 className="w-[80%] underline underline-offset-5  text-3xl h-fit">Make a new account!</h2>
            <form onSubmit={handleNewAccount}>
              <div className="mb-4">
                  <label className="block mb-2">Name:</label>
                  <input type="text" name="name" placeholder={`${name.username}'s Credit Card`} className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2">Type:</label>
                <select type="text" name="type" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required >
                  <option>Checking</option>
                  <option>Saving</option>
                  <option>Money Market</option>
                  <option>Certificate of Deposite</option>
                </select>
              </div>
              <div className="mb-4">
                  <label className="block mb-2">Starting balance:</label>
                  <input type="number" name="starting_balance" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
              </div>
              
              <button type="submit" className="bg-green-500 hover:bg-green-600 duration-300 text-white px-3 py-1 rounded mr-2">
                  Submit
              </button>
            </form>
            </>
)}
          {accounts ? (
            accounts.map(account => (
              <div className="p-5 gap-4 md:w-[70%] flex flex-col rounded bg-(--bg-secondary) border border-(--bg-primary) shadow-lg hover:shadow-xl hover:border-(--accent-muted) transition-all duration-150">
                <label className="text-3xl font-semibold underline underline-offset-2.5 decoration-2 decoration-(--accent)">{account.name}</label>
                <label className="text-xl">{account.type}</label>
                  <label className="text-xl">Starting Balance: <span className="font-semibold">${(account.starting_balance / 100).toFixed(2)}</span></label>
                <div className="flex flex-row justify-between">
                  <h2 className="text-2xl">Balance: <span className="font-semibold">${(account.balance / 100).toFixed(2)}</span></h2>
                  <label className="text-xl flex ">{account.id}</label>
                </div>

              </div>
            ))
          ):(
            <div className="">
                <p>You have no accounts set up. Please create a new account to get started!</p>
            </div>
          )}
        </div>
    </div>
  )
}
