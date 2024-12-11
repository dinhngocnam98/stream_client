import moment from 'moment-timezone';
import {Card, Image, ListGroup, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function ChannelList({channels, selectedChannel, readMore, onSendData}) {
    const navigate = useNavigate();
    const selectChannel = (channel) => {
        if (!channel.isLive) {
            toast.warn("Stream does not available");
        } else {
            if (onSendData) {
                onSendData(channel);
            } else {

                navigate(`/watch/${channel.group.replace(/\s+/g, "-").toLowerCase()}/${channel.name.replace(/\s+/g, "-").replace("vs.", "vs").toLowerCase()}.html`);
                window.scrollTo(0, 0);
            }
        }
        toast.warn("Get ready! The live stream will go live 1 hour before the match kicks off. Don’t miss it!");
    };

    // Grouping channels by group
    let groupedArray = channels.reduce((acc, item) => {
        if (!acc[item.group]) {
            acc[item.group] = [];
        }
        acc[item.group].push(item);
        return acc;
    }, {});

    return (
        <>
            {Object.keys(groupedArray).map((group) => {
                // Limit to 10 items per group
                const limitedItems = readMore ? groupedArray[group].slice(0, 10) : groupedArray[group];

                return (
                    <Card key={group} className="mb-5 d-flex">
                        <Card.Header
                            id={`${group.replace(/\s+/g, '-').toLowerCase()}-section`}
                            className="channel-list-header fs-3 d-flex justify-content-between align-items-center content-dark-mode"
                        >
                            {/* Header title with href */}
                            <a
                                href={`/watch/${group.replace(/\s+/g, '-').toLowerCase()}`}
                                className="text-decoration-none text-dark"
                            >
                                <h2>
                                    {group}
                                </h2>
                            </a>
                            {/* Read More button */}
                            {readMore && (
                                <Button
                                    title="read-more" aria-label="read-more"
                                    variant="link"
                                    className="text-decoration-none"
                                    onClick={() => navigate(`/watch/${group.replace(/\s+/g, '-').toLowerCase()}`)}
                                >
                                    <span className="text-gray">
                                        Read More
                                    </span>
                                </Button>
                            )}
                        </Card.Header>
                        <div className={`channel-list-wrapper`}>
                            <ListGroup variant="flush">
                                {limitedItems.map((channel) => (
                                    channel.isLive ?
                                        (
                                            <ListGroup.Item
                                                action
                                                key={channel.id}
                                                active={channel === selectedChannel}
                                                href={`/watch/${channel.group.replace(/\s+/g, "-").toLowerCase()}/${channel.name.replace(/\s+/g, "-").replace("vs.", "vs").toLowerCase()}-${channel.id}.html`}
                                                className="d-flex justify-content-start align-items-center channel-item content-dark-mode"
                                                rel="noopener noreferrer"
                                            >
                                                <div
                                                    className="d-flex text-dark align-items-center text-decoration-none news-line"
                                                >
                                                    <i className="fa fa-angle-double-right mx-1 mx-md-2 mx-lg-3"
                                                       aria-hidden="true"></i>
                                                    <h4 className="channel-name mb-0 news-line">
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
                                        ) : (
                                            <ListGroup.Item
                                                action
                                                key={channel.id}
                                                onClick={() => selectChannel(channel)}
                                                className="d-flex justify-content-start align-items-center channel-item content-dark-mode news-line"
                                            >
                                                <div
                                                    className="d-flex text-dark align-items-center text-decoration-none text-primary news-line"
                                                >
                                                    <i className="fa fa-angle-double-right mx-1 mx-md-2 mx-lg-3"
                                                       aria-hidden="true"></i>
                                                    <h4 className="channel-name mb-0 news-line">
                                                        {channel.name} {channel.startTime ? `: ${moment.utc(channel.startTime).local().format('YYYY/MM/DD, H:mm:ss A [UTC]Z z')} ${moment.tz.guess()}` : ''}
                                                    </h4>
                                                </div>
                                            </ListGroup.Item>
                                        )
                                ))}
                            </ListGroup>
                        </div>
                    </Card>
                );
            })}
        </>
    );
}

export default ChannelList;
