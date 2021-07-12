import React, { useState } from 'react'
import { isLoggedIn } from '../helpers/loginHelp'
import { submitComment } from "../apiCalls/reportCalls"
import { Card, Container, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';


//------------
export default function BioFeedback({ report, userId }) {
    const [text, setText] = useState("");
    const [error, setError] = useState("");


    const addComment = e => {
        setError("")
        e.prevenTableCellefault();
        const reportId = report._id;
        const token = isLoggedIn().token;
        const data = { text };
        submitComment(token, data, reportId, userId).TableCellen(data => {
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
        <Container>
            <Card>
                <h2>Bio Feedback</h2>
                {report &&
                    <div className="row">
                        <h1>{new Date(report.report_date).toDateString()}</h1>
                        <div className="col-md-6">
                            <h4>Measunlnlrments</h4>
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Morning Weight</TableCell>
                                        <TableCell >Waist Circumference</TableCell>
                                        <TableCell >Resting Heartbeat</TableCell>
                                        <TableCell >BP:Systolic</TableCell>
                                        <TableCell >BP:Dystolic</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{report.morning_weight}</TableCell>
                                        <TableCell>{report.waist_circumference}</TableCell>
                                        <TableCell>{report.resting_heart_rate}</TableCell>
                                        <TableCell>{report.bp_systolic}</TableCell>
                                        <TableCell>{report.bp_dystolic}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <h4>Nutrition</h4>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell >Supliment</TableCell>
                                        <TableCell >Digestion</TableCell>
                                        <TableCell >Hunger/Apetite</TableCell>
                                        <TableCell >Satiety</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{report.medicaton}</TableCell>
                                        <TableCell>{report.digestion}</TableCell>
                                        <TableCell>{report.hunger}</TableCell>
                                        <TableCell>{report.satiety}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <h4>Exercise</h4>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell >Exercise Complience</TableCell>
                                        <TableCell >Session EnTableCellusiasm</TableCell>
                                        <TableCell >Training Energy</TableCell>
                                        <TableCell >Daily Steps</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{report.exercise_complience}</TableCell>
                                        <TableCell>{report.session_enTableCellusiasm}</TableCell>
                                        <TableCell>{report.training_energy}</TableCell>
                                        <TableCell>{report.daily_steps}</TableCell>

                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>

                        <div className="col-md-6">
                            <h4>LifeStyle</h4>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell >Libido Morning</TableCell>
                                        <TableCell >Libido Evening</TableCell>
                                        <TableCell >Stress Morning</TableCell>
                                        <TableCell >Stress Midday</TableCell>
                                        <TableCell >Stress Evening</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{report.libido_morning}</TableCell>
                                        <TableCell>{report.libido_evening}</TableCell>
                                        <TableCell>{report.stress_morning}</TableCell>
                                        <TableCell>{report.stress_midday}</TableCell>
                                        <TableCell>{report.stress_evening}</TableCell>
                                    </TableRow>
                                </TableBody>
                                <TableHead>
                                    <TableRow>
                                        <TableCell >Sleep Duration</TableCell>
                                        <TableCell >Sleep Quality</TableCell>
                                        <TableCell >Energy Morning</TableCell>
                                        <TableCell >Energy Midday</TableCell>
                                        <TableCell >Energy Evening</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow
                                        tabIndex={-1}>
                                        <TableCell>{report.sleep_duration}</TableCell>
                                        <TableCell>{report.sleep_quality}</TableCell>
                                        <TableCell>{report.energy_morning}</TableCell>
                                        <TableCell>{report.energy_midday}</TableCell>
                                        <TableCell>{report.energy_evening}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <div>
                                <h4>Admin Comments</h4>
                                {isLoggedIn().user.isAdmin &&
                                    <form onSubmit={addComment}>
                                        <div className="form-group">
                                            <div className="input-group mb-3">
                                                <input type="text"
                                                    value={text}
                                                    onChange={e => { setText(e.target.value); setError("") }}
                                                    className="form-control"
                                                    placeholder="Your Expert Opinion" />
                                                <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Add Comment</button>
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
            </Card>
        </Container>
    )
}
