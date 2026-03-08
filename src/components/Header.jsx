import React from "react";
import { IconSun, IconMoon } from "./Icons";

export default function Header({ theme, onToggleTheme }) {
    return (
        <header className="cl-header">
            <div className="cl-logo">Career<span>Lens</span> AI</div>
            <button className="cl-theme-btn" onClick={onToggleTheme}>
                {theme === "dark" ? <IconSun /> : <IconMoon />}
            </button>
        </header>
    );
}
