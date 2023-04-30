import { UserContext } from "./context/user";
import { useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'

function NavBar() {
    const { user, setUser } = useContext(UserContext)
    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
            }
        });
    }

    const userId = user.id

    return (
        <Navbar bg="light" expand="lg" sticky="top" style={{ paddingLeft: "1rem" }}>
            <LinkContainer to="/" exact>
                <Navbar.Brand>Bookseller Pro</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/sales" exact>
                        <Nav.Link>Sales</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={`/profile/${userId}`} >
                        <Nav.Link>Profile</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/inbox">
                        <Nav.Link>Inbox</Nav.Link>
                    </LinkContainer>
                    <Button variant="outline-dark" onClick={handleLogoutClick}>
                        Logout, {user.username}
                    </Button>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;