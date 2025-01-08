import {Button, Container, Image, Navbar, NavDropdown} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

function Header() {
    const { darkMode, toggleTheme } = useContext(ThemeContext);
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
                darkMode ? "bg-dark text-white" : "bg-body-tertiary"
            }`}
            data-bs-theme={darkMode ? "dark" : "light"}
        >
            <Container>
                <Navbar.Brand
                    href="/"
                    className={`fs-2 ${darkMode ? "text-white" : "text-dark"}`}
                >
                    <h1>Streamfanhub.live</h1>
                    {/*<Image className="logo" src={`${darkMode ? "/usa_sport_white.webp" : "/usa_sport.webp"}`} alt="USA Sport Live"/>*/}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item mx-1 mx-md-2 mx-lg-3">
                            <a
                                href="https://usasport.live"
                                className={`nav-link-header ${darkMode ? "text-white" : "text-dark"}`}
                            >
                                <i className="fa fa-home" aria-hidden="true"></i> Home
                            </a>
                        </li>
                        {/*<li className="nav-item dropdown mx-1 mx-md-2 mx-lg-3">*/}
                        {/*    <NavDropdown*/}
                        {/*        title={*/}
                        {/*            <span className={`nav-link-header ${darkMode ? "text-white" : "text-dark"}`}>*/}
                        {/*                <i className="fa fa-television" aria-hidden="true"></i> Watch*/}
                        {/*            </span>*/}
                        {/*        }*/}
                        {/*        id="watch-dropdown"*/}
                        {/*        rel="nofollow"*/}
                        {/*        className={darkMode ? "text-white" : "text-dark"}*/}
                        {/*    >*/}
                        {/*        {groups.map((group) => (*/}
                        {/*            <NavDropdown.Item*/}
                        {/*                key={group}*/}
                        {/*                href={`/watch/${group.replace(/\s+/g, "-").toLowerCase()}`}*/}
                        {/*                onClick={() =>*/}
                        {/*                    selectGroup(group)*/}
                        {/*                }*/}
                        {/*            >*/}
                        {/*                {group}*/}
                        {/*            </NavDropdown.Item>*/}
                        {/*        ))}*/}
                        {/*    </NavDropdown>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item mx-1 mx-md-2 mx-lg-3">*/}
                        {/*    <a*/}
                        {/*        href="/news"*/}
                        {/*        className={`nav-link-header ${darkMode ? "text-white" : "text-dark"}`}*/}
                        {/*    >*/}
                        {/*        <i className="fa fa-newspaper-o" aria-hidden="true"></i> News*/}
                        {/*    </a>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item mx-1 mx-md-2 mx-lg-3">*/}
                        {/*    <a*/}
                        {/*        href="/login"*/}
                        {/*        className={`nav-link-header ${darkMode ? "text-white" : "text-dark"}`}*/}
                        {/*    >*/}
                        {/*        <i className="fa fa-user" aria-hidden="true"></i> Sign In*/}
                        {/*    </a>*/}
                        {/*</li>*/}
                        <li className="nav-item pt-1 mx-1 mx-md-2 mx-lg-3">
                            <Button
                                onClick={toggleTheme}
                                className={`ms-3 p-0 bg-transparent border-0 ${
                                    darkMode ? "text-white" : "text-dark"
                                }`}
                                aria-label={!darkMode ? "dark mode" : "light mode"} title={!darkMode ? "dark mode" : "light mode"}
                            >
                                {darkMode ? <FaSun /> : <FaMoon />}
                            </Button>
                        </li>
                    </ul>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
