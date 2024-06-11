/* eslint-disable react/prop-types */
import "../assets/Login.css";
import { useState } from "react";
import { supabase } from "../createClient";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  let navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const [signupData, setSignupdata] = useState({
    first_name: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  console.log(signupData);

  function handleSignup(event) {
    setSignupdata((prevSignuupData) => ({
      ...prevSignuupData,
      [event.target.name]: event.target.value,
    }));
  }

  function handleLogin(event) {
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [event.target.name]: event.target.value,
    }));
    console.log(loginData);
  }

  async function onsubmitForm(event) {
    event.preventDefault();
      try {
      if (login) {
        console.log("jello")
        const { data, error } = await supabase.auth.signInWithPassword({
          email: loginData.email,
          password: loginData.password,
        });
        setToken(data);
        navigate("/App");
        if (error) {
          alert(error.message);
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: signupData.email,
          password: signupData.password,
          options: {
            data: {
              first_name: signupData.first_name,
            },
          },
        });

        alert("Check your email"); // Notify user to check their email for confirmation
        console.log(data);
        setToken(data);
        navigate("/App");
        if (error) {
          alert(error.message);
      }}
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <div className="center">
        <div className="wrapper">
          <div className="card-switch">
            <label className="switch">
              <input
                className="toggle"
                type="checkbox"
                onChange={() => setLogin(!login)}
              />
              <span className="slider"></span>
              <span className="card-side"></span>
              <div className="flip-card__inner">
                <div className="flip-card__front">
                  <div className="title">Log in</div>
                  <form
                    onSubmit={onsubmitForm}
                    className="flip-card__form"
                  >
                    <input
                      type="email"
                      onChange={handleLogin}
                      placeholder="Email"
                      name="email"
                      className="flip-card__input"
                    />
                    <input
                      type="password"
                      onChange={handleLogin}
                      placeholder="Password"
                      name="password"
                      className="flip-card__input"
                    />
                    <button type="submit" className="flip-card__btn">
                      Lets go!
                    </button>
                  </form>
                </div>
                <div className="flip-card__back">
                  <div className="title">Sign up</div>
                  <form onSubmit={onsubmitForm} className="flip-card__form">
                    <input
                      onChange={handleSignup}
                      type="name"
                      placeholder="Name"
                      name="first_name"
                      className="flip-card__input"
                    />
                    <input
                      onChange={handleSignup}
                      type="email"
                      placeholder="Email"
                      name="email"
                      className="flip-card__input"
                    />
                    <input
                      onChange={handleSignup}
                      type="password"
                      placeholder="Password"
                      name="password"
                      className="flip-card__input"
                    />
                    <button type="submit" className="flip-card__btn">
                      Confirm!
                    </button>
                  </form>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
