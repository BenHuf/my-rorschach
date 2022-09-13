import { useQuery } from '@apollo/client';
import { QUERY_PICS } from '../utils/queries';
import { Container } from 'react-bootstrap';
import Auth from '../utils/auth'
import Masonry from 'react-masonry-css'
const slash = "/discuss/"

const breakpointColumnsObj = {
  default: 5,
  550: 3
};

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
      <div className='bg-img'>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {data.pics.map(pic => (
          <a className="" key={pic._id} href={slash + pic._id}><img className="rorschach" src={pic.pngString} /></a>
        ))}
      </Masonry>
      </div>
  )
}

export default Rorschachs