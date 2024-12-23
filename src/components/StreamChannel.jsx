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

    const filterObjectsTodayInClientTime = (objList) => {
        // Lấy ngày hiện tại của client
        const today = new Date();
        const todayYear = today.getFullYear();
        const todayMonth = today.getMonth();
        const todayDate = today.getDate();

        return objList.filter(obj => {
            if (!obj.startTime) return false; // Bỏ qua nếu không có startTime

            // Chuyển startTime từ UTC sang giờ client
            const startTimeUTC = new Date(obj.startTime + "Z"); // "Z" để chỉ định UTC
            const clientTime = new Date(startTimeUTC.toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}));

            // So sánh ngày của client
            return (
                clientTime.getFullYear() === todayYear &&
                clientTime.getMonth() === todayMonth &&
                clientTime.getDate() === todayDate
            );
        });
    }

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
        const channel = channelsFiltered.find((channel) => `${channel.name.replace(/\s+/g, "-").replace("vs.", "vs").toLowerCase()}-${channel.id}.html` === name);
        if (channel) {
            setCurrentChannel(channel);
            setLogo(channel.logoUrl);
            setSelectedChannel(channel);
            const id = channel.id;
            setSourceLive(`/api/m3u8/${id}/${id}.m3u8`)
        }
        // else {
        //     navigate("/");
        // }
    }, [channels, name, navigate]);

    useEffect(() => {
        if (channelsFiltered) {
            const channelsFilter = channelsFiltered.filter((channel) => channel.group.replace(/\s+/g, "-").toLowerCase() === group);
            const liveChannels = channelsFiltered.filter((channel) => channel.isLive === true);
            setListChannels(channelsFilter);
            setLiveChannels(liveChannels);
        }
    }, [channels, group]);

    const selectedChannelEvent = (channel) => {
        toast.warn("Get ready! The live stream will go live 1 hour before the match kicks off. Don’t miss it!");
    }
    return (
        <>
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
                        <div className="m-lg-4">
                            <h1>
                                {currentChannel?.name}
                            </h1>
                            {currentChannel && currentChannel?.startTime ?
                                <p className="mb-3">
                                    Start Time: {moment.utc(currentChannel.startTime).local().format('YYYY/MM/DD, H:mm:ss A [UTC]Z z')} {moment.tz.guess()}
                                </p>
                                : ''
                            }
                            {currentChannel && !currentChannel?.isLive ?
                                <p className="mb-3 bg-warning text-dark">
                                    Get ready! The live stream will go live 1 hour before the match kicks off. Don’t miss it!
                                </p>
                                : ''}
                            {currentChannel?.isLive ? (
                                <ClapprPlayer
                                    source={sourceLive} img={currentChannel && logo}
                                    height={isMobile || isTablet ? "30vh" : "50vh"}
                                />
                            ) : (
                                <Image className="img-bg-dark" src={currentChannel && logo} width="100%" height="100%"/>
                            )}

                        </div>
                    </Col>

                    {/* Sidebar */}
                    <Col xs={12} md={5} lg={4} className="sidebar">
                        <div className="m-lg-4" id="news-section">
                            <News/>
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
                                    {liveChannels.map((channel) => (
                                        <ListGroup.Item
                                            action
                                            key={channel.id}
                                            active={channel === selectedChannel}
                                            href={`/watch/${channel.group.replace(/\s+/g, "-").toLowerCase()}/${channel.name.replace(/\s+/g, "-").replace("vs.", "vs").toLowerCase()}-${channel.id}.html`}
                                            className="d-flex justify-content-start align-items-center channel-item content-dark-mode"
                                            rel="noopener noreferrer"
                                        >
                                            <div className="d-flex text-dark align-items-center text-decoration-none news-line">
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
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default StreamChannel;
