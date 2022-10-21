import React from "react";
import { Head } from "@inertiajs/inertia-react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Container } from "@/Components/Container";

export default function Dashboard(props) {
    return (
        <>
            <Head title="Dashboard" />

            <Container>Dashboard</Container>
        </>
    );
}

Dashboard.layout = (page) => <DashboardLayout children={page} />;
