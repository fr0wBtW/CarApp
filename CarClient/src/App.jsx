import { useState } from "react";
import Login from "./components/Login";
import './App.css';
import CarList from "./components/CarList";
import Register from "./components/Register";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  if (!token)
    return showRegister ? (
      <div>
        <Register
          onRegister={(data) => {
            alert("Registered! You can now login.");
            setShowRegister(false);
          }}
        />
        <button onClick={() => setShowRegister(false)}>Back to Login page</button>
      </div>
    ) : (
      <div>
        <Login
          onLogin={(userData) => {
            setToken(userData.token);
            setUser({username: userData.username, email: userData.email});
          }}
        />
        <button onClick={() => setShowRegister(true)}>Register</button>
      </div>
    );

  return (
    <div>
      <h1>Car Client</h1>
      <p>Welcome, {user?.username}</p>
      <p>Email: {user?.email}</p>
      <button onClick={handleLogout}>Logout</button>
      <CarList token={token} />
    </div>
  )
}

export default App;
