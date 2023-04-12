import React, { useEffect, useState } from "react";
import './LeaderBoard.css'
import { getFirestore, doc, getDoc, collection, setDoc, updateDoc } from 'firebase/firestore'


export default function LeaderBoard(props){

    const [name, setName] = useState("")
    const [times, setTimes] = useState({
        mins: null,
        secs: null,
        milli: null
    })

    useEffect(() => {
        retrieveFastestTime()
    })

    async function retrieveFastestTime(){
        try {
            const db = getFirestore();
            const timesRef = doc(db, 'times', 'times')
            const timesSnap = await getDoc(timesRef)
            let data = timesSnap.data()
            const fastestName = data.data.name
            const fastestTime = data.data.time
            const timerCalc = {
                mins: Math.floor((fastestTime * 60000) % 60),
                secs: Math.floor((fastestTime / 1000) % 60),
                millisecs: Math.floor((fastestTime / 10) % 100)
            }
            setName(fastestName)
            setTimes({
                mins: timerCalc.mins,
                secs: timerCalc.secs,
                milli: timerCalc.millisecs
            })

        } catch(error){
            console.log(error)
            
        }
    }


    return (
        <div className="LeaderBoard">
            <h3>Fastest Time:</h3>
            <h3>Name: {name}  </h3>
            <div>Time: {times.mins} : {times.secs} : {times.milli} </div>
        </div>
    )
}