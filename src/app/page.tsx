"use client";

import Canvas from "../components/Canvas"
import { SettingsMenuHamburgerButton, SettingsMenu } from "../components/Settings"

import { useEffect, useRef, useReducer, useState } from "react";

import { FaBeer } from 'react-icons/fa';
import { BsTextareaT, BsCardImage } from 'react-icons/bs';
const DEBUG = true;


const PlacableComponent = ({ Icon, text, templateHTML, onMouseDown }: any) => {
    // const ComponentHTML = templateHTML;

    return (
        <button className="flex items-center gap-x-3 felx-row" onMouseDown={onMouseDown}>
            <Icon size={32} />
            <span>{text}</span>
        </button>
    )

}


export default function MainPage() {
    const [canvasElements, setCanvasElements] = useState<React.ReactElement<any, string | React.JSXElementConstructor<any>>[]>([])
    const canvasRef = useRef<HTMLDivElement>(null);

    const [showSettingsMenu, setShowSettingsMenu] = useState(true);

    const toogtleSettingsMenu = () => {
        console.log("toggled");
        setShowSettingsMenu(prev => !prev);

    }

    const mouseEnterHandler = (e: any) => {
        console.log(e);
    }


    /* Use effect for mouse events */
    useEffect(() => {
        if (!canvasRef.current) return;


        canvasRef.current.addEventListener('mouseenter', mouseEnterHandler)
        canvasRef.current.addEventListener('mouseup', mouseEnterHandler)

        return () => {
            console.log("unmounting");

            canvasRef.current?.removeEventListener('mouseenter', mouseEnterHandler);
        }
    }, [])

    return (
        <>
            <div id='overlay' className={`relative z-10 h-screen ${((DEBUG) ? 'outline-1 outline-dotted outline-red' : '')}`}>
                <label className="absolute z-10 top-5 left-5">
                    <input type='checkbox' className='hidden' onChange={toogtleSettingsMenu} />
                    <div className="relative flex overflow-hidden items-center justify-center rounded-xl w-[50px] h-[50px] transform transition-all bg-zinc-300 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
                        <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">

                            {
                                (!showSettingsMenu) ?

                                    <>
                                        {/* https://tailwindcomponents.com/component/animated-hamburger-menu-icon */}
                                        <div className="bg-black h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-x-10"></div>
                                        <div className="bg-black h-[2px] w-7 rounded transform transition-all duration-300 group-focus:translate-x-10 delay-75"></div>
                                        <div className="bg-black h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-x-10 delay-150"></div>

                                    </>
                                    :
                                    <>

                                        <div className="absolute items-center justify-between transform transition-all duration-500 top-2.5 translate-x-0 flex w-12">
                                            <div className="absolute bg-black h-[2px] w-5 transform transition-all duration-500  elay-300 rotate-45"></div>
                                            <div className="absolute bg-black h-[2px] w-5 transform transition-all duration-500 delay-300 -rotate-45"></div>
                                        </div>
                                    </>
                            }



                        </div>
                    </div>
                </label >


                {/* Component Navbar */}
                < div className="absolute z-10 flex flex-row p-4 mt-auto mb-auto rounded-lg shadow-lg top-10 right-5 bg-zinc-300" >
                    <div className="flex flex-col gap-y-4">

                        <>
                            <PlacableComponent Icon={BsTextareaT} text="Text Element" templateHTML={<><p>Text Element</p></>} onMouseDown={(e: any) => console.log(e)} />
                            <PlacableComponent Icon={BsCardImage} text="Image Element" templateHTML={<><img src="/placeholder.png"></img></>} />
                        </>
                        <div>
                            <button id="test-add-element" onClick={() => {
                                setCanvasElements(prev => [...prev, <h1 key={prev.length + 1}><span>test</span></h1>]);
                            }}>
                                add p element
                            </button>
                        </div>
                    </div>
                </div >

                {/* middle menu */}
                {
                    (showSettingsMenu) ?
                        <>
                            < div className="absolute top-0 bottom-0 left-0 right-0 z-10 w-1/4 p-4 m-auto overflow-y-scroll rounded-lg shadow-lg bg-zinc-300 h-1/2" >
                                <button id="close-settings" className="absolute top-2 right-2" onClick={toogtleSettingsMenu}>
                                    close
                                </button>
                                <div className="flex flex-col w-auto h-full">

                                    {/* bottom icons */}
                                    <div className="flex justify-between mt-auto fl ex-row">
                                        <div className="flex flex-row justify-around w-1/3">
                                            <p> repo </p>
                                            <p> issues </p>
                                            <p> mail </p>
                                        </div>
                                        <p>Copyright &copy; Linus J {new Date().getFullYear()}</p>
                                    </div>
                                </div>
                            </div >
                        </>

                        :
                        <></>
                }


                {/* Zoom percentage, redo, undo button  */}
                < div className="absolute z-10 flex flex-row items-center gap-2 bottom-5 left-5 " >

                    {/* <div className="flex flex-row items-center justify-center">
                        <div>
                            <button>-</button>
                        </div>
                        <div className="w-12 h-12">
                            <button>+</button>
                        </div>
                    </div> */}

                    <div className="flex flex-row gap-1 " >
                        <button className="p-2 rounded-lg shadow-lg bg-zinc-200">undo</button>
                        |
                        <button className="p-2 rounded-lg shadow-lg bg-zinc-200">redo</button>

                    </div>

                </div >
                <div className="block min-h-screen p-4 border-4 border-black z-1 bg-zinc-900" ref={canvasRef} >

                    <Canvas
                        elements={canvasElements}
                    />
                </div>
            </div >


        </>
    )
}