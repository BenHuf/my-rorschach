import React from "react";
import { useParams } from "react-router-dom";
import Discussion from '../components/Discussion'
import DiscussionForm from "./DiscussionForm.js";
import Rorschach from "../components/Rorschach.js";
import Auth from '../utils/auth'

const Discussions = () => {
    
    function PicID() {
        let { id } = useParams();
        return id;
    }
    if (!Auth.loggedIn()){
        return (
            <p>Nice try Gary!</p>
        )
    }

    return (
        <div className="discussions container">
            {PicID() && <Rorschach/>}
            <h3 className="discussion-title">Discuss Rorschachs</h3>
            <div className="discussion-form-title">Share your artistic opinion</div>
            <DiscussionForm />
            <Discussion/>
        </div>
    )
}

export default Discussions