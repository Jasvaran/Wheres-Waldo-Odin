import React, { useEffect } from "react";
import { useState } from "react";
import "./Register.css"
export default function Register(props){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')




    function onChange(e){
        if (e.target.id === 'username'){
            setEmail(e.target.value)
        }

        if (e.target.id === 'password'){
            setPassword(e.target.value)
        }
    };

    function triggerRegister(e){
        e.preventDefault();
        let data = {
            username: email,
            password: password
        }

        props.registerCallback(data);

    }

    return (
        <div className="register">
            <form onSubmit={triggerRegister}>
                <label htmlFor='username'>
                    Email
                </label>
                <input type="email" id="username" onChange={onChange} />
                <label htmlFor='password'>
                    Password
                </label>
                <input type="password" id='password' onChange={onChange} />
                <button type='submit' id="register">Register</button>
            </form>
        </div>
    )
}