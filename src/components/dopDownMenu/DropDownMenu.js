import React, { useEffect, useState } from "react";

export default function DropDownMenu(props){

    const [mousePosition, setMousePosition] = useState({x: null, y: null})


    useEffect(() => {
        const handleMouseClick = (event) => {
            if (event.target.id === 'waldo-img'){
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


    function chooseCharacter(e){
        console.log(e)
        props.chooseCharacterCallback(e.target.id);
    }

    return (
        <div className="drop-down-menu" style={{'position': 'absolute', 'top': mousePosition.y, 'left': mousePosition.x, }}>
            <p id="michael" onClick={chooseCharacter}>michael</p>
            <p id="waldo" onClick={chooseCharacter}>waldo</p>
            <p id="james" onClick={chooseCharacter}>james</p>
        </div>
    )
}