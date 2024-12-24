import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import ChannelList from "./ChannelList";
import React, {useEffect, useState} from "react";
import News from "./News";
import {Col, Container, Row} from "react-bootstrap";
import {Helmet, HelmetProvider} from "react-helmet-async";
import {filterObjectsTodayInClientTime} from "../utils/SortChannels";

function StreamDetail() {
    const {group} = useParams();
    const listChannels = useSelector((state) => state.channels).channels;
    const channelsFiltered = filterObjectsTodayInClientTime(listChannels);
    const [channels, setChannels] = useState([]);
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
        if (channelsFiltered) {
            const channelsFilter = channelsFiltered.filter((channel) => channel.group.replace(/\s+/g, "-").toLowerCase() === group);
            setChannels(channelsFilter);

        }
    }, [listChannels, group]);
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <meta name="DC.title" content={`WATCH ${group.replace("-", " ").toUpperCase()}`}/>
                    <meta name="DC.publisher" content="USA Sport Live"/>
                    <meta name="DC.created" content="2024"/>
                    <meta name="DC.description"
                          content="Watch free streaming for NFL,NBA,MLB,UFC,Boxing and more - the top choice for free sport streaming worldwide"/>
                    <meta property="og:locale" content="en_US"/>
                    <meta property="og:title" content={`WATCH ${group.replace("-", " ").toUpperCase()}`}/>
                    <meta property="og:image" content={`https://usasport.live${process.env.PUBLIC_URL}/usa_sport.png`}/>
                    <meta property="og:url" content={`https://usasport.live/watch/${group}`}/>
                    <meta property="og:site_name" content="USA Sport Live"/>
                    <meta property="og:description"
                          content="Watch free streaming for NFL,NBA,MLB,UFC,Boxing and more - the top choice for free sport streaming worldwide"/>
                    <meta name="twitter:card" content="summary_large_image"/>
                    <meta name="twitter:title" content={`WATCH ${group.replace("-", " ").toUpperCase()}`}/>
                    <meta name="twitter:description"
                          content="Watch free streaming for NFL,NBA,MLB,UFC,Boxing and more - the top choice for free sport streaming worldwide"/>
                    <meta name="twitter:image" content={`https://usasport.live${process.env.PUBLIC_URL}/usa_sport.png`}/>
                    <link rel="shortcut icon" type="image/x-icon" href={`https://usasport.live${process.env.PUBLIC_URL}/usa_sport.ico`}/>
                    <meta name="geo.region" content="US"/>
                    <link rel="canonical" href={`https://usasport.live/watch/${group}`}/>
                    <title>WATCH {group.replace("-", " ").toUpperCase()}</title>
                    <meta name="description" content={`Watch ${group.replace("-", " ")} page`}/>
                    <link rel="canonical" href={`https://usasport.live/watch/${group}`}/>
                </Helmet>
            </HelmetProvider>
            <Container fluid className={`px-5 ${desktop ? 'w-75' : ''}`}>
                <Row>
                    {/* Main Content */}
                    <Col xs={12} md={7} lg={8} className="main-content">
                        {/*<div className="ads-1">*/}
                        {/*    ads*/}
                        {/*</div>*/}
                        <div className="m-lg-4" id="channel-list-section">
                            <ChannelList channels={channels} readMore={false}/>
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
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default StreamDetail;