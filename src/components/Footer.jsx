import React from "react";

export default function Footer() {
    return (
        <footer className="cl-footer">
            <div className="cl-footer-logo">Career<span>Lens</span> AI</div>
            <p>Built for CS students across India &nbsp;·&nbsp; <a href="#">Privacy</a> &nbsp;·&nbsp; <a href="#">Terms</a> &nbsp;·&nbsp; <a href="mailto:hello@careerlens.ai">Contact</a></p>
            <p style={{ marginTop: 8, fontSize: "0.7rem", opacity: 0.5 }}>© {new Date().getFullYear()} CareerLens AI · Fully Functional Frontend App · Live Match Engine</p>
        </footer>
    );
}
