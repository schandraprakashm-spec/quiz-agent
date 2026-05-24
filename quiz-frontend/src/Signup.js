import { useState } from "react";

import API from "./api/api";

function Signup({ setShowSignup }) {

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const signup = async () => {

    try {

      await API.post(
        "/auth/register",
        {
          email,
          password
        }
      );

      alert(
        "Account created successfully"
      );

      setShowSignup(false);

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.detail
        ||
        "Signup failed"
      );
    }
  };

  return (

    <div style={{ padding: 50 }}>

      <h1>
        Create Account
      </h1>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br /><br />

      <button onClick={signup}>
        Create Account
      </button>

      <button
        style={{
          marginLeft: 10
        }}
        onClick={() =>
          setShowSignup(false)
        }
      >
        Back
      </button>

    </div>
  );
}

export default Signup;