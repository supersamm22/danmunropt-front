import { Button, Card, Container, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import Icon from '@iconify/react';
import { isLoggedIn } from '../../helpers/loginHelp';
import { addHabit } from '../../apiCalls/reportCalls';


export default function HabitForm(props) {

    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [array, setArray] = useState([0, 1]);
    const submit = (e) => {
        const habits = []
        array.forEach((num) => {
            habits.push({
                "name": e[num + "_name"], "points": e[num + "_points"], "monday": e[num + "_monday"], "tuesday": e[num + "_tuesday"],
                "wednesday": e[num + "_wednesday"], "thursday": e[num + "_thursday"], "friday": e[num + "_friday"],
                "saturday": e[num + "_saturday"], "sunday": e[num + "_sunday"]
            })
        })
        const loginData = isLoggedIn()
        const parms = {
            userId: loginData.user.id,
            habits: habits,
        }
        console.log(parms)
        addHabit(loginData.token, parms).then(data => {
            console.log(data)
        })
    }
    return (
        <Container className="mt-4">
            <Card>
                <Container>
                    <h4 className="mt-2">Habit</h4>
                    <form onSubmit={handleSubmit(submit)}>
                        <div>
                            {array.map((num, index) =>
                                <div className="row" key={index}>
                                    <div className="col-lg-2 col-xl-3 col-sm-2">
                                        <div className="form-group ">
                                            <label className="text-muted">Habit</label>
                                            <input className="form-control" type="text"{...register(num + "_name", { required: true })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group ">
                                            <label className="text-muted">Points</label>
                                            <input className="form-control" type="text"{...register(num + "_points", { required: true })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group ">
                                            <label className="text-muted">Monday</label>
                                            <input className="form-control" type="number" {...register(num + "_monday", { required: true })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Tuesday</label>
                                            <input className="form-control" type="number"  {...register(num + "_tuesday", { required: true })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Wednesday</label>
                                            <input className="form-control" type="number" {...register(num + "_wednesday", { required: true })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Thursday</label>
                                            <input className="form-control" type="number"  {...register(num + "_thursday", { required: true })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Friday</label>
                                            <input className="form-control" type="number"  {...register(num + "_friday", { required: true })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Saturday</label>
                                            <input className="form-control" type="number"  {...register(num + "_saturday", { required: true })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Sunday</label>
                                            <input className="form-control" type="number"  {...register(num + "_sunday", { required: true })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-xl-1 col-sm-4 pb-4">
                                        <IconButton sx={{ mt: 2, color: 'text.primary' }}
                                            onClick={() => {
                                                const filterArray = array.filter((e) => e !== num)
                                                setArray(filterArray)
                                            }}
                                            aria-label="delete"
                                        >
                                            <Icon icon={trash2Fill} />
                                        </IconButton>
                                    </div>
                                </div>
                            )}
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
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-11">
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
                            </div>
                        </div>

                    </form >
                </Container>
            </Card>
        </Container>
    );
}