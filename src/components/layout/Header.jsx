import {Button, Container, Image, Navbar, NavDropdown} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useContext} from "react";
import {ThemeContext} from "../hooks/ThemeContext";
import {FaHome, FaMoon, FaNewspaper, FaSun, FaTv, FaUser} from "react-icons/fa";

function Header() {
  const {darkMode, toggleTheme} = useContext(ThemeContext);
  const channels = useSelector((state) => state.channels).channels;

  const groups = Array.from(new Set(channels.map((channel) => channel.group)));

  const selectGroup = (group) => {
    window.location.href = `/watch/${group.replace(/\s+/g, "-").toLowerCase()}`;
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={`${
        darkMode ? "header bg-dark text-white" : "header bg-body-tertiary"
      }`}
      data-bs-theme={darkMode ? "dark" : "light"}
    >
      <Container>
        <Navbar.Brand
          href="/"
          className={`fs-2 ${darkMode ? "text-white" : "text-dark"}`}
        >
          <Image className="logo" src={require(darkMode ? "../../assets/logo/usa_sport_white.webp" : "../../assets/logo/usa_sport.webp")}
                 alt="USA Sport Live"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-1 mx-md-2 mx-lg-3">
              <a
                href="/public"
                className={`nav-link-header ${darkMode ? "text-white" : "text-dark"}`}
              >
                <FaHome/> Home
              </a>
            </li>
            <li className="nav-item dropdown mx-1 mx-md-2 mx-lg-3">
              <FaTv />
              <NavDropdown
                title={
                  <span
                    className={`${darkMode ? "text-white" : "text-dark"}`}
                  >Watch</span>
                }
                id="watch-dropdown"
                rel="nofollow"
                className={darkMode ? "text-white" : "text-dark"}
              >
                {groups.map((group) => (
                  <NavDropdown.Item
                    key={group}
                    href={`/watch/${group.replace(/\s+/g, "-").toLowerCase()}`}
                    onClick={() =>
                      selectGroup(group)
                    }
                  >
                    {group}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </li>
            <li className="nav-item mx-1 mx-md-2 mx-lg-3">
              <a
                href="/news"
                className={`nav-link-header ${darkMode ? "text-white" : "text-dark"}`}
              >
                <FaNewspaper/> News
              </a>
            </li>
            <li className="nav-item mx-1 mx-md-2 mx-lg-3">
              <a
                href="/login"
                className={`nav-link-header ${darkMode ? "text-white" : "text-dark"}`}
              >
                <FaUser/> Sign In
              </a>
            </li>
            <li className="nav-item pt-1 mx-1 mx-md-2 mx-lg-3">
              <Button
                onClick={toggleTheme}
                className={`ms-3 p-0 bg-transparent border-0 ${
                  darkMode ? "text-white" : "text-dark"
                }`}
                aria-label={!darkMode ? "dark mode" : "light mode"} title={!darkMode ? "dark mode" : "light mode"}
              >
                {darkMode ? <FaSun/> : <FaMoon/>}
              </Button>
            </li>
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
