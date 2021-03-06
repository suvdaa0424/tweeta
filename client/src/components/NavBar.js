import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { actionLoggedOut } from '../redux/actions/user';

function NavBar() {
    const { checked, user } = useSelector(state => state.user);
    const dispatch = useDispatch()

    const handleLogout = (e) => {
        e.preventDefault()
        fetch('/api/v1/users/logout')
            .then(res => res.json())
            .then(data => {
                dispatch(actionLoggedOut())
            })
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-3">
            <Container>
                <Navbar.Brand as={Link} to="/">Tweeta</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        {checked && user ? (
                            <>
                                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                <Nav.Link href="/logout" onClick={handleLogout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar