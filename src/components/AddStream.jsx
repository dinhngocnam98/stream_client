import {Button, Col, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import {useState} from "react";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {TextField} from "@mui/material";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {addChannel, updateChannel} from "../store/actions/channelActions";
import moment from "moment-timezone";

function AddStream({channel, emitSaveStream}) {
    const [name, setName] = useState(channel ? channel.name : '');
    const [group, setGroup] = useState(channel ? channel.group : '');
    const [logo, setLogo] = useState(channel ? channel.logoUrl : '');
    const [url1, setUrl1] = useState(channel && channel.streamUrlList[0]?.streamUrl ? channel.streamUrlList[0]?.streamUrl : '');
    const [url2, setUrl2] = useState(channel && channel.streamUrlList[1]?.streamUrl ? channel.streamUrlList[1]?.streamUrl : '');
    const [url3, setUrl3] = useState(channel && channel.streamUrlList[2]?.streamUrl ? channel.streamUrlList[2]?.streamUrl : '');
    const [referer1, setReferer1] = useState(channel && channel.streamUrlList[0]?.refererUrl ? channel.streamUrlList[0]?.refererUrl : '');
    const [referer2, setReferer2] = useState(channel && channel.streamUrlList[1]?.refererUrl ? channel.streamUrlList[1]?.refererUrl : '');
    const [referer3, setReferer3] = useState(channel && channel.streamUrlList[2]?.refererUrl ? channel.streamUrlList[2]?.refererUrl : '');
    const [startTime, setStartTime] = useState(channel ? moment.utc(channel.startTime) : null);
    const dispatch = useDispatch();

    const handleDateChange = (start) => {
        setStartTime(start);
    }
    const handleClose = () => {
        console.log('Closed')
    }
    const addStream = async (event) => {
        event.preventDefault();
        if (!startTime || startTime === "") {
            toast.error("StartTime is required");
        } else {
            const formattedDate = startTime ? startTime.format('YYYY-MM-DD HH:mm:ss') : "";
            const streamUrlList = [];
            const stream1 = {streamUrl: url1, refererUrl: referer1};
            if (channel && channel.streamUrlList[0]?.id) {
                stream1.id = channel.streamUrlList[0]?.id
            }
            streamUrlList.push(stream1);

            const stream2 = {streamUrl: url2, refererUrl: referer2};
            if (channel && channel.streamUrlList[1]?.id) {
                stream2.id = channel.streamUrlList[1]?.id
            }
            streamUrlList.push(stream2);

            const stream3 = {streamUrl: url3, refererUrl: referer3};
            if (channel && channel.streamUrlList[2]?.id) {
                stream3.id = channel.streamUrlList[2]?.id
            }
            streamUrlList.push(stream3);
            let newStream = {
                "name": name,
                "group": group,
                "logoUrl": logo,
                "startTime": formattedDate,
                "streamUrlList": streamUrlList
            }
            if (channel) {
                newStream.id = channel.id;
                await dispatch(updateChannel(newStream));
            } else {
                await dispatch(addChannel(newStream));
            }
            emitSaveStream();
        }

    }
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Form className="m-5" onSubmit={addStream}>
                <FormGroup as={Row} className="mb-3">
                    <FormLabel column sm="2">Name</FormLabel>
                    <Col sm="10">
                        <FormControl
                            type="text"
                            placeholder="Name stream"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Col>
                </FormGroup>

                <FormGroup as={Row} className="mb-3">
                    <FormLabel column sm="2">Group</FormLabel>
                    <Col sm="10">
                        <FormControl
                            type="text"
                            placeholder="Group"
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                            required
                        />
                    </Col>
                </FormGroup>

                <FormGroup as={Row} className="mb-3">
                    <FormLabel column sm="2">Start Time</FormLabel>
                    <Col sm="10">
                        <DateTimePicker
                            value={startTime}
                            label="Start Time (UTC)"
                            onChange={handleDateChange}
                            textField={(params) => (<TextField
                                {...params}
                            />)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup as={Row} className="mb-3">
                    <FormLabel column sm="2">Logo</FormLabel>
                    <Col sm="10">
                        <FormControl
                            type="text"
                            placeholder="Logo Url"
                            value={logo}
                            onChange={(e) => setLogo(e.target.value)}
                            required
                        />
                    </Col>
                </FormGroup>

                <FormGroup as={Row} className="mb-3">
                    <FormLabel column sm="2">Stream link 1</FormLabel>
                    <Col sm="4">
                        <FormControl
                            type="text"
                            placeholder="Stream Url 1"
                            value={url1}
                            onChange={(e) => setUrl1(e.target.value)}
                        />
                    </Col>
                    <FormLabel column sm="2" className="d-flex justify-content-end">Referer link 1</FormLabel>
                    <Col sm="4">
                        <FormControl
                            type="text"
                            placeholder="Referer Url 1"
                            value={referer1}
                            onChange={(e) => setReferer1(e.target.value)}
                        />
                    </Col>
                </FormGroup>

                <FormGroup as={Row} className="mb-3">
                    <FormLabel column sm="2">Stream link 2</FormLabel>
                    <Col sm="4">
                        <FormControl
                            type="text"
                            placeholder="Stream Url 2"
                            value={url2}
                            onChange={(e) => setUrl2(e.target.value)}
                        />
                    </Col>
                    <FormLabel column sm="2" className="d-flex justify-content-end">Referer link 2</FormLabel>
                    <Col sm="4">
                        <FormControl
                            type="text"
                            placeholder="Referer Url 2"
                            value={referer2}
                            onChange={(e) => setReferer2(e.target.value)}
                        />
                    </Col>
                </FormGroup>

                <FormGroup as={Row} className="mb-lg-5">
                    <FormLabel column sm="2">Stream link 3</FormLabel>
                    <Col sm="4">
                        <FormControl
                            type="text"
                            placeholder="Stream Url 3"
                            value={url3}
                            onChange={(e) => setUrl3(e.target.value)}
                        />
                    </Col>
                    <FormLabel column sm="2" className="d-flex justify-content-end">Referer link 3</FormLabel>
                    <Col sm="4">
                        <FormControl
                            type="text"
                            placeholder="Referer Url 3"
                            value={referer3}
                            onChange={(e) => setReferer3(e.target.value)}
                        />
                    </Col>
                </FormGroup>
                <div className="d-flex justify-content-center">
                    <Button type="submit" aria-label="save" title="save">Save</Button>
                </div>
            </Form>
        </LocalizationProvider>
    )
}

export default AddStream;
