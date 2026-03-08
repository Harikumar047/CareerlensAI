import React from "react";
import { IconCheck } from "./Icons";

export default function StepPills({ step1Done, step2Done, results }) {
    return (
        <div className="step-pills">
            {[
                { n: 1, label: "Resume", done: step1Done },
                { n: 2, label: "Job Description", done: step2Done },
                { n: 3, label: "Analyze", done: !!results },
                { n: 4, label: "Roadmap", done: false },
            ].map(({ n, label, done }) => (
                <div key={n} className={`step-pill${done ? " done" : n === (step1Done ? (step2Done ? 3 : 2) : 1) ? " active" : ""}`}>
                    <div className="step-num">{done ? <IconCheck size={10} /> : n}</div>
                    {label}
                </div>
            ))}
        </div>
    );
}
