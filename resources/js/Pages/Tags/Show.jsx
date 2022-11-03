import Articles from "@/Components/Article";
import { Container } from "@/Components/Container";
import Header from "@/Components/Header";
import Pagination from "@/Components/Pagination";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/inertia-react";

export default function Show({ tag, ...props }) {
    const { data: articles, meta, links } = props.articles;

    return (
        <>
            <Head title={tag.name} />

            <Header>
                <Header.Title>{tag.name}</Header.Title>
                <Header.Subtitle>
                    {" "}
                    This page show the article about {tag.name}
                </Header.Subtitle>
            </Header>

            <section className="mb-5 py-12">
                <Container>
                    <div className="mb-5 inline-flex items-center justify-start px-2 md:px-8">
                        <h2 className="text-lg font-bold uppercase tracking-wide text-gray-500">
                            {tag.name}
                        </h2>
                    </div>
                    {articles.length ? (
                        <div className="mb-6">
                            <Articles className="mb-12 grid grid-cols-2 md:grid-cols-3 md:px-3">
                                <Articles.CardGrid articles={articles} />
                            </Articles>
                        </div>
                    ) : null}
                </Container>
                <Pagination {...{ meta, links }} />
            </section>
        </>
    );
}

Show.layout = (page) => <AppLayout children={page} />;
