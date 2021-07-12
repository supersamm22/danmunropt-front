import React from "react"
import HabitForm from "src/components/habit/HabitForm"
import Page from "../components/Page"

export default function HabitTracker() {
    return (
        <Page title="Daniel Munro | Habit Tracker">
            <HabitForm />
        </Page>
    )
}