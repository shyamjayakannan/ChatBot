"use client";

import classes from "../../styles/home/Home.module.css";
import HomeTitle from "../../components/home/homeTitle";
import HomeInfo from "../../components/home/homeInfo";

export default function Home() {
    return (
        <div>
            <HomeTitle />
            <HomeInfo />
        </div>
    );
}
