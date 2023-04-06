import React, { useEffect, useState } from "react";

export default function useMousePosition(){

    const [mousePosition, setMousePosition] = useState({x: null, y: null})


    useEffect(() => {
        const handleMouseClick = (event) => {
            if (event.target.id === 'waldo-img'){
                setMousePosition({x: event.clientX, y: event.clientY})
            }

            if (event.target.id === 'hitbox'){
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