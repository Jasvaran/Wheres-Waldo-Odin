import React, { useState } from "react";
import { Link } from "react-router-dom";
import './LogIn.css'

export default function LogIn(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')



    function triggerGoogleSignIn(e){
        e.preventDefault()
        props.googleSignInCallback();
    }

    function triggerSignOut(e){
        e.preventDefault();
        props.signOutCallback();
    }

    function onChange(e){
        e.preventDefault();
        if (e.target.id === 'username'){
            setEmail(e.target.value)
        }

        if (e.target.id === 'password'){
            setPassword(e.target.value)
        }
    }

    function triggerLogIn(e){
        e.preventDefault();
        let data = {

            username: email,
            password: password
        }
        props.logInCallback(data);
    }

    return (
        <div className="logIn">
            <form onSubmit={triggerLogIn}>
                <label htmlFor='username'>
                    Email
                </label>
                <input type="email" id="username" onChange={onChange} />
                <label htmlFor='password'>
                    Password
                </label>
                <input type="password" id='password' onChange={onChange} />
                <button type='submit' id="sign-in">Sign In</button>
                <button onClick={triggerGoogleSignIn} id="google-sign-in">Sign In With Google</button>
                <button onClick={triggerSignOut} id="sign-out">Sign Out</button>
                <Link to='/register'>
                    <div className='register-msg'>
                        Dont have an account? Click here to sign up
                    </div>
                </Link>
            </form>
        </div>
    )
}