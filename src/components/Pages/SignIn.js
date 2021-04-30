import React, { useContext, useState } from "react";
import { Wrapper, Window, InputLabel, AuthInput, AuthSection, AuthButton } from "./AuthStyles";
import { Link } from "react-router-dom";
import { UserContext } from "../../Contexts";

function SignIn({ requestLogin, requestLogout }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(UserContext);
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
                <AuthButton
                  onClick={(event) => {
                    event.preventDefault();
                    requestLogin(email, password);
                  }}>
                  Sign In
                </AuthButton>
                <br />
                <AuthButton>Sign In With Google</AuthButton>
                <br />
                {user && user.userObj !== undefined && <AuthButton onClick={(e) => {
                  e.preventDefault();
                  requestLogout();
                }}>Logout</AuthButton>}
              </AuthSection>
              <AuthSection>
                <div style={{ marginBottom: "0.5rem" }}>
                  Don't have an account? Sign up <Link to="/signup">here</Link>.
                </div>
                <div style={{ marginTop: "0.5rem" }}>
                  <Link to="/password-reset">Forgot Password</Link>
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