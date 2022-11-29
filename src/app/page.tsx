"use client";

import Canvas from "../components/Canvas"
import { SettingsMenuHamburgerButton, SettingsMenu } from "../components/Settings"
export default function MainPage() {
    return (
        <>
            <button className="z-10 absolute top-5 left-5">
                <SettingsMenuHamburgerButton />
            </button>

            <div>
                <Canvas />
            </div>
        </>
    )
}