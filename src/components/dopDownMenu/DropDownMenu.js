import React, { useEffect, useState } from "react";

export default function DropDownMenu(props){



    function hideMenu(e){
        console.log(e)
        props.hideCallback(e.target.id);
    }

    return (
        <div className="drop-down-menu" style={{'position': 'absolute', 'top': props.y, 'left': props.x, 'visibility': props.hide }}>
            <div>
                <p id="michael" onClick={hideMenu}>michael</p>
                <p id="waldo" onClick={hideMenu}>waldo</p>
                <p id="james" onClick={hideMenu}>james</p>
            </div>
        </div>
    )
}