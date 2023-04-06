import React from "react";
import './Main.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";
import { getAuth } from "firebase/auth";
import img1 from '../../assets/wheres-waldo.jpeg'
import useMousePosition from "../hooks/useMousePosition";
import DropDownMenu from "../dopDownMenu/DropDownMenu";

export default function Main(props) {


    const [authData, setAuthData] = useState({})
    const [coords, setCoords] = useState({x: null, y: null});
    const [hide, setHide] = useState(null)

    const mousePos = useMousePosition();

    let navigate = useNavigate();

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
        triggerWaldo()
    }, [mousePos])
   
    function triggerWaldo(e){
        setHide('visible')
        setCoords({x: mousePos.x, y: mousePos.y})

    }

    function hideCallback(){
        setHide('hidden')
    }

    return (
        <div className="main">
            <Nav signOut={props.signOut} name={props.name} />
            <h1 className="title">Wheres Waldo</h1>
            <div className="waldo-container">
                <img className="waldo" id="waldo" src={img1} alt=""></img>
            {<DropDownMenu x={coords.x} y={coords.y} hide={hide} hideCallback={hideCallback} />}
            </div>
            {JSON.stringify(mousePos)}
        </div>
    )
}