import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLogoutApiCallMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [logoutApiCall] = useLogoutApiCallMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall()
      dispatch(logout())
      navigate('/login')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Recipes App</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>

                  <LinkContainer to="/recipes">
                    <Nav.Link>Your Recipes</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/recipes/create">
                    <Nav.Link>Create Recipes</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/recipes/saved">
                    <Nav.Link>Saved Recipes</Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
