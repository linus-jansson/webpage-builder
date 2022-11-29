"use client";

import { useEffect, useRef, useReducer, useState } from "react";

import { renderToString } from "react-dom/server";

function elementObjectToElementString(elementObject: React.ReactElement<any, string | React.JSXElementConstructor<any>>[]): string {
    /*
        Converts all elements in a ReactElement Array to a concatinated string

        For example 
        Input:
            [<h1><span>test</span></h1>, <h1><span>test</span></h1>]
        Output:
            "<h1><span>test</span></h1> <h1><span>test</span></h1>"

        @param elementObject: ReactElements Array eg `[<h1><span>test</span></h1>, <h1><span>test</span></h1>]`
        @return: string
    */
    let output = ""
    elementObject.forEach((element) => {

        output += renderToString(element)

    })
    return output;

}

export default function Canvas({ elements }: {
    elements: React.ReactElement<any, string | React.JSXElementConstructor<any>>[]
}) {

    return elements && <div dangerouslySetInnerHTML={{ __html: elementObjectToElementString(elements) }} />
}