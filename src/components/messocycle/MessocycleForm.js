import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/styles';
import { Button, IconButton } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import { isLoggedIn } from 'src/helpers/loginHelp';
import { addMesscycle } from 'src/apiCalls/reportCalls';
import Icon from '@iconify/react';

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
}));

function MessocycleForm(props) {
    const classes = useStyles();
    const rootRef = React.useRef(null);
    const { register, handleSubmit, reset, } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [array, setArray] = useState([0, 1]);

    const submit = (e) => {
        const exercises = []
        array.forEach((num) => {
            exercises.push({
                "exercise": e[num + "_exercise"], "sets": e[num + "_sets"], "reps": e[num + "_reps"],
                "load": e[num + "_load"], "rest": e[num + "_rest"], "tempo": e[num + "_tempo"], "notes": e[num + "_notes"]
            })
        })
        const loginData = isLoggedIn()
        const parms = {
            warm_up: e.warm_up,
            cool_down: e.cool_down,
            userId: props.id,
            exercises: exercises,
        }
        addMesscycle(loginData.token, parms).then(data => {
            props.onSave()
            setTimeout(() => {
                props.onClose()
            }, 1500);
        })
    }

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
            <div className="modal_">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <h4>Add</h4>
                        <form onSubmit={handleSubmit(submit)}>
                            <div>
                                <div className="row">
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group ">
                                            <label className="text-muted">Warm Up</label>
                                            <input className="form-control" type="text"{...register("warm_up", { required: true })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Cool Down</label>
                                            <input className="form-control" type="text"  {...register("cool_down", { required: true })} />
                                        </div>
                                    </div>

                                </div>
                                {array.map((num, index) =>
                                    <div className="row" key={index}>
                                        <div className="col-lg-3 col-xl-3 col-sm-4">
                                            <div className="form-group ">
                                                <label className="text-muted">Exercise</label>
                                                <input className="form-control" type="text" {...register(num + "_exercise", { required: true })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-xl-1 col-sm-2">
                                            <div className="form-group">
                                                <label className="text-muted">Sets</label>
                                                <input className="form-control" type="text"  {...register(num + "_sets", { required: true })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-xl-1 col-sm-2">
                                            <div className="form-group">
                                                <label className="text-muted">Reps</label>
                                                <input className="form-control" type="number" {...register(num + "_reps", { required: true })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-xl-1 col-sm-2">
                                            <div className="form-group">
                                                <label className="text-muted">Load</label>
                                                <input className="form-control" type="number"  {...register(num + "_load", { required: true })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-xl-1 col-sm-2">
                                            <div className="form-group">
                                                <label className="text-muted">Rest</label>
                                                <input className="form-control" type="number"  {...register(num + "_rest", { required: true })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-xl-1 col-sm-2">
                                            <div className="form-group">
                                                <label className="text-muted">Tempo</label>
                                                <input className="form-control" type="text"  {...register(num + "_tempo", { required: true })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-xl-3 col-sm-4 pb-4">
                                            <div className="form-group">
                                                <label className="text-muted">Notes</label>
                                                <input className="form-control" type="text"{...register(num + "_notes", { required: true })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-xl-1 col-sm-4 pb-4">
                                            <IconButton sx={{ mt: 2, color: 'text.primary' }}
                                                onClick={() => {
                                                    const filterArray = array.filter((e) => e !== num)
                                                    setArray(filterArray)
                                                }}
                                                aria-label="delete">
                                                <Icon icon={trash2Fill} />
                                            </IconButton>
                                        </div>
                                    </div>
                                )}
                            </div>

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
                                <div className="row">
                                    <div className="col-10">
                                        <Button
                                            onClick={() => {
                                                array.push(Math.floor(Math.random() * 100))
                                                setArray(array.filter(() => true))
                                            }}
                                            style={{}}
                                            variant="contained"
                                            type="button"
                                        >Add</Button>
                                    </div>
                                    <div className="col-1">
                                        <Button

                                            style={{ marginRight: 12, textAlign: 'right' }}
                                            variant="contained"
                                            type="submit"
                                        >Save</Button>
                                    </div>
                                    <div className="col-1">
                                        <Button
                                            variant="link"
                                            onClick={props.onClose}
                                        >Close</Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Modal >
    );
}
export default MessocycleForm;