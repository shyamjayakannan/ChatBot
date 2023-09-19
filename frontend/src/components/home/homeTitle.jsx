"use client";

import { useRef } from "react";
import classes from "../../styles/home/homeTitle.module.css";
import useScrollRatio from "../../hook/scrollRatio";

export default function HomeTitle() {
    const element = useRef();

    useScrollRatio(height => {
        const scale = 2;
        element.current.style.opacity = 1 - (window.scrollY - height) * scale / element.current.scrollHeight;
    }, element.current);

    return (
        <section ref={element} className={classes.section}>
            <div className={classes.shape}></div>
            <div className={classes.content}>
                <h1>Knowledge at your doorstep</h1>
                <p>Knowledge at your doorstep</p>
                <button>Try Now</button>
            </div>
        </section>
    );
};