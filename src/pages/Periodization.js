import React from "react"
import { isLoggedIn } from "src/helpers/loginHelp"
import PeriodizationForm from "src/components/periodization/PeriodizationForm"

export default function MessocycleTracker() {
    return (
        <Page title="Danile Munro | Periodization Tracker">
            <PeriodizationForm id={isLoggedIn().user.id} isUser={true} />
        </Page>
    )
}