import React, { useEffect, useState } from "react";

export default function DropDownMenu(props){



    function hideMenu(){
        props.hideCallback();
    }

    return (
        <div className="drop-down-menu" style={{'position': 'absolute', 'top': props.y, 'left': props.x, 'visibility': props.hide }}>
            <select onInput={hideMenu}>
                <option>Waldo</option>
                <option>Michael</option>
                <option>James</option>
            </select>
        </div>
    )
}