import React, { useState, useEffect } from "react";
import { getDiscussions as getDiscussionsApi, 
        createDiscussion as createDiscussionApi,
        deleteDiscussion as deleteDiscussionApi} from '../discussions.js'
import Discussion from '../pages/Discussion'
import DiscussionForm from "./DiscussionForm.js";

const Discussions = ({currentUserId}) => {

    const [discussions, setDiscussions] = useState([]);
    console.log(discussions)
    
    const parentDiscussions = discussions.filter(discussions => discussions.parentId === null);

    const getReplies = discussionId => {
        return discussions.filter(
            discussion => discussion.parentId === discussionId
        ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }

    const addDiscussion = (text, parentId) => {
        console.log('addDiscussion', text, parentId);
        createDiscussionApi(text, parentId)
            .then(discussion => {
                setDiscussions([discussion, ...discussions])
        })
    }

    const deleteDiscussion = (discussionId) => {
        if (window.confirm('Are you sure that you want to remove comment?')) {
            deleteDiscussionApi(discussionId).then(() => {
                const updatedDiscussion  = discussions.filter(discussion => discussion.id !== discussionId)
                setDiscussions(updatedDiscussion)
            })
        }
    }

    useEffect(() => {
        getDiscussionsApi()
        .then(data => {
            setDiscussions(data)
        })
    }, [])
    
    // // TODO: Handle comment functionality
    // const handleSubmit = (e) => {
    // }

    // // TODO: Handle delete functionality
    // const handleDelete = (e) => {
    // }
    // // TODO: Add Reply functionality - nested? 
    // // const handleReply = (e) => {
    // // }

    return (
        <div className="discussions">
            <h3 className="discussion-title">Discuss Rorschachs</h3>
            <div className="discussion-form-title">Start Discussion</div>
            <DiscussionForm handleSubmit={addDiscussion}/>
            <div className="discussions-container">
                {parentDiscussions.map((parentDiscussion) => (
                    <Discussion 
                        key={parentDiscussion.id} 
                        discussion={parentDiscussion} 
                        replies={getReplies(parentDiscussion.id)}
                        currentUserId={currentUserId}
                        deleteDiscussion={deleteDiscussion}/>
                ))}
            </div>
        </div>
    )
}

export default Discussions