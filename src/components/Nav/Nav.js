import React from "react";
import './Nav.css'


export default function Nav(props) {

    
    return (
        <div className="Nav">
            <h2 className="title">Welcome {props.name} </h2>
            <button onClick={props.signOut} className="sign-out">Sign Out</button>
        </div>
    )
}