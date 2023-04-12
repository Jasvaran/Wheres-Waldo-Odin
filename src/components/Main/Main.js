import React, { createRef, useRef } from "react";
import './Main.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";
import { getAuth } from "firebase/auth";
import img1 from '../../assets/wheres-waldo.jpeg'
// import useMousePosition from "../hooks/useMousePosition";
import DropDownMenu from "../dopDownMenu/DropDownMenu";
import { getFirestore, doc, getDoc, collection, setDoc, updateDoc } from 'firebase/firestore'
import Timer from "../Timer/Timer";
import LeaderBoard from "../LeaderBoard/LeaderBoard";


export default function Main(props) {

    let navigate = useNavigate();


    const [hide, setHide] = useState(false);
    const [lastRegionSelected, setlastRegionSelected] = useState("");
    const [startGame, setStartGame] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [countNum, setCountNum] = useState(0);
    const [buttonVis, setButtonVis] = useState('visible')




    useEffect(() => {
        // if no user authentication returns then routes user back to sign in page.
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/home')
        }

        if (!authToken){
            navigate('/')
        }
    }, [])






    async function validateSelection(charId){
        // checks id from click on character menu with string in database.

        try {

            const db = getFirestore();
            const charRef = doc(db, 'characters', 'odin')
            // await setDoc(doc(charRef, 'two'), {'two': 'michael'})
            const charSnap = await getDoc(charRef)
            let data = charSnap.data()
            if (lastRegionSelected === 'hitbox' && charId === data.one){
                alert('correct')
                setHide(false)
                setStartGame(false)
                setGameOver(true)
                setButtonVis('visible')


            } else {
                alert('incorrect')
                setHide(false)
            }       
        } catch(error){
            console.log(error)
        }


    }


   async function saveTime(){
    // checks the time with database to determine if the time it took to find waldo is the quickest.

    try {
        const auth = getAuth();
        const currentUser = auth.currentUser.email

        const db = getFirestore();
        const timeRef = doc(db, 'times', 'times')
        const timeSnap = await getDoc(timeRef)
        let data = timeSnap.data()
        if (data.data.name === "" || data.data.time === 0){
            await updateDoc(timeRef, {
                "data.name" : currentUser,
                "data.time" : countNum
            })
        }
        else if (countNum < data.data.time){
            await updateDoc(timeRef, {
                "data.name" : currentUser,
                "data.time" : countNum
            })
        }
    } catch(error){
        console.log(error)
    }
   }



    function showMenu(e){
        console.log(e.target.id)
        // triggers menu to be shown or hidden when image is selected.
        if (e.target.id === 'waldo-container' || e.target.id === 'hitbox' ){
            setHide(true)
            setlastRegionSelected(e.target.id)
        }
        if (e.target.id === 'main'){
            setHide(false)
            setlastRegionSelected(e.target.id)
        }
        

    }

    function startGameFn(e){
        // starts the game by toggling the conditional rendering of the image
        setStartGame(true)
        setButtonVis('hidden')
    }

    function count(count){
        // recieve count from timer 
        setCountNum(count)
        saveTime();

    }
    





    return (
        <div className="main" id="main" onClick={showMenu} >
            <Nav signOut={props.signOut} name={props.name} />
            
            <Timer startGameFn={startGameFn} start={startGame} count={count} gameOver={gameOver} vis={buttonVis}  />
            <LeaderBoard />
            {startGame ? 
                         <div className="main" id="main"> 
                            <h3 className="title">Wheres Waldo</h3>

                            <div className="waldo-container" id="waldo-container">
                                <div id="hitbox">X</div>
                            </div>
                            {hide ? <DropDownMenu  validate={validateSelection} /> : ""}
                         </div> 
                         :
                         "" }
        </div>
    )
}




