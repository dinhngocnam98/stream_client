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
                navigate(`/watch/${channel.group.replace(/\s+/g, '-').toLowerCase()}/${channel.name.replace(/\s+/g, '-').toLowerCase()}`);
            }
        }
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
                                    <ListGroup.Item
                                        action
                                        key={channel.id}
                                        active={channel === selectedChannel}
                                        onClick={() => selectChannel(channel)}
                                        className="d-flex justify-content-start align-items-center channel-item content-dark-mode"
                                    >
                                        <div
                                            className="d-flex text-dark align-items-center text-decoration-none text-primary"
                                        >
                                            {/*<FaAngleDoubleRight size={20} color="#c88f57" className="me-2"/>*/}
                                            <i className="fa fa-angle-double-right mx-1 mx-md-2 mx-lg-3"
                                               aria-hidden="true"></i>
                                            <p className="channel-name mb-0">
                                                {channel.name} {channel.startTime ?
                                                `: ${moment.utc(channel.startTime).tz("America/New_York").format('YYYY/MM/DD, h:mm:ss A [UTC]Z z')} (New York Time)`
                                                : ''}

                                            </p>
                                        </div>
                                        {channel.isLive && (
                                            <div className="live-icon-wrapper">
                                                <Image
                                                    src={`${process.env.PUBLIC_URL}/live-icon.png`}
                                                    fluid
                                                    className="live-icon"
                                                />
                                            </div>
                                        )}
                                    </ListGroup.Item>
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
