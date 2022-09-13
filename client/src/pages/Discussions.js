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
        <div className="bg-img">
            <div className="discussions container">
                <div className="bg-hl">
                    <h3 className="discussion-title text-center site-name">Discuss Rorschachs</h3>
                    <div className="discussion-form-title text-center help-tip">Share your artistic opinion</div>
                </div>
                <div className="d-flex justify-center">
                {PicID() && <Rorschach/>}
                </div>
                <DiscussionForm />
                <Discussion/>
            </div>
        </div>
    )
}

export default Discussions