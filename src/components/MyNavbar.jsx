import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const MyNavbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Navbar bg="white" expand="lg" className="mb-4 shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">AccountManager</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        {!user ? (
                            <>
                                <Nav.Link as={Link} to="/login" className="me-2">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">
                                    <Button variant="primary">Register</Button>
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Navbar.Text className="me-3">
                                    Signed in as: <span className="fw-bold">{user.name || user.email}</span>
                                </Navbar.Text>
                                <Nav.Link as={Link} to="/profile" className="me-2">My Profile</Nav.Link>
                                <Button variant="outline-danger" size="sm" onClick={handleLogout}>Logout</Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;
