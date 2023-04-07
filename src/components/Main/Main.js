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


export default function Main(props) {

    let navigate = useNavigate();

    const [authData, setAuthData] = useState({});
    const [coords, setCoords] = useState({x: null, y: null});
    const [selection, setSelection] = useState("");
    const [hide, setHide] = useState(false);
    const [lastRegionSelected, setlastRegionSelected] = useState();





    async function validateSelection(){

        try {

            const db = getFirestore();
            const charRef = doc(db, 'characters', 'odin')
            // await setDoc(doc(charRef, 'two'), {'two': 'michael'})
            const charSnap = await getDoc(charRef)
            let data = charSnap.data()
            console.log(data)
            if (lastRegionSelected === 'hitbox' && selection === data.one){
                alert('correct')
            } else {
                alert('incorrect')
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



   


    useEffect(() => {
        if (lastRegionSelected){
            validateSelection();

        }
    }, [selection])

    
    async function chooseCharacterCallback(selection){
        // recieves id from clicking on a name and sets selection var to that id.
        setSelection(selection)

        
        console.log('sel', selection)
    }

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



    return (
        <div className="main" id="main" onClick={showMenu} >
            <Nav signOut={props.signOut} name={props.name} />
            <h1 className="title">Wheres Waldo</h1>
            <div className="waldo-container" id="waldo-container">
                <img className="waldo" id="waldo-img" src={img1} alt=""></img>
                <div id="hitbox">X</div>
            </div>
            {hide ? <DropDownMenu chooseCharacterCallback={chooseCharacterCallback} /> : ""}


        </div>
    )
}