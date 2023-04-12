import React, { useEffect, useState } from "react";
import './DropDownMenu.css'
export default function DropDownMenu(props){

    const [mousePosition, setMousePosition] = useState({x: null, y: null})


    useEffect(() => {
        const handleMouseClick = (event) => {
            if (event.target.id === 'waldo-container'){
                setMousePosition({x: event.clientX, y: event.clientY})
            }

            if (event.target.id === 'hitbox'){
                setMousePosition({x: event.clientX, y: event.clientY})

            }
        }
        window.addEventListener('click', handleMouseClick);

        return () => {
            window.removeEventListener('click', handleMouseClick)
        };
    }, []);




    return (
        <div className="drop-down-menu" style={{'position': 'absolute', 'top': mousePosition.y, 'left': mousePosition.x, }}>
            <p className="names" id="michael" onClick={(e) => {props.validate(e.target.id)}}>michael</p>
            <p className="names" id="waldo" onClick={(e) => {props.validate(e.target.id)}}>waldo</p>
            <p className="names" id="james" onClick={(e) => {props.validate(e.target.id)}}>james</p>
        </div>
    )
}