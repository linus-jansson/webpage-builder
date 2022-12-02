"use client";

import { useEffect, useRef, useReducer, useState, createElement } from "react";

import { renderToString } from "react-dom/server";

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
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log("New component state", componentState)
    }, [componentState])

    const mouseEnterHandler = (e: any) => {
        // if (inCanvasBounds === false) {
        //     console.log("not in bounds of canvas area", inCanvasBounds);
        //     return;
        // };

        if (!e.shiftKey) return;

        console.log("mouse pressed in canvas");
        switch (componentState.currentComponent) {
            case "TEXT_ELEMENT":
                setCanvasElements(prev => [...prev, createElement("p", {
                    style: {
                        position: "absolute",
                        top: e.clientY,
                        left: e.clientX,
                        width: "100px",
                        height: "100px",
                    }
                }, "text element")])
                break;
            case "IMAGE_ELEMENT":
                setCanvasElements(prev => [...prev, createElement("img", {
                    src: "/placeholder.png",
                    width: "100px",
                    height: "100px",
                    style: {
                        position: "absolute",
                        top: e.clientY,
                        left: e.clientX,
                    }
                }, null)])
                break;
            default:
                console.log("No state set for current component");
                break;
        }
    }


    /* Use effect for mouse events */
    useEffect(() => {
        if (!canvasRef.current) return;

        canvasRef.current.addEventListener('mouseenter', () => setInCanvasBounds(true));
        canvasRef.current.addEventListener('mouseleave', () => setInCanvasBounds(false));

        canvasRef.current.addEventListener('mouseup', mouseEnterHandler);

        return () => {
            console.log("unmounting");

            canvasRef.current?.removeEventListener('mouseenter', () => setInCanvasBounds(true));
            canvasRef.current?.removeEventListener('mouseleave', () => setInCanvasBounds(false));
            canvasRef.current?.removeEventListener('mouseup', mouseEnterHandler)
        }
    }, [componentState])

    useEffect(() => {
        console.log(`Currently bounds are ${inCanvasBounds}`);
    }, [inCanvasBounds])

    return canvasElements && <div ref={canvasRef} className="h-screen" dangerouslySetInnerHTML={{ __html: elementObjectToElementString(canvasElements) }} />
}