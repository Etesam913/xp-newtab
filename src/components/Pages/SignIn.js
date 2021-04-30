import React, { useState } from "react";
import styled from "styled-components";
import { Wrapper, Window, InputLabel, AuthInput, AuthSection, AuthButton } from "./AuthStyles";
import { Link } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler =
    (event, email, password) => {
      event.preventDefault();
    };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <Wrapper>
      <Window className={"window"}>
        <div className="title-bar">
          <div className="title-bar-text"> Sign In</div>
          <div className="title-bar-controls">
          </div>
        </div>
        <div className="window-body">
          <article role="tabpanel">
            <form>
              <AuthSection>
                <InputLabel for="email">Email:</InputLabel>
                <br />
                <AuthInput
                  id="email"
                  type="email"
                  name="userEmail"
                  required
                  value={email}
                  onChange={(event) => onChangeHandler(event)}
                />
              </AuthSection>
              <AuthSection>
                <InputLabel for="password">Password:</InputLabel>
                <br />
                <AuthInput
                  id="password"
                  type="password"
                  name="userPassword"
                  value={password}
                  required
                  onChange={(event) => onChangeHandler(event)} />
              </AuthSection>
              <AuthSection>
                {error !== null && <div>{error}</div>}
                <AuthButton
                  onClick={(event) => {
                    signInWithEmailAndPasswordHandler(event, email, password);
                  }}>
                  Sign In
                </AuthButton>
                <br />
                <AuthButton>Sign In With Google</AuthButton>
              </AuthSection>
              <AuthSection>
                <div style={{ marginBottom: "0.5rem" }}>
                  Don't have an account? Sign up <Link to="/signup">here</Link>.
                </div>
                <div style={{ marginTop: "0.5rem" }}>
                  <Link>Forgot Password</Link>
                </div>
              </AuthSection>
            </form>
          </article>
        </div>
      </Window>
      {/*<GrayShade onClick={() => {
          setIsSettingsShowing(false);
        }} />*/}
    </Wrapper>

  );
}

export default SignIn;