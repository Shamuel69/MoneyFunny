import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { __unstable__loadDesignSystem } from 'tailwindcss';

export function AccountDetails() {
  const [account, setAccount] = useState([])

  
}

export default function Accounts() {
  const [accounts, setAccounts] = useState(null)
  const [addnew, setAddNew] = useState(false)
  const [name, setName] = useState(null)

  useEffect(() => {
    const handleNames = async() => {
      try{
        const res = await axios.get("http://localhost:8080/api/auth/username", {withCredentials: true})
        console.log(res.data)
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

  const handleNewAccount = async() => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const accountData = Object.fromEntries(fromEntries.fromEntries())

    const res = await axios.post("http://localhost:8080/api/accounts", {withCredentials: true})
  }

  return (
    <div className="w-full min-h-dvh overflow-y-scroll">
        <div className="p-5 w-[90%] md:w-[85%] mx-auto align-center justify-between border-b-1 border-(--accent) flex flex-row">
            <h2 className="text-2xl lg:text-4xl">Your accounts:</h2>
            <button onClick={() => setAddNew(prev => !prev)} className="p-2.5 text-lg bg-(--bg-tertiary) rounded-lg">Add new account!</button>
        </div>
        <div className="flex flex-col w-full md:w-[80%] mx-auto mt-5">
          {addnew && (
            <>
            <h2 className="w-[80%] p-5 h-fit">Make a new account!</h2>
            <form onSubmit={handleNewAccount}>
              <div className="mb-4">
                  <label className="block mb-2">Name:</label>
                  <input type="text" name="name" placeholder={`${name}'s Credit Card`} className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
              </div>
              
              <div className="mb-4">
                  <label className="block mb-2">Category:</label>
                  <input type="text" name="category" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
              </div>
              <div className="mb-4">
                  <label className="block mb-2">Quantity:</label>
                  <input type="number" name="quantity" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
              </div>
              <div className="mb-4">
                  <label className="block mb-2">Description:</label>
                  <textarea name="description" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
              </div>
              <div className="mb-4">
                  <label className="block mb-2">Image URL:</label>
                  <input type="text" name="image" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
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
                <div className="flex flex-row justify-between">
                  <label className="text-2xl">${account.starting_balance}</label>
                  <label className="text-xl flex ">{account.id}</label>
                </div>

              </div>
            ))
          ):(
            <p>loading...</p>
          )}
        </div>
    </div>
  )
}
