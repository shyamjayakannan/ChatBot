"use client";

import classes from "../../styles/home/Home.module.css";
import HomeTitle from "../../components/home/homeTitle";
import HomeInfo from "../../components/home/homeInfo";
import { useContext } from "react";
import ThemeContext from "../../store/theme/Theme-context";
import Navbar from "../../components/navbar/navbar";

export default function Home() {
    const themeCtx = useContext(ThemeContext);

    return (
        <div className={themeCtx.theme ? classes['dark-theme'] : undefined}>
            <Navbar />
            <HomeTitle />
            <HomeInfo />
        </div>
    );
}
