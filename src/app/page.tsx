"use client";

import Canvas from "../components/Canvas"
import { SettingsMenuHamburgerButton, SettingsMenu } from "../components/Settings"

import { useEffect, useRef, useReducer, useState } from "react";

export default function MainPage() {
    const [canvasElements, setCanvasElements] = useState<React.ReactElement<any, string | React.JSXElementConstructor<any>>[]>([])

    return (
        <>
            <div id='overlay' className="relative z-10 h-screen">
                <button className="absolute z-10 top-5 left-5">
                    <SettingsMenuHamburgerButton />
                </button>


                {/* Component Navbar */}
                <div className="absolute z-10 flex flex-row gap-2 p-4 mt-auto mb-auto rounded-lg shadow-lg h-1/2 top-10 right-5 bg-zinc-200">
                    <div className="flex flex-col gap-y-4">
                        <p className="text-lg">Component</p>
                        <p className="text-lg">Component</p>
                        <p className="text-lg">Component</p>
                        <p className="text-lg">Component</p>
                    </div>
                </div>

                {/* Placed Component Properties */}


                {/* Zoom percentage, redo, undo button  */}
                <div className="absolute z-10 flex flex-row items-center gap-2 bottom-5 left-5 ">

                    {/* <div className="flex flex-row items-center justify-center">
                        <div>
                            <button>-</button>
                        </div>
                        <div className="w-12 h-12">
                            <button>+</button>
                        </div>
                    </div> */}

                    <div className="flex flex-row gap-1 ">
                        <button className="p-2 rounded-lg shadow-lg bg-zinc-200">undo</button>
                        |
                        <button className="p-2 rounded-lg shadow-lg bg-zinc-200">redo</button>

                    </div>

                    <div>
                        <button id="test-add-element" onClick={() => {
                            setCanvasElements(prev => [...prev, <h1 key={prev.length + 1}><span>test</span></h1>]);
                        }}>add test element p</button>
                    </div>
                </div>
                <div className="block min-h-screen p-4 border-4 border-black z-1">

                    <Canvas
                        elements={canvasElements}
                    />
                </div>
            </div>


        </>
    )
}