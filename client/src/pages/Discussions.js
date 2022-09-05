import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// import { getDiscussions as getDiscussionsApi, 
//         createDiscussion as createDiscussionApi,
//         deleteDiscussion as deleteDiscussionApi} from '../discussions.js'
import Discussion from '../components/Discussion'
import DiscussionForm from "./DiscussionForm.js";
import Rorschach from "../components/Rorschach.js";

const Discussions = ({ comments }) => {
    
    function PicID() {
        let { id } = useParams();
        return id;
    }

    return (
        <div className="discussions container">
            {PicID() && <Rorschach/>}
            <h3 className="discussion-title">Discuss Rorschachs</h3>
            <div className="discussion-form-title">Share your artistic opinion</div>
            <DiscussionForm />
            <Discussion />
            {/* <div className="discussion-container">
                {comments &&
                comments.map(comment => (
                    // use component instead of <p> tag
                    // <Discussion 
                    //     key={comment._id} 
                    //     comments={comment.commentBody}/>
                        <p className="pill mb-3" key={comment._id}>
                        {comment.commentBody} //{' '}
                        <Link to={`/profile/${comment.username}`} style={{ fontWeight: 700 }}>
                            {comment.username} on {comment.createdAt}
                        </Link>
                    </p>
                ))}
            </div> */}
        </div>
    )
}

export default Discussions