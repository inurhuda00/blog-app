import { Head, useForm } from "@inertiajs/inertia-react";
import AppLayout from "@/Layouts/AppLayout";
import Header from "@/Components/Header";
import { Container } from "@/Components/Container";
import { Inertia } from "@inertiajs/inertia";
import { ArticleForm } from "@/Components/ArticleForm";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Edit({ article, statuses }) {
    const { data, setData } = useForm({
        title: article.title,
        excerpt: article.excerpt,
        category_id: article.category,
        body: article.body,
        picture: article.picture ? [article.picture] : "",
        tags: article.tags,
        status: statuses.find((status) => status.id == article.status),
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post(
            route("articles.update", article.slug),
            {
                ...data,
                _method: "PUT",
                picture: data.picture[0],
                status: data.status.id,
                category_id: data.category_id.id,
                tags: data.tags.map((tag) => tag.id),
            },
            {}
        );
    };
    return (
        <>
            <Head title="Edit New Article" />

            <Header>
                <Header.Title>{data.title || "Title"}</Header.Title>
                <Header.Subtitle>{data.excerpt || "Excerpt"}</Header.Subtitle>
            </Header>

            <Container>
                <form onSubmit={handleSubmit}>
                    <ArticleForm {...{ data, setData }} />

                    <PrimaryButton>Edit</PrimaryButton>
                </form>
            </Container>
        </>
    );
}

Edit.layout = (page) => <AppLayout children={page} />;
