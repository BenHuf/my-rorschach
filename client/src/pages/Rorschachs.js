import { useQuery } from '@apollo/client';
import { QUERY_PICS } from '../utils/queries';
import { Container } from 'react-bootstrap';


const Rorschachs = () => {
  const { loading, error, data } = useQuery(QUERY_PICS)

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (data) {
    console.log(data)
  }

  return (
    <Container>
      {data.pics.map((pic) => (
        <a><img src={pic.pngString} width={720} height={480} /></a>
      ))}
    </Container>
  )
}

export default Rorschachs