import React, { useEffect, useState } from "react";
import './Timer.css'

export default function Timer(props){

    const [isActive, setIsActive] = useState(props.start)

    const [count, setCount] = useState(0)
    

    useEffect(() => {
        if (isActive === true){

            let interval =  setInterval(() => {
                setCount(prevState => prevState + 10)
            }, 10)
    
            return () => {
                clearInterval(interval)
            }
        }

    })
   
    function startGame(e){
        if (isActive === false){
            e.preventDefault();
            setCount(0)
            setIsActive(true);
            props.startGameFn();
        }
    }

    useEffect(() => {
        setIsActive(props.start)
        if (isActive === false && props.gameOver === true){
            props.count(count)
        }

    })


    return (
        <div className="timer">
            <div className="time-digits">
                <span>{( Math.floor((count / 60000) % 60))}: </span>
                <span>{( Math.floor((count / 1000) % 60))}: </span>
                <span>{(((count / 10) % 100))}</span>
            </div>
            <button onClick={startGame} style={{
                visibility: props.vis, 
                backgroundColor: 'rgb(135,206,250', 
                position: 'relative',
                top: '20em',
                fontSize: '20px',
                border: '1px solid black'
                }}>Start</button>
        </div>
    )
}

