import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { Container, Button } from "react-bootstrap";

function Login({ onLogin }) {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <Container>
            <h1 className="display-1">Bookseller Pro</h1>
            {showLogin ? (
                <>
                    <LoginForm onLogin={onLogin} />
                    <div className="mt-3">
                        Don't have an account?
                        <div>
                            <Button variant="outline-dark" onClick={() => setShowLogin(false)}>
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <SignUpForm onLogin={onLogin} />
                    <div className="mt-3">
                        Already have an account?
                        <div>
                            <Button variant="outline-dark" onClick={() => setShowLogin(true)}>
                                Log In
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </Container>
    );
}

export default Login;
