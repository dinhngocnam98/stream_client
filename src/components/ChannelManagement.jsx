import {useDispatch, useSelector} from "react-redux";
import {Box, Modal, Paper, Typography} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';
import {Button} from "react-bootstrap";
import {useState} from "react";
import AddStream from "./AddStream";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import PlayCircleOutlineTwoToneIcon from '@mui/icons-material/PlayCircleOutlineTwoTone';
import StopCircleTwoToneIcon from '@mui/icons-material/StopCircleTwoTone';
import {deleteChannel, liveStream} from "../store/actions/channelActions";
import {Helmet, HelmetProvider} from "react-helmet-async";

function ChannelManagement() {
    const {channels} = useSelector(state => state.channels);
    const [open, setOpen] = useState(false);
    const [channel, setChannel] = useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();

    const columns = [
        {field: 'id', headerName: 'ID', flex: 1},
        {field: 'name', headerName: 'Name', flex: 2},
        {field: 'group', headerName: 'Group', flex: 1},
        {field: 'startTime', headerName: 'Start time(UTC)', flex: 1},
        {field: 'logoUrl', headerName: 'Logo Url', sortable: false, flex: 2},
        {field: 'streamUrl', headerName: 'Stream Url', sortable: false, flex: 2},
        {
            field: 'isLive',
            headerName: 'Live',
            sortable: false,
            flex: 0.5,
            renderCell: (params) => (
                <div className="d-flex  flex-row justify-content-center m-3">
                    {!params.row.isLive ?
                        (<PlayCircleOutlineTwoToneIcon style={{cursor: 'pointer', color: 'green'}}
                                                       onClick={() => handleLiveStream(params.row)}/>) :
                        (<StopCircleTwoToneIcon style={{cursor: 'pointer', color: 'red'}}
                                                onClick={() => handleLiveStream(params.row)}/>)
                    }

                </div>
            )
        },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            flex: 0.8,
            renderCell: (params) => (
                <div className="d-flex flex-row justify-content-evenly m-3">
                    <EditTwoToneIcon style={{cursor: 'pointer', color: 'blue'}} onClick={() => handleEdit(params.row)}/>
                    <DeleteTwoToneIcon style={{cursor: 'pointer', color: 'red'}}
                                       onClick={() => handleDelete(params.row)}/>
                </div>
            )
        },
    ];

    const handleEdit = (channel) => {
        setChannel(channel);
        setOpen(true);
    }

    const handleDelete = (channel) => {
        dispatch(deleteChannel(channel.id));
    }
    const handleLiveStream = (channel) => {
        dispatch(liveStream(channel));
    }

    const saveStream = () => {
        setOpen(false);
        setChannel(null);
    }

    const paginationModel = {page: 0, pageSize: 5};

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

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Admin page</title>
                </Helmet>
            </HelmetProvider>
            <div className="d-flex justify-content-end">
                <Button type="submit" onClick={handleOpen} className="m-2">Add Stream</Button>
            </div>
            <Paper sx={{width: '100%'}}>
                <DataGrid
                    rows={channels}
                    columns={columns}
                    initialState={{pagination: {paginationModel}}}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{border: 0.1}}
                />
            </Paper>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddStream chanel={channel} emitSaveStream={saveStream}></AddStream>
                </Box>
            </Modal>

        </>
    )
}

export default ChannelManagement;