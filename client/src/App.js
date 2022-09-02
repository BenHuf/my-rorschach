import { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container"
import Home from "./pages/Home"
import Users from "./pages/Users"
import User from "./pages/User"
import Login from "./pages/Login"
import PageNotFound from "./pages/404"
import Navigation from "./components/Navigation"
import Canvas from './components/Canvas'
import Discussions from './pages/Discussions'
import Rorschachs from './pages/Rorschachs'
import SignUp from './pages/Signup'
import "bootstrap/dist/css/bootstrap.min.css"
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Navigation/>
            <div>
              <Routes>
                <Route path="/" element={<Home />}/>          
                <Route path="/draw" element={<Canvas />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={<Users />} />
                <Route path="/user">
                  <Route path=":username" element={<User />} />
                </Route>
                <Route path="/draw" element={<Canvas />} />
                <Route path="/discuss" element={<Discussions />} />
                <Route path="/rorschachs" element={<Rorschachs />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
          {/* PLACEHOLDER FOR FOOTER ELEMENT */}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
