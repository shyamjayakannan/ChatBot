"use client";

import React, { useState } from "react";

const ThemeContext = React.createContext({
    theme: false,
    toggleTheme: () => { },
});

export function ThemeContextProvider(props) {
    const [theme, setTheme] = useState(false);
    
    function toggleThemeHandler() {
        setTheme(theme => !theme);
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme: toggleThemeHandler }}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export default ThemeContext;