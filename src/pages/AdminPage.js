import "./page.css"
import React, { useState, useEffect } from 'react'
import { isLoggedIn } from "../helpers/loginHelp";
import ReportTable from "../components/reportTable"
import { Button, ButtonGroup } from "@material-ui/core";
import Scrollbar from "../components/Scrollbar";
import MessocycleForm from "../components/messocycle/MessocycleForm";
import MessocycleTable from "../components/messocycle/MessocycleTable";
import Report from "../components/report";
import NutritionForm from "../components/Nutrition/NutritionForm";
import NutritionTable from "../components/Nutrition/NutritionTable";
import HabitForm from "../components/habit/HabitForm";
import HabitTable from "../components/habit/HabitTable";
export default function UserPage() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentUser, setCurrentUser] = useState({});
    const [showReport, setShowReport] = useState(false);
    const [bioFeedback, setBioFeedback] = useState(false);
    const [nutrition, setNutrition] = useState(false);
    const [messocycle, setMessocycle] = useState(false);
    const [habit, setHabit] = useState(false);


    const userSelect = (user) => {
        setShowReport(true)
        setCurrentUser(user)
    }
    console.log("I am rendering alot")
    useEffect(() => {
        //will get all the data of users here
        const token = isLoggedIn().token;
        // getUsers(token).then(data => {
        //     if (data) {
        //         if (data.msg) {
        //             setError(data.msg)
        //             setLoading(false)
        //         } else {
        //             setUsers(data.users)
        //             setLoading(false)
        //         }
        //     } else {
        //         setError("Unable to connect to database")
        //     }
        // })
    }, [])

    const url = "";
    return (
        <div>
            {loading ?
                <div className="container">
                    <div className="row m-5">
                        <div className="alert alert-primary self-align-center" role="alert">
                            Data is Loading...
                        </div>
                    </div>
                </div>
                :
                error
                    ?
                    <div className="container">
                        <div className="row m-5">
                            <div className="alert alert-danger self-align-center" role="alert">
                                {error}
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="col-sm-12 no-float mt-5">
                            <div className="container col-lg-12 col-md-12">
                                <Scrollbar>
                                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                                        <Button variant="contained" onClick={() => setBioFeedback(true)}>Bio Feedback</Button>
                                        <Button onClick={() => setNutrition(true)}>Nutritian</Button>
                                        <Button onClick={() => setMessocycle(true)}>Messocycle Tracker</Button>
                                        <Button onClick={() => setHabit(true)}>Habit Tracker</Button>
                                    </ButtonGroup>
                                </Scrollbar>
                                {bioFeedback &&
                                    <>
                                        <ReportTable />
                                        <Report />
                                    </>}
                                {nutrition &&
                                    <>
                                        <NutritionForm />
                                        <NutritionTable />
                                    </>}
                                {messocycle &&
                                    <>
                                        <MessocycleForm />
                                        <MessocycleTable />
                                    </>}
                                {habit &&
                                    <>
                                        <HabitForm />
                                        <HabitTable />
                                    </>}
                                {currentUser && currentUser.reports && currentUser.reports.length === 0
                                    ?
                                    <div className="alert alert-danger self-align-center" role="alert">
                                        {currentUser.name} has no report
                                    </div>
                                    :
                                    <>
                                        {showReport && <ReportTable report={currentUser.reports[currentUser.reports.length - 1]} userId={currentUser._id} />}
                                    </>
                                }

                            </div>
                        </div>
                    </div>
            }
        </div >
    )
}
