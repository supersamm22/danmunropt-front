import "./page.css"
import React, { useState, useEffect } from 'react'
import { isLoggedIn } from "../helpers/loginHelp";
import ReportTable from "../components/reportTable"
import { Button, ButtonGroup } from "@material-ui/core";
import Scrollbar from "../components/Scrollbar";
import MessocycleForm from "../components/messocycle/MessocycleForm";
import MessocycleTable from "../components/messocycle/MessocycleTable";
import NutritionTable from "../components/Nutrition/NutritionTable";
import HabitTable from "../components/habit/HabitTable";
import { motion } from 'framer-motion';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Typography, Container } from '@material-ui/core';
import { MotionContainer, varBounceIn } from '../components/animate';
import { getUsers } from "src/apiCalls/adminCalls";

export default function UserPage(props) {

    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [currentUser, setCurrentUser] = useState({});
    const [bioFeedback, setBioFeedback] = useState(true);
    const [nutrition, setNutrition] = useState(false);
    const [messocycle, setMessocycle] = useState(false);
    const [habit, setHabit] = useState(false);

    const { pathname } = useLocation();
    useEffect(() => {
        let uid = ""
        if (pathname) {
            const split = pathname.split("/")
            if (split.length > 2) {
                uid = split[2]
                setId(split[2])
            }
        }
        const loginData = isLoggedIn()
        const token = loginData.token;

        if (loginData.user.isAdmin && users.length == 0) {
            getUsers(token).then(data => {
                if (data) {
                    if (data.msg) {
                        setError(data.msg)
                        setLoading(false)
                    } else {
                        setUsers(data.users)
                        if (!currentUser.id) {
                            const currentUser_ = data.users.find((e) => e._id === uid) || {}
                            setCurrentUser(currentUser_)
                        }
                        setLoading(false)
                    }
                } else {
                    setError("Unable to connect to database")
                }
            })
        }
        if (!currentUser.id) {
            const currentUser_ = users.find((e) => e._id === uid) || {}
            setCurrentUser(currentUser_)
        }

    }, [pathname])

    if (!id) {
        return (
            <Container>
                <MotionContainer initial="initial" open>
                    <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
                        <motion.div variants={varBounceIn}>
                            <Typography variant="h3" paragraph>
                                Select a user to view reports
                            </Typography>
                        </motion.div>
                        <Typography sx={{ color: 'text.secondary' }}>
                            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL?
                            Be sure to check your spelling.
                        </Typography>

                        <motion.div variants={varBounceIn}>
                            <Box
                                component="img"
                                src="/static/illustrations/illustration_register.png"
                                sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
                            />
                        </motion.div>
                    </Box>
                </MotionContainer>
            </Container>
        )
    }
    if (!users || users.length === 0) {
        return ("loading")
    }
    console.log("adminpage", id)
    return (
        <div>
            <div>
                {/* <div className="col-sm-12 no-float mt-5"> */}
                <div className="container col-lg-12 col-md-12 ">
                    <div className="text-center">
                        <Scrollbar >
                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                                <Button
                                    className="btn"
                                    onClick={() => { }} disabled
                                    style={{ color: "#102770" }}>
                                    {currentUser.name}</Button>
                                <Button
                                    onClick={() => {
                                        setBioFeedback(true)
                                        setNutrition(false)
                                        setMessocycle(false)
                                        setHabit(false)
                                    }}
                                    className={bioFeedback ? "btn-group-active" : "btn-group-outline"}>
                                    Bio Feedback</Button>
                                <Button className={nutrition ? "btn-group-active" : "btn-group-outline"} onClick={() => {
                                    setBioFeedback(false)
                                    setNutrition(true)
                                    setMessocycle(false)
                                    setHabit(false)
                                }}>
                                    Nutrition</Button>
                                <Button className={messocycle ? "btn-group-active" : "btn-group-outline"} onClick={() => {
                                    setBioFeedback(false)
                                    setNutrition(false)
                                    setMessocycle(true)
                                    setHabit(false)
                                }}>
                                    Mesocycle Tracker</Button>
                                <Button className={habit ? "btn-group-active" : "btn-group-outline"} onClick={() => {
                                    setBioFeedback(false)
                                    setNutrition(false)
                                    setMessocycle(false)
                                    setHabit(true)
                                }}>
                                    Habit Tracker</Button>
                            </ButtonGroup>
                        </Scrollbar>
                    </div>
                    {bioFeedback &&
                        <>
                            {!currentUser || !currentUser.reports || currentUser.reports.length === 0
                                ?
                                <div className="alert alert-danger self-align-center mt-2" role="alert">
                                    {currentUser.name} has no report
                                </div>
                                :
                                <>
                                    <ReportTable report={currentUser.reports[currentUser.reports.length - 1]} userId={currentUser._id} />
                                </>
                            }
                        </>}
                    {nutrition &&
                        <>
                            <NutritionTable id={id} />
                        </>}
                    {messocycle &&
                        <>
                            {/* <MessocycleForm id={id} /> */}
                            <MessocycleTable id={id} />
                        </>}
                    {habit &&
                        <>
                            <HabitTable id={id} />
                        </>}

                </div>
                {/* </div> */}
            </div>
        </div >
    )
}
