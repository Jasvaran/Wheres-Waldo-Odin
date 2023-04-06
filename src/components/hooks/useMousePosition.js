import React, { useEffect, useState } from "react";

export default function useMousePosition(){

    const [mousePosition, setMousePosition] = useState({x: null, y: null})


    useEffect(() => {
        const handleMouseClick = (event) => {
            if (event.target.id === 'waldo'){
                setMousePosition({x: event.clientX, y: event.clientY})
            }
        }

        window.addEventListener('click', handleMouseClick);

        return () => {
            window.removeEventListener('click', handleMouseClick)
        };
    }, []);

    return (
        mousePosition
    )
}