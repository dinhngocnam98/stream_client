import ChannelList from "./ChannelList";

import {Col, Container, Row} from "react-bootstrap";
import News from "./News";
import FeaturedArticles from "./FeaturedArticles";
import ImageBanner from "./Banner";
import {useSelector} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import {Helmet, HelmetProvider} from "react-helmet-async";
import {filterObjectsTodayInClientTime} from "../utils/SortChannels";
import HeaderAPI from "../api/HeaderAPI";

function Home() {
    const channels = useSelector((state) => state.channels).channels

    const channelsFilter = filterObjectsTodayInClientTime(channels);

    const [config, setConfig] = useState({});

    async function getHeaderConfig() {
        try {
            const res = await HeaderAPI.geConfig();
            if (res.data) {
                setConfig(res.data?.homePage);
            }
        } catch (error) {
            console.log(error);
        }

    }

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
    useEffect(() => {
        getHeaderConfig();
    }, [])
    console.log(config)
    return (<>
        <HelmetProvider>
            <Helmet>
                <meta name="DC.creator" content={config?.creator | "USA Sport Live"}/>
                <meta name="DC.title" content={config?.title | "USA Sport Live | Watch Live Sports"}/>
                <meta name="DC.publisher" content={config?.publisher | "USA Sport Live"}/>
                <meta name="DC.created" content="2024"/>
                <meta name="DC.description"
                      content={config?.description | "Watch free streaming for NFL,NBA,MLB,UFC,Boxing and more - the top choice for free sport streaming worldwide"}/>
                <meta property="og:locale" content="en_US"/>
                <meta property="og:title" content={config?.title | "USA Sport Live | Watch Live Sports"}/>
                <meta property="og:image" content={ config?.imageUrl | `https://usasport.live${process.env.PUBLIC_URL}/usa_sport.png`}/>
                <meta property="og:url" content={config?.url | `https://usasport.live/`}/>
                <meta property="og:site_name" content={config?.publisher | "USA Sport Live"}/>
                <meta property="og:description"
                      content={config?.description | "Watch free streaming for NFL,NBA,MLB,UFC,Boxing and more - the top choice for free sport streaming worldwide"}/>
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content="USA Sport Live | Watch Live Sports"/>
                <meta name="twitter:site" content="@LiveUsasport"/>
                <meta name="twitter:description"
                      content={config?.description | "Watch free streaming for NFL,NBA,MLB,UFC,Boxing and more - the top choice for free sport streaming worldwide"}/>
                <meta name="twitter:image"
                      content={ config?.imageUrl | `https://usasport.live${process.env.PUBLIC_URL}/usa_sport.png`}/>
                <link rel="shortcut icon" type="image/x-icon"
                      href={config?.iconUrl |`https://usasport.live${process.env.PUBLIC_URL}/usa_sport.ico`}/>
                <meta name="geo.region" content="US"/>
                <title>{config?.title | "USA Sport Live | Watch Live Sports"}</title>
                <meta name="description"
                      content={config?.description | "Watch free streaming for NFL,NBA,MLB,UFC,Boxing and more - the top choice for free sport streaming worldwide"}/>
                <link rel="canonical" content={config?.url | `https://usasport.live/`}/>
            </Helmet>
        </HelmetProvider>
        <Container fluid className={`px-5 ${desktop ? 'w-75' : ''}`}>

            <Row>
                {/* Main Content */}
                <Col xs={12} md={7} lg={8} className="main-content">
                    <div className="m-lg-4">
                        <ImageBanner id="banner"/>
                    </div>
                    {/*<div className="w-100 d-flex justify-content-center align-items-center">*/}
                    {/*    <Ads src="//www.highperformanceformat.com/fd65adebc0efc4af9e9d464f80cdf4df/invoke.js"*/}
                    {/*         keyId="fd65adebc0efc4af9e9d464f80cdf4df" width="720" height="90" delay={0}/>*/}
                    {/*</div>*/}
                    <div className="m-lg-4" id="channel-list-section">
                        <ChannelList channels={channelsFilter} readMore={true}/>
                    </div>
                </Col>

                {/* Sidebar */}
                <Col xs={12} md={5} lg={4} className="sidebar d-flex flex-column align-items-center">
                    <div className="m-lg-4" id="news-section">
                        <News/>
                    </div>
                    {/*<Ads src="//www.highperformanceformat.com/d79a19eb1b1b285b56d1d558b74a5707/invoke.js"*/}
                    {/*     keyId="d79a19eb1b1b285b56d1d558b74a5707" width="300" height="250" delay={1000}/>*/}
                    <div className="m-lg-4" id="featured-articles-section">
                        <FeaturedArticles/>
                    </div>
                </Col>
            </Row>
        </Container>

    </>);
}

export default Home;
