import {Button, Card, Col, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {TextField} from "@mui/material";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {addChannel, updateChannel} from "../store/actions/channelActions";
import moment from "moment-timezone";

function AddStream({chanel, emitSaveStream}) {
    const [name, setName] = useState(chanel ? chanel.name : '');
    const [group, setGroup] = useState(chanel ? chanel.group : '');
    const [logo, setLogo] = useState(chanel ? chanel.logoUrl : '');
    const [url, setUrl] = useState(chanel ? chanel.streamUrl : '');
    const [referer, setReferer] = useState(chanel ? chanel.refererUrl : '');
    const [startTime, setStartTime] = useState(chanel ? moment.utc(chanel.startTime) : null);
    const dispatch = useDispatch();
    const handleDateChange = (start) => {
        setStartTime(start);
    }
    const addStream = async (event) => {
        event.preventDefault();
        if (!startTime || startTime === "") {
            toast.error("StartTime is required");
        } else {
            const formattedDate = startTime ? startTime.format('YYYY-MM-DD HH:mm:ss') : "";
            let newStream = {
                "name": name,
                "group": group,
                "logoUrl": logo,
                "isLive": chanel ? chanel.isLive : false,
                "streamUrl": url,
                "refererUrl": referer === "" || referer === null ? null : referer,
                "startTime": formattedDate
            }
            if (chanel) {
                newStream.id = chanel.id;
                dispatch(updateChannel(newStream));
            } else {
                dispatch(addChannel(newStream));
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
                    <FormLabel column sm="2">Stream link</FormLabel>
                    <Col sm="10">
                        <FormControl
                            type="text"
                            placeholder="Stream Url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                    </Col>
                </FormGroup>

                <FormGroup as={Row} className="mb-lg-5">
                    <FormLabel column sm="2">Referer link</FormLabel>
                    <Col sm="10">
                        <FormControl
                            type="text"
                            placeholder="Referer Url"
                            value={referer}
                            onChange={(e) => setReferer(e.target.value)}
                        />
                    </Col>
                </FormGroup>
                <div className="d-flex justify-content-center">
                    <Button type="submit">Save</Button>
                </div>
            </Form>
        </LocalizationProvider>
    )
}

export default AddStream;