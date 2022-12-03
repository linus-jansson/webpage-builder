"use client";

import { useEffect, useRef, useReducer, useState, createElement, use } from "react";

import { renderToString } from "react-dom/server";


const PlacableComponent = ({ element, props, children = null }:
    {
        element: string,
        props: any,
        children?: React.ReactElement<any, string | React.JSXElementConstructor<any>>[] | null | string
    }
) => {
    // For passing children to parent
    // https://stackoverflow.com/questions/38394015/how-to-pass-data-from-child-component-to-its-parent-in-reactjs#38397755
    // https://stackoverflow.com/questions/40722382/how-to-pass-state-back-to-parent-in-react#40722477

    const [isSelected, setIsSelected] = useState(true);
    let _props = {
        ...props,
        style: {
            ...props?.style,
            outline: (isSelected) ? "1px dotted red" : "none",
        },
        onClick: (e: any) => { console.log("Clicked on element", e); setIsSelected(true) },
        onMouseEnter: (e: any) => { console.log("Mouse entered element", e) }
    }
    console.log(_props)
    return createElement(element, { ..._props }, children)
}

function elementObjectToElementString(elementObject: React.ReactElement<any, string | React.JSXElementConstructor<any>>[]): string {
    let output = ""
    elementObject.forEach((element) => {

        output += renderToString(element)

    })
    return output;

}

export default function Canvas({ componentState, canvasSettings }: {
    componentState: {
        currentComponent: string,
    }
    canvasSettings: any
}) {
    const [inCanvasBounds, setInCanvasBounds] = useState<boolean>(false);
    const [canvasElements, setCanvasElements] = useState<React.ReactElement<any, string | React.JSXElementConstructor<any>>[]>([])
    const selectedItemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log("New component state", componentState)
    }, [componentState])

    const placeItemOnClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log(e)
    }

    /*
        Key Bind cheat sheet
 
        # Elements
        Left Drag and drop from components panel to canvas: place new element
        Left Drag and drop in canvas: move placed element
 
        Doubble Click: change content of already placed element
        Left Click: select element if mouse is in bounds of element
        Ctrl + x, DEL, Backspace: delete element if selected
        CTRL + Z: undo last placement
        CTRL + Y: redo last placement
 
        # CANVAS CONTROLS
        CTRL + left click drag: move canvas position
        CTRL + scroll: zoom canvas in and out
        
        
        Left clicking where there isnt an element should deselect all elements
    
    */


    const mouseEnterHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        // if (inCanvasBounds === false) {
        //     console.log("not in bounds of canvas area", inCanvasBounds);
        //     return;
        // };


        if (!e.shiftKey) return;

        let defaultWidth = 100;
        let defaultHeight = 100;

        console.log("mouse pressed in canvas");
        switch (componentState.currentComponent) {
            case "TEXT_ELEMENT":
                setCanvasElements(prev => [...prev, createElement("p", {
                    key: Math.random(),
                    style: {
                        position: "absolute",
                        top: e.clientY - 50,
                        left: e.clientX - 50,
                        width: "100px",
                        height: "100px",
                    },
                    onClick: (e: any) => { console.log(e); console.log("cliecked"); }
                }, "text element")])
                break;
            case "IMAGE_ELEMENT":

                setCanvasElements(prev => [...prev,
                <img
                    key={Math.random()}
                    src="/placeholder.png"
                    width={200}
                    height={200}
                    onClick={placeItemOnClickHandler}
                    onDragStart={(e) => console.log(e)}
                    onDragEnd={(e) => console.log(e)}
                    style={
                        {
                            position: 'absolute',
                            top: e.clientY - 100,
                            left: e.clientX - 100
                        }
                    }
                />
                ])
                break;
            case "DEBUG_BUTTON":
                let new_element = <PlacableComponent
                    key={Math.random()}
                    element={"button"}
                    props={{
                        style:
                        {
                            position: "absolute",
                            top: e.clientY - 50,
                            left: e.clientX - 50,
                            width: "100px",
                            height: "100px",
                            background: "red"
                        }
                    }}
                >DEBUG Button</PlacableComponent>

                setCanvasElements(prev => [...prev, new_element])
            default:
                console.log("No state set for current component");
                break;
        }
    }

    useEffect(() => {
        console.log(`Currently bounds are ${inCanvasBounds}`);
    }, [inCanvasBounds])
    console.log("render of canvas")
    return canvasElements && <div
        className="h-screen"
        onMouseEnter={() => setInCanvasBounds(true)}
        onMouseLeave={() => setInCanvasBounds(false)}
        // onMouseDown={mouseEnterHandler}
        onMouseUp={mouseEnterHandler}
        onDoubleClick={mouseEnterHandler} //
        dangerouslySetInnerHTML={{ __html: elementObjectToElementString(canvasElements) }}
    />
}