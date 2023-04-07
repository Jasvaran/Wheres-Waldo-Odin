import React, { useEffect, useState } from "react";


export default function Timer(props){

    const [minutes, setMinutes] = useState(0)
    const [seconds, getSeconds] = useState(0)
    const [milliSeconds, setMilliseconds] = useState(0)
    
    const [count, setCount] = useState(0)

    
    // useEffect(() => {
    //    let interval =  setInterval(() => {
    //         setCount(prevState => prevState + 10)
    //     }, 10)

    //     return () => {
    //         clearInterval(interval)
    //     }
    // })
   

    return (
        <div className="timer">
            <span>{("0" + Math.floor((count / 60000) % 60))}: </span>
            <span>{("0" + Math.floor((count / 1000) % 60))}: </span>
            <span>{("0" + ((count / 10) % 100))}</span>
        </div>
    )
}