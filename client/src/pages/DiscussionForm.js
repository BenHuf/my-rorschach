import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from "../utils/mutations";

const DiscussionForm = ({handleSubmit}) => {

    const [text, setText] = useState("");
    const [characterCount, setCharacterCount] = useState(0);
    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const isTextAreaDisabled = text.length === 0;

    // update state based on form input changes
    const handleChange = (e) => {
        if (e.target.value.length <= 280) {
            setText(e.target.value);
            setCharacterCount(e.target.value.length);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault()

        try {
            addComment({
                // variables: { commentBody, picId }, // Giving me Error - HELP
            });
        // resets form
        handleSubmit(text);
        setText("");
        } catch (e) {
            console.error(e);
        }
    }

    return (
            <form onSubmit={onSubmit}>
                <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
                    {characterCount}/280
                    {error && <span className="ml-2">Something went wrong...</span>}
                </p>
                <textarea 
                    className="discussion-form-textarea" 
                    value={text} 
                    onChange={handleChange}/>
                <button className="discussion-form-button btn btn-primary mb-2" disabled={isTextAreaDisabled}>Comment</button>
            </form>
    )
}

export default DiscussionForm