import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/styles';
import { Button, IconButton } from '@material-ui/core';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 400,
        flexGrow: 1,
        minWidth: 400,
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
}));

function DeleteMessocycle(props) {
    const classes = useStyles();
    const rootRef = React.useRef(null);


    return (
        <Modal
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            open={props.show}
            aria-labelledby="server-modal-title"
            aria-describedby="server-modal-description"
            className={classes.modal}
            container={() => rootRef.current}
            onClose={props.onClose}
        >
            <div className="modal-dlt">
                <div className="row">
                    <div className="col-lg-12 col-md-12" style={{ textAlign: 'center' }}>
                        <h4>Delete</h4>
                        <p>Are you sure you want to delete it?</p>
                    </div>
                    <div className="col-md-6" style={{ textAlign: 'right' }}>
                        <Button variant="contained" style={{ backgroundColor: "rgb(220 0 78)" }} >Delete</Button>
                    </div>
                    <div className="col-md-6" style={{ textAlign: 'left' }}>
                        <Button variant="link" style={{ backgroundColor: "rgb(33 43 54 / 8%)" }}>Cancel</Button>

                    </div>
                </div>
            </div>
        </Modal >
    );
}
export default DeleteMessocycle;