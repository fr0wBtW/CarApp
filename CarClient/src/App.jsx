import { useState } from "react";
import Login from "./components/Login";
import './App.css';
import CarList from "./components/CarList";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  }

  if (!token) return <Login onLogin={setToken} />;

  return (
    <div>
     {/* <h1>Car Client</h1> */}
     {/* <p>Имаме токен: {token}</p> */}
      <button onClick={handleLogout}>Logout</button>
      <CarList token={token} />
    </div>
  );
}

export default App;
