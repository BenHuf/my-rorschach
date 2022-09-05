import React from "react";
import userIcon from '../images/user-icon.png'

const Discussion = ({ comment }) => {
  
  // const canReply = Boolean(currentUserId);
  // const canDelete = currentUserId === discussion.userId;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();

  return (
    <div className="discussion">
      <div className="discussion-image-container media">
        <img src={userIcon} className="user-icon mr-3" alt="user-icon"/>
        <div className="discussion-right-part media-body">
          <div className="discussion-content">
            <div className="discussion-author mt-0">{comment.username}</div>
            <div>{createdAt}</div>
          </div>
          <div className="discussion-text">{comment.commentBody}</div>
          <div className="discussion-actions">
            {/* TODO: Comment actions can remove or reply to a comment - add back and refactor once comment to backend works */}
            {/* <div className="discussion-action">Reply</div>
            <div className="discussion-action" onClick={()=> deleteDiscussion(comment.id)}>Delete</div> */}
          </div>
          {/* {replies.length > 0 && (
            <div className="replies media mt-3">
              {replies.map(reply => (
                <Discussion 
                  comment={reply} 
                  key={reply.id} 
                  replies={[]}/>
              ))}
            </div>
          )} */}
        </div>
      </div>
      
    </div>
  )
}

export default Discussion