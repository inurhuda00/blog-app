import { Head, Link } from "@inertiajs/inertia-react";
import AppLayout from "@/Layouts/AppLayout";
import Header from "@/Components/Header";
import { Container } from "@/Components/Container";
import Grid from "@/Components/Grid";
import ArticleBlock from "@/Components/ArticleBlock";

export default function Home({ articles, ziggy }) {
    return (
        <>
            <Head title="Seorang Kapiten" />

            <Header>
                <Header.Title>Seorang Kapiten</Header.Title>
                <Header.Subtitle>
                    Lorem ipsum dolor sit amet, consectetur
                </Header.Subtitle>
                <Header.Content>
                    Perferendis eaque id accusantium repellendus modi soluta
                    eligendi placeat dolore, architecto amet accusamus cumque
                    ipsam?
                </Header.Content>
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
                        <Link
                            className="text-blue-600 block mt-10"
                            href={route("articles.index")}
                        >
                            Show more articles
                        </Link>
                    </>
                ) : (
                    <p>no article</p>
                )}
            </Container>
        </>
    );
}

Home.layout = (page) => <AppLayout children={page} />;
