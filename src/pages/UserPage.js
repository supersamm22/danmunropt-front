import "./page.css"
import React from 'react'
import FeedbackForm from "../components/form"
import Report from "../components/report"

export default function UserPage() {
    return (
        <div>
            <div className="row " style={{ height: "100vh" }}>
                <div className="col-sm-12 no-float">
                    <div className="container" >
                        <div className="row" >
                            <div className="col align-self-center m-5">
                                <FeedbackForm />
                            </div>
                        </div>
                        <div className="row mt-5" >
                            <div className="col align-self-center m-5">
                                <Report />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
