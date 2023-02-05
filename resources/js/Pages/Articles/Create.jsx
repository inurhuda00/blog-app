import { ArticleForm } from "@/Components/ArticleForm";
import { Container } from "@/Components/Container";
import Header from "@/Components/Header";
import PrimaryButton from "@/Components/PrimaryButton";
import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Create({ statuses, tags }) {
    const { data, setData } = useForm({
        title: "",
        excerpt: "",
        category_id: "",
        body: "",
        picture: "",
        tags: [tags[0]],
        status: statuses[0],
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post(
            route("articles.store"),
            {
                ...data,
                picture: data.picture[0],
                category_id: data.category_id.id,
                status: data.status.id,
                tags: data.tags.map((tag) => tag.id),
            },
            {}
        );
    };

    return (
        <>
            <Head title="Create New Article" />

            <Header>
                <Header.Title>{data.title || "Title"}</Header.Title>
                <Header.Subtitle>{data.excerpt || "Excerpt"}</Header.Subtitle>
            </Header>

            <Container>
                <form onSubmit={handleSubmit}>
                    <ArticleForm {...{ data, setData }} />

                    <PrimaryButton>Create</PrimaryButton>
                </form>
            </Container>
        </>
    );
}

Create.layout = (page) => <AppLayout children={page} />;
