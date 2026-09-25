import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
export default function Budgets() {
    const [active, setActive] = useState(false)
    const [activeCat, setActiveCat] = useState(false)
    const [budgets, setBudgets] = useState([])
    const [category, setCategories] = useState([])
    const navigate = useNavigate()


    const handleNewCategory = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const credentials = Object.fromEntries(formData.entries());
        const res = await axios.post("http://localhost:8080/api/categories", credentials, {withCredentials: true})
        setActiveCat(false)
    }

    const handleNewBudget = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const credentials = Object.fromEntries(formData.entries());
        const res = await axios.post("http://localhost:8080/api/budgets", credentials, {withCredentials: true})
        navigate(0)
        setActive(false)
    }
    

    useEffect(() => {
        const handleGetBudget = async() => {
            try {
                const res = await axios.get("http://localhost:8080/api/budgets", {withCredentials:true})
                const res2 = await axios.get("http://localhost:8080/api/categories", {withCredentials:true})
                const res3 = await axios.get("http://localhost:8080/api/budgets/details", {withCredentials: true})

                console.log(res.data)
                console.log(res2.data)
                console.log(res3.data)

                setCategories(res2.data)
                setBudgets(res3.data)

            }catch {
                console.error('Error fetching budget data:', error)
            }
        }
        handleGetBudget();
    }, [])

    return (
        <div className="w-full min-h-dvh">
            <div className="p-5 w-full md:w-[90%] lg:w-[85%] flex flex-row justify-between align-middle mx-auto border-b-1 border-(--accent)">
            <h2 className="text-2xl p-2.5">Budgets:</h2>
            <div className="flex flex-row gap-2.5">
                <button className="bg-(--bg-secondary) hover:bg-(--bg-tertiary) md:p-2.5 rounded" onClick={() => setActiveCat(prev => !prev)}>+ Add Category</button>
                <button className="bg-(--bg-secondary) hover:bg-(--bg-tertiary) md:p-2.5 rounded" onClick={() => setActive(prev => !prev)}>+ Add Budget</button>
            </div>
        </div>
        {activeCat && (
            <div className="p-5 w-[90%] md:w-[85%] mx-auto border-b-1 border-(--accent)">

                <h2>Add a category!</h2>
                <form onSubmit={handleNewCategory}>
                    <div className="mb-4">
                        <label className="block mb-2">Add new category: <span className="text-(--text-muted)">*Optional</span></label>
                        <input type="text" name="category_name" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " />
                    </div>
                </form>
                <button type="submit" className="bg-green-500 hover:bg-green-600 duration-300 text-white px-3 py-1 rounded mr-2">
                    Submit
                </button>
            </div>
        )}
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
                <input type="text" name="description" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Amount:</label>
                <input type="number" name="amount" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Category:</label>
                <select type="number" name="category_id" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required >
                    {category.map(category => (
                        <option value={category.id}>{category.cat_name}</option>
                    ))}
                </select>
            </div>
            
            <button type="submit" className="bg-green-500 hover:bg-green-600 duration-300 text-white px-3 py-1 rounded mr-2">
                Submit
            </button>
            </form>
            </>
        </div>
        )}
        {budgets && budgets.length>0 ? (
            <div className="">
            {budgets.map(budget => (
                <div className="flex flex-col p-5 bg-(--bg-secondary) mt-5 w-full md:w-[90%] lg:w-[80%] mx-auto shadow-lg hover:shadow-xl border border-(--border) hover:border-(--accent-muted)">
                    <h2 className="text-3xl font-semibold mb-1.5 underline underline-offset-2.5 decoration-2 decoration-(--accent) first-letter:uppercase">{budget.title}</h2>
                    <p>Category: {budget.cat_name}</p>
                    <p>Budget: ${budget.amount / 100}</p>
                    <p>Spent: ${budget.spent / 100}</p>
                    <p>
                        Remaining:
                        ${(budget.amount - budget.spent) / 100}
                    </p>
                    <div className="w-full rounded-3xl bg-(--bg-tertiary) mt-2.5">
                        <div className="bg-(--accent) h-2 rounded" style={{width: `${Math.min(((budget.spent / budget.amount) * 100), 100)}%`}}/>
                    </div>
                </div>
            ))}
            </div>
        ):(
            <div className="bg-(--bg-secondary) w-[80%] mx-auto border border-(--border) hover:border-(--accent-muted))">
                <h2 className="bg-amber-800">my name is i dunno where i at</h2>
            </div>
        )}
        </div>
    )
}
