import React, { useState } from "react";
import { AuthButton, AuthInput, AuthSection, InputLabel, Window, Wrapper } from "./AuthStyles";
import { Link } from "react-router-dom";
import { auth, generateUserDocument } from "../../firebase";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, {displayName});
    }
    catch(error){
      setError(error);
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };


  return (
    <Wrapper>
      <Window className="window">
        <div className="title-bar">
          <div className="title-bar-text"> Sign Up</div>
          <div className="title-bar-controls">
          </div>
        </div>
        <div className="window-body">
          <article role="tabpanel">
            <form>
              <AuthSection>
                <InputLabel for="display-name">Display Name:</InputLabel>
                <br />
                <AuthInput
                  id="display-name"
                  type="text"
                  required
                  value={displayName}
                  name="displayName"
                  onChange={event => onChangeHandler(event)}
                />
              </AuthSection>
              <AuthSection>
                <InputLabel for="email">Email:</InputLabel>
                <br />
                <AuthInput
                  id="email"
                  type="email"
                  name="userEmail"
                  required
                  value={email}
                  onChange={event => onChangeHandler(event)}
                />
              </AuthSection>
              <AuthSection>
                <InputLabel for="password">Password:</InputLabel>
                <br />
                <AuthInput
                  id="password"
                  type="password"
                  name="userPassword"
                  required
                  value={password}
                  onChange={event => onChangeHandler(event)}
                />
              </AuthSection>
              <AuthSection>
                {error !== null && <div>{error.message}</div>}
                <AuthButton
                  onClick={event => {
                    createUserWithEmailAndPasswordHandler(event, email, password);
                  }}
                >
                  Sign Up
                </AuthButton>
                <br />
                <AuthButton>Sign In With Google</AuthButton>
              </AuthSection>
              <AuthSection>
                <div style={{ marginBottom: "0.5rem" }}>
                  Already have an account? Sign in <Link to="/signin">here</Link>.
                </div>
              </AuthSection>
            </form>
          </article>
        </div>
      </Window>
    </Wrapper>
  );
}

export default SignUp;