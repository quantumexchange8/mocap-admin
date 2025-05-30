import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function NumberAnimate({ value, duration = 1000  }) {

    const [display, setDisplay] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = value / (duration / 16); // ~60fps
        const step = () => {
            start += increment;
            if (start < value) {
                setDisplay(Math.floor(start));
                requestAnimationFrame(step);
            } else {
                setDisplay(value);
            }
        };
        requestAnimationFrame(step);
    }, [value]);

    return <span>{display}</span>;
}