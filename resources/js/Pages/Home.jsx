import Articles from "@/Components/Article";
import { Container } from "@/Components/Container";
import PrimaryButton from "@/Components/PrimaryButton";
import Section from "@/Components/Section";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/inertia-react";

export default function Home({ articles }) {
    return (
        <>
            <Head title="Seorang Kapiten" />

            {/* hero */}
            <section className="bg-gray-900 py-10 md:px-12">
                <Container>
                    {articles.length ? (
                        <Articles className="my-6 grid grid-cols-10">
                            <Articles.CardFeature articles={articles} />
                            <div className="col-span-full mb-10 inline-flex flex-1 flex-col divide-y divide-gray-700 px-2 text-gray-900 md:col-span-5 lg:px-5">
                                <Articles.CardFeatureSmall
                                    articles={articles}
                                />
                            </div>
                        </Articles>
                    ) : null}
                </Container>
            </section>
            {/* editor pick */}
            <section className="mb-5 py-12">
                <Container>
                    <Section.Title title="Pilihan Editor" />
                    {articles.length ? (
                        <Articles className="mb-6 grid grid-cols-2 gap-y-10 md:grid-cols-4 md:divide-x md:divide-gray-200 md:px-3">
                            <Articles.CardEditorPick articles={articles} />
                        </Articles>
                    ) : null}
                </Container>
            </section>
            {/* new article */}
            <section className="mb-12">
                <Container>
                    <Section.Title title="Pilihan Editor" />
                    {articles.length ? (
                        <div className="mb-6">
                            <Articles className="mb-12 grid grid-cols-2 md:grid-cols-3 md:px-3">
                                <Articles.CardGrid articles={articles} />
                            </Articles>
                        </div>
                    ) : null}
                </Container>
            </section>
            {/* editorial */}
            <section className="mb-5 bg-gray-900 py-12">
                <Container>
                    <Section.Title title="Editorial" />
                    {articles.length ? (
                        <Articles className="mb-6 grid grid-cols-2 gap-y-5 md:grid-cols-4 md:divide-x md:divide-gray-200 md:px-3">
                            <Articles.CardEditorPick articles={articles} dark />
                        </Articles>
                    ) : null}
                </Container>
            </section>
            {/* other article */}
            <section className="mb-5 py-12">
                <Container>
                    <div className="mb-6 flex flex-col md:flex-row">
                        <div className="mb-12 md:w-8/12 md:px-3">
                            <Section.Title title="Artikel Lainnya" />
                            {articles.length ? (
                                <Articles className="inline-flex flex-col px-2 ">
                                    <Articles.CardList articles={articles} />
                                </Articles>
                            ) : null}
                        </div>
                        <div className="inline-flex flex-col md:w-4/12 md:px-3">
                            <div className="mb-5 inline-flex items-center justify-start px-5">
                                <h2 className="text-lg font-bold uppercase tracking-wide text-gray-500">
                                    Popular
                                </h2>
                            </div>
                            <Articles className="inline-flex flex-col divide-y divide-gray-300 border-l lg:mx-5">
                                {articles.length ? (
                                    <Articles.ListArchive articles={articles} />
                                ) : null}
                            </Articles>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="flex items-center justify-center">
                <Link href={route("articles.index")}>
                    <PrimaryButton>show more</PrimaryButton>
                </Link>
            </section>
        </>
    );
}

Home.layout = (page) => <AppLayout children={page} />;
