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

//   const handleDelete = async (e) => {
//     e.preventDefault()

//     if (window.confirm('Are you sure that you want to remove comment?')) {

//     console.log(commentBody , id)
//       try {
//           await deleteComment({
//               variables: {commentBody: commentBody, picId: id},
//           });
//       } catch (e) {
//           alert("Something went wrong...")
//           console.error(e);
//       }
//   }
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
              <div className="discussion-action d-flex align-items-center me-3">Delete</div>
            </div>
            </div>
        </div>
      ))}
    </>
  )
}

export default Discussion;