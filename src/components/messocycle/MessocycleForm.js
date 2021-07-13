import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/styles';
import { Button, IconButton } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import { isLoggedIn } from 'src/helpers/loginHelp';
import { addMesscycle, editMesscycle } from 'src/apiCalls/reportCalls';
import Icon from '@iconify/react';
import Scrollbar from '../Scrollbar';
import zIndex from '@material-ui/core/styles/zIndex';

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
        display: 'block',
        padding: theme.spacing(1),
        overflow: 'auto',
        marginLeft: "auto",
    },
}));

function MessocycleForm(props) {
    const classes = useStyles();
    const rootRef = React.useRef(null);
    const { register, handleSubmit } = useForm();
    const [success, setSuccess] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");
    const [array, setArray] = useState([]);
    const { messocycle = {} } = props

    useEffect(() => {
        const a = [];
        (messocycle.exercises || []).forEach((e, index) => {
            a.push(index)
        })
        a.push(a.length)
        setArray(a)
    }, [props])
    const submit = (e) => {
        setSending(true)
        setError("")
        setSuccess(false)
        const exercises = []
        array.forEach((num) => {
            const new_ = {
                "exercise": e[num + "_exercise"], "sets": e[num + "_sets"], "reps": e[num + "_reps"],
                "load": e[num + "_load"], "rest": e[num + "_rest"], "tempo": e[num + "_tempo"], "notes": e[num + "_notes"]
            }
            if (new_.exercise) {
                exercises.push(new_)
            }
        })
        const loginData = isLoggedIn()
        if (messocycle._id) {
            messocycle.warm_up = e.warm_up
            messocycle.cool_down = e.cool_down
            messocycle.exercises = exercises

            editMesscycle(loginData.token, messocycle).then(data => {
                if (data) {
                    setSuccess(true)
                    props.onSave()
                    props.onClose()
                } else {
                    setSending(false)
                    setError("Something went wrong")
                }
            })

        } else {
            const parms = {
                warm_up: e.warm_up,
                cool_down: e.cool_down,
                userId: props.id,
                exercises: exercises,
            }
            addMesscycle(loginData.token, parms).then(data => {
                if (data) {
                    setSuccess(true)
                    props.onSave()
                    props.onClose()
                } else {
                    setSending(false)
                    setError("Something went wrong")
                }
            })
        }
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
                        <h4>{messocycle._id ? "Edit" : "Add"} Mesocycle</h4>
                        <form onSubmit={handleSubmit(submit)}>
                            <div>
                                <div className="row">
                                    <div className="col-lg-2 col-xl-2 col-sm-2">
                                        <div className="form-group ">
                                            <label className="text-muted">Warm Up</label>
                                            <input className="form-control" type="text"{...register("warm_up",
                                                { required: false, value: messocycle.warm_up })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-2 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Cool Down</label>
                                            <input className="form-control" type="text"  {...register("cool_down",
                                                { required: false, value: messocycle.cool_down })} />
                                        </div>
                                    </div>

                                </div>
                                {array.map((num, index) => {
                                    const exercise = ((messocycle.exercises || [])[index] || {})
                                    return <div className="row" key={index}>
                                        <div className="col-lg-3 col-xl-3 col-sm-4">
                                            <div className="form-group ">
                                                <label className="text-muted">Exercise</label>
                                                <input className="form-control" type="text" {...register(num + "_exercise",
                                                    { required: false, value: exercise.exercise })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-xl-1 col-sm-2">
                                            <div className="form-group">
                                                <label className="text-muted">Sets</label>
                                                <input className="form-control" type="text"  {...register(num + "_sets",
                                                    { required: false, value: exercise.sets })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-xl-1 col-sm-2">
                                            <div className="form-group">
                                                <label className="text-muted">Reps</label>
                                                <input className="form-control" type="number" {...register(num + "_reps",
                                                    { required: false, value: exercise.reps })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-xl-1 col-sm-2">
                                            <div className="form-group">
                                                <label className="text-muted">Load</label>
                                                <input className="form-control" type="number"  {...register(num + "_load",
                                                    { required: false, value: exercise.load })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-xl-1 col-sm-2">
                                            <div className="form-group">
                                                <label className="text-muted">Rest</label>
                                                <input className="form-control" type="number"  {...register(num + "_rest",
                                                    { required: false, value: exercise.rest })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-xl-1 col-sm-2">
                                            <div className="form-group">
                                                <label className="text-muted">Tempo</label>
                                                <input className="form-control" type="text"  {...register(num + "_tempo",
                                                    { required: false, value: exercise.tempo })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-xl-3 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-muted">Notes</label>
                                                <input className="form-control" type="text"{...register(num + "_notes",
                                                    { required: false, value: exercise.notes })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-xl-1 col-sm-4">
                                            <IconButton sx={{ mt: 2, color: 'text.primary' }}
                                                onClick={() => {
                                                    const filterArray = array.filter((e) => e !== num)
                                                    setArray(filterArray)
                                                }}
                                                aria-label="delete"
                                                className="btn-dlt">
                                                <Icon icon={trash2Fill} />
                                            </IconButton>
                                        </div>
                                    </div>
                                })}
                            </div>

                            {error &&
                                <div className="alert alert-danger self-align-center m-3" role="alert">
                                    {error}
                                </div>
                            }
                            {success &&
                                <div className="alert alert-success self-align-center m-3" role="alert">
                                    {"Mesocycle added"}
                                </div>
                            }
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-6 col-lg-9 mt-2">
                                        <Button
                                            onClick={() => {
                                                array.push(Math.floor(Math.random() * 100))
                                                setArray(array.filter(() => true))
                                            }}
                                            className="btn"
                                            variant="contained"
                                            disabled={sending}
                                            type="button"
                                        >Add Mesocycle</Button>
                                    </div>
                                    <div className="col-md-6 col-lg-3">
                                        <Button
                                            style={{ marginRight: 4 }}
                                            variant="contained"
                                            type="submit"
                                            disabled={sending}
                                            className="btn mt-2 p"
                                        >Save</Button>
                                        <Button
                                            style={{ textAlign: 'left' }}
                                            variant="link"
                                            onClick={props.onClose}
                                            className="daniel-cancel mt-2"
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