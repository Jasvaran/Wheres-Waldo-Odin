import React from "react";
import './Nav.css'


export default function Nav(props) {

    
    return (
        <div className="Nav">
            <h2 className="title">Welcome {props.name} </h2>
            <div className="timer">timer</div>
            <button onClick={props.signOut} className="sign-out">Sign Out</button>
        </div>
    )
}