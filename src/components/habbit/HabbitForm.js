import { Card, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { uploadReport } from '../../apiCalls/reportCalls';
import { isLoggedIn } from "../../helpers/loginHelp"

export default function HabbitForm() {

    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");



    const onSubmit = (data) => {
        setError("")
        const token = isLoggedIn().token;
        setLoading(true)
        const report = { data };
        uploadReport(report, token).then(data => {
            if (data) {
                if (data.msg) {
                    setLoading(false)
                    setError(data.msg)
                } else {
                    reset()
                    setLoading(false)
                }
            } else {
                setError("Unable to connect to database")
                setLoading(false)
            }
        })
    }


    useEffect(() => {
    }, [])

    return (
        <Container className="mt-4">
            <Card>
                <Container>
                    <h4 className="mt-2">Habbit</h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className="row">
                                <div className="col-md-2">
                                    <div className="form-group ">
                                        <label className="text-muted">Wake Up Time</label>
                                        <input className="form-control" type="text"{...register("wake_up_time", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group ">
                                        <label className="text-muted">Meal Time</label>
                                        <input className="form-control" type="text" {...register("meal_time", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="text-muted">Steak</label>
                                        <input className="form-control" type="text"  {...register("steak", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        <label className="text-muted">Calories</label>
                                        <input className="form-control" type="number" {...register("calories", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        <label className="text-muted">Protein</label>
                                        <input className="form-control" type="number"  {...register("protein", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        <label className="text-muted">Carbohydrates</label>
                                        <input className="form-control" type="number"  {...register("carbohydrates", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        <label className="text-muted">Water</label>
                                        <input className="form-control" type="text"  {...register("water", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        <label className="text-muted">Did you consume Alcohol today</label>
                                        <select className="form-control" {...register("alcohol_intake", { required: true })}>
                                            <option value="">Select...</option>
                                            <option value="Compliant">Yes</option>
                                            <option value="Non-Compliant">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        <label className="text-muted">Please detail what you consumed</label>
                                        <input className="form-control" type="text"  {...register("details", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        <label className="text-muted">Total Alcoholic Cal consumption today</label>
                                        <input className="form-control" type="text"  {...register("alcohol_cal", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        <label className="text-muted">Comment</label>
                                        <textarea className="form-control" type="text"  {...register("comments_", { required: true })} />
                                    </div>
                                </div>
                                <div className="row">
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
                        </div>
                    </form >
                </Container>
            </Card>
        </Container>
    );
};
