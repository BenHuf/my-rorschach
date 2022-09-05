import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from "../utils/mutations";

const DiscussionForm = ({picId}) => {

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
    // submit form
    const handleFormSubmit = async (e) => {
        e.preventDefault()

        try {
            await addComment({
                variables: { text, picId },
            });
        // resets form
        // handleSubmit(text); - previously used for hardcoded values
        setText("");
        } catch (e) {
            console.error(e);
        }
    }

    return (
            <form onSubmit={handleFormSubmit}>
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