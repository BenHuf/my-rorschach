import React, { useState } from "react";
import Discussions from "./Discussions";

const DiscussionForm = ({handleSubmit}) => {

    const [text, setText] = useState("");

    const isTextAreaDisabled = text.length === 0;

    const onSubmit = (e) => {
        e.preventDefault()
        handleSubmit(text);
        setText("");
    }

    return (
        <form onSubmit={onSubmit}>
            <textarea 
                className="discussion-form-textarea" 
                value={text} 
                onChange={(e) => setText(e.target.value)}/>
            <button className="discussion-form-button" disabled={isTextAreaDisabled}>Write</button>
        </form>
    )
}

export default DiscussionForm