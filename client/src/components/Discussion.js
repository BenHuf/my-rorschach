import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PIC } from "../utils/queries.js";
import { useMutation } from '@apollo/client';
import { DELETE_COMMENT } from "../utils/mutations";
import userIcon from '../images/user-icon.png'

function PicID() {
  let { id } = useParams();
  return id;
}

const Discussion = () => {
  let id = PicID()
  console.log(id)

  const [deleteComment, { err }] = useMutation(DELETE_COMMENT);

  const { loading, error, data } = useQuery(QUERY_PIC, {
    variables: {id}
  })

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (data) {
  console.log(data)
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    // let commentId = this.id

    // console.log(e.target.id)
    // if (window.confirm('Are you sure that you want to remove comment?')) {
      try {
          await deleteComment({
              variables: {picId: id, commentId: e.target.id}
          });
          console.log("success")
      } catch (e) {
          alert("Something went wrong...")
          console.log(e);
      }
  }
// }


  return (
    <>      
      {data.pic.comments.map(comment => (
        
        <div className="discussion" key={comment._id}>
          <div className="discussion-image-container">
            <img src={userIcon} className="user-icon" alt="user-icon"/>
          </div>
            <div className="discussion-right-part">
              <div className="discussion-content">
                <div className="discussion-author">{comment.username}</div>
                <div className="discussion-time">{comment.createdAt}</div>
              </div>
              <div className="discussion-text">{comment.commentBody}</div>
              <div className="discussion-actions small d-flex justify-content-start">
              <div className="discussion-action d-flex align-items-center me-3">Reply</div>
              <div id={comment._id} className="discussion-action d-flex align-items-center me-3" onClick={handleDelete}>Delete</div>
            </div>
            </div>
        </div>
      ))}
    </>
  )
}

export default Discussion;