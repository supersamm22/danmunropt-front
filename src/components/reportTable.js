import React, { useState } from 'react'
import "./reportTable.css"
import { isLoggedIn } from '../helpers/loginHelp'
import { submitComment } from "../apiCalls/reportCalls"


//------------
export default function ReportTable({ report, userId }) {
    const [text, setText] = useState("");
    const [error, setError] = useState("");


    const addComment = e => {
        setError("")
        e.preventDefault();
        const reportId = report._id;
        const token = isLoggedIn().token;
        const data = { text };
        submitComment(token, data, reportId, userId).then(data => {
            if (data) {
                if (data.text) {
                    report.comments.push(data)
                    setText("")
                } else {
                    setError("Unable to add comment")
                }
            } else {
                setError("Connection failed")
            }
        })

    }
    return (
        <div className="card" style={{ width: "100%" }}>
            {report &&
                <div className="row">
                    <h1>{new Date(report.report_date).toDateString()}</h1>
                    <div className="col-md-6">
                        <h4>Measurments</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Morning Weight</th>
                                    <th scope="col">Waist Circumference</th>
                                    <th scope="col">Resting Heartbeat</th>
                                    <th scope="col">BP:Systolic</th>
                                    <th scope="col">BP:Dystolic</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{report.morning_weight}</td>
                                    <td>{report.waist_circumference}</td>
                                    <td>{report.resting_heart_rate}</td>
                                    <td>{report.bp_systolic}</td>
                                    <td>{report.bp_dystolic}</td>
                                </tr>
                            </tbody>
                        </table>
                        <h4>Nutrition</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Supliment</th>
                                    <th scope="col">Digestion</th>
                                    <th scope="col">Hunger/Apetite</th>
                                    <th scope="col">Satiety</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{report.medicaton}</td>
                                    <td>{report.digestion}</td>
                                    <td>{report.hunger}</td>
                                    <td>{report.satiety}</td>
                                </tr>
                            </tbody>
                        </table>
                        <h4>Exercise</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Exercise Complience</th>
                                    <th scope="col">Session Enthusiasm</th>
                                    <th scope="col">Training Energy</th>
                                    <th scope="col">Daily Steps</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{report.exercise_complience}</td>
                                    <td>{report.session_enthusiasm}</td>
                                    <td>{report.training_energy}</td>
                                    <td>{report.daily_steps}</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="col-md-6">
                        <h4>LifeStyle</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Libido Morning</th>
                                    <th scope="col">Libido Evening</th>
                                    <th scope="col">Stress Morning</th>
                                    <th scope="col">Stress Midday</th>
                                    <th scope="col">Stress Evening</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{report.libido_morning}</td>
                                    <td>{report.libido_evening}</td>
                                    <td>{report.stress_morning}</td>
                                    <td>{report.stress_midday}</td>
                                    <td>{report.stress_evening}</td>
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <th scope="col">Sleep Duration</th>
                                    <th scope="col">Sleep Quality</th>
                                    <th scope="col">Energy Morning</th>
                                    <th scope="col">Energy Midday</th>
                                    <th scope="col">Energy Evening</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{report.sleep_duration}</td>
                                    <td>{report.sleep_quality}</td>
                                    <td>{report.energy_morning}</td>
                                    <td>{report.energy_midday}</td>
                                    <td>{report.energy_evening}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <h4>Admin Comments</h4>
                            {isLoggedIn().user.isAdmin &&
                                <form onSubmit={addComment}>
                                    <div className="form-group">
                                        <div class="input-group mb-3">
                                            <input type="text"
                                                value={text}
                                                onChange={e => { setText(e.target.value); setError("") }}
                                                class="form-control"
                                                placeholder="Your Expert Opinion" />
                                            <button class="btn btn-outline-secondary" type="submit" id="button-addon2">Add Comment</button>
                                        </div>
                                    </div>
                                </form>
                            }
                            {error &&
                                <div className="alert alert-danger self-align-center" role="alert">
                                    {error}
                                </div>
                            }
                            <div className="media-body">
                                {report.comments.map((comment, key) => (
                                    <>
                                        <div className="mar-btm">
                                            <h6 className="text-semibold media-heading box-inline">{comment.postedBy}</h6>
                                        </div>
                                        <p>{comment.text}</p>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
