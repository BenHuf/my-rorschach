import { useQuery } from '@apollo/client';
import { QUERY_PICS } from '../utils/queries'


const Rorschachs = () => {
  const { loading, error, data } = useQuery(QUERY_PICS)

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (data) {
    console.log(data)
  }

  return (
    <div>
    {data.pics.map((pic) => (
      <a><img src={pic.pngString} /></a>
    ))}
    </div>
  )
}

export default Rorschachs