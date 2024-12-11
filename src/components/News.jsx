import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaArrowRight, FaNewspaper } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchNews } from "../store/actions/channelActions";

const News = ({ scroll }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newsData = useSelector((state) => state.channels.news);

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    const truncateDescription = (description, maxLength = 100) => {
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + "...";
        }
        return description;
    };

    return (
        <Container className="news-container my-4 content-dark-mode">
            <Row>
                <Col>
                    <h3 className="news-title mb-3">NEWS</h3>
                    <div className="news-list ">
                        {newsData && newsData.length > 0 ? (
                            newsData.slice(0, 3).map((item, index) => (
                                <Card key={index} className="news-card-page content-dark-mode border-0 mb-2 pb-2">
                                    <Card.Link
                                        href={item.links?.web?.href || "#"}
                                        className="news-link text-dark news-line"
                                    >
                                        <FaNewspaper className="me-2" />
                                        {item.headline}
                                    </Card.Link>

                                    {item.description && (
                                        <Card.Text className="news-description content-dark-mode">
                                            {truncateDescription(item.description)}
                                            {item.description.length > 100 && (
                                                <span>
                                                    <a
                                                        href={item.links?.web?.href || "#"}
                                                        className="text-decoration-none text-primary text-read-more"
                                                        target="_blank"
                                                        rel="noopener noreferrer nofollow"
                                                    >
                                                        Read More
                                                    </a>
                                                </span>
                                            )}
                                        </Card.Text>
                                    )}
                                </Card>
                            ))
                        ) : (
                            <p>Loading news...</p>
                        )}
                    </div>
                    <div className="load-more-btn mt-3 text-center">
                        <Button
                            title="news" aria-label="news"
                            variant="link"
                            onClick={() => navigate("/news")}
                            className="text-decoration-none news-line text-dark d-flex align-items-center justify-content-center"
                        >
                            More News
                            <FaArrowRight className="ms-2" />
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default News;
