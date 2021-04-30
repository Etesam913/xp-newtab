import React, {useState} from "react";
import { AuthButton, AuthInput, AuthSection, InputLabel, Window, Wrapper } from "./AuthStyles";
import { Link } from "react-router-dom";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);
  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    }
  };
  const sendResetEmail = event => {
    event.preventDefault();
  };

  return(
    <Wrapper>
      <Window className="window">
        <div className="title-bar">
          <div className="title-bar-text"> Reset Password </div>
          <div className="title-bar-controls">
          </div>
        </div>

      <div className="window-body">
        <article role="tabpanel">
          <form action="">
            {emailHasBeenSent && <div>An Email has been sent!</div>}
            {error !== null && <div>{error}</div>}
            <AuthSection>
              <InputLabel for="email">Email:</InputLabel>
              <br />
              <AuthInput
                id="email"
                type="email"
                required
                value={email}
                name="userEmail"
                onChange={event => onChangeHandler(event)}
              />
            </AuthSection>
              <AuthButton
                onClick={event => {

                }}
              >
                Send a reset link
              </AuthButton>
            <AuthSection />
          </form>
        </article>
      </div>
      </Window>
    </Wrapper>
  );

}

export default PasswordReset;