import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Container, Table } from "react-bootstrap"

const Users = (props) => {
  const [ allUsers, setAllUsers ] = useState([])

  const fetchUsers = async () => {
    const lookupQuery = await fetch("/api/user")
    const parsedResponse = await lookupQuery.json()
    if( parsedResponse.result === "success" ){
      setAllUsers(parsedResponse.payload)
    }
  }

  useEffect( () => {
    fetchUsers()
  }, [])

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rorschachs</th>
          </tr>
        </thead>

        <tbody>
          { allUsers.map( user => (
            <tr key={user._id}>
              <td>
                <Link to={`/user/${user._id}`}>
                  {user.username}
                </Link>
              </td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default Users