import React, { useEffect, useState, useRef, useReducer } from 'react'

let settingsActionTypes = {
    setBackground: 'setBackground',
}

const settingsReducer = (state, action) => {
    switch (action.type) {
        case settingsActionTypes.setBackground:
            console.log('setBackground')
            return { ...state, background: action.payload }
        default:
            break;
    }
}


export default function Canvas() {
    const settingsInital = {
        background: '#000000',
    }

    const [elements, setElements] = useState<any[]>([])
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [settings, settingsDispatch] = useReducer(settingsReducer, settingsInital)
    const canvasContainer = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
        console.log("func called")
    }

    const handleMouseUp = (e: MouseEvent) => {
        console.log(e)
        // if mouse if over an element, we probably want to change it
        placeItemOnScreen(e.clientX, e.clientY)
    }

    const handleMouseDown = (e: MouseEvent) => {
        // If mouse is over an element in elements state, we want to move that element on drag
        console.log(e)
    }

    const placeItemOnScreen = (x: number, y: number) => {

        /* Center middle of element to mouse position */
        let width = 100
        let height = 100
        let placement_x = x + (width / 2)
        let placement_y = y + (height / 2)
        let text_element = React.createElement("p", {}, "Hello World")
        let new_element = React.createElement("div", {
            style: {
                position:
                    "absolute",
                top: placement_y,
                left: placement_x,
                width: width,
                height: height,
                backgroundColor: "red",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white'
            },
            contentEditable: true,
            key: Math.random()
        }, text_element)

        // document.body.appendChild(div)
        if (canvasContainer.current != null) {
            console.log(canvasContainer.current.offsetTop, canvasContainer.current.offsetLeft)
            if (canvasContainer.current.offsetTop < y && canvasContainer.current.offsetLeft < x) {
                setElements((oldElements: any) => [...oldElements, new_element])
                console.log("x: " + x + " y: " + y)
            }
        }
    }

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mousedown", handleMouseDown)
        document.addEventListener("mouseup", handleMouseUp)
        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mousedown", handleMouseDown)
            document.removeEventListener("mouseup", handleMouseUp)
            console.log("Move mouse event removed")
        }
    }, [])

    const download = () => {
        console.log("Download button press")
    }

    useEffect(() => {
        console.log(mousePosition)
    }, [mousePosition])
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            {/* <div className="sm:h-screen sm:w-screen sm:flex sm:justify-center sm:items-center md:hidden">
                <h1>Please use a larger device</h1>
            </div> */}
            <div id='sidebar' className='z-10 w-1/2 h-full p-4'>
                <button className='' onClick={download}>Download Create Page</button>

                <div id='elements_placed'>
                    <div className='flex flex-row justify-evenly'>
                        <p>Example Element</p>
                        <p>X</p>
                        <p>&darr;</p>
                    </div>
                </div>

                <div id='settings'>
                    <input type="text" placeholder='Background color' value={settings.background} onChange={(e) => settingsDispatch({ type: settingsActionTypes.setBackground, payload: e.target.value })} />
                </div>
            </div>
            <div style={{ backgroundColor: settings.background }} className='z-0 bg-black w-full h-full overflow-x-hidden overflow-y-hidden' ref={canvasContainer}>
                <p className='text-white text-center text-3xl'>test</p>
                {[...elements]}
            </div>

        </div>
    )
}
