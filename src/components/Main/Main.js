import React from "react";
import './Main.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";
import { getAuth } from "firebase/auth";
import img1 from '../../assets/wheres-waldo.jpeg'
import useMousePosition from "../hooks/useMousePosition";
import DropDownMenu from "../dopDownMenu/DropDownMenu";
import { getFirestore, doc, getDoc, collection, setDoc } from 'firebase/firestore'

export default function Main(props) {


    const [authData, setAuthData] = useState({})
    const [coords, setCoords] = useState({x: null, y: null});
    const [hide, setHide] = useState(null)
    const [region, setRegion] = useState(null)
    const [selection, setSelection] = useState(null)

    const mousePos = useMousePosition();

    let navigate = useNavigate();

    async function validateSelection(){

        try {
            const db = getFirestore();
            const charRef = doc(db, 'characters', 'odin')
            // await setDoc(doc(charRef, 'two'), {'two': 'michael'})
            const charSnap = await getDoc(charRef)
            let data = charSnap.data()
            console.log(data)
            if (region === 'hitbox' && selection === data.one){
                alert('correct')
            } else {
                alert('incorrect')
            }

        } catch {
            console.log('undefined')
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
        triggerMenu()
    }, [mousePos])
   
    function triggerMenu(e){
        setHide('visible')
        setCoords({x: mousePos.x, y: mousePos.y})
        

    }

    useEffect(() => {
        validateSelection()
    }, [selection])

    async function hideCallback(selection){
        setHide('hidden')
        setSelection(selection)
        
        console.log('sel', selection)
        console.log('region', region)
    }

    function checkRegion(e){
        setRegion(e.target.id)

    }
    return (
        <div className="main">
            <Nav signOut={props.signOut} name={props.name} />
            <h1 className="title">Wheres Waldo</h1>
            <div className="waldo-container" onClick={checkRegion}>
                <img className="waldo" id="waldo-img" src={img1} alt=""></img>
                <div id="hitbox">X</div>
            </div>
            {<DropDownMenu x={coords.x} y={coords.y} hide={hide} hideCallback={hideCallback} />}
            {JSON.stringify(mousePos)}

        </div>
    )
}