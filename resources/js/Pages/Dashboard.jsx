import { Container } from "@/Components/Container";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard(props) {
    return (
        <>
            <Head title="Dashboard" />

            <Container>Dashboard</Container>
        </>
    );
}

Dashboard.layout = (page) => <DashboardLayout children={page} />;
