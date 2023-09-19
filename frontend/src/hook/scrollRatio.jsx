"use client";

import { useEffect } from "react";

export default function useScrollRatio(callback, element) {
    useEffect(() => {
        let el = element;
        let h = 0;

        while (el) {
            h += el.offsetTop;
            el = el.offsetParent;
        }

        const listener = document.addEventListener("scroll", () => callback(h));

        return () => removeEventListener("scroll", listener);
    }, []);
}