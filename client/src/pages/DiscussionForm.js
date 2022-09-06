import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from "../utils/mutations";


function PicID() {
    let { id } = useParams();
    return id;
}

const DiscussionForm = () => {
    let id = PicID();
    console.log(id)
    
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
        console.log(commentBody , id)
        try {
            await addComment({
                variables: {commentBody: commentBody, picId: id},
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
                <textarea 
                    className="discussion-form-textarea" 
                    placeholder="Type comment here"
                    value={commentBody} 
                    onChange={handleChange}/>
                <p className={`float-end m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
                    {characterCount}/280
                </p>
                <button className="discussion-form-button btn btn-primary mb-2 float-start mt-2 pt-1" disabled={isTextAreaDisabled}>Start Discussion</button>
            </form>
    )
}

export default DiscussionForm