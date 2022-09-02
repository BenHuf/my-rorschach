import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Container from "react-bootstrap/Container"

const User = (props) => {
  // id is the name of the wildcard variable we specified in the route in App.js
  const { id } = useParams()

  const [ user, setUser ] = useState(null)

  const fetchUser = async () => {
    const lookupQuery = await fetch(`/api/user/${id}`)
    const parsedResponse = await lookupQuery.json()
    if( parsedResponse.result === "success" ){
      setUser(parsedResponse.payload)
    }
  }

  useEffect( () => {
    fetchUser()
  }, [])

  return (
    <Container style={{ paddingTop: "1em" }}>
      { !user ? (
        <p>We could not find the user you were seeking.</p>
      ) : (
        <div>
          <h1>{ user.fname } { user.lname }</h1>
          <p>Details:</p>
          <ol>
            <li>Title: { user.title }</li>
            <li>Salary: ${ user.salary }</li>
          </ol>
        </div>
      )}
    </Container>
  )
}

export default User