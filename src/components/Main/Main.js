import React from "react";
import './Main.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";
import { getAuth } from "firebase/auth";
import img1 from '../../assets/wheres-waldo.jpeg'
// import useMousePosition from "../hooks/useMousePosition";
import DropDownMenu from "../dopDownMenu/DropDownMenu";
import { getFirestore, doc, getDoc, collection, setDoc } from 'firebase/firestore'
import Timer from "../Timer/Timer";


export default function Main(props) {

    let navigate = useNavigate();

    const [authData, setAuthData] = useState({});
    const [coords, setCoords] = useState({x: null, y: null});
    const [selection, setSelection] = useState("");
    const [hide, setHide] = useState(false);
    const [lastRegionSelected, setlastRegionSelected] = useState();
    const [startGame, setStartGame] = useState(false)




    async function validateSelection(charId){

        try {

            const db = getFirestore();
            const charRef = doc(db, 'characters', 'odin')
            // await setDoc(doc(charRef, 'two'), {'two': 'michael'})
            const charSnap = await getDoc(charRef)
            let data = charSnap.data()
            console.log(data)
            if (lastRegionSelected === 'hitbox' && charId === data.one){
                alert('correct')
                setHide(false)
            } else {
                alert('incorrect')
                setHide(false)
            }       
        } catch(error){
            console.log(error)
        }


    }
        
    




    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/home')
        }

        if (!authToken){
            navigate('/')
        }
    }, [])



   


    


    function showMenu(e){
        console.log(e.target.id)
        // triggers menu to be shown or hidden
        if (e.target.id === 'waldo-img' || e.target.id === 'hitbox' ){
            setHide(true)
            setlastRegionSelected(e.target.id)
        }
        if (e.target.id === 'main'){
            setHide(false)
            setlastRegionSelected(e.target.id)
        }
        

    }

    function startGameFn(e){
        e.preventDefault();
        setStartGame(true)
    }

    return (
        <div className="main" id="main" onClick={showMenu} >
            <Nav signOut={props.signOut} name={props.name} />
            
            {startGame ? 
                         <div className="main"> 
                            <h1 className="title">Wheres Waldo</h1>
                            {<Timer />}
                            <div className="waldo-container" id="waldo-container">
                                <img className="waldo" id="waldo-img" src={img1} alt=""></img>
                                <div id="hitbox">X</div>
                            </div>
                            {hide ? <DropDownMenu  validate={validateSelection} /> : ""}
                         </div> 
                         : 
                         <button className="start-btn" onClick={startGameFn}>Start Game</button>}
        </div>
    )
}