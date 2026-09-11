import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Link} from "react-router-dom"
export function Signup() {
    let username;
    let password;
    let confirm_password;

    const handleSignUp = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const credentials = Object.fromEntries(formData.entries());
        
        const response = await axios.post("http://localhost:8080/api/auth/signup", credentials);


    }

    return (
        <div className="w-full min-h-dvh m-auto">
        <div className="w-full md:w-[35%] border-0 md:border-2 rounded-lg mx-auto mt-10 flex flex-col gap-7 p-5 text-2xl">
            <h2 className="border-b-1 w-[80%] text-center mx-auto p-5 text-4xl font-semibold">Sign-Up</h2>
            <form onSubmit={handleSignUp} className="mx-auto w-[85%] p-2.5 flex flex-col gap-8">
                <div className="flex flex-col gap-3 ">
                    <label for="username">Username: </label>
                    <input type="text" name="username" value={username} placeholder="Username/email" className="w-[80%] md:w-[70%] ml-5 focus:outline-none focus:ring-0 bg-(--bg-secondary) p-2 font-light  border-b-1 border-l-[2px] border-(--border) active:outline-0"/>
                </div>
                <div className="flex flex-col gap-3 ">
                    <label for="username">Password: </label>
                    <input type="text" name="password" value={password} placeholder="Password" className="w-[80%] md:w-[70%] ml-5 bg-(--bg-secondary) p-2 font-light focus:outline-none focus:ring-0 border-b-1 border-l-[2px] border-(--border) active:outline-0"/>
                </div>
                <div className="flex flex-col gap-3 ">
                    <label for="username">Confirm Password: </label>
                    <input type="text" name="confirm_password" value={confirm_password} placeholder="Confirm password" className="w-[80%] md:w-[70%] ml-5 bg-(--bg-secondary) p-2 font-light focus:outline-none focus:ring-0 border-b-1 border-l-[2px] border-(--border) active:outline-0"/>
                </div>
                <p className="text-[16px]">Already have an account? <span className="text-blue-500 hover:text-blue-600 "><Link to="/signin">Log in</Link></span></p>
                <button type="submit" className="bg-(--accent) hover:bg-(--accent-hover) self-end m-2.5 duration-300  px-3 py-1 rounded mr-2 w-30">
                            Submit
                        </button>
            </form>

        </div>
    </div>
    )
}

export default function Signin() {
    let username;
    let password;
    
    const handleSignIn = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const credentials = Object.fromEntries(formData.entries());
        
        const response = await axios.post("http://localhost:8080/api/auth/signin", credentials);

    }
    
    return (
    
    <div className="w-full min-h-dvh m-auto">
        <div className="w-full md:w-[35%] border-0 md:border-2 rounded-lg mx-auto mt-10 flex flex-col gap-7 p-5 text-2xl">
            <h2 className="border-b-1 w-[80%] text-center mx-auto p-5 text-4xl font-semibold">Sign-In</h2>
            <form onSubmit={handleSignIn} className="mx-auto w-[85%] p-2.5 flex flex-col gap-8">
                <div className="flex flex-col gap-3 ">
                    <label for="username">Username: </label>
                    <input type="text" name="username" value={username} placeholder="Username/email" className="w-[80%] md:w-[70%] ml-5 focus:outline-none focus:ring-0 bg-(--bg-secondary) p-2 font-light  border-b-1 border-l-[2px] border-(--border) active:outline-0"/>
                </div>
                <div className="flex flex-col gap-3 ">
                    <label for="username">Password: </label>
                    <input type="text" name="password" value={password} placeholder="Password" className="w-[80%] md:w-[70%] ml-5 bg-(--bg-secondary) p-2 font-light focus:outline-none focus:ring-0 border-b-1 border-l-[2px] border-(--border) active:outline-0"/>
                </div>
                <p className="text-[16px]">Don't have an account? <span className="text-blue-500 hover:text-blue-600 "><Link to="/signup">Register!</Link></span></p>
                <button type="submit" className="bg-(--accent) hover:bg-(--accent-hover) self-end m-2.5 duration-300  px-3 py-1 rounded mr-2 w-30">
                            Submit
                        </button>
            </form>

        </div>
    </div>
    )
}
