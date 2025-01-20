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
import Ads1 from "./Ads1";

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
                <meta name="DC.creator" content="USA Sport Live"/>
                <meta name="DC.title" content="USA Sport Live | Watch Live Sports"/>
                <meta name="DC.publisher" content="USA Sport Live"/>
                <meta name="DC.created" content="2024"/>
                {/*<meta name="DC.description"*/}
                {/*      content="Watch free streaming for NFL,NBA,MLB,UFC,Boxing and more - the top choice for free sport streaming worldwide"/>*/}
                {/*<meta property="og:locale" content="en_US"/>*/}
                {/*<meta property="og:title" content="USA Sport Live | Watch Live Sports"/>*/}
                {/*<meta property="og:image" content={`https://streamfanhub.live${process.env.PUBLIC_URL}/usa_sport.png`}/>*/}
                {/*<meta property="og:url" content={`https://streamfanhub.live/`}/>*/}
                {/*<meta property="og:site_name" content="USA Sport Live"/>*/}
                {/*<meta property="og:description"*/}
                {/*      content="Watch free streaming for NFL,NBA,MLB,UFC,Boxing and more - the top choice for free sport streaming worldwide"/>*/}
                {/*<meta name="twitter:card" content="summary_large_image"/>*/}
                {/*<meta name="twitter:title" content="USA Sport Live | Watch Live Sports"/>*/}
                {/*<meta name="twitter:description"*/}
                {/*      content="Watch free streaming for NFL,NBA,MLB,UFC,Boxing and more - the top choice for free sport streaming worldwide"/>*/}
                {/*<meta name="twitter:image"*/}
                {/*      content={`https://streamfanhub.live${process.env.PUBLIC_URL}/usa_sport.png`}/>*/}
                {/*<link rel="shortcut icon" type="image/x-icon"*/}
                {/*      href={`https://streamfanhub.live${process.env.PUBLIC_URL}/usa_sport.ico`}/>*/}
                {/*<meta name="geo.region" content="US"/>*/}
                <title>Stream Fan Hub</title>
                <meta name="description"
                      content="Watch free streaming for NFL,NBA,MLB,UFC,Boxing and more - the top choice for free sport streaming worldwide"/>
                <link rel="canonical" href="https://streamfanhub.live/"/>
            </Helmet>
        </HelmetProvider>
        <Container fluid className={`px-5 ${desktop ? 'w-75' : ''}`}>

            <Row>
                {/* Main Content */}
                <Col xs={12} md={7} lg={8} className="main-content">
                    <div className="m-lg-4 w-100 d-flex justify-content-center align-items-center">
                        <Ads1
                            src="\/\/forsakenburn.com\/bkX.VzsBdLGDl\/0\/Y\/WTcQ\/re_mC9\/uoZMUjlBkQPiTWYpw\/MIzJER1HMjTtMAtaNNjHArzDMeTZUxxANXAE"
                            zoneId='9405154'
                            delay={0}
                        />
                    </div>
                    <div className="m-lg-4 w-100 d-flex justify-content-center align-items-center">
                        <Ads src="//www.highperformanceformat.com/35657c5144300642836ff9e48d808964/invoke.js"
                             keyId="35657c5144300642836ff9e48d808964" width="728" height="90" delay={500}/>
                    </div>
                    <div className="m-lg-4" id="channel-list-section">
                        <ChannelList channels={channelsFilter} readMore={false}/>
                    </div>
                </Col>

                {/* Sidebar */}
                <Col xs={12} md={5} lg={4} className="sidebar d-flex flex-column align-items-center">
                    <div className="m-lg-4" id="news-section">
                        <Ads src="//www.highperformanceformat.com/f711ce17d15010e372003c945e8cdfa5/invoke.js"
                             keyId="f711ce17d15010e372003c945e8cdfa5" width="300" height="250" delay={0}/>
                    </div>
                    <div className="m-lg-4" id="news-section">
                        <Ads1 src="\/\/forsakenburn.com\/b.X\/VUsJdmGgla0\/Y\/W_doirYoWS5xuHZ\/XqIs\/-e\/mr9NuDZgUolVk\/PNTHYWwMMUznEg1hMcDuMWtbNUjxANzgMwTKURwhNAAp"
                              zoneId="9405138" delay={500}/>
                    </div>
                </Col>
            </Row>
        </Container>

    </>);
}

export default Home;
