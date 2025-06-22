'use client'
import { TextareaAutosize } from "@mui/material";
import { useState } from "react";

export default function CustomForm() {
    const [textVal, setTextVal] = useState<string>("");

    function onsubmit() {

    }
    return (
        <div className="flex flex-col">
            <TextareaAutosize minRows={2}
                color="black"
                value={textVal}
                style={{ border: "solid 2px black" }}
                onChange={(value => setTextVal(value.target.value))} />
            <button onClick={onsubmit}>Summarize</button>
        </div>
    );
}
