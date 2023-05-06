import React, { useState } from "react";
import Error from "./Error";
import { useHistory } from "react-router-dom";

function SignUpForm({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                password_confirmation: passwordConfirmation,
            }),
        })
            .then((r) => {
                if (r.ok) {
                    return r.json();
                } else {
                    throw new Error("Failed to sign up");
                }
            })
            .then((user) => {
                onLogin(user);
                history.push("/");
            })
            .catch((error) => {
                console.error(error);
                setErrors(["Failed to sign up"]);
            });
    }

    return (
        <div className="mt-4">
            <h4>Sign Up</h4>
            <form onSubmit={handleSubmit} className="row gy-2 gx-3 align-items-center">
                <div className="form-group gap-2">
                    <div className="col-auto">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            autoComplete="off"
                            className="form-control mb-1"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="col-auto">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control mb-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </div>
                    <div className="col-auto">
                        <label htmlFor="password">Password Confirmation</label>
                        <input
                            type="password"
                            id="password_confirmation"
                            className="form-control mb-1"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            autoComplete="current-password"
                        />
                    </div>
                    <div>
                        <input className="btn btn-outline-dark" type="submit" value="Submit" />
                    </div>
                    <div>
                        {errors.map((err) => (
                            <Error key={err}>{err}</Error>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignUpForm;
