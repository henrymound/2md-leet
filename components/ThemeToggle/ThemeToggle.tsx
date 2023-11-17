import {motion} from "framer-motion";
import React from 'react';

const Moon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="18"
        viewBox="0 0 17 18"
        fill="none"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.1856 13.8399C15.1953 14.2148 14.1216 14.42 13 14.42C8.02944 14.42 4 10.3905 4 5.41995C4 3.38489 4.67544 1.50759 5.81437 0C2.4161 1.28639 0 4.57102 0 8.41995C0 13.3905 4.02944 17.42 9 17.42C11.9355 17.42 14.5428 16.0146 16.1856 13.8399Z"
            fill="black"
        />
    </svg>
);

const Sun: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
    >
        <circle cx="10" cy="10" r="5" fill="white"/>
        <line
            x1="9.75"
            y1="0.75"
            x2="9.75"
            y2="2.58333"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
        />
        <line
            x1="9.75"
            y1="17.4167"
            x2="9.75"
            y2="19.25"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
        />
        <line
            x1="17.071"
            y1="3.98962"
            x2="15.7747"
            y2="5.28598"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
        />
        <line
            x1="5.28613"
            y1="15.7747"
            x2="3.98977"
            y2="17.0711"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
        />
        <line
            x1="19.25"
            y1="10.75"
            x2="17.4167"
            y2="10.75"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
        />
        <line
            x1="2.58325"
            y1="10.75"
            x2="0.749919"
            y2="10.75"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
        />
        <line
            x1="16.0104"
            y1="17.071"
            x2="14.714"
            y2="15.7747"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
        />
        <line
            x1="4.22547"
            y1="5.28595"
            x2="2.92911"
            y2="3.98959"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
        />
    </svg>
);

export const ThemeToggle = (props: {
    setThemeLight: (toggle: boolean) => void;
    isLightTheme: boolean;
}) => {
    const variants = {
        enter: {opacity: 1, scale: 0.95},
        center: {opacity: 1, scale: 1},
        exit: {opacity: 1, scale: 1.05},
    };
    return (
        <div
            style={{
                cursor: 'pointer',
                height: '24px',
                width: '24px',
            }}
            onClick={() => {
                props.setThemeLight(!props.isLightTheme);
            }}
        >
            <motion.div
                animate={props.isLightTheme ? 'enter' : 'exit'}
                variants={variants}
            >
                {!props.isLightTheme ? <Sun/> : <Moon/>}
            </motion.div>
        </div>
    );
};
