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
                <title>Live Sport Zone</title>
                <meta name="description"
                      content="Watch free streaming for NFL,NBA,MLB,UFC,Boxing and more - the top choice for free sport streaming worldwide"/>
                <link rel="canonical" href="https://livesportzone.online/"/>
                <script id="aclib" type="text/javascript" src="//acscdn.com/script/aclib.js"></script>
            </Helmet>
        </HelmetProvider>
        <Container fluid className={`px-5 ${desktop ? 'w-75' : ''}`}>

            <Row>
                {/* Main Content */}
                <Col xs={12} md={7} lg={8} className="main-content">
                    <div className="m-lg-4 w-100 d-flex justify-content-center align-items-center">
                        <Ads1
                            src="\/\/forsakenburn.com\/b\/XqV.s\/dmGulA0\/YsWkcf\/seVmN9\/u\/Z\/UulekUPlT\/YKw\/M\/zfEU1_MLjLMItZNWjOALzXM\/T\/U\/yvNqAr"
                            zoneId='9405146'
                            delay={0}
                        />
                    </div>
                    <div className="m-lg-4 w-100 d-flex justify-content-center align-items-center">
                        <Ads src="//www.highperformanceformat.com/2b5f21228bdc2629b2e1d6876eb02692/invoke.js"
                             keyId="2b5f21228bdc2629b2e1d6876eb02692" width="728" height="90" delay={500}/>
                    </div>
                    <div className="m-lg-4" id="channel-list-section">
                        <ChannelList channels={channelsFilter} readMore={false}/>
                    </div>
                </Col>

                {/* Sidebar */}
                <Col xs={12} md={5} lg={4} className="sidebar d-flex flex-column align-items-center">
                    <div className="m-lg-4" id="news-section">
                        <Ads src="//www.highperformanceformat.com/a5318143ea79bef2886adfb6cd93a6f4/invoke.js"
                             keyId="a5318143ea79bef2886adfb6cd93a6f4" width="300" height="250" delay={0}/>
                    </div>
                    <div className="m-lg-4" id="news-section">
                        <Ads1 src="\/\/forsakenburn.com\/b\/XKV\/s.dDGzlJ0fYvWzdZirYgWg5KujZXX\/IR\/Heqmb9suNZYULlLktPSTNYXwDMHzqEm0tNdTeUqtLNej\/A_z\/M\/TvQV1yNdgA"
                              zoneId="9404618" delay={500}/>
                    </div>
                </Col>
            </Row>
        </Container>

    </>);
}

export default Home;
