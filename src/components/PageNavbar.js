import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Offcanvas from 'react-bootstrap/Offcanvas'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function PageNavbar({ onSearch, search, allAnime, onFilteredResults, onAllAnime }) {

  const navigate = useNavigate()

  function handleChange(e) {
    onSearch(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const searchTerm = search
    onSearch(searchTerm)
    navigate('/anime')
    try {
      const response = await axios.get('https://api.jikan.moe/v4/anime', {
        params: {
          q: searchTerm,
        },
      });
    const filteredResults = response.data.data.filter(item => {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase())
    })
    onFilteredResults(filteredResults)
    } catch (error) {
      console.error(error);
    }
    onSearch('')    
  }
  


  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} bg="dark" variant='dark' expand={expand} sticky='top'>
          <Container fluid>
            <Navbar.Brand href="/" className='navbar-title'>ANIME DATABASE</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}  />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              >
              <Offcanvas.Header closeButton>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href='/'>HOME</Nav.Link>
                  <Nav.Link href='/anime'>ALL ANIME</Nav.Link>
                  <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Login</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Register
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex" onSubmit={handleSubmit}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    value={search}
                    onChange={handleChange}
                    name='search'
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button type='submit' variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  )
}
