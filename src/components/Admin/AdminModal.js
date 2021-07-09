import React from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 500,
        flexGrow: 1,
        minWidth: 500,
        transform: 'translateZ(0)',
        // The position fixed scoping doesn't work in IE 11.
        // Disable this demo to preserve the others.
        '@media all and (-ms-high-contrast: none)': {
            display: 'none',
        },
    },
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function AdminModal(props) {
    const classes = useStyles();
    const rootRef = React.useRef(null);

    return (
        <Modal
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            open={props.open}
            aria-labelledby="server-modal-title"
            aria-describedby="server-modal-description"
            className={classes.modal}
            container={() => rootRef.current}
            onClose={props.onClose}
        >
            <div className={classes.paper}>
                <div className="row">
                    <div className="form-group col-lg-12 col-md-12">
                        <h4>Add</h4>
                        <label className="text-muted">Morning Weight</label>
                        <input className="form-control" type="number" />
                        <label className="text-muted">Morning Weight</label>
                        <input className="form-control" type="number" />
                        <label className="text-muted">Morning Weight</label>
                        <input className="form-control" type="number" />
                        <div className="mt-4 modal-btn">
                            <Button
                                variant="contained"
                            >Save</Button>
                            <Button

                                variant="contained"
                                onClick={props.onClose}
                                justifyContent="space-between"
                            >Close</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}