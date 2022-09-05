import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from "../utils/mutations";

const DiscussionForm = ({picId}) => {

    const [commentBody, setBody] = useState("");
    const [characterCount, setCharacterCount] = useState(0);
    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const isTextAreaDisabled = commentBody.length === 0;

    // update state based on form input changes
    const handleChange = (e) => {
        if (e.target.value.length <= 280) {
            setBody(e.target.value);
            setCharacterCount(e.target.value.length);
        }
    };
    // submit form
    const handleFormSubmit = async (e) => {
        e.preventDefault()

        try {
            await addComment({
                variables: { commentBody, picId },
            });
        // resets form
        setBody("");
        } catch (e) {
            alert("Something went wrong...")
            console.error(e);
        }
    }

    return (
            <form onSubmit={handleFormSubmit}>
                <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
                    {characterCount}/280
                </p>
                <textarea 
                    className="discussion-form-textarea" 
                    value={commentBody} 
                    onChange={handleChange}/>
                <button className="discussion-form-button btn btn-primary mb-2" disabled={isTextAreaDisabled}>Start Discussion</button>
            </form>
    )
}

export default DiscussionForm