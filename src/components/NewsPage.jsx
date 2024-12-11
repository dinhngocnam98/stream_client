import React, {useEffect} from "react";
import {Container, Row, Col, Card, Button} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import {fetchNews} from "../store/actions/channelActions";
import {toast} from "react-toastify";
import {Helmet, HelmetProvider} from "react-helmet-async";

const NewsPage = () => {
    const dispatch = useDispatch();

    const newsData = useSelector((state) => state.channels.news || []);
    const [visibleNewsCount, setVisibleNewsCount] = React.useState(6);

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    const truncateDescription = (description, maxLength = 100) => {
        if (description && description.length > maxLength) {
            return (
                <>
                    {description.substring(0, maxLength)}...
                    <a
                        href="/"
                        className="text-primary"
                        style={{textDecoration: "none"}}
                        onClick={(e) => e.preventDefault()}
                    >
                        Read More
                    </a>
                </>
            );
        }
        return description || "";
    };

    const loadMoreNews = () => {
        setVisibleNewsCount((prevCount) => prevCount + 6);
    };

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <meta name="robots" content="follow, index"/>
                    <meta name="DC.creator" content="USA Sport Live"/>
                    <meta name="DC.title" content="News"/>
                    <meta name="DC.publisher" content="USA Sport Live"/>
                    <meta name="DC.created" content="2024"/>
                    <meta name="DC.description"
                          content="Watch free streaming for NFL,NBA,MLB,UFC,Boxing and more - the top choice for free sport streaming worldwide"/>
                    <meta property="og:locale" content="en_US"/>
                    <meta property="og:title" content="News"/>
                    <meta property="og:image"
                          content={`https://usasport.live${process.env.PUBLIC_URL}/usa_sport.png`}/>
                    <meta property="og:url" content={`https://usasport.live/news`}/>
                    <meta property="og:site_name" content="USA Sport Live"/>
                    <meta property="og:description"
                          content="Watch free streaming for NFL,NBA,MLB,UFC,Boxing and more - the top choice for free sport streaming worldwide"/>
                    <meta name="twitter:card" content="summary_large_image"/>
                    <meta name="twitter:title" content="News"/>
                    <meta name="twitter:description"
                          content="Watch free streaming for NFL,NBA,MLB,UFC,Boxing and more - the top choice for free sport streaming worldwide"/>
                    <meta name="twitter:image"
                          content={`https://usasport.live${process.env.PUBLIC_URL}/usa_sport.png`}/>
                    <link rel="shortcut icon" type="image/x-icon" href={`https://usasport.live${process.env.PUBLIC_URL}/usa_sport.ico`}/>
                    <meta name="geo.region" content="US"/>
                    <title>News</title>
                    <meta name="description"
                          content="Watch free streaming for NFL,NBA,MLB,UFC,Boxing and more - the top choice for free sport streaming worldwide"/>
                    <link rel="canonical" href={`https://usasport.live/news`}/>
                </Helmet>
            </HelmetProvider>
            <Container className="news-page-container my-4">
                <h1>News Page</h1>
                <Row>
                    {newsData.length > 0 ? (
                        newsData.slice(0, visibleNewsCount).map((item, index) => (
                            <Col key={index} sm={12} md={4} className="mb-4">
                                <Card
                                    className="news-card"
                                    style={{cursor: "pointer"}}
                                    onClick={() => {
                                        if (item.links?.web?.href) {
                                            window.open(item.links.web.href, "_blank");
                                        }
                                    }}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={item.images?.[0]?.url || "/path/to/default-image.jpg"}
                                        alt={item.headline}
                                    />
                                    <Card.Body>
                                        <Card.Title>{item.headline}</Card.Title>
                                        <Card.Text>
                                            {truncateDescription(item.description, 100)}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </Row>
                {visibleNewsCount < newsData.length && (
                    <div className="text-center mt-4">
                        <Button title="see-more" aria-label="see-more" onClick={loadMoreNews} variant="primary">
                            See More
                        </Button>
                    </div>
                )}\
            </Container>
        </>

    );
};

export default NewsPage;
