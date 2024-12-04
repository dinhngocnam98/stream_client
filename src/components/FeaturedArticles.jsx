import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FeaturedArticles = () => {
    const [featuredArticles, setFeaturedArticles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const fakeData = [
                {
                    imageUrl: "https://via.placeholder.com/1920x1080",
                    title: "Ways to Watch",
                    description: "Your personalized view of the NFL schedule.",
                    link: "/article/1",
                },
                {
                    imageUrl: "https://via.placeholder.com/1920x1080",
                    title: "Ways to Watch",
                    description: "Your personalized view of the NFL schedule.",
                    link: "/article/2",
                },
                {
                    imageUrl: "https://via.placeholder.com/1920x1080",
                    title: "Ways to Watch",
                    description: "Your personalized view of the NFL schedule.",
                    link: "/article/3",
                },
                {
                    imageUrl: "https://via.placeholder.com/1920x1080",
                    title: "Ways to Watch",
                    description: "Your personalized view of the NFL schedule.",
                    link: "/article/4",
                },
                {
                    imageUrl: "https://via.placeholder.com/1920x1080",
                    title: "Ways to Watch",
                    description: "Your personalized view of the NFL schedule.",
                    link: "/article/5",
                },
            ];
            setTimeout(() => {
                setFeaturedArticles(fakeData);
            }, 1000);
        };
        fetchData();
    }, []);

    const handleCardClick = (link) => {
        navigate(link);
    };

    return (
        <Container className="featured-articles-container my-4">
            <Row>
                {featuredArticles.map((article, index) => (
                    <Col xs={12} md={12} key={index} className="mb-3">
                        <Card
                            onClick={() => handleCardClick(article.link)}
                            className="featured-article-card d-flex flex-row align-items-center border-0"
                        >
                            <Card.Img
                                src={article.imageUrl}
                                alt={article.title}
                                className="article-image me-3"
                            />
                            <Card.Body>
                                <Card.Title className="article-title mb-1">
                                    {article.title}
                                </Card.Title>
                                <Card.Text className="article-description text-muted">
                                    {article.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default FeaturedArticles;
