import ChannelList from "./ChannelList";

import {Col, Container, Row} from "react-bootstrap";
import News from "./News";
import FeaturedArticles from "./FeaturedArticles";
import ImageBanner from "./Banner";
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Helmet, HelmetProvider} from "react-helmet-async";

function Home() {
    const channels = useSelector((state) => state.channels).channels;
    const [desktop, setDesktop] = useState(true);
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 1024) {
                setDesktop(false);
            } else {
                setDesktop(true);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <meta name="description" content="Home Page"/>
                    <link rel="canonical" href="https://usasport.live/"/>
                    <title>USA Sport Live | Watch Live Sports</title>
                </Helmet>
            </HelmetProvider>
            <Container fluid className={`px-5 ${desktop ? 'w-75' : ''}`}>
                <Row>
                    {/* Main Content */}
                    <Col xs={12} md={7} lg={8} className="main-content">
                        <div className="m-lg-4">
                            <ImageBanner id="banner"/>
                        </div>
                        {/*<div className="ads-1">*/}
                        {/*    ads*/}
                        {/*</div>*/}
                        <div className="m-lg-4" id="channel-list-section">
                            <ChannelList channels={channels} readMore={true}/>
                        </div>
                    </Col>

                    {/* Sidebar */}
                    <Col xs={12} md={5} lg={4} className="sidebar">
                        <div className="m-lg-4" id="news-section">
                            <News/>
                        </div>
                        {/*<div className="ads-3">*/}
                        {/*    ads*/}
                        {/*</div>*/}
                        <div className="m-lg-4" id="featured-articles-section">
                            <FeaturedArticles/>
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    );
}

export default Home;
