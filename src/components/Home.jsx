import ChannelList from "./ChannelList";

import {Col, Container, Row} from "react-bootstrap";
import News from "./News";
import FeaturedArticles from "./FeaturedArticles";
import ImageBanner from "./Banner";
import {useSelector} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import {Helmet, HelmetProvider} from "react-helmet-async";
import {filterObjectsTodayInClientTime} from "../utils/SortChannels";
import Ads from "./Ads";

function Home() {
    const channels = useSelector((state) => state.channels).channels

    const channelsFilter = filterObjectsTodayInClientTime(channels);

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
    return (<>
        <HelmetProvider>
            <Helmet>
                <title>Live Sport Zone</title>
                <meta name="description"
                      content="Watch free streaming for NFL,NBA,MLB,UFC,Boxing and more - the top choice for free sport streaming worldwide"/>
                <link rel="canonical" href="https://livesportzone.online/"/>
            </Helmet>
        </HelmetProvider>
        <Container fluid className={`px-5 ${desktop ? 'w-75' : ''}`}>

            <Row>
                {/* Main Content */}
                <Col xs={12} md={7} lg={8} className="main-content">
                    {/*<div className="m-lg-4 w-100 d-flex justify-content-center align-items-center">*/}
                    {/*    <Ads src="//acscdn.com/script/aclib.js"*/}
                    {/*         keyId="zm8stoaayv" width="728" height="90" delay={0}/>*/}
                    {/*</div>*/}
                    <div className="m-lg-4" id="channel-list-section">
                        <ChannelList channels={channelsFilter} readMore={false}/>
                    </div>
                </Col>
                {/* Sidebar */}
                {/*<Col xs={12} md={5} lg={4} className="sidebar d-flex flex-column align-items-center">*/}
                {/*    <div className="m-lg-4" id="news-section">*/}
                {/*        <Ads src="//www.highperformanceformat.com/a5318143ea79bef2886adfb6cd93a6f4/invoke.js"*/}
                {/*             keyId="a5318143ea79bef2886adfb6cd93a6f4" width="300" height="250" delay={500}/>*/}
                {/*    </div>*/}
                {/*    <div className="m-lg-4" id="news-section">*/}
                {/*        <Ads src="//www.highperformanceformat.com/a5318143ea79bef2886adfb6cd93a6f4/invoke.js"*/}
                {/*             keyId="a5318143ea79bef2886adfb6cd93a6f4" width="300" height="250" delay={1000}/>*/}
                {/*    </div>*/}
                {/*    <div className="m-lg-4" id="news-section">*/}
                {/*        <Ads src="//www.highperformanceformat.com/a5318143ea79bef2886adfb6cd93a6f4/invoke.js"*/}
                {/*             keyId="a5318143ea79bef2886adfb6cd93a6f4" width="300" height="250" delay={1500}/>*/}
                {/*    </div>*/}

                {/*</Col>*/}
            </Row>
        </Container>

    </>);
}

export default Home;
