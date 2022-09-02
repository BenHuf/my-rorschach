import React from "react";
// import { createDiscussion } from "../discussions";
import userIcon from '../images/user-icon.png'

const Discussion = ({discussion, replies, currentUserId, deleteDiscussion}) => {
  
  const canReply = Boolean(currentUserId);
  const canDelete = currentUserId === discussion.userId;
  const createdAt = new Date(discussion.createdAt).toLocaleDateString();

  return (
    <div className="discussion">
      <div className="discussion-image-container">
        <img src={userIcon} className="user-icon" alt="user-icon"/>
        <div className="discussion-right-part">
          <div className="discussion-content">
            <div className="discussion-author">{discussion.username}</div>
            <div>{createdAt}</div>
          </div>
          <div className="discussion-text">{discussion.body}</div>
          <div className="discussion-actions">
            <div className="discussion-action">Reply</div>
            <div className="discussion-action" onClick={()=> deleteDiscussion(discussion.id)}>Delete</div>
          </div>
          {replies.length > 0 && (
            <div className="replies">
              {replies.map(reply => (
                <Discussion 
                  discussion={reply} 
                  key={reply.id} 
                  replies={[]}/>
              ))}
            </div>
          )}
        </div>
      </div>
      
    </div>
  )
}

export default Discussion