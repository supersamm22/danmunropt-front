import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';

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

export default function MessocycleForm(props) {
    const classes = useStyles();
    const rootRef = React.useRef(null);
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
                    <h4>Add</h4>
                    <form >
                        <div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group ">
                                        <label className="text-muted">Warm Up</label>
                                        <input className="form-control" type="text"{...register("warm_up", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group ">
                                        <label className="text-muted">Exercise</label>
                                        <input className="form-control" type="text" {...register("exercise", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="text-muted">Sets</label>
                                        <input className="form-control" type="text"  {...register("sets", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="text-muted">Reps</label>
                                        <input className="form-control" type="number" {...register("reps", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="text-muted">Load</label>
                                        <input className="form-control" type="number"  {...register("Load", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="text-muted">Rest</label>
                                        <input className="form-control" type="number"  {...register("rest", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="text-muted">Tempo</label>
                                        <input className="form-control" type="text"  {...register("tempo", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="text-muted">Cool Down</label>
                                        <input className="form-control" type="text"  {...register("cool_down", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-4 pb-4">
                                    <div className="form-group">
                                        <label className="text-muted">Notes</label>
                                        <textarea className="form-control"  {...register("notes", { required: true })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    {/* end of main row */}
                    {loading &&
                        <div className="alert alert-primary self-align-center m-3 " role="alert">
                            Uploading Report....
                        </div>
                    }
                    {error &&
                        <div className="alert alert-danger self-align-center m-3" role="alert">
                            {error}
                        </div>
                    }
                    <div className="col-md-12">
                        <div style={{ textAlign: 'right' }}>
                            <Button
                                variant="contained"
                            >Save</Button>
                            <Button

                                variant="contained"
                                onClick={props.onClose}
                            >Close</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    );
}