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
        <div>
            <div className="discussions container">
                <h3 className="discussion-title text-center">Discuss Rorschachs</h3>
                <div className="discussion-form-title text-center my-2">Share your artistic opinion</div>
                {PicID() && <Rorschach/>}
                <DiscussionForm />
                <Discussion/>
            </div>
        </div>
    )
}

export default Discussions