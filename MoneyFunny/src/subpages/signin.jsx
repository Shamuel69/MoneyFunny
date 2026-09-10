import React, {useEffect, useState} from 'react'
export function Signup() {
    return (
        <div>
            signup
        </div>
    )
}

export default function Signin() {
    let username;
    let password;
    
    const handleSignIn = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newItem = Object.fromEntries(e.target);

    }
    
    return (
    
    <div className="w-full min-h-dvh m-auto">
        

        <div className="md:w-[40%] border-2 flex flex-col gap-2 text-2xl">
            <h2 className="">Sign-In</h2>
            <form>
                <div className="flex flex-col gap-2 ">
                    <label for="username">Username</label>
                    <input type="text" name="username" value={username} placeholder="Username/email" className="w-[50%] active:outline-0"/>

                </div>
                <div className="flex flex-col gap-2 ">
                    <label for="username">Password</label>
                    <input type="text" name="password" value={password} placeholder="Password" className="w-[50%] border-bs-2 active:outline-0"/>

                </div>
                
            </form>

        </div>
    </div>
    )
}
