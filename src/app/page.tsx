"use client";

import Canvas from "../components/Canvas"
import { useEffect, useRef, useReducer, useState, createElement } from "react";

import { BsTextareaT, BsCardImage } from 'react-icons/bs';

const PlacableComponent = ({ Icon, text, templateHTML, onClick }: any) => {
    // const ComponentHTML = templateHTML;

    return (
        <button className="flex items-center gap-x-3 felx-row" onMouseUp={onClick}>
            <Icon size={32} />
            <span>{text}</span>
        </button>
    )

}

type componentReducerState = {
    currentComponent: string,
}

const initialComponentNavbarState = {
    currentComponent: "TEXT_ELEMENT"
} as componentReducerState

const ReducerTypes = {
    SET_CURRENT_COMPONENT_TEXT: "SET_CURRENT_COMPONENT_TEXT",
    SET_CURRENT_COMPONENT_IMAGE: "SET_CURRENT_COMPONENT_IMAGE",
    SET_CURRENT_COMPONENT_DEBUG_BUTTON: "SET_CURRENT_COMPONENT_DEBUG_BUTTON",
}

function componentReducer(state: componentReducerState, action: any) {
    switch (action.type) {
        case ReducerTypes.SET_CURRENT_COMPONENT_TEXT:
            console.log("chosen text")
            return {
                currentComponent: "TEXT_ELEMENT"
            }
        case ReducerTypes.SET_CURRENT_COMPONENT_IMAGE:
            console.log("chosen image")
            return {
                currentComponent: "IMAGE_ELEMENT"
            }
        case ReducerTypes.SET_CURRENT_COMPONENT_DEBUG_BUTTON:
            console.log("chosen debug button")
            return {
                currentComponent: "DEBUG_BUTTON"
            }
        default:
            throw new Error("Invalid action type")
    }
}

function ComponentsNavbar({ currentComponentState, dispatch }: any) {

    return (
        < div className="absolute z-10 flex flex-row p-4 mt-auto mb-auto rounded-lg shadow-lg top-10 right-5 bg-zinc-300" >
            <div className="flex flex-col gap-y-4">
                <>
                    <PlacableComponent Icon={BsTextareaT} text="Text Element" onClick={() => dispatch({ type: ReducerTypes.SET_CURRENT_COMPONENT_TEXT })} />
                    <PlacableComponent Icon={BsCardImage} text="Image Element" onClick={() => dispatch({ type: ReducerTypes.SET_CURRENT_COMPONENT_IMAGE })} />
                    <PlacableComponent Icon={BsCardImage} text="Debug Button" onClick={() => dispatch({ type: ReducerTypes.SET_CURRENT_COMPONENT_DEBUG_BUTTON })} />

                </>
            </div>
        </div >
    )
}


export default function MainPage() {
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);

    const [componentState, dispatch] = useReducer(componentReducer, initialComponentNavbarState)

    const toogtleSettingsMenu = () => {
        console.log("toggled");
        setShowSettingsMenu(prev => !prev);
    }

    return (
        <>
            <div id='overlay' className={`relative z-10 h-screen`}>
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
                <ComponentsNavbar currentComponentState={componentState} dispatch={dispatch} />

                {/* Placed element props settings */}
                {/* Will be passed from Canvas->PlacedComponent */}
                {/* If isSelected===true in placedComponent Show prop settings */}

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
                                            <p>repo</p>
                                            <p>issues</p>
                                            <p>mail</p>
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
                <div className="block border-black min-h-screenborder-4 z-1 bg-zinc-900">

                    <Canvas componentState={componentState} canvasSettings={{}} />
                </div>
            </div >


        </>
    )
}