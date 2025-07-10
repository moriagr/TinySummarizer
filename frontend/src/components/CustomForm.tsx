'use client'
import { TextareaAutosize, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function CustomForm() {
    const [text, setText] = useState<string>("");
    const [length, setLength] = useState<number>(3);
    const [summary, setSummary] = useState<string>("");
    const [error, setError] = useState();

    const onsubmit = async () => {
        try {
            const res = await axios.post('http://localhost:8080/summarize', { text, length});
            console.log(res);
            setSummary(res.data.summary);
        } catch (error) {
            console.log(error)
            // setError(error);
        }
    }
    return (
        <div className="flex flex-col justify-center" style={{width:"80%", margin:"0 auto"}}>
            <TextareaAutosize minRows={2}
                color="black"
                value={text}
                placeholder="Enter text to summarize"
                style={{ border: "solid 2px black", padding: "10px", borderRadius: "5px", width: "100%", fontSize: "16px" }}
                onChange={(value => setText(value.target.value))} />
            <TextField minRows={2}
                value={length}
                type="number"
                placeholder="Enter length of summary"
                style={{ border: "solid 2px black", padding: "10px", borderRadius: "5px", width: "100%", fontSize: "16px" }}
                onChange={(value => setLength(Number(value.target.value)))} />

            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer w-fit m-auto" onClick={onsubmit}>Summarize</button>

            <h2 className="text-xl font-semibold mt-6">Summary:</h2>
            <p className="mt-2 p-2 bg-gray-100">{summary}</p>

        </div>
    );
}
