import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';
import {Button, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import AddStream from "./AddStream";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import PlayCircleOutlineTwoToneIcon from '@mui/icons-material/PlayCircleOutlineTwoTone';
import StopCircleTwoToneIcon from '@mui/icons-material/StopCircleTwoTone';
import SyncTwoToneIcon from '@mui/icons-material/SyncTwoTone';
import {deleteChannel, fetchChannels, liveStream} from "../store/actions/channelActions";
import {Helmet, HelmetProvider} from "react-helmet-async";
import {getDataWithExpiry} from "../utils/LocalStorage";
import {useNavigate} from "react-router-dom";
import SyncChannelAPI from "../api/SyncChannelAPI";
import {toast} from "react-toastify";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import PropTypes from "prop-types";

function Row(props) {
    const {row, emitHandleEdit, emitHandleDelete, emitHandleLiveStream} = props;
    const [open, setOpen] = React.useState(false);
    const handleEdit = (row) => {
        emitHandleEdit(row);
    }
    const handleDelete = (row) => {
        emitHandleDelete(row);
    }
    const handleLiveStream = (streamDetail) => {
        emitHandleLiveStream(streamDetail);
    }

    return (<React.Fragment>
        <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
            <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
                {row.name}
            </TableCell>
            <TableCell>{row.group}</TableCell>
            <TableCell>{row.startTime}</TableCell>
            <TableCell>{row.logoUrl}</TableCell>
            <TableCell>
                <div className="d-flex flex-row justify-content-evenly m-3">
                    <EditTwoToneIcon style={{cursor: 'pointer', color: 'blue'}}
                                     onClick={() => handleEdit(row)}/>
                    <DeleteTwoToneIcon style={{cursor: 'pointer', color: 'red'}}
                                       onClick={() => handleDelete(row)}/>
                </div>
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{margin: 1}}>
                        <Typography variant="h6" gutterBottom component="div">
                            Detail
                        </Typography>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Stream url</TableCell>
                                    <TableCell>Referer url</TableCell>
                                    <TableCell align="center">Live</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {row.streamUrlList.map((streamDetail) => (<TableRow key={streamDetail.id}>
                                    <TableCell component="th" scope="row">
                                        {streamDetail.id}
                                    </TableCell>
                                    <TableCell>{streamDetail.streamUrl}</TableCell>
                                    <TableCell>{streamDetail.refererUrl}</TableCell>
                                    <TableCell>
                                        <div className="d-flex  flex-row justify-content-center">
                                            {!streamDetail.isLive ? (<PlayCircleOutlineTwoToneIcon
                                                style={{cursor: 'pointer', color: 'green'}}
                                                onClick={() => handleLiveStream(streamDetail)}/>) : (
                                                <StopCircleTwoToneIcon style={{cursor: 'pointer', color: 'red'}}
                                                                       onClick={() => handleLiveStream(streamDetail)}/>)}

                                        </div>
                                    </TableCell>
                                </TableRow>))}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    </React.Fragment>);
}


function ChannelManagement() {
    const {channels} = useSelector(state => state.channels);
    const [open, setOpen] = useState(false);
    const [channel, setChannel] = useState(null);
    const dispatch = useDispatch();

    const [user] = useState(() => getDataWithExpiry("user"));
    const [sync, setSync] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (user === null) {
            navigate("/login");
        }
    });

    const handleOpen = () => {
        setOpen(!open);
    };


    const handleLiveStream = (streamDetail) => {
        dispatch(liveStream(streamDetail));
    }

    const handleEdit = (channel) => {
        setChannel(channel);
        setOpen(true);
    }

    const handleDelete = (channel) => {
        dispatch(deleteChannel(channel.id));
    }

    const handleClose = () => {
        setOpen(false);
        setChannel(null);
    };

    const saveStream = () => {
        setOpen(false);
        setChannel(null);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "70%",
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleSyncChannel = async () => {
        setSync(true);
        try {
            const response = await SyncChannelAPI.syncChannel();
            if (response.data) {
                dispatch(fetchChannels());
                toast.success("Fetch sync channels successfully.");
            } else {
                toast.error("Failed to fetch sync channel.");
            }
            setSync(false);
        } catch (err) {
            toast.error("Failed to fetch sync channel.");
            setSync(false);
        }


    }

    return (<>
        <HelmetProvider>
            <Helmet>
                <title>Admin page</title>
                <meta name="robots" content="nofollow, noindex"/>
            </Helmet>
        </HelmetProvider>
        <div className="d-flex justify-content-end">
            {sync ? (<Button variant="success" className="m-2" aria-label="" title="" disabled>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
            </Button>) : (<Button variant="success" onClick={handleSyncChannel} className="m-2" aria-label=""
                                  title=""><SyncTwoToneIcon/></Button>)}
            <Button title="add-stream" aria-label="add-stream" onClick={handleOpen} className="m-2">Add Stream</Button>
        </div>
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{width: '5%'}}></TableCell>
                        <TableCell sx={{width: '30%'}}>Name</TableCell>
                        <TableCell sx={{width: '15%'}}>Group</TableCell>
                        <TableCell sx={{width: '10%'}}>Start time (UTC)</TableCell>
                        <TableCell>Logo Url</TableCell>
                        <TableCell sx={{width: '10%'}} align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {channels.map((channel) => (<Row key={channel.name} row={channel} emitHandleEdit={handleEdit}
                                                     emitHandleDelete={handleDelete} emitHandleLiveStream={handleLiveStream}/>))}
                </TableBody>
            </Table>
        </TableContainer>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <AddStream channel={channel} emitSaveStream={saveStream}></AddStream>
            </Box>
        </Modal>
    </>)
}

export default ChannelManagement;
