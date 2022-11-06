import { useState, useContext, useEffect} from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../contexts";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const { dispatch } = useContext(StateContext);
  //   function handleUsername(evt) {
  //     setUsername(evt.target.value);
  //   }
  function handlePassword(evt) {
    setPassword(evt.target.value);
  }
  function handlePasswordRepeat(evt) {
    setPasswordRepeat(evt.target.value);
  }

  const [user, register] = useResource((username, password, userID) => ({
    url: "/users",
    method: "post",
    data: {email: username, password, userID},
  }));

  useEffect(() => {
    if (user && user.data && user.data.user.email) {
      dispatch({ 
        type: "REGISTER", 
        username: user.data.user.email
      })
    }
  }, [user]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        register(username, password);
      }}
    >
      <label htmlFor="register-username">Username:</label>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        name="register-username"
        id="register-username"
      />
      <label htmlFor="register-password">Password:</label>
      <input
        type="password"
        name="register-password"
        id="register-password"
        value={password}
        onChange={handlePassword}
      />
      <label htmlFor="register-password-repeat">Repeat password:</label>
      <input
        type="password"
        name="register-password-repeat"
        id="register-password-repeat"
        value={passwordRepeat}
        onChange={handlePasswordRepeat}
      />
      <input
        type="submit"
        value="Register"
        disabled={
          username.length === 0 ||
          password.length === 0 ||
          password !== passwordRepeat
        }
      />
    </form>
  );
}
