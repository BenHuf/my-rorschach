import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
      <section className="bg-img d-flex">
        <div className="home-container">
        <div className="form-holder">
          <h4 className="card-header">Login</h4>
          <div className="form-body">
            <form onSubmit={handleFormSubmit} className="flex-row">
              <input
                className="form-input col-12"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input col-12"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="sub-btn w-100" type="submit">
                Log In
              </button>
            </form>
            {error && <div>Login failed</div>}
          </div>
        </div>
        </div>
      </section>
  );
};

export default Login;
