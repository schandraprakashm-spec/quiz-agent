import { useState } from "react";

import API from "./api/api";

import Quiz from "./Quiz";

import Result from "./Result";

import Signup from "./Signup";

function App() {

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [loggedIn, setLoggedIn] =
    useState(false);

  const [quizResult, setQuizResult] =
    useState(null);

  const [showSignup, setShowSignup] =
    useState(false);

  const [forgotMessage, setForgotMessage] =
    useState(false);

  // -------------------------
  // LOGIN
  // -------------------------

  const login = async () => {

    try {

      const res = await API.post(
        "/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.access_token
      );

      setLoggedIn(true);

    } catch (err) {

      console.log(err);

      alert("Login failed");
    }

  };

  // -------------------------
  // RESULT PAGE
  // -------------------------

  if (quizResult) {

    return (

      <Result
        data={quizResult}
        setQuizResult={setQuizResult}
      />

    );
  }

  // -------------------------
  // QUIZ PAGE
  // -------------------------

  if (loggedIn) {

    return (

      <Quiz
        setQuizResult={setQuizResult}
      />

    );
  }

  // -------------------------
  // SIGNUP PAGE
  // -------------------------

  if (showSignup) {

    return (

      <Signup
        setShowSignup={setShowSignup}
      />

    );
  }

  // -------------------------
  // LOGIN PAGE
  // -------------------------

  return (

    <div
      style={{

        padding: 50,

        minHeight: "100vh",

        backgroundColor: "#f8dfe6",

        backgroundImage:
          "repeating-linear-gradient(to right, rgba(255,255,255,0.35) 0px, rgba(255,255,255,0.35) 1px, transparent 1px, transparent 28px)",

        fontFamily: "Arial",

        color: "black"

      }}
    >

      <h1>
        Quiz System
      </h1>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={{

          padding: 10,

          width: 250,

          border:
            "1px solid #cc6699"

        }}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        style={{

          padding: 10,

          width: 250,

          border:
            "1px solid #cc6699"

        }}
      />

      <br /><br />

      <button
        onClick={login}
        style={{

          padding:
            "10px 20px",

          backgroundColor:
            "#c2185b",

          color: "white",

          border: "none",

          cursor: "pointer"

        }}
      >
        Login
      </button>

      <button
        style={{

          marginLeft: 10,

          padding:
            "10px 20px",

          backgroundColor:
            "#d81b60",

          color: "white",

          border: "none",

          cursor: "pointer"

        }}
        onClick={() =>
          setShowSignup(true)
        }
      >
        Signup
      </button>

      <button
        style={{

          marginLeft: 10,

          padding:
            "10px 20px",

          backgroundColor:
            "#ad1457",

          color: "white",

          border: "none",

          cursor: "pointer"

        }}
        onClick={() => {

          setForgotMessage(true);

        }}
      >
        Forgot Password
      </button>

      {
        forgotMessage && (

          <div
            style={{

              color: "red",

              marginTop: 20,

              fontWeight: "bold"

            }}
          >
            Forgot Password?
            Contact Admin:
            +91-9701112264
          </div>

        )
      }

    </div>
  );
}

export default App;