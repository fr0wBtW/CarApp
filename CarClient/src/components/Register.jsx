import { useState } from "react";

export default function Register({ onRegister }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("https://localhost:7150/api/Auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            if (res.ok) {
                const data = await res.json();
                onRegister(data);
            } else {
                const error = await res.json();
                alert("Register failed: " + JSON.stringify(error));
            }
            } catch (err) {
                console.error("Error registering: ", err);
            }
        };

        return (
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                />
                <input
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                />
                <button type="submit">Register</button>
            </form>
        )
    }