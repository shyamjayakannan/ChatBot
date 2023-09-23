"use client";

import { useEffect, useRef, useState } from "react";
import classes from "../../styles/home/homeInfo.module.css";

const data = {
    left: [
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat eos assumenda deserunt amet nemo!",
        "Stop staring at that blank page. Generate a one-pager, a presentation, a mood board, and more"
    ],
    right: [
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident, ab corrupti sint minus voluptate tempore earum repudiandae quasi ducimus ut atque et culpa ullam, officia similique, mollitia maxime quibusdam eligendi!",
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident, ab corrupti sint minus voluptate tempore earum repudiandae quasi ducimus ut atque et culpa ullam, officia similique, mollitia maxime quibusdam eligendi!"
    ]
};

export default function HomeInfo() {
    const p1 = useRef();
    const p2 = useRef();
    const container = useRef();
    const refs = [p1, p2];
    const [show, setShow] = useState([true, false]);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            setShow(show => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        show = show.map(el => false);
                        show[entry.target.getAttribute('data-key')] = true;
                    }
                });

                return [...show];
            });
        }, {
            threshold: 0.5,
        });

        refs.forEach(ref => observer.observe(ref.current));
    }, []);

    return (
        <section className={classes.section}>
            <div className={classes.left}>
                {data.left.map((info, index) => show[index] && <p key={index}>{info}</p>)}
            </div>
            <div ref={container} className={classes.right}>
                {data.right.map((info, index) => <p data-key={index} key={index} ref={refs[index]}>{info}</p>)}
            </div>
        </section>
    );
}