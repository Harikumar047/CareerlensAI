import React, { useState, useCallback, useRef } from "react";
import { IconCheck } from "./Icons";

export default function Dropzone({ label, sublabel, formats, filled, fileName, onFile, icon, accent }) {
    const [dragging, setDragging] = useState(false);
    const ref = useRef(null);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) onFile(file);
    }, [onFile]);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) onFile(file);
    };

    return (
        <div
            className={`dropzone-card${dragging ? " drag-over" : ""}${filled ? " filled" : ""}`}
            style={dragging ? { borderColor: accent } : {}}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => ref.current?.click()}
        >
            <input ref={ref} type="file" accept={formats} style={{ display: "none" }} onChange={handleChange} />
            <div className="drop-icon" style={filled ? { color: "var(--silver-chalice)" } : { color: accent }}>
                {filled ? <IconCheck size={28} /> : icon}
            </div>
            <div className="drop-label">{label}</div>
            {filled && fileName
                ? <div className="file-badge"><IconCheck />{fileName}</div>
                : <div className="drop-sub">{sublabel}</div>
            }
            <div className="drop-formats">{formats}</div>
        </div>
    );
}
