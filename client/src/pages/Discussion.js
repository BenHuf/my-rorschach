import React from "react";
import userIcon from '../images/user-icon.png'

const Discussion = ({discussion, replies, currentUserId, deleteDiscussion}) => {
  
  const canReply = Boolean(currentUserId);
  const canDelete = currentUserId === discussion.userId;
  const createdAt = new Date(discussion.createdAt).toLocaleDateString();

  return (
    <div className="discussion">
      <div className="discussion-image-container media">
        <img src={userIcon} className="user-icon mr-3" alt="user-icon"/>
        <div className="discussion-right-part media-body">
          <div className="discussion-content">
            <div className="discussion-author mt-0">{discussion.username}</div>
            <div>{createdAt}</div>
          </div>
          <div className="discussion-text">{discussion.body}</div>
          <div className="discussion-actions">
            <div className="discussion-action">Reply</div>
            <div className="discussion-action" onClick={()=> deleteDiscussion(discussion.id)}>Delete</div>
          </div>
          {replies.length > 0 && (
            <div className="replies media mt-3">
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