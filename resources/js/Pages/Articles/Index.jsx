import { Head } from "@inertiajs/inertia-react";
import AppLayout from "@/Layouts/AppLayout";
import Header from "@/Components/Header";
import ArticleBlock from "@/Components/ArticleBlock";
import Grid from "@/Components/Grid";
import { Container } from "@/Components/Container";
import Pagination from "@/Components/Pagination";

export default function Index({ ...props }) {
    const { data: articles, meta, links } = props.articles;

    return (
        <>
            <Head title="All Articles" />

            <Header>
                <Header.Title>Articles</Header.Title>
                <Header.Subtitle>This page show the articles</Header.Subtitle>
            </Header>

            <Container>
                {articles.length ? (
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

Index.layout = (page) => <AppLayout children={page} />;
