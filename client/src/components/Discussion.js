import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PIC } from "../utils/queries.js";
import userIcon from '../images/user-icon.png'

function PicID() {
  let { id } = useParams();
  return id;
}

const Discussion = () => {
  let id = PicID()
  console.log(id)

  const { loading, error, data } = useQuery(QUERY_PIC, {
    variables: {id}
  })

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (data) {
  console.log(data)
  }

  return (
    <>      
      {data.pic.comments.map(comment => (
        <div className="discussion" key={comment._id}>
          <div className="discussion-image-container">
            <img src={userIcon} className="user-icon" alt="user-icon"/>
            <div className="discussion-right-part">
              <div className="discussion-content">
                <div className="discussion-author">{comment.username}</div>
                <div>{comment.createdAt}</div>
              </div>
              <div className="discussion-text">{comment.commentBody}</div>
            </div>
            <div className="discussion-actions">
            <div className="discussion-action">Reply</div>
            <div className="discussion-action">Delete</div>
          </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Discussion;