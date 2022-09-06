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
      <div className='d-flex ml-auto mr-auto'>
        <div className='align-items-center justify-content-center'>
          <p className='text-center help-tip'>Click any rorschach to discuss!</p>
          {data.pics.map(pic => (
            <a className="ror-bg"key={pic._id} href={slash + pic._id}><img className="rorschach col-3" src={pic.pngString} /></a>
          ))}
        </div>
      </div>
  )
}

export default Rorschachs