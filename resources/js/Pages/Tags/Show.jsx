import { Head } from "@inertiajs/inertia-react";
import AppLayout from "@/Layouts/AppLayout";
import Header from "@/Components/Header";
import ArticleBlock from "@/Components/ArticleBlock";
import Grid from "@/Components/Grid";
import { Container } from "@/Components/Container";
import Pagination from "@/Components/Pagination";

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

            <Container>
                {articles ? (
                    <>
                        <Grid>
                            {articles.map((article) => (
                                <ArticleBlock
                                    key={article.slug}
                                    article={article}
                                />
                            ))}
                        </Grid>
                        <Pagination {...{ meta, links }} />
                    </>
                ) : (
                    <p>no article</p>
                )}
            </Container>
        </>
    );
}

Show.layout = (page) => <AppLayout children={page} />;
