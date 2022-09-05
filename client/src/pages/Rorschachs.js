import { useQuery } from '@apollo/client';
import { QUERY_PICS } from '../utils/queries';
import { Container } from 'react-bootstrap';
import Auth from '../utils/auth'
const slash = "/discuss/"


const Rorschachs = () => {
  const { loading, error, data } = useQuery(QUERY_PICS)

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (data) {
    console.log(data)
  }
  if (!Auth.loggedIn()){
    return (
      <p>Nice try Gary!</p>
    )
  }
  return (
    <Container>
      {data.pics.map(pic => (
        <a key={pic._id} href={slash + pic._id}><img src={pic.pngString} /></a>
      ))}
    </Container>
  )
}

export default Rorschachs