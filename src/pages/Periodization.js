import React from "react"
import PeriodizationTable from "../components/periodization/PeriodizationTable"
import { isLoggedIn } from "src/helpers/loginHelp"

export default function MessocycleTracker() {
    return (
        <Page title="Danile Munro | Periodization Tracker">
            <PeriodizationTable id={isLoggedIn().user.id} isUser={true} />
        </Page>
    )
}