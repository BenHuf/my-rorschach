import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PIC } from "../utils/queries.js";

function PicID() {
  let { id } = useParams();
  return id;
}

const Rorschach = () => {
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
        <p key={comment._id}>{comment.commentBody}</p>
      ))}
    </>
  )
}

export default Rorschach