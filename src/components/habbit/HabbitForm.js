import { Button, Card, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

export default function HabbitForm(props) {

    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [array, setArray] = useState([0, 1]);

    return (
        <Container className="mt-4">
            <Card>
                <Container>
                    <h4 className="mt-2">Habbit</h4>
                    <form
                    // onSubmit={handleSubmit(submit)}
                    >
                        <div>
                            <div className="row">
                                <div className="col-lg-2 col-xl-1 col-sm-2">
                                    <div className="form-group ">
                                        <label className="text-muted">Wake Up</label>
                                        <input className="form-control" type="text"{...register("wake_up", { required: true })} />
                                    </div>
                                </div>
                            </div>
                            {/* {array.map((num, index) => */}
                            <div className="row" >
                                <div className="col-lg-2 col-xl-1 col-sm-2">
                                    <div className="form-group ">
                                        <label className="text-muted">Meal Time</label>
                                        <input className="form-control" type="text" {...register("_meal_time", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-lg-2 col-xl-2 col-sm-2">
                                    <div className="form-group">
                                        <label className="text-muted">Steak</label>
                                        <input className="form-control" type="text"  {...register("_steak", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-lg-2 col-xl-1 col-sm-2">
                                    <div className="form-group">
                                        <label className="text-muted">Calories</label>
                                        <input className="form-control" type="number" {...register("_calories", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-lg-2 col-xl-1 col-sm-2">
                                    <div className="form-group">
                                        <label className="text-muted">Protein</label>
                                        <input className="form-control" type="number"  {...register("_protein", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-lg-2 col-xl-1 col-sm-2">
                                    <div className="form-group">
                                        <label className="text-muted">Carbohydrates</label>
                                        <input className="form-control" type="number"  {...register("_carbohydrates", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-lg-2 col-xl-1 col-sm-2">
                                    <div className="form-group">
                                        <label className="text-muted">Water</label>
                                        <input className="form-control" type="text"  {...register("_water", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-lg-2 col-xl-2 col-sm-2">
                                    <div className="form-group">
                                        <label className="text-muted">Did you consume Alcohol today</label>
                                        <select className="form-control" {...register("_alcohol", { required: true })}>
                                            <option value="">Select...</option>
                                            <option value="Compliant">Yes</option>
                                            <option value="Non-Compliant">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-xl-2 col-sm-2">
                                    <div className="form-group">
                                        <label className="text-muted">Please detail what you consumed</label>
                                        <input className="form-control" type="text"  {...register("_total_alcohol", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-lg-2 col-xl-2 col-sm-2">
                                    <div className="form-group">
                                        <label className="text-muted">Total Alcoholic Cal consumption today</label>
                                        <input className="form-control" type="text"  {...register("_alcohol_cal", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-lg-2 col-xl-1 col-sm-2">
                                    <div className="form-group">
                                        <label className="text-muted">Comment</label>
                                        <input className="form-control" type="text"  {...register("_comments_", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-lg-3 col-xl-2 col-sm-4 pb-4">
                                    <div className="form-group">
                                        <Button
                                            style={{ marginTop: 20 }}
                                            className="dlt"
                                            variant="contained"
                                            type="button"
                                        // onClick={() => {
                                        // const filterArray = array.filter((e) => e !== num)
                                        // setArray(filterArray)
                                        // }}
                                        >Delete</Button></div>
                                </div>
                            </div>
                            {/* )} */}
                            {/* <div className="row">
                                    <h5 className="mt-4">Daily Totals</h5>
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label className="text-muted">Calories</label>
                                            <input className="form-control" type="text"{...register("total_calories", { required: true })} />
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label className="text-muted">Protein</label>
                                            <input className="form-control" type="text"{...register("total_protein", { required: true })} />
                                        </div>
                                    </div><div className="col-md-2">
                                        <div className="form-group">
                                            <label className="text-muted">Carbohydrates</label>
                                            <input className="form-control" type="text"{...register("total_carbohydrates", { required: true })} />
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label className="text-muted">Fats</label>
                                            <input className="form-control" type="text"{...register("fats", { required: true })} />
                                        </div>
                                    </div>
                                    <div className="col-md-4 pb-4">
                                        <div className="form-group">
                                            <label className="text-muted">Daily Comments</label>
                                            <textarea className="form-control"  {...register("daily_comments", { required: true })} />
                                        </div>
                                    </div>
                                </div>
                            */}

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
                                <div className="col-10">
                                    <Button
                                        // onClick={() => {
                                        //     array.push(Math.floor(Math.random() * 100))
                                        //     setArray(array.filter(() => true))
                                        // }}
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
                                        variant="contained"
                                    // onClick={props.onClose}
                                    >Cancel</Button>
                                </div>
                            </div>
                        </div>

                    </form >
                </Container>
            </Card>
        </Container>
    );
}