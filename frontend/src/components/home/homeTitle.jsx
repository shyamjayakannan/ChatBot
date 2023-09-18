"use client";
import { useEffect, useRef } from "react";
import classes from "../../styles/home/homeTitle.module.css";
import ScrollRatio from "../../hook/scrollRatio";

export default function HomeTitle() {
    const element = useRef();

    useEffect(() => {
        function callback(intersectionRatio, element) {
            const scale = 3;
            element.style.opacity = 1 - intersectionRatio * scale;
        }

        const removeHandler = ScrollRatio(callback, element.current);

        return () => removeHandler();
    }, []);

    return (
        <section ref={element} className={classes.section}>
            <div className={classes.shape}></div>
            <div className={classes.content}>
                <h1>Knowledge at you doorstep</h1>
                <p>Knowledge at you doorstep</p>
                <a>Try Now</a>
            </div>
        </section>
    );
};