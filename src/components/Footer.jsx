import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaTiktok, FaSnapchat, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    const teamLogos = [
        { name: "ravens", url: "https://www.baltimoreravens.com" },
        { name: "bills", url: "https://www.buffalobills.com" },
        { name: "bengals", url: "https://www.bengals.com" },
        { name: "browns", url: "https://www.clevelandbrowns.com" },
        { name: "broncos", url: "https://www.denverbroncos.com" },
        { name: "texans", url: "https://www.houstontexans.com" },
        { name: "colts", url: "https://www.colts.com" },
        { name: "raiders", url: "https://www.raiders.com" },
        { name: "dolphins", url: "https://www.miamidolphins.com" },
        { name: "patriots", url: "https://www.patriots.com" },
        { name: "jets", url: "https://www.newyorkjets.com" },
        { name: "steelers", url: "https://www.steelers.com" },
        { name: "titans", url: "https://www.tennesseetitans.com" },
        { name: "cardinals", url: "https://www.azcardinals.com" },
        { name: "falcons", url: "https://www.atlantafalcons.com" },
        { name: "panthers", url: "https://www.panthers.com" },
        { name: "cowboys", url: "https://www.dallascowboys.com" },
        { name: "vikings", url: "https://www.vikings.com" },
        { name: "saints", url: "https://www.neworleanssaints.com" },
        { name: "giants", url: "https://www.giants.com" },
        { name: "eagles", url: "https://www.philadelphiaeagles.com" },
        { name: "49ers", url: "https://www.49ers.com" },
        { name: "seahawks", url: "https://www.seahawks.com" },
        { name: "buccaneers", url: "https://www.buccaneers.com" }
    ];

    return (
        <footer className="footer bg-dark text-white pt-4 mt-4">
            <Container>
                <Row className="justify-content-center mb-4">
                    {teamLogos.map((team, index) => (
                        <Col key={index} xs={2} md={1} className="d-flex justify-content-center">
                            <a href={team.url} target="_blank" rel="noopener noreferrer" className="footer-logo-link">
                                <Image
                                    src={`${process.env.PUBLIC_URL}/logo-sport/${team.name}.png`}
                                    alt={`${team.name} logo`}
                                    fluid
                                    className="footer-logo"
                                />
                            </a>
                        </Col>
                    ))}
                </Row>

                <Row className="justify-content-center mb-2">
                    <Col xs="auto">
                        <a href="#" target="_blank" rel="noopener noreferrer nofollow" className="footer-social-link">
                            <FaFacebook size={15} />
                        </a>
                    </Col>
                    <Col xs="auto">
                        <a href="#" target="_blank" rel="noopener noreferrer nofollow" className="footer-social-link">
                            <FaInstagram size={15} />
                        </a>
                    </Col>
                    <Col xs="auto">
                        <a href="#" target="_blank" rel="noopener noreferrer nofollow" className="footer-social-link">
                            <FaTwitter size={15} />
                        </a>
                    </Col>
                    <Col xs="auto">
                        <a href="#" target="_blank" rel="noopener noreferrer nofollow" className="footer-social-link">
                            <FaYoutube size={15} />
                        </a>
                    </Col>
                    <Col xs="auto">
                        <a href="#" target="_blank" rel="noopener noreferrer nofollow" className="footer-social-link">
                            <FaTiktok size={15} />
                        </a>
                    </Col>
                    <Col xs="auto">
                        <a href="#" target="_blank" rel="noopener noreferrer nofollow" className="footer-social-link">
                            <FaSnapchat size={15} />
                        </a>
                    </Col>
                    <Col xs="auto">
                        <a href="#" target="_blank" rel="noopener noreferrer nofollow" className="footer-social-link">
                            <FaLinkedin size={15} />
                        </a>
                    </Col>
                </Row>

                <Row className="text-center">
                    <Col>
                        <p>© 2024 USA Sport.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
