import { Head, Link } from "@inertiajs/inertia-react";
import AppLayout from "@/Layouts/AppLayout";
import Header from "@/Components/Header";
import { Container } from "@/Components/Container";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Show({ auth, ...props }) {
    const { data: article, related: articles } = props.article;

    return (
        <>
            <Head title={article.title} />

            <Header>
                <div className="mb-4">
                    <div className="mb-4 items-baseline text-gray-400">
                        <Link
                            href={route(
                                "categories.show",
                                article.category.slug
                            )}
                            className="text-white font-semibold text-sm"
                        >
                            {article.category.name}{" "}
                        </Link>
                        <span className="text-sm">by</span>
                        <Link
                            href={route("users.show", article.author)}
                            className="text-white font-semibold text-sm"
                        >
                            {" "}
                            {article.author.name}
                        </Link>
                    </div>

                    {article.tags.length ? (
                        <div className="text-xs font-medium tracking-tight space-x-1 mb-3">
                            {article.tags.map((tag) => (
                                <Link
                                    key={tag.slug}
                                    href={route("tags.show", tag.slug)}
                                    className="text-black hover:bg-gray-200 bg-gray-100 transition duration-200 px-2 py-1 rounded-md"
                                >
                                    {tag.name}
                                </Link>
                            ))}
                        </div>
                    ) : null}
                </div>

                <Header.Title>{article.title}</Header.Title>
                <Header.Subtitle>{article.excerpt}</Header.Subtitle>

                {auth.user?.id === article.author.id && (
                    <PrimaryButton className="mt-6">
                        <Link href={route("articles.edit", article.slug)}>
                            edit
                        </Link>
                    </PrimaryButton>
                )}
            </Header>

            <Container>
                <div className="grid grid-cols-12 gap-16">
                    <div className="col-span-8">
                        {article.picture && (
                            <img
                                src={article.picture}
                                alt={article.name}
                                className="rounded mb-6 w-full"
                            />
                        )}
                        <div className="prose">{article.body}</div>
                    </div>
                    <div className="col-span-4">
                        <h4 className="text-xl font-semibold mb-6">
                            Related Articles
                        </h4>
                        {articles.length ? (
                            <ul className="space-y-2">
                                {articles.map((article) => (
                                    <li key={article.slug}>
                                        <Link
                                            href={route(
                                                "articles.show",
                                                article.slug
                                            )}
                                        >
                                            {article.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>no article</p>
                        )}
                    </div>
                </div>
            </Container>
        </>
    );
}

Show.layout = (page) => <AppLayout children={page} />;
