"use client";

import { useContext, useRef } from "react";
import classes from "../../styles/Navbar.module.css";
import Image from "next/image";
import ThemeContext from "../../store/theme/Theme-context";
import useScrollRatio from "../../hook/scrollRatio";

export default function Navbar() {
    const themeCtx = useContext(ThemeContext);
    const element = useRef();
    useScrollRatio(height => {
        const scroll = window.scrollY;

        if (scroll <= 500) element.current.style.opacity = 0;
        else element.current.style.opacity = 1;
    }, element.current);

    function changeTheme(e) {
        themeCtx.toggleTheme();
    }

    return (
        <nav className={classes.main}>
            <Image src="/chat.png" width={40} height={40} alt="chat" />
            <ul>
                <li>yaay</li>
                <li>yaay</li>
                <li>yaay</li>
                <li>yaay</li>
            </ul>
            <input type="checkbox" id="theme-toggle" onChange={changeTheme} defaultChecked={themeCtx.theme} />
            <label htmlFor="theme-toggle">
                <div>
                    {themeCtx.theme ? <Image src="/sun-24.png" width={20} height={20} alt="sun" />
                        : <Image src="/moon-4-24.png" width={20} height={20} alt="moon" />}
                </div>
            </label>
            <a href="">Sign In</a>
            <div ref={element} style={{ backgroundColor: `${themeCtx.theme ? "black" : "var(--white-light-color)"}`, height: "100%", width: "100%", position: "absolute", top: "0", left: "0", zIndex: "0", opacity: "0" }}></div>
        </nav>
    );
}