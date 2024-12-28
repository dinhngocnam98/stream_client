import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ChannelList from "./ChannelList";
import ClapprPlayer from "./ClapprPlayer";
import moment from 'moment-timezone';
import {useSelector} from "react-redux";
import {Button, Card, Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import {toast} from "react-toastify";
import News from "./News";
import {Helmet, HelmetProvider} from "react-helmet-async";
import {filterObjectsTodayInClientTime} from "../utils/SortChannels";

function StreamChannel() {
    const {name, group} = useParams();
    const navigate = useNavigate();
    const [selectedChannel, setSelectedChannel] = useState();
    const [sourceLive, setSourceLive] = useState();
    const [logo, setLogo] = useState();
    const [currentChannel, setCurrentChannel] = useState();
    const [listChannels, setListChannels] = useState([]);
    const [liveChannels, setLiveChannels] = useState([]);
    const {channels} = useSelector((state) => state.channels);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setTablet] = useState(false);
    const [streamUrl, setStreamUrl] = useState();

    const channelsFiltered = filterObjectsTodayInClientTime(channels);


    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 850) {
                setIsMobile(true);
            } else if (width > 850 && width < 1030) {
                setIsMobile(false);
                setTablet(true);
            } else {
                setIsMobile(false);
                setTablet(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        console.log(name);
        console.log(group);
        const channel = channels.find((channel) => `${channel.name.replace(/\s+/g, "-").replace("vs.", "vs").toLowerCase()}-${channel.id}.html` === name);
        if (channel) {
            setCurrentChannel(channel);
            setLogo(channel.logoUrl);
            setSelectedChannel(channel);
            if (channel.streamUrlList.length > 0) {
                if (channel.streamUrlList.some((stream) => stream.isLive)) {
                    for (let stream of channel.streamUrlList) {
                        if (stream.isLive) {
                            setStreamUrl(stream)
                            break;
                        }
                    }
                } else {
                    setStreamUrl(channel.streamUrlList[0]);
                }
            }
        }
    }, [channels, name, navigate]);

    useEffect(() => {
        if (streamUrl && currentChannel) {
            const name = currentChannel.name.replaceAll(" ", "").replace(".", "");
            const fullName = name + "-" + currentChannel.id + "-" + streamUrl.id;
            setSourceLive(`/api/m3u8/${fullName}/${fullName}.m3u8`)
        }
    }, [streamUrl]);

    useEffect(() => {
        if (channelsFiltered) {
            const channelsFilter = channelsFiltered.filter((channel) => channel.group.replace(/\s+/g, "-").toLowerCase() === group || channel.group.replace(/\s+/g, "-").toLowerCase().includes(group));
            const liveChannels = channelsFiltered.filter((channel) => channel.streamUrlList.some((stream) => stream.isLive) === true);
            setListChannels(channelsFilter);
            setLiveChannels(liveChannels);
        }
    }, [channels, group]);

    const selectedChannelEvent = (channel) => {
        toast.warn("Get ready! The live stream will go live 1 hour before the match kicks off. Don’t miss it!");
    }
    return (<>
        <HelmetProvider>
            <Helmet>
                <meta name="DC.publisher" content="USA Sport Live"/>
                <meta name="DC.created" content="2024"/>
                <meta name="DC.description"
                      content={`Watch ${currentChannel?.name}`}/>
                <meta property="og:locale" content="en_US"/>
                <meta property="og:title" content={currentChannel?.name}/>
                <meta property="og:image" content={`https://usasport.live${process.env.PUBLIC_URL}/usa_sport.png`}/>
                <meta property="og:url" content={`https://usasport.live/watch/${group}/${name}`}/>
                <meta property="og:site_name" content="USA Sport Live"/>
                <meta property="og:description"
                      content={`Watch ${currentChannel?.name}`}/>
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={currentChannel?.name}/>
                <meta name="twitter:description"
                      content={`Watch ${currentChannel?.name}`}/>
                <meta name="twitter:image"
                      content={`https://usasport.live${process.env.PUBLIC_URL}/usa_sport.png`}/>
                <link rel="shortcut icon" type="image/x-icon"
                      href={`https://usasport.live${process.env.PUBLIC_URL}/usa_sport.ico`}/>
                <meta name="geo.region" content="US"/>
                <link rel="canonical" href={`https://usasport.live/watch/${group}/${name}`}/>
                <title>{currentChannel?.name}</title>
                <meta name="description" content={`Watch ${currentChannel?.name}`}/>
                <link rel="canonical" href={`https://usasport.live/watch/${group}/${name}`}/>
            </Helmet>
        </HelmetProvider>
        <Container fluid className={`px-5 ${!isMobile && !isTablet ? 'w-75' : ''}`}>
            <Row>
                {/* Main Content */}
                <Col xs={12} md={7} lg={8} className="main-content">
                    {currentChannel ? (<div className="m-lg-4">
                        <h1>
                            {currentChannel?.name}
                        </h1>
                        {currentChannel && currentChannel?.startTime ? <p className="mb-3">
                            Start
                            Time: {moment.utc(currentChannel.startTime).local().format('YYYY/MM/DD, H:mm:ss A [UTC]Z z')} {moment.tz.guess()}
                        </p> : ''}
                        {streamUrl && !streamUrl?.isLive ? <p className="mb-3 bg-warning text-dark">
                            Get ready! The live stream will go live 5 minutes before the match kicks off. Don’t
                            miss it!
                        </p> : ''}
                        {streamUrl?.isLive ? (<ClapprPlayer
                            source={sourceLive} img={currentChannel && logo}
                            height={isMobile || isTablet ? "30vh" : "50vh"}
                        />) : (<div className="img-bg-container">
                                <Image className="img-bg-dark" src={currentChannel && logo} width="100%"
                                       height="100%"/>
                            </div>

                        )}
                    </div>) : (<div className="m-lg-4">
                        <h1>
                            {name.replaceAll("-", " ").replaceAll("vs", "vs.").replace(/\-?\d+(?:-\d+)?\.html$/, "").replace(/\b\w/g, char => char.toUpperCase())}
                        </h1>
                        <p className="mb-3 bg-warning text-dark">
                            Stream has end!
                        </p>
                        <div className="img-bg-container">
                            <Image
                                className="img-bg-dark"
                                src={group.includes('nba') ? "https://raw.githubusercontent.com/tv-logo/tv-logos/635e715cb2f2c6d28e9691861d3d331dd040285b/countries/united-states/nba-tv-icon-us.png" : (group.includes('nhl') ? "https://raw.githubusercontent.com/tv-logo/tv-logos/635e715cb2f2c6d28e9691861d3d331dd040285b/countries/united-states/nhl-network-us.png" : "http://schedulesdirect-api20141201-logos.s3.dualstack.us-east-1.amazonaws.com/stationLogos/s34710_dark_360w_270h.png")}
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </div>)}

                    {currentChannel?.streamUrlList ? (<ListGroup horizontal>
                        {currentChannel?.streamUrlList?.map((stream, index) => (
                            <ListGroup.Item key={stream.id} className="pl-1">
                                <Button
                                    variant={streamUrl.id === stream.id ? "info" : "primary"}
                                    disabled={streamUrl.id === stream.id || !stream.isLive}
                                    onClick={() => {
                                        setStreamUrl(stream)
                                    }}
                                >
                                    Server {index + 1}
                                </Button>
                            </ListGroup.Item>))}
                    </ListGroup>) : ""}

                    <div className="w-100 d-flex justify-content-center align-items-center">
                        <div className="ads-1"/>
                    </div>
                </Col>


                {/* Sidebar */}
                <Col xs={12} md={5} lg={4} className="sidebar d-flex flex-column align-items-center">
                    <div className="m-lg-4" id="news-section">
                        <News/>
                    </div>
                    <div className="ads-2">
                    </div>
                </Col>
                <Col xs={12} md={12} lg={12} className="sidebar">
                    <div className="m-lg-4" id="news-section">
                        <ChannelList readMore={false} channels={listChannels} selectedChannel={selectedChannel}
                                     onSendData={selectedChannelEvent}/>
                    </div>
                </Col>

                <Col xs={12} md={12} lg={12} className="sidebar">
                    <Card className="m-lg-4 d-flex">
                        <Card.Header
                            className="channel-list-header fs-3 d-flex justify-content-between align-items-center"
                        >
                            {/* Header title with href */}
                            <h2 className="header-channel-list">
                                Live Now
                            </h2>
                        </Card.Header>
                        <div className={`channel-list-wrapper`}>
                            <ListGroup variant="flush">
                                {liveChannels.map((channel) => (<ListGroup.Item
                                    action
                                    key={channel.id}
                                    active={channel === selectedChannel}
                                    href={`/watch/${channel.group.replace(/\s+/g, "-").toLowerCase()}/${channel.name.replace(/\s+/g, "-").replace("vs.", "vs").toLowerCase()}-${channel.id}.html`}
                                    className="d-flex justify-content-start align-items-center channel-item content-dark-mode"
                                    rel="noopener noreferrer"
                                >
                                    <div
                                        className="d-flex text-dark align-items-center text-decoration-none news-line">
                                        <i className="fa fa-angle-double-right mx-1 mx-md-2 mx-lg-3"
                                           aria-hidden="true"></i>
                                        <h4 className={channel === selectedChannel ? "channel-name mb-0 text-dark" : "channel-name mb-0"}>
                                            {channel.name} {channel.startTime ? `: ${moment.utc(channel.startTime).local().format('YYYY/MM/DD, H:mm:ss A [UTC]Z z')} ${moment.tz.guess()}` : ''}
                                        </h4>
                                    </div>
                                    <div className="live-icon-wrapper">
                                        <Image
                                            src={`${process.env.PUBLIC_URL}/live-icon.png`}
                                            fluid
                                            className="live-icon"
                                        />
                                    </div>
                                </ListGroup.Item>))}
                            </ListGroup>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>)
}

export default StreamChannel;
